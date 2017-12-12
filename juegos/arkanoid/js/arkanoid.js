  //
 // VARIABLES GLOBALES
//
var PROPORCION = 0.625,
	MAXANCHO = 800,
	MAXALTO = MAXANCHO * PROPORCION;
var pausaJuego = true,
	nivelSuperado = false;
var alto, ancho;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//variables para elementos del juego
var PathBarra = new Path2D();
var PathBola = new Path2D();
var vidas = 3;
var barra ={ 
	x: 0,	y: 0, w: 0, h: 0, v: 0, v0: 0
};			
var bola = { 
	x:  0,	y:  0, vx: 0, vy: 0, v0: 0, r:  0	
};
var cajas = {
	x:  0, y:  0, w:  0, h:  0, nw: 0, nh: 0 
};
var ladrillos = [];


//###########################################################
//#####			Inicializacion de variables				#####
//###########################################################
//
class Inicializa {
	constructor() {
		var barraPantallaPropocionW = 7;
		var barraPantallaPropocionH = 50;
		var ladrilloPantallaProporcionW = 16;
		var ladrilloPantallaProporcionH = 20;
		var velocidadEnPropLadoMinimo = 60;
 	
		function inicializaPantalla(){
			var anchoDefecto = window.innerWidth*0.7;
			var altoDefecto = anchoDefecto*PROPORCION;
			alto = altoDefecto > MAXALTO
				? MAXALTO
				: altoDefecto;
			ancho = anchoDefecto > MAXANCHO
				? MAXANCHO
				: anchoDefecto;
			canvas.height = alto;
			canvas.width = ancho;
		}
		function inicializaBarra(){
			barra.w = ancho/barraPantallaPropocionW; 
			barra.h = alto/barraPantallaPropocionH;
			barra.x = canvas.width/2 - barra.w/2; 
			barra.y = canvas.height - 2*barra.h; 
			barra.v = 0;  	
		}
		function inicializaBola(){
			bola.r = barra.h*0.7;
			bola.x = canvas.width/2;
			bola.y = barra.y-bola.r;
			bola.vx = 0;	
			bola.vy = 0;
		}
		function inicializaVelocidades(){
			var ladoMinimo = alto < ancho 
				? alto 
				: ancho;
			barra.v0 = ladoMinimo/velocidadEnPropLadoMinimo;
			bola.v0 = ladoMinimo/velocidadEnPropLadoMinimo;
		}
		function inicializaLadrillos(){
			cajas.w = ancho/ladrilloPantallaProporcionW;
			cajas.h = alto/ladrilloPantallaProporcionH;
			cajas.nw = ladrilloPantallaProporcionW - 2;
			cajas.nh = 6;
			cajas.x = (ancho - (cajas.w * cajas.nw))/2
			cajas.y = alto * 0.15;
			cargaMatrizLadrillos();
		}
		function cargaMatrizLadrillos(){
			ladrillos = [];
			for (var i=0; i<cajas.nw; i++){
				var dureza = cajas.nh/2;
				for (var j=0; j<cajas.nh; j++){
					dureza = dureza - (j+1)%2;					 //Valido para altura 6
					var ladrillo = {
						x : cajas.x+cajas.w*i,
						y : cajas.y+cajas.h*j,
						w : cajas.w,
						h : cajas.h,
						d : dureza
					};
					ladrillos.push(ladrillo);
				}
			}
			return;
		};
		this.inicializaTodo = function(){
			inicializaPantalla();
			inicializaBarra();
			inicializaBola();
			inicializaVelocidades();
			inicializaLadrillos();
			return;
		};
		this.inicializaVida = function(){
			inicializaBarra();
			inicializaBola();
			inicializaVelocidades();
			return;
		};
	}
}
var ini = new Inicializa();
ini.inicializaTodo();
//Construyo ladrillos

//###########################################################
//#####			Control del ciclo de juego 				#####
//###########################################################
//

class Control {
	constructor() {
		function reiniciaJuego(){
			vidas = 3;
			ini.inicializaTodo();
			ctrl.control();
		};
		function empiezaTurno(){
			arrancaBola();
			pausaJuego = false;
			ctrl.control();
		}
		function arrancaBola(){
			var direcc = Math.random()*Math.PI/3+Math.PI/3;
			bola.vx = bola.v0 * Math.cos(direcc);
			bola.vy = -bola.v0 * Math.sin(direcc);
		}
		this.control = function(){
			pinta();
			if ((apretandoIzq || apretandoDch)){	
				actualizaBarra();
			}
			if (!pausaJuego){
				actualizaBola();
				window.requestAnimationFrame(ctrl.control);
			}
			else {
				mensajea();
			}
		};
		this.mueveDcha = function(){
			apretandoDch = true;
			barra.v = barra.v0;	
		};
		this.mueveIzq = function(){
			apretandoIzq = true;
			barra.v = -barra.v0;
		};
		this.accionDeBarra = function(){
			if (vidas == 0){
				reiniciaJuego();
			} else {
				empiezaTurno();
			}
		};
		this.pausa = function(){
			if (pausaJuego && (bola.vx != 0 || bola.vy != 0)){
				pausaJuego = false;
				ctrl.control();
			} else {
				pausaJuego = true;
			}
		};
		this.perdiste = function(){
			vidas -= 1;
			pausaJuego = true;
			ini.inicializaVida();
		}	
		this.ganaste = function(){
			pausaJuego = true;
			nivelSuperado = true;
			mensajea();
		}
	}
}
var ctrl = new Control();

		

function mensajea(){
	if (vidas == 0){
		pausaJuego = true;
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.font = canvas.width*108/1000+"px serif";
		ctx.fillText("GAME", canvas.width*300/1000, canvas.height*200/500);
		ctx.font = canvas.width*108/1000+"px serif";
		ctx.fillText("OVER", canvas.width*310/1000, canvas.height*310/500);
	}
	else if (bola.vy == 0){
		ctx.font = canvas.width*48/1000+"px serif";
		ctx.strokeText("Vidas:", canvas.width*430/1000, canvas.height*300/500);
		ctx.font = canvas.width*88/1000+"px serif";
		ctx.strokeText(vidas, canvas.width*475/1000, (canvas.height*300/500)+canvas.width/10);
	}
	else if (nivelSuperado){
		ctx.font = canvas.width*88/1000+"px serif";
		ctx.strokeText("¡Nivel superado!", canvas.width*120/1000, canvas.height*400/500);
	}
	else if (pausaJuego){
		ctx.font = canvas.width*88/1000+"px serif";
		ctx.strokeText("PAUSA", canvas.width/3, canvas.height*400/500);
	}
	return;
};



//###########################################################
//#####			Actualizacion de variables				#####
//#####				(Mover los elementos)				#####
//###########################################################
//
function actualizaBarra(){
	barra.x += barra.v;
	if ((barra.x+barra.w>canvas.width) || (barra.x<0)){ //Si choca,
		if (barra.v>0){								// Pongo la barra en 
			barra.x = canvas.width-barra.w-1;		// el extremo adecuado.
		}
		if (barra.v<0){
			barra.x = 0;				
		}
		barra.v = 0;									// y pongo vel a 0.
	}
	return;
}

function actualizaBola(){
	bola.x += bola.vx;
	bola.y += bola.vy;
	//Rebotes en paredes
	if (bola.y <= bola.r) {								//	Si la bola da al techo o se pasa
		bola.y = bola.r;								// la dejo en el techo (como mucho)	
		bola.vy = -bola.vy;								// e invierto su velocidad
	}
	if (bola.x<=bola.r) {								// Si pega en la izq o se pasa
		bola.x = bola.r;								// la dejo como mu lejos en la pared
		bola.vx = -bola.vx;								// e invierto su velocidad
	}
	if (bola.x + bola.r >= canvas.width) {						// Idem
		bola.x = canvas.width-bola.r;
		bola.vx = -bola.vx;
	}
	//Si choca con la barra		
	if (bola.y+bola.r>=barra.y && bola.y < barra.y && bola.x>barra.x && bola.x<barra.x+barra.w){
		if (bola.vy > 0){ //esta bajando				//Si rebota en la barra
			bola.y = barra.y - bola.r;					//la coloco en lugar adecuado
		}
		//Cambio de direccion de la bola
		/* Segun cuanto del extremo choca, redistribuyo su velocidad en x */
		var centro = barra.x + barra.w/2;
		var grados = Math.abs(bola.x - centro) - 90;			//Cutre ñapa. solo vale para barra.w=120
		var radianes = (Math.PI/180)*grados;
		bola.vx = bola.v0 * Math.cos(radianes);
		bola.vy = bola.v0 * Math.sin(radianes);
		if (bola.x < centro){
			bola.vx = -bola.vx;
		}
	}
	//Rebote con ladrillos
	//if (bola.y < canvas.height/2){
		actualizaLadrillos();
	//}
	//Perdida de juego
	if (bola.y-2*bola.r>canvas.height){
		ctrl.perdiste();		
	}
	return;
}

function actualizaLadrillos(){
	for (var i=0; i<ladrillos.length; i++){
		//choque en paredes
		var tocaArriba =  ((bola.vy<0)&&	
			(bola.y-bola.r<=ladrillos[i].y+ladrillos[i].h)&&(bola.y-bola.r>ladrillos[i].y)&&
			(bola.x+bola.r/2>ladrillos[i].x)&&(bola.x-bola.r/2<ladrillos[i].x+ladrillos[i].w));
		var tocaAbajo = ((bola.vy>0)&&
			(bola.y+bola.r>=ladrillos[i].y)&&(bola.y+bola.r<ladrillos[i].y+ladrillos[i].h)&&
			(bola.x+bola.r/2>ladrillos[i].x)&&(bola.x-bola.r/2<ladrillos[i].x+ladrillos[i].w));
		var tocaIzq = ((bola.vx<0)&&
			(bola.x-bola.r>ladrillos[i].x)&&(bola.x-bola.r<=ladrillos[i].x+ladrillos[i].w)&&
			(bola.y+bola.r/2>=ladrillos[i].y)&&(bola.y-bola.r/2<=ladrillos[i].y+ladrillos[i].h));
		var tocaDcha = ((bola.vx>0) &&
			(bola.x+bola.r>=ladrillos[i].x)&&(bola.x+bola.r<ladrillos[i].x+ladrillos[i].w)&&
			(bola.y+bola.r/2>=ladrillos[i].y)&&(bola.y-bola.r/2<=ladrillos[i].y+ladrillos[i].h));

		else if (tocaArriba || tocaAbajo){
			choca(i,false,true);
			break;
		}
		else if (tocaDcha || tocaIzq){
			choca(i,true,false);
			break;
		}
	}
}
function choca(i,x,y){
	//console.log('ladris = ' + ladrillos.length + ' Dureza: '+ladrillos[i].d);
	if (ladrillos[i].d <= 0){	//Quito o degrado ladrillo
		var l = ladrillos.length;
		ladrillos.splice(i,1);
	}
	else {
		ladrillos[i].d -= 1;
	}
	if (ladrillos.length == 0)	//Compurebo acabo
		ctrl.ganaste();
	if (y)				//Reboto
		bola.vy = -bola.vy;
	if (x)
		bola.vx = -bola.vx;
	return;
}

//###########################################################
//#####				Pintado de la imagen				#####
//###########################################################
//
function pinta(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";

	PathBola = new Path2D();
	PathBola.arc(bola.x, bola.y,bola.r,0, 2*Math.PI);
	ctx.fill(PathBola);

	PathBarra = new Path2D();
	PathBarra.rect(barra.x,barra.y,barra.w,barra.h);
	PathBarra.lineCap = 'round';
	ctx.fill(PathBarra);

	for (var i=0; i<ladrillos.length; i++){
		ctx.fillStyle = "#000000";
		ctx.fillRect(ladrillos[i].x,ladrillos[i].y,ladrillos[i].w,ladrillos[i].h);
		var k = 9-Math.floor(ladrillos[i].d*20/cajas.nh);
		ctx.fillStyle = "#"+k+k+k;
		ctx.fillRect(ladrillos[i].x+1,ladrillos[i].y+1,ladrillos[i].w,ladrillos[i].h);
	}
	return;
}

//###########################################################
//#####				   Control de Teclado				#####
//###########################################################
//
apretandoIzq = false;
apretandoDch = false;

document.addEventListener("keydown",aprietaTecla,false);
document.addEventListener("keyup",sueltaTecla,false);

function aprietaTecla(evt) {
	if (evt.keyCode == 39 && !apretandoDch) {
		ctrl.mueveDcha();
	}
	else if (evt.keyCode == 37 && !apretandoIzq) {
		ctrl.mueveIzq();
	}
	else if (evt.keyCode == 32 && bola.vy == 0){
		ctrl.accionDeBarra();
	}
	else if (evt.keyCode == 80){
		// Tecla p
		ctrl.pausa();
	}
	return;
};

function sueltaTecla(evt) {
  	if (evt.keyCode == 39) {
  		apretandoDch = false;
  	}
  	else if (evt.keyCode == 37) {
  		apretandoIzq = false;
  	}
  	return;
};