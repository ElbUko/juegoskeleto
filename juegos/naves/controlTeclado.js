var ControlTeclado = function(){
	var teclaDcha = false;
	var teclaIzq = false;
	var teclaArriba = false;
	var teclaAbajo = false;
	var barra = 0;
	var teclaP = false;

	this.aprietaTecla = function (evt) {
		if (evt.keyCode == 39) {
			teclaDcha = true;
			teclaIzq = false;
		}
		else if (evt.keyCode == 37) {
			teclaIzq = true;
			teclaDcha = false;
		}
		if (evt.keyCode == 38) {
			teclaArriba = true;
		}
		if (evt.keyCode == 40) {
			teclaAbajo = true;
		}
		if (evt.keyCode == 32) {
			barra = 1;
		}
		if (evt.keyCode == 80 && !J.pausa) {
			teclaP = true;
		}
		else if (evt.keyCode == 80 && J.pausa){
			teclaP = false;
			J.mueve();
		}
		
		return;
	//38 arriba //40 abajo //32 barra
	};
	document.addEventListener("keydown",this.aprietaTecla,false);



	this.sueltaTecla = function (evt) {
		if (evt.keyCode == 32) {
			barra = 0;
		}
		if (evt.keyCode == 39) {
			teclaDcha = false;
		}
		else if (evt.keyCode == 37) {
			teclaIzq = false;
		}
		if (evt.keyCode == 38) {
			teclaArriba = false;
		}
		if (evt.keyCode == 40) {
			teclaAbajo = false;
		}
		return;
	};
	document.addEventListener("keyup",this.sueltaTecla,false);

	this.desactivaBarra = function() {
		barra = 2;		
		return;
	}



	this.__defineGetter__("teclaDcha", function(){
		return teclaDcha;}
		);
	this.__defineSetter__("teclaDcha", function(valor){});

	this.__defineGetter__("teclaIzq", function(){
		return teclaIzq;
	});
	this.__defineSetter__("teclaIzq", function(valor){});

	this.__defineGetter__("teclaArriba", function(){
		return teclaArriba;
	});
	this.__defineSetter__("teclaArriba", function(valor){});

	this.__defineGetter__("teclaAbajo", function(){
		return teclaAbajo;
	});
	this.__defineSetter__("teclaAbajo", function(valor){});

	this.__defineGetter__("barra", function(){
		return barra;
	});
	this.__defineSetter__("barra", function(valor){});

	this.__defineGetter__("teclaP", function(){
		return teclaP;
	});
	this.__defineSetter__("teclaP", function(valor){});
}