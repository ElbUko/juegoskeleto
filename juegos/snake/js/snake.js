var Juego = function(){
	//VALORES Y CONSTANTES
	var C = {
		MAXW : 		50,
		MAXH : 		30,
		casilla: 	10,
		velJuego : 	75,
		longIni : 	 5,
		crece: 		 3	
	}
	//BANDERAS
	var B = {
		seDio : 	 null,
		pausa : 	 true,
		valeChocar : false,
		muere : 	 false
	}
	var Menu = {
		vel : document.getElementById('velocidad'),
		longIni : document.getElementById('longIni'),
		crece : document.getElementById('crece'),
		valeChocar : document.getElementsByName('valeChocar')[0]
	}

	//OBJETOS (def)
	var Serpiente = function(){
		this.cabeza = G.pushRandom();
		this.culo = null;													// el que va borrando
		this.direc = undefined;												// N,E,S,O
		this.creciendo = undefined;
		this.cuerpo = [this.cabeza];
	}

	//
	//GRAFICA
	var TrataDOM = function(){
		var body = document.getElementsByTagName("html")[0],
			pantalla = document.getElementById("pantalla"),
			caja = document.getElementById('caja'),
			timeoutID;
		if (caja){
			pantalla.removeChild(caja)
		}
		var creaDiv = function(id,clas,w,h){
			var div = document.createElement("div");
			div.id = id;
			if (clas) {div.className = clas;}
			if (w) {div.style.width = w + 'px';}
			if (h) {div.style.height = h + 'px';}
			return div;
		}
		this.generaRejilla = function(G,dx,dy){
			this.caja = creaDiv('caja',null,G.getW()*dx,G.getH()*dy);
			pantalla.appendChild(this.caja);
			for (var i=0; i<G.getH(); i++) {
				var fila = creaDiv('fila');
				this.caja.appendChild(fila);
				for (var j=0; j<G.getW(); j++) {
					var id = i+','+j;
					var casilla = creaDiv(id,'casilla');
					fila.appendChild(casilla);
				}
			}
		};
		this.setClase = function(id, clase){
			var el = document.getElementById(id);
			el.className = clase;
		}
		this.choca = function(){
			this.caja.style.backgroundColor = 'red';
			document.getElementsBy
			timeoutID = window.setTimeout(despintaRojo, 100);
		}
		var despintaRojo = function(){
			this.caja.style.backgroundColor = '';
			window.clearTimeout(timeoutID);
		}
		this.pinta = function(){
			if (serp.culo != null){
				var idCulo = serp.culo.y+','+serp.culo.x
				P.setClase(idCulo, 'casilla');
			}		//borro 1o por si cruza cabeza y cola quede pintado
			var idCabeza = serp.cabeza.y+','+serp.cabeza.x
			P.setClase(idCabeza, 'serpiente');
			var idPizza = pizza.y+','+pizza.x;
			P.setClase(idPizza,'pizza');
		}
	}


	//
	//MOTOR
	var Motor = function(){
		this.miraDireccion = function(k){
			if (typeof(k)=='number'){
				if (serp.direc == undefined){
					serp.direc = k;
				}
				else if ((k==0 && serp.direc%2==1) || (k==1 && serp.direc%2==0) ||
					(k==2 && serp.direc%2==1) || (k==3 && serp.direc%2==0)){
					serp.direc = k;
				}
			}
		}
		this.comePizza = function(){
			pizza = G.pushRandom();
			serp.creciendo = C.crece;
		}
		this.collider = function(p){
			var avanza = false;
			if (typeof(p)=='object'){									//el punto de avance es campo libre -> avanza
				avanza = true;
			}
			else if (typeof(p)=='number'){								//ha chocado:
				if (p==pizza.id){			
					M.comePizza();	
					avanza = 'ok';
				}
				else if(p==serp.cuerpo[serp.cuerpo.length-1].id){		//Si choca con la estela que va borrando permito
					avanza = 'ok';
				}														//else choca consigo misma
			}
			else {
				console.log('Tenemos algun problema. Collider p: '+p);
			}
			return avanza;
		};
		this.mueveSerpiente = function(p){
			serp.cabeza = p;
			serp.cuerpo.unshift(p);
			var crec = serp.creciendo;
			if (crec){
				serp.creciendo = (crec>=1)?crec-1:false;					// y lo dejo estar, el resto del cuerpo sigue igual
			}
			else{														//quito el ultimo elemento
				if (serp.culo == null){
					serp.culo = serp.cuerpo[serp.cuerpo.length-1];	
				}
				else {
					var c = serp.cuerpo.pop();
					if (!G.remove(c)) console.log('algo va mal');
					serp.culo = serp.cuerpo[serp.cuerpo.length-1];
				}
			}
		};
		this.iteraJuego = function(k){
			var x = (serp.direc%2==1)?serp.cabeza.x+serp.direc-2:serp.cabeza.x;		//se calcula el siguiente punto en funcion del movimiento (direc)
			var y = (serp.direc%2==0)?serp.cabeza.y+serp.direc-1:serp.cabeza.y;		//direc 0 1 2 3 (NESO)-> impar horizontal, par vertical
			var p = G.pushXY(x,y);												//inserto en rejilla: null si sale, num si ocupado, pt si libre 
			if (p!=null){
				var a = M.collider(p);
				if(a){
					if (a == 'ok'){
						p = {id: p, x: x, y: y, 								//Genero el pt en base al id obtenido de x,y
							toString : function(){
								return '{id: '+id+', x: '+x+', y: '+y+'}';
							}
						};
					}
					M.mueveSerpiente(p); 									//avanzo serptiente con el nuevo punto
					return;
				}
			}
			M.choca();
		}
		this.choca = function(){
			B.seDio = kc.getKey();
			P.choca();
			if (!B.valeChocar){
				empieza();
			}
		}
	}
	var G = new Grid(C.MAXW, C.MAXH);	
	var P = new TrataDOM();
	var M = new Motor();
	var kc = new ControlTeclado();
	document.addEventListener("keydown", kc.teclaPulsada, false);
	var serp = new Serpiente();
	var pizza = G.pushRandom();
	

	//
	//CONTROL
	var run = function(){
		setTimeout(function() {
			if (!B.muere)
				requestAnimationFrame(run);
			var k = kc.getKey();
			M.miraDireccion(k);
			if (serp.direc != undefined && B.seDio!=k){
				B.seDio = null;
				M.iteraJuego(k);
				P.pinta();
			}
		}, C.velJuego);
	};

	this.prepara = function(){
		P.generaRejilla(G,C.casilla, C.casilla);
		P.pinta();
		run();
	}

	this.tomaConf = function(){
		C.velJuego = 120 - Menu.vel.value;
		C.crece = Menu.crece.value || C.crece;
		serp.creciendo = Menu.longIni.value || C.longIni;
		B.valeChocar = Menu.valeChocar.checked || false;
	}
	this.mata = function(){
		B.muere = true;
	}
}
var J;
function empieza(){
	if (J!=undefined){
		J.mata();
		J = null;
	}
	setTimeout(function(){
		J = new Juego();
		J.tomaConf();
		J.prepara();
	}, 200);
}

