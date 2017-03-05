;
var Juego = function(){
	//VALORES Y CONSTANTES
	var log = true;
	var C = {
		MAXW : 		50,
		MAXH : 		30,
		casilla: 	10,
		vel : 		50,
		longIni : 	 5,
		crece: 		 3	
	}
	//BANDERAS
	var B = {
		seDio : 	 false,
		pausa : 	 true,
		valeChocar : false
	}

	//OBJETOS (def)
	var Serpiente = function(){
		this.cabeza = G.pushRandom();
		this.culo = null;													// el que va borrando
		this.direc = undefined;												// N,E,S,O
		this.creciendo = C.longIni;
		this.cuerpo = [this.cabeza];
	}

	//
	//GRAFICA
	var TrataDOM = function(){
		var body = document.getElementsByTagName("html")[0],
			pantalla = pantalla = document.getElementById("pantalla"),
			caja,
			timeoutID;
		
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
	}


	var G = new Grid(C.MAXW, C.MAXH);	
	var P = new TrataDOM();
	var kc = new ControlTeclado();
	document.addEventListener("keydown", kc.teclaPulsada, false);
	var serp = new Serpiente();
	var pizza = G.pushRandom();
	

	var pinta = function(){
		var idCabeza = serp.cabeza.y+','+serp.cabeza.x
		P.setClase(idCabeza, 'serpiente');
		if (serp.culo != null){
			var idCulo = serp.culo.y+','+serp.culo.x
			P.setClase(idCulo, 'casilla');
		}
		var idPizza = pizza.y+','+pizza.x;
		P.setClase(idPizza,'pizza');
	}
	//
	//MOTOR
	var miraDireccion = function(k){
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
	var comePizza = function(){
		pizza = G.pushRandom();
		serp.creciendo = C.crece;
	}
	var collider = function(p){
		var avanza = false;
		if (typeof(p)=='object'){									//el punto de avance es campo libre -> avanza
			avanza = true;
		}
		else if (typeof(p)=='number'){								//ha chocado:
			if (p==pizza.id){			
				comePizza();	
				avanza = 'pizza';
			}														//else choca consigo misma
		}
		else {
			console.log('Tenemos algun problema. Collider p: '+p);
		}
		return avanza;
	};
	var mueveSerpiente = function(p){
		serp.cabeza = p;
		serp.cuerpo.unshift(p);
		var crec = serp.creciendo;
		if (crec){
			serp.creciendo = (crec>1)?crec-1:false;					// y lo dejo estar, el resto del cuerpo sigue igual
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
	}
	var iteraJuego = function(k){
		var x = (serp.direc%2==1)?serp.cabeza.x+serp.direc-2:serp.cabeza.x;		//se calcula el siguiente punto en funcion del movimiento (direc)
		var y = (serp.direc%2==0)?serp.cabeza.y+serp.direc-1:serp.cabeza.y;		//direc 0 1 2 3 (NESO)-> impar horizontal, par vertical
		var p = G.pushXY(x,y);												//inserto en rejilla: null si sale, num si ocupado, pt si libre 
		if (p!=null){
			var a = collider(p);
			if(a){
				if (a == 'pizza'){
					p = {id: p, x: x, y: y, 								//Genero el pt en base al id obtenido de x,y
						toString : function(){
							return '{id: '+id+', x: '+x+', y: '+y+'}';
						}
					};
				}
				mueveSerpiente(p); 									//avanzo serptiente con el nuevo punto
				return;
			}
		}
		choca();
	}
	var choca = function(){
		serp.direc = undefined;
		P.choca();
	}

	//
	//CONTROL
	var run = function(){
		setTimeout(function() {
			requestAnimationFrame(run);
			var k = kc.getKey();
			miraDireccion(k);
			if (serp.direc != undefined){
				iteraJuego(k);
				pinta();
			}
		}, 1000/10);
	};

	this.prepara = function(){
		P.generaRejilla(G,C.casilla, C.casilla);
		pinta();
		run();
	}
}

var J = new Juego();
J.prepara();

