/*
var Juego = function(){
	//VALORES Y CONSTANTES
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
			console.log(id)
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
				serp.direc = k;
			}
		}
	}
	function collider(p){
		var avanza = false;
		if (typeof(p)=='object'){
			avanza = true;
		}
		else if (typeof(p)=='number' && p==pizza.id){
			pizza = G.pushRandom();
			avanza = 'pizza';
		}
		if (!avanza){
			choca();
		}
		return avanza;
	};
	function avanzaSerpiente(p){
		serp.cabeza = p;
		serp.cuerpo.unshift(p);
		if (!serp.creciendo){
			var c = serp.cuerpo.pop();
			if (!G.remove(c)) console.log('algo va mal');
			serp.culo = serp.cuerpo.pop();
		}
	}
	function avanzaJuego(k){
		miraDireccion(k);
		var x = (serp.direc%2==1)?serp.cabeza.x+serp.direc-2:serp.cabeza.x;
		var y = (serp.direc%2==0)?serp.cabeza.y+serp.direc-1:serp.cabeza.y;
		var p = G.pushXY(x,y);
		var a = collider(p)
		if(a){
			if (a == 'pizza'){
				p = {id: p, x: x, y: y};
			}
			avanzaSerpiente(p);
		}
	}

	//
	//CONTROL
	this.run = function(){
		var k = kc.getKey();
		if (!B.pausa){
			avanzaJuego(k);
			pinta();
			window.requestAnimationFrame(this.run());
		}
	}
	this.prepara = function(){
		P.generaRejilla(G,C.casilla, C.casilla);
		pinta();
		this.run()
	}
}
var J = new Juego();
console.log('juego creado');
J.prepara();
*/
 




document.addEventListener("keydown", controlDeTecla, false);

//Variables basicas del juego
var MAXANCHO = 50,
    MAXALTO = 30;
var intervalRefres;
var controlPillao = false;
var serpiente = {//  AL LORO!! siempre es [y,x]
	idCabeza : [],
	idEstela : [],
	cuerpo : [],
	vel : [],
	seDio : false
};
var pizza = {
	pos : [],
	comida : false,
	comidas : 0
};

//Variables de tuneo del juego
var crece = {
	cuenta : 1,
	fin : 5,
	engorda : 3
};
var caja,
    puntuacion;
var juego = {
	valeChocar : false,
	velocidad : 50,
	puntuar : 5,
	puntuacion: 0,
	ancho : 99,
	alto : 49
};
var body, pantalla, anchura, altura; 


//###########################################################
//#####						Arranque					#####
//###########################################################
//
//funcion que genera el tablero, la serpiente y 1ª pizza (Solo es llamada 1 vez)
//PRIMER PUNTO DE ENTRADA
function generaTablero() {
	controlPillao=true;
	body = document.getElementsByTagName("html")[0];
	pantalla = document.getElementById("pantalla");
	anchura = (pantalla.clientWidth / 10 - (pantalla.clientWidth / 10) % 10);
	altura = (pantalla.clientHeight / 10 - (pantalla.clientHeight / 10) % 10);
	//Tomo las dimensiones del navegador para encajar la pantalla:	
	juego.ancho = (anchura > MAXANCHO) ? MAXANCHO : anchura;
	juego.alto = (altura > MAXALTO) ? MAXALTO : altura;
	caja = document.createElement("div");
	caja.id = 'caja';
	caja.style.width = juego.ancho * 10 + 10 + 'px';
	caja.style.height = juego.alto * 10 + 10 + 'px';
	pantalla.appendChild(caja);
	//coloco los valores del formulario
	document.getElementById("velocidad").value = 115-Math.floor(juego.velocidad/0.7);
	document.getElementById("nacer").value = crece.fin;
	document.getElementById("engorda").value = crece.engorda;
	//genero la rejilla de juego
	for ( i = 0; i <= juego.alto; i++) {
		var fila = document.createElement("div");
		fila.id = "fila";
		caja.appendChild(fila);
		for ( j = 0; j <= juego.ancho; j++) {
			var casilla = document.createElement("div");
			var id = i + ',' + j;
			casilla.id = id;
			casilla.className = "casilla";
			fila.appendChild(casilla);
		}
	}
	puntuacion = document.createElement('p');
	puntuacion.id = 'puntuacion';
	puntuacion.innerHTML = '<i>Puntos:</i> <b>0</b>';
	pantalla.appendChild(puntuacion);
	//Genero la posicion inicial DE LA CABEZA serpiente	(serpiente.idCabeza) y la pizza
	serpiente.idCabeza[0] = Math.round(Math.random() * juego.alto);
	serpiente.idCabeza[1] = Math.round(Math.random() * juego.ancho);
	generaPizza();
	pintaSerpiente();
	controlPillao=false;
	return;
};

function generaPizza() {
	var dentro = true;
	while (dentro) {
		pizza.pos[0] = Math.round(Math.random() * juego.alto);
		pizza.pos[1] = Math.round(Math.random() * juego.ancho);
		//if (serpiente.cuerpo.length != 0)
		if (serpiente.cuerpo.indexOf('' + pizza.pos) == -1)
			dentro = false;
	}
	pintaPizza();
	return;
};

//###########################################################
//#####			Control del ciclo de juego 				#####
//###########################################################
//

//N-PUNTO DE ENTRADA (CADA VEZ QUE SE DA TECLA)
function controlDeTecla(event) {
	var key;
	if (!controlPillao) {
		key = event.keyCode || event.whith;
		switch (key) {
		case 37:
			//Izqd
			if (serpiente.vel[1] != 1) {
				serpiente.vel = [0, -1];
			}
			break;
		case 38:
			//Arrb
			if (serpiente.vel[0] != 1) {
				serpiente.vel = [-1, 0];
			}
			break;
		case 39:
			//Dcha
			if (serpiente.vel[1] != -1) {
				serpiente.vel = [0, 1];
			}
			break;
		case 40:
			//Abjo
			if (serpiente.vel[0] != -1) {
				serpiente.vel = [1, 0];
			}
			break;
		case 80:
			//tecla p
			seDio = true;
			break;
		default:
			
			break;
		//paraJuego();

		}
		if (intervalRefres != 0) {
			paraJuego();
		}
		if ((serpiente.cuerpo.length == 0)&&(serpiente.vel[0]!=0||serpiente.vel[1]!=0)) {//Aun no ha nacido, se establece la estela tras el mov
			naceSerpiente();
		}
		if ((serpiente.cuerpo.length > 0)&&((key == 37) ||(key == 38) ||(key == 39) ||(key == 40))) {
			arrancaJuego();
			controlPillao = true;
		}
		

	}
};

function paraJuego() {
	controlPillao = false;
	window.clearInterval(intervalRefres);
	return;
};

function arrancaJuego() {
	intervalRefres = window.setInterval(actualizaJuego, juego.velocidad);
	return;
};

//###########################################################
//#####			Actualizacion de variables				#####
//#####				(Mover los elementos)				#####
//###########################################################
//
var timut;
function actualizaJuego() {			//llamado con un setInterval
	if (compruebaChoca()) {//choca si da a pared o a si misma
		serpiente.vel = [0, 0];
		//si choca pongo vel a 0
		serpiente.seDio = false;
		caja.style.backgroundColor = 'red';
		timeoutID = window.setTimeout(despintaRojo, 100);
		paraJuego();
		if (!juego.valeChocar){
			//Actualiza puntuacion
			var filas = [].slice.call(document.getElementsByClassName("puntosF"));	
			var puntosP = [].slice.call(document.getElementsByClassName("puntosP"));
			if ((puntosP.length > 0)||(filas.length<10)){
				console.log(puntosP[puntosP.length-1].innerHTML);
				if (puntosP[puntosP.length-1].innerHTML <= juego.puntuacion){
					actualizaPuntuacion();
				}
			}
			else if (juego.puntuacion > 0){
				actualizaPuntuacion();
			}
			timut = window.setTimeout(empiezaPartida, 100);
		}
	} else {
		actualizaSerpiente(compruebaCrece());
	}
	pintaSerpiente();
};

function compruebaChoca() {
	//pongo la nueva posicion:
	serpiente.idCabeza[0] += serpiente.vel[0];
	serpiente.idCabeza[1] += serpiente.vel[1];
	//Si al avanzar se sale del marco, choca
	if ((serpiente.idCabeza[1] > juego.ancho) || (serpiente.idCabeza[1] < 0) || (serpiente.idCabeza[0] > juego.alto) || (serpiente.idCabeza[0] < 0)) {
		serpiente.seDio = true;
	}
	if (serpiente.cuerpo.indexOf('' + serpiente.idCabeza) > 0) {
		serpiente.seDio = true;
	}
	//La dejo como estaba
	serpiente.idCabeza[0] -= serpiente.vel[0];
	serpiente.idCabeza[1] -= serpiente.vel[1];
	return serpiente.seDio;
};

function compruebaCrece() {//La serpiente crece al nacer y al comer.
	if ((serpiente.idCabeza[0] == pizza.pos[0]) && (serpiente.idCabeza[1] == pizza.pos[1])) {//Vemos si ha comido
		crece.fin += crece.engorda;
		calculaPuntos();
		generaPizza();
	}//crece.fin original es lo que crece al nacer
	return crece.cuenta < crece.fin ? true : false;
};

function naceSerpiente(){
	serpiente.idEstela = [serpiente.idCabeza[0] - serpiente.vel[0], serpiente.idCabeza[1] - serpiente.vel[1]];
	serpiente.cuerpo = ['' + serpiente.idEstela, '' + serpiente.idCabeza];
		//Aqui idCabeza hace la funcion de pto de salida
};
function actualizaSerpiente(creciendo) {//Si entra aqui es que no ha chocado, asi que cabeza siempre se actualiza. Si esta creciendo, estela se queda quieta 
	if (serpiente.cuerpo.length == 0) {//Aun no ha nacido, se establece la estela tras el mov
		naceSerpiente();
	}
	serpiente.idCabeza[0] += serpiente.vel[0];
	serpiente.idCabeza[1] += serpiente.vel[1];
	if (creciendo) {//Si crece, añado posiciones al vector
		serpiente.cuerpo[serpiente.cuerpo.length] = '' + serpiente.idCabeza;
		crece.cuenta += 1;
	} else {//Si no crece, avanzo todos los elementos del cuerpo
		for ( i = 1; i < serpiente.cuerpo.length; i++) {
			serpiente.cuerpo[i - 1] = serpiente.cuerpo[i];
		}
		serpiente.cuerpo[serpiente.cuerpo.length - 1] = '' + serpiente.idCabeza;
		serpiente.idEstela = serpiente.cuerpo[0];
	}
	controlPillao = false;
};

function calculaPuntos() {
	pizza.comidas += 1;
	if (juego.valeChocar) {
		juego.puntuacion += 1;
	} else {
		juego.puntuacion += juego.puntuar;
	}
	console.log(juego.puntuacion);
	puntuacion.innerHTML = '<i>Puntos:</i> <b>' + juego.puntuacion + '</b>';
};

//###########################################################
//#####				Pintado de la imagen				#####
//###########################################################
//
function pintaPizza() {
	var come = document.getElementById(pizza.pos);
	come.style.backgroundColor = "#111";
	come.style.borderRadius = "0px";
	return;
};

function pintaSerpiente() {
	var cuerpo = document.getElementById(serpiente.idCabeza);
	cuerpo.style.backgroundColor = "black";
	if (serpiente.idEstela.length != 0) {
		var estela = document.getElementById(serpiente.idEstela);
		estela.style.backgroundColor = '';
		estela.style.borderRadius = "10px";
	}
};

function despintaRojo() {
	caja.style.backgroundColor = '';
	window.clearTimeout(timeoutID);
	return;
}

/*	NOTAS:

 -Los div de la rejilla los almacenamos como id="y,x"
 Los elementos de juego como serpiente.idCabeza=[y,x]
 ->Se puede acceder con getElementById(serpiente.idCabeza)

 - Puedo establecer sucesos en momentos aleatorios generando un numero random y comprobando si es mayor o menor de

 PROBLEMAS:
 - serpiente.idCabeza se pasa por referencia, esta va cambiando y el cuerpo va cambiando
 */

function tomaConf() {
	var velocidad = document.getElementById("velocidad").value;
	if (velocidad != juego.velocidad){
		juego.puntuar = Math.floor(document.getElementById("velocidad").value / 10);
	}
	juego.velocidad = Math.floor((-velocidad + 115) * 0.7);
	crece.engorda = parseInt(document.getElementById("engorda").value, 10);
	if (crece.engorda > 10) {
		crece.engorda = 10;
	}
	if (crece.engorda < 1) {
		crece.engorda = 1;
	}
	crece.fin = parseInt(document.getElementById("nacer").value, 10);
	if (crece.fin > 50) {
		crece.fin = 50;
	}
	if (crece.fin < 1) {
		crece.fin = 1;
	}
	var radios = document.getElementsByName('valeChocar');
	juego.valeChocar = radios[0].checked;
}

function inicializaVariables(){
	serpiente.idCabeza = [];
	serpiente.idEstela = [];
	serpiente.cuerpo = [];
	serpiente.vel = [];
	serpiente.seDio = false;
	pizza.pos = [];
	pizza.comida = false;
	pizza.comidas = 0;
	crece.cuenta = 1;
	juego.valeChocar = false;
	juego.puntuar = 5;
	juego.puntuacion = 0;
}
function empiezaPartida() {
	
	console.log('cambio de: '+juego.puntuacion);
	//pongo valores por defecto
	tomaConf();
	inicializaVariables();
	
	console.log('a: '+juego.puntuacion);
	//var pantalla = caja.parentNode;
	pantalla.removeChild(caja);
	pantalla.removeChild(puntuacion);
	//Me queda inicializar las variables;
	generaTablero();
}


/*##########################################################################
 * ################# 		AJAX PA PUNTOS			########################
 * #######################################################################*/


//objeto HTTP_REQUEST
http_request = false;
if (window.XMLHttpRequest) {
	var ajax = new XMLHttpRequest();
	//Variable global 'ajax' pa ajax
}

function actualizaPuntuacion () {
	ajax.open('POST', "../control/controlPuntos.php", true);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var envia = "juego=snake&modo=std&puntos=" + juego.puntuacion;
	ajax.send(envia);
};

var result;
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4) {
		result = ajax.responseText;
		respuesta = JSON.parse(result);
		console.log("ha respondio: " + result + " \nTranspot es: " + ajax);
		if ((ajax.status == 200)&&(respuesta != 'Error')) {					//A meter el nuevo registro de puntos
			actualizaTablero(respuesta);									
		} else {
			result = respuesta.responseText;
			console.log("ha respondio MAL! " + result);
		}
	}
};

function actualizaTablero(tablaPuntos){
	var tbody = document.getElementById('tablaPuntosBody');			
	var filas = document.getElementsByClassName("puntosF");			
	var puntosU = [].slice.call(document.getElementsByClassName("puntosU"));
	var puntosP = [].slice.call(document.getElementsByClassName("puntosP"));
	console.log(puntosU);
	console.log(puntosP);
	if ((filas.length<tablaPuntos.length)||(tablaPuntos.length == 0)){
		var cajaP = document.createElement('td');		//Generacion del tr nuevo a insertar en los puntos
		cajaP.className = 'puntosP';
		puntosP.push(cajaP);
		var cajaN = document.createElement('td');
		cajaN.className = 'puntosU';
		puntosU.push(cajaN);
		var fila = document.createElement('tr' );
		fila.appendChild(cajaN);
		fila.appendChild(cajaP);
		fila.id = 'puntos'+	tablaPuntos.length;
		fila.className = 'puntosF';
		tbody.appendChild(fila);
	}
	for (var i=0; i<tablaPuntos.length; i++){				//insercion de lo obtenido en la consulta
		puntosU[i].innerHTML = tablaPuntos[i].usuario;
		puntosP[i].innerHTML = tablaPuntos[i].puntos;
	}
}












