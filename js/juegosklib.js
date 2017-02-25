/*
	Rejilla: snake, pacman, tetris
	Continuo: arkanoid, naves

*/

/** Codigos de respuesta:
 *		null: fuera de la rejilla
 *		-1: id erroneo
 * 		true: ok
 *		false: no se pudo
 */
var Grid = function(wi, he){
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
		//ok retun pt, ocupado return id
		if (x<0 || x>w || y<0 || y>h) return null;
		if (grid[y][x]==null){
			var pt = new Punto(x,y);
			grid[y][x] = pt.id;
			++population;
			return pt;
		}
		return grid[y][x];
	};
	this.pushPt = function(pt){
		//ok retun pt, ocupado return id
		if (pt.x<0 || pt.x>w || pt.y<0 || pt.y>h) return null;
		if (grid[pt.y][pt.x]==null){
			grid[pt.y][pt.x] = pt.id;
			++population;
			return true;
		}
		return grid[pt.y][pt.x];
	};
	this.remove = function(pt){
		if (pt.x<0 || pt.x>w || pt.y<0 || pt.y>h) return null;
		if (grid[pt.y][pt.x]==pt.id){
			grid[pt.y][pt.x]=null;
			--population;
			return true;
		}
		return -1;
	};
	this.replace = function(pin, pot){
		if (pt.x<0 || pt.x>w || pt.y<0 || pt.y>h) return null;
		if (grid[pot.y][pot.x]==pot.id){
			grid[pot.y][pot.x]==pin.id;
			return true;
		}
		return -1;
	};
	this.getId = function(x,y){
		if (x<0 || x>w || y<0 || y>h) return null;
		return grid[y][x];
	};
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
		if (p.x<0 || p.x>w || p.y<0 || p.y>h) return null;
		if (x<0 || x>w || y<0 || y>h) return null;
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
var g = new Grid(3,3);