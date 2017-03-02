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
		this.culo = null;			// el que va borrando
		this.direc = 0;				// N,E,S,O
		this.creciendo = false;
		this.cuerpo = [this.cabeza];
	}

	//OBJETOS (inst)
	var G = new Grid(C.MAXW, C.MAXH);	
	var kc = new ControlTeclado();
	document.addEventListener("keydown", kc.teclaPulsada, false);
	var serp = new Serpiente();
	var pizza = G.pushRandom();

	//
	//GRAFICA
	var TrataDOM = function(){
		var body = document.getElementsByTagName("html")[0];
		var pantalla = pantalla = document.getElementById("pantalla");
		
		function creaDiv(id,clas,w,h){
			caja = document.createElement("div");
			caja.id = id;
			if (clas) {caja.className = clas;}
			if (w) {caja.style.width = w + 'px';}
			if (h) {caja.style.height = h + 'px';}
			return caja;
		}
		this.generaRejilla = function(G,dx,dy){
			var caja = creaDiv('caja',null,G.getW()*dx,G.getH()*dy);
			pantalla.appendChild(caja);
			for (var i=0; i<G.getH(); i++) {
				var fila = creaDiv('fila');
				caja.appendChild(fila);
				for (var j=0; j<G.getW(); j++) {
					var id = i+','+j;
					var casilla = creaDiv(id,'casilla');
					fila.appendChild(casilla);
				}
			}
		};
		this.setClase = function(id, clase){
			if (log) console.log(id)
			var el = document.getElementById(id);
			el.className = clase;
		}
	}
	var P = new TrataDOM();
	function pinta(){
	//serpiente
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
	function miraDireccion(k){
		if (typeof(k)=='number'){
			if ((k==0 && serp.direc%2==1) || (k==1 && serp.direc%2==0) ||
				(k==2 && serp.direc%2==1) || (k==3 && serp.direc%2==0)){
				if (log) console.log('direccion: '+k);
				serp.direc = k;
			}
		}
	}
	function collider(p){
		if (typeof(p)=='object'){
			if (log) console.log('collider object '+p.toString());
			avanza = true;
		}
		else if (typeof(p)=='number' && p==pizza.id){
			if (log) console.log('collider number');
			pizza = G.pushRandom();
			avanza = 'pizza';
		}
	};
	function avanzaSerpiente(p){
		if (log) console.log('avanza S '+p.toString());;
		serp.cabeza = p;
		serp.cuerpo.unshift(p);
		if (!serp.creciendo){
			var c = serp.cuerpo.pop();
			if (!G.remove(c)) console.log('algo va mal');
			serp.culo = serp.cuerpo.pop();
		}
	}
	function avanzaJuego(k){
		if (log) console.log('avanza J '+k);
		miraDireccion(k);
		var x = (serp.direc%2==1)?serp.cabeza.x+serp.direc-2:serp.cabeza.x;
		var y = (serp.direc%2==0)?serp.cabeza.y+serp.direc-1:serp.cabeza.y;
		var p = G.pushXY(x,y);
		if (p!=null){
			if (log) console.log('p '+p.toString());
			var a = collider(p)
			if(a){
				if (a == 'pizza'){
					p = {id: p, x: x, y: y};
				}
				avanzaSerpiente(p);
			}
		}
		else {
			if (log) console.log('choca');
			choca();
		}
	}
	function choca(){
		kc.para();
	}

	//
	//CONTROL
	function run(){
		setTimeout(function() {
			requestAnimationFrame(run);
			if (log) console.log('run');
			var k = kc.getKey();
			if (log) console.log(k);
			//if (kc.pausa){
			if (log) //	console.log('tic');
				avanzaJuego(k);
				pinta();
			//}
		}, 1000/10);
	};

	this.prepara = function(){
		P.generaRejilla(G,C.casilla, C.casilla);
		pinta();
		run();
		if (log) console.log('sale');
	}
}
var J = new Juego();
if (log) console.log('juego creado');
J.prepara();

 

