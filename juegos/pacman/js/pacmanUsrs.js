
function obtenPantallas(){
	//TODO - unificar url
	var url = "http://localhost/jskeletobk/puerta.php";
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.withCredentials = true;
    xhr.send(JSON.stringify({evt:'pacListaMapas'}));
    xhr.onreadystatechange = function(){
    	if (this.readyState == 4){
    		if (this.status == 200){
				try {
					var resp = this.responseText;
					var pantallas = JSON.parse(resp);
					cargaPantallas(pantallas);
				}
				catch(e){
					console.log("Error en el ws: "+e);
				}
			}
		}
    };
}
var mapas;
function cargaPantallas(pantallas){
	mapas = pantallas
	var mapas = document.getElementById('pantallas');
	for (var i=0; i<pantallas.length; i++){
		var pantalla = pantallas[i];
		var mapa = document.createElement('div');
		mapa.className = 'mapaElem';
		var nombre = document.createElement('p');
		nombre.innerHTML = pantalla.nombre;
		nombre.className = 'mapaNombre';
		mapa.appendChild(nombre);
		var img = document.createElement('img');
		img.src = pantalla.img;
		img.className = 'mapaFoto';
		mapa.appendChild(img);
		var usr = document.createElement('p');
		usr.innerHTML = pantalla.usuario;
		usr.className = 'mapaUsr';
		mapa.appendChild(usr);
		mapas.appendChild(mapa);
			//mapa1
				//nombre
				//img
				//usuario
				//...


/*
		var pantalla = pantallas[i];
		var divMapas = document.getElementById('pantallas');
		mapa.id = 'p'+pantalla.nombre;
		mapa.className = 'pantalla';
		divMapas.appendChild(mapa);*/
	}
}
obtenPantallas();