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
var Grid = function(w, h){
	//
	//MODEL
	this.w = w;
	this.h = h;
	this.id = 0;	
	var Id = function(){
		return ++this.id;
	};
	var Punto = function(x, y){
		this.x = x;
		this.y = y;
	}
	function generaRejilla(){
		var grid = [];
		for (var i=0; i<h; i++){
			grid.push(new Array(w));
		}
		return grid;
	}
	this.grid = generaRejilla();

	//
	//CRUD
	this.push = function(x, y){
		//ok retun pt, ocupado return id
		if (x<0 || x>this.w || y<0 || y>this.h) return null;
		if (this.grid[x][y]==null){
			var pt = new Punto(x,y);
			this.grid[y][x] = pt.id;
			return pt;
		}
		return this.grid[x][y];
	};
	this.remove = function(pt){
		if (pt.x<0 || pt.x>this.w || pt.y<0 || pt.y>this.h) return null;
		if (this.grid[pt.y][pt.x]==pt.id){
			this.grid[pt.y][pt.x]=null;
			return true;
		}
		return -1;
	};
	this.replace = function(pin, pot){
		if (pt.x<0 || pt.x>this.w || pt.y<0 || pt.y>this.h) return null;
		if (this.grid[pot.y][pot.x]==pot.id){
			this.grid[pot.y][pot.x]==pin.id;
			return true;
		}
		return -1;
	};
	this.getId = function(x,y){
		if (x<0 || x>this.w || y<0 || y>this.h) return null;
		return this.grid[y][x];
	}
	this.getGrid = function(){
		return this.grid;
	}
	this.getW = function(){
		return this.w;
	}
	this.getH = function(){
		return this.h;
	}

	//
	//COLLIDERS
	function colliderPos(p,cond,x,y){
		if (p.x<0 || p.x>this.w || p.y<0 || p.y>this.h) return null;
		if (x<0 || x>this.w || y<0 || y>this.h) return null;
		if (this.grid[p.y][p.x]!=p.id) return -1;
		if (cond){
			if (this.grid[y][x] == null){
				this.grid[p.y][p.x] = null;
				this.grid[y][x]   = p.id;
				return true;
			}
			return this.grid[p.y][x];
		}
		return false;
	}
	this.pLeft = function(p, dx){
		var dx = ((dx)? Math.abs(dx) : 1);
		return colliderPos(p.x>0, p, p.x-dx, p.y);
	}
	this.pRight = function(p, dx){
		var dx = ((dx)? Math.abs(dx) : 1);
		return colliderPos(p.x<this.w, p, p.x+dx, p.y);
	}
	this.pUp = function(p, dy){
		var dy = ((dy)? Math.abs(dy) : 1);
		return colliderPos(p.y>0, p, p.x, p.y-dy);
	}
	this.pDown = function(p, dy){
		var dy = ((dy)? Math.abs(dy) : 1);
		return colliderPos(p.y<this.h, p, p.x, p.y+dy);
	}
};
