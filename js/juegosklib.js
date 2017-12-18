/*
	Rejilla: snake, pacman, tetris
	Continuo: arkanoid, naves

*/
var log = {
		grid : true,
		controlTeclado : true
	}
/** Codigos de respuesta:
 *		null: fuera de la rejilla
 *		-1: id erroneo
 * 		true: ok
 *		false: no se pudo
 */
var Grid = function(wi, he){
	var log = log && log.grid;
	if (wi==null || he==null || w != null) return null;
	//
	//MODEL
	var w = wi;
	var h = he;
	var id = 0;	
	var population = 0;
	var Id = function(){
		return ++id;
	};
	var Punto = function(x, y){
		this.id = Id();
		this.x = x;
		this.y = y;
		this.toString = function(){
			return '{id: '+id+', x: '+x+', y: '+y+'}';
		}
	};
	function generaRejilla(){
		var grid = [];
		for (var i=0; i<h; i++){
			grid.push(new Array(w));
		}
		return grid;
	};
	var grid = generaRejilla();

	//
	//CRUD
	this.pushXY = function(x, y){
		if (this.log) console.log('pushxy '+x+' '+y);
		//ok retun pt, ocupado return id
		if (x<0 || x>=w || y<0 || y>=h) return null;
		if (grid[y][x]==null){
			var pt = new Punto(x,y);
			grid[y][x] = pt.id;
			++population;
			return pt;
		}
		return grid[y][x];
	};
	this.pushPt = function(pt){
		if (this.log) console.log('pushPt '+pt.toString());
		//ok retun pt, ocupado return id
		if (pt.x<0 || pt.x>=w || pt.y<0 || pt.y>=h) return null;
		if (grid[pt.y][pt.x]==null){
			grid[pt.y][pt.x] = pt.id;
			++population;
			return true;
		}
		return grid[pt.y][pt.x];
	};
	this.remove = function(pt){
		if (log) console.log('remove '+pt.toString());
		if (pt.x<0 || pt.x>=w || pt.y<0 || pt.y>=h) return null;
		if (grid[pt.y][pt.x]==pt.id){
			grid[pt.y][pt.x]=null;
			--population;
			return true;
		}
		return -1;
	};
	this.replace = function(pin, pot){
		if (log) console.log('replace '+pin.toString()+' '+pot.toString());
		if (pt.x<0 || pt.x>=w || pt.y<0 || pt.y>=h) return null;
		if (grid[pot.y][pot.x]==pot.id){
			grid[pot.y][pot.x]==pin.id;
			return true;
		}
		return -1;
	};
	this.getId = function(x,y){
		if (x<0 || x>=w || y<0 || y>=h) return null;
		return grid[y][x];
	};
	this.getPos = function(id){
		for (var i=0; i<h; i++){
			for (var j=0; j<w; j++){
				if (grid[i][j]==id){
					return {x: j, y: i};
				}
			}
		}
		return null;
	}
	this.getPt = function(id){
		var p = this.getPos(id);
		var r = null;
		if (p != null){
			r = {
				id : id,
				x : p.x,
				y : p.y,
				toString : function(){
					return '{id: '+id+', x: '+x+', y: '+y+'}';
				}
			}
		}
		return r;
	}
	this.getGrid = function(){
		return grid;
	};
	this.getW = function(){
		return w;
	};
	this.getH = function(){
		return h;
	};
	this.getLastId = function(){
		return id;
	};
	this.getPopulation = function(){
		return population;
	};

	//
	//COLLIDERS
	function colliderPos(p,cond,x,y){
		if (p.x<0 || p.x>=w || p.y<0 || p.y>=h) return null;
		if (x<0 || x>=w || y<0 || y>=h) return null;
		if (grid[p.y][p.x]!=p.id) return -1;
		if (cond){
			if (grid[y][x] == null){
				grid[p.y][p.x] = null;
				grid[y][x]   = p.id;
				return true;
			}
			return grid[p.y][x];
		}
		return false;
	};
	this.pLeft = function(p, dx){
		var dx = ((dx)? Math.abs(dx) : 1);
		return colliderPos(p.x>0, p, p.x-dx, p.y);
	};
	this.pRight = function(p, dx){
		var dx = ((dx)? Math.abs(dx) : 1);
		return colliderPos(p.x<w, p, p.x+dx, p.y);
	};
	this.pUp = function(p, dy){
		var dy = ((dy)? Math.abs(dy) : 1);
		return colliderPos(p.y>0, p, p.x, p.y-dy);
	};
	this.pDown = function(p, dy){
		var dy = ((dy)? Math.abs(dy) : 1);
		return colliderPos(p.y<h, p, p.x, p.y+dy);
	};

	//
	//UTILES
	this.pushRandom = function(){
		if (log) console.log('push random');
		if ((population/(w*h))>0.6){
			var lista = this.getEmpty();
		}
		if (!lista){
			var search = true, sec=0;
			while(search){
				var x = Math.floor(Math.random()*w);
				var y = Math.floor(Math.random()*h);
				var o = this.pushXY(x,y);
				if (typeof(o)=='object') return o;
				if (++sec >10000) return false;
			}
		}
		else if (lista.length>0){
			var i = Math.floor(Math.random()*lista.length);
			var p = lista[i];
			var o = this.pushXY(p.x, p.y);
			if (typeof(o)=='object') return o;
		}
		return false;
	};
	this.getEmpty = function(){
		var lista = [];
		for (var i=0; i<h; i++){
			for (var j=0; j<w; j++){
				if (grid[i][j]==null){
					lista.push({x: j, y:i});
				}
			}
		}
		return lista;
	};
	this.getItems = function(){
		var lista = [];
		for (var i=0; i<h; i++){
			for (var j=0; j<w; j++){
				if (grid[i][j]!=null){
					lista.push({id: grid[i][j], x: j, y:i});	
				} 
			}
		}
		return lista;	
	};
};

class PuntoXYconVelocidad(){
	var x;
	var y;
	var vx = 0;
	var vy = 0;
	var r = 0;
	constructor(x, y){
		this.x = x;
		this.y = y;
	};
	constructor(x, y, vx, vy){
		constructor(x, y);
		this.vx = vx;
		this.vy = vy;
	};
	constructor(x, y, vx, vy, r){
		constructor(x, y, vx, vy);
		this.r = r;
	};
	function avanzaEnX(){
		this.x += this.vx;
	}
	function avanzaEnY(){
		this.y += this.vy;
	}
	this.avanza(){
		avanzaEnX();
		avanzaEnY();
	}
	this.getX = function(){
		return this.x;
	}
	this.setX = function(x){
		this.x = x;
	}
	this.getY = function(){
		return this.y;
	}
	this.setY = function(y){
		this.y = y;
	}
	this.getR = function(){
		return this.r;
	}
	this.setR = function(r){
		this.r = r;
	}
	this.getVx = function(){
		return this.vx;
	}
	this.setVx = function(vx){
		this.vx = vx;
	}
	this.getVy = function(){
		return this.vy;
	}
	this.setVy = function(vy){
		this.vy = vy;
	}
}
class GestorPuntosXY(){
	var alto;
	var ancho;
	var puntos;
	constructor(alto, ancho){
		this.alto = alto;
		this.ancho = ancho;
		this.puntos = [];
	}
	this.addPunto = function(id, x, y){
		puntos.push(new PuntoXYconVelocidad(x, y));
	}
}

/*	Almacena en key el valor de la ultima pulsacion
 * Se codifica 0,1,2,3 para N,E,S,O respectivamente.
 * Tambien tiene un booleano para tecla pulsada
 */
var ControlTeclado = function(event) {
	var log = log && log.controlTeclado;
	this.pausaHabilit = true;
	var pausa,
		pressing = false,
		key = undefined,
		last;

	this.getKey = function(){
		return key;
	};
	this.pausa = function(){
		return pausa;
	};
	this.para = function(){
		pausa = true;
	}
	this.continua = function(){
		pausa = false;
	}
	this.teclaPulsada = function(event){
		var k = (event)?event.keyCode || event.which : undefined;
		if (log) console.log(k);
		if (!pausa) {
			function N() { key = 0;};
			function E() { key = 1;};
			function S() { key = 2;};
			function O() { key = 3;};
			function B() { key = 'B';};
			function P() { 
				pausa = this.pausaHabilit;
			}
			var teclas = {
				32 : B,     //Bar
				37 : E,		//right
				38 : N,		//up
				39 : O,		//left
				40 : S,		//down
				65 : O,		//A
				68 : E,		//D
				80 : P,		//P
				83 : S,		//S
				87 : N,  	//W
			};
			teclas[k]();
		}
		else if(pausa && k == 80){
			pausa = false;
		}
		last = key;
	}
};


var kc = new ControlTeclado();
	document.addEventListener("keydown", kc.teclaPulsada, false);