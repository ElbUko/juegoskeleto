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
		pos = {
			pacman : {
				x : 0,
				y : 0
			},
			fantasma : [],
			comida : [],
			pildora : []
		},
		c = {
			relAspecto : 30
		};
	var pint;

	  ////////////////////////////////////////////////////////////
	 ////////				PINTADO						/////////
	////////////////////////////////////////////////////////////
	
	var pintado = function(){
		this.limpiaPantalla = function(){
			ctx.fillStyle = "#000";
            ctx.fillRect(0,0,canvas.width,canvas.height);
		}
		this.pinta = function(){
            limpiaPantalla();
		}
	};
	
	//CONSTRUCTOR
	this.cargaMapa = function(mapaIn, relAspect){
		function formateaMapa(mapIn){
			
		}
		
		relAspecto = relAspect
			? relAspect
			: c.relAspecto;
		if (mapaIn == undefined || 
			mapaIn[0] == undefined || 
			mapaIn[0][0] == undefined){
			return false;
		}
		mapa = formateaMapa(mapaIn);
		filas = mapa.length;
		cols = mapa[0].length;
		anchoPx = relAspecto; 
		altoPx = relAspecto;
		anchoTotalPx = cols * relAspecto; 
		altoTotalPx = filas * relAspecto;
		var canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		pint = new pintado(ctx);
		return true;
		
	}
	
	
	this.arranca = function(){
		pint.limpiaPantalla();
		
	}
}

function nuevoJuego(mapa){
	var j = new juego();
	if (j.cargaMapa(mapa)){
		j.arranca();		
	}
}

nuevoJuego([[1,1,1,1,1,1],[11,1,1,1,1,1]]);