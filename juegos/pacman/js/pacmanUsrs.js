
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
var mapasUsuarios = [];
function cargaPantallas(pantallas){
	var mapas = document.getElementById('pantallas');
	for (var i=0; i<pantallas.length; i++){
		var pantalla = pantallas[i];
		var nombre = document.createElement('p');
		var img = document.createElement('img');
		var usr = document.createElement('p');
		var mapa = document.createElement('div');
		var id = mapasUsuarios.length
		var cols = parseInt(pantalla.columnas-1);
		nombre.innerHTML = pantalla.nombre;
		nombre.className = 'mapaNombre';
		img.onclick = function(){
			juega(id, cols);
		};
		img.src = pantalla.img;
		img.className = 'mapaFoto';
		usr.innerHTML = pantalla.usuario;
		usr.className = 'mapaUsr';
		mapa.className = 'mapaElem';
		mapa.appendChild(nombre);
		mapa.appendChild(img);
		mapa.appendChild(usr);
		mapas.appendChild(mapa);
		mapasUsuarios.push(pantalla.pantalla);
	}
}
obtenPantallas();