
function obtenPantallas(){
	var url = "http://localhost/juegoskeleto/jskeletobk/puerta.php";
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
	for (var i=0; i<pantallas.length; i++){
		var pantalla = pantallas[i];
		var divMapas = document.getElementById('pantallas');
		var mapa = document.createElement('div');
		mapa.id = 'p'+pantalla.nombre;
		mapa.className = 'pantalla';
		divMapas.appendChild(mapa);
	}
}
obtenPantallas();