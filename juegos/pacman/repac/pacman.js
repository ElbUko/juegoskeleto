/**
 * 
 */

var juego = function() {
	var ctx,
		relAspect,
		mapa,
		cols,
		fils,
		relAspecto,
		c = {
			relAspecto : 30
		};

	var pintado = function(){
		this.limpiaPantalla = function(){
			this.ctx.clearRect(0,0, this.cols, this.filas);
		}		
	};
	
	var p = new pintado();
	
	//CONSTRUCTOR
	this.cargaMapa = function(mapa, relAspecto){
		this.relAspecto = relAspecto 
			? relAspecto 
			: c.relAspecto;
		if (mapa == undefined || 
			mapa[0] == undefined || 
			mapa[0][0] == undefined){
			return undefined;
		}
		this.mapa = mapa;
		this.filas = mapa.length;
		this.cols = mapa[0].length;
		this.relAspecto = relAspecto
		var canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
	}
	
	this.arranca = function(){
		pint.limpiaPantalla();
	}
}

function nuevoJuego(mapa){
	var j = new juego();
	j.cargaMapa(mapa);
	j.arranca();
}

nuevoJuego([[1,1,1,1,1,1],[11,1,1,1,1,1]]);