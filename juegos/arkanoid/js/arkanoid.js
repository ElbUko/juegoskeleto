  //
 // VARIABLES GLOBALES
//
var MAXANCHO = 800,
	MAXALTO = 500;
var pausaJuego = true,
	nivelSuperado = false;
var alto, ancho;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//variables para elementos del juego
var PathBarra = new Path2D();
var PathBola = new Path2D();
//Constantes de dimensiones
var barraPantallaPropocionW = 7;
var barraPantallaPropocionH = 50;
var ladrilloPantallaProporcionW = 16;
var ladrilloPantallaProporcionH = 20;
var velocidadEnPropLadoMinimo = 60;
//valores de juego
var velocidadDeBarra = 0;
var velocidadDeBola = 0;
var vidas = 3;
var barra ={ 
	x: 0,	y: 0, w: 0, h: 0, v: 0	
};			
var bola = { 
	x:  0,	y:  0, vx: 0, vy: 0, r:  0	
};
var cajas = {
	x:  0, y:  0, w:  0, h:  0, nw: 0, nh: 0 
};
var ladrillos = [];

function inicializaTodo(){
	inicializaPantalla();
	inicializaBarra();
	inicializaBola();
	inicializaVelocidades();
	inicializaLadrillos();
	return;
};
function inicializaVida(){
	inicializaBarra();
	inicializaBola();
	inicializaVelocidades();
	return;
};
function inicializaPantalla(){
	var altoDefecto = window.innerHeight*0.9;
	var anchoDefecto = window.innerWidth*0.6;
	alto = altoDefecto > MAXALTO
		? MAXALTO
		: altoDefecto;
	ancho = anchoDefecto > MAXANCHO
		? MAXANCHO
		: anchoDefecto;
	canvas.height = alto;
	canvas.width = ancho;
}
function inicializaVelocidades(){
	var ladoMinimo = alto < ancho 
		? alto 
		: ancho;
	velocidadDeBarra = ladoMinimo/velocidadEnPropLadoMinimo;
	velocidadDeBola = ladoMinimo/velocidadEnPropLadoMinimo;
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
function inicializaLadrillos(){
	var anchuraLadrillo = ancho/ladrilloPantallaProporcionW;
	var alturaLadrillo = alto/ladrilloPantallaProporcionH;
	var numeroLadrillosAncho = ladrilloPantallaProporcionW - 2;
	cajas.w = anchuraLadrillo;
	cajas.h = alturaLadrillo;
	cajas.nw = numeroLadrillosAncho;
	cajas.nh = 6;
	cajas.x = (ancho - (anchuraLadrillo * numeroLadrillosAncho))/2
	cajas.y = alto * 0.15;
	
	cargaMatrizLadrillos();
}
inicializaTodo();

//Construyo ladrillos

//###########################################################
//#####			Control del ciclo de juego 				#####
//###########################################################
//
function control(){
	pinta();
	if ((pressingL || pressingR)){	//Si estas apretando mueves barra
		actualizaBarra();
	}
	if (!pausaJuego){
		actualizaBola();
		window.requestAnimationFrame(control);
	}
	else {
		mensajea();
	}
	return;
};		
function perdiste(){
	vidas -= 1;
	pausaJuego = true;
	inicializaVida();
	return;
};	
function ganaste(){
	pausaJuego = true;
	nivelSuperado = true;
	mensajea();
	return;
}

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
		bola.vx = Math.cos(radianes)*velocidadDeBola;
		bola.vy = Math.sin(radianes)*velocidadDeBola;
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
		perdiste();		
	}
	return;
}

function actualizaLadrillos(){
	for (var i=0; i<ladrillos.length; i++){
		//choque en paredes
		if ((bola.vy<0)&&			//Va parriba
			(bola.y-bola.r<=ladrillos[i].y+ladrillos[i].h)&&(bola.y-bola.r>ladrillos[i].y)&&
			(bola.x+bola.r/2>ladrillos[i].x)&&(bola.x-bola.r/2<ladrillos[i].x+ladrillos[i].w)){
				choca(i,false,true);
				break;
		}
		if ((bola.vy>0)&& 					//Esta bajando
			(bola.y+bola.r>=ladrillos[i].y)&&(bola.y+bola.r<ladrillos[i].y+ladrillos[i].h)&&
			(bola.x+bola.r/2>ladrillos[i].x)&&(bola.x-bola.r/2<ladrillos[i].x+ladrillos[i].w)){
				choca(i,false,true);
				break;
		}					
		if ((bola.vx<0)&&			//Va a izq y pega el extremo izq de la bola con la pared dcha del ladrillo
			(bola.x-bola.r>ladrillos[i].x)&&(bola.x-bola.r<=ladrillos[i].x+ladrillos[i].w)&&
			(bola.y+bola.r/2>=ladrillos[i].y)&&(bola.y-bola.r/2<=ladrillos[i].y+ladrillos[i].h)){
				choca(i,true,false);
				break;
		}
		if ((bola.vx>0) &&			//Alreves
			(bola.x+bola.r>=ladrillos[i].x)&&(bola.x+bola.r<ladrillos[i].x+ladrillos[i].w)&&
			(bola.y+bola.r/2>=ladrillos[i].y)&&(bola.y-bola.r/2<=ladrillos[i].y+ladrillos[i].h)){
				choca(i,true,false);
				break;
		}
	}
	return;
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
		ganaste();
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
pressingL = false;
pressingR = false;

document.addEventListener("keydown",aprietaTecla,false);
document.addEventListener("keyup",sueltaTecla,false);

function aprietaTecla(evt) {
	if (evt.keyCode == 39 && !pressingR) {	//Dcha
		pressingR = true;
		barra.v = velocidadDeBarra;	
	}
	else if (evt.keyCode == 37 && !pressingL) {	//Izq
		pressingL = true;
		barra.v = -velocidadDeBarra;
	}
	else if (evt.keyCode == 32 && bola.vy == 0){ //Barra esp
		if (vidas == 0){
			vidas = 3;
			inicializaTodo();
			control();
		}
		else {
			var direcc = Math.random()*Math.PI/3+Math.PI/3;
			bola.vx = velocidadDeBola*Math.cos(direcc);
			bola.vy = -velocidadDeBola*(Math.sin(direcc));
			pausaJuego = false;
			control();
		}
	}
	else if (evt.keyCode == 80){ // Tecla p
		if (pausaJuego){
			pausaJuego = false;
			control();
		}
		else {
			pausaJuego = true;
		}
	}
	return;
};

function sueltaTecla(evt) {
  	if (evt.keyCode == 39) {
  		pressingR = false;
  	}
  	else if (evt.keyCode == 37) {
  		pressingL = false;
  	}
  	return;
};