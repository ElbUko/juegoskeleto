/**
 * 
 */

var juego = function() {
	var ctx,
		relAspect,
		mapa,
		anchoTotalPx,
		altoTotalPx,
		anchoPx,
		altoPx,
		cols,
		fils,
		relAspecto,
		c = {
			relAspecto : 30
		};
	var pint;

	var pintado = function(){
		this.limpiaPantalla = function(){
			ctx.clearRect(0,0, anchoTotalPx, altoTotalPx);
		}		
	};
	
	//CONSTRUCTOR
	this.cargaMapa = function(mapa, relAspect){
		relAspecto = relAspect
			? relAspect
			: c.relAspecto;
		if (mapa == undefined || 
			mapa[0] == undefined || 
			mapa[0][0] == undefined){
			return undefined;
		}
		mapa = mapa;
		filas = mapa.length;
		cols = mapa[0].length;
		anchoPx = relAspecto; 
		altoPx = relAspecto;
		anchoTotalPx = cols * relAspecto; 
		altoTotalPx = filas * relAspecto;
		var canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		pint = new pintado(ctx);
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