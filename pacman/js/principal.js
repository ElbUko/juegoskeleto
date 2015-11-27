//CONSTANTES:
            audioTestElem.addEventListener('ended', function() {
			    this.currentTime = 0;
			    //this.play();
			}, false);
            var timeoutId = null;
            var INTELIGEN = 2,
                TMIEDO = 30;
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var puntosElem = document.getElementById("puntos");
            var puntos = puntosElem.innerHTML;
            
            //###########################################################
            //#####         Control del ciclo de juego              #####
            //###########################################################
            //
            function control(){
                //seleccion de direccion
                if (pressingU) direccion = 0;
                else if (pressingR) direccion = 1;
                else if (pressingD) direccion = 2;
                else if (pressingL) direccion = 3;
                //control de flujo
                if ((pressingL || pressingR || pressingU || pressingD)){   
                    muevePacman();
                    pintaPacman();
                    mueveFantasmas();
                    pintaFantasmas();
                    puntos -= 1;
                    puntosElem.innerHTML = puntos;
                }
                if (pacman.comido){
                    mensajea("pierde");
                    timeoutId = setTimeout(arranca,1500);
                }
                else if (pacman.ganaste){
                	var filas = [].slice.call(document.getElementsByClassName("puntosF"));	
					var puntosP = [].slice.call(document.getElementsByClassName("puntosP"));
					if ((puntosP.length > 1)&&(filas.length<11)){
						if (puntosP[puntosP.length-1].innerHTML <= puntos){
							actualizaPuntuacion();
						}
					}
					else if (puntos > 0){
						actualizaPuntuacion();
					}
                    mensajea("gana");
                    nivel = (nivel+1 == pantalla.length)?nivel:nivel+1;
                    timeoutId = setTimeout(arranca,1500);
                }
                else { 
                    timeoutId = setTimeout(control,frameRate);
                }
                return;
            };  
           


            //###########################################################
            //#####         Funcion de carga del juego              #####
            //###########################################################
            //

            function onImgLoad(){
                return;
            }
            function arranca(){
            	console.log(pantalla[nivel]);
                clearTimeout(timeoutId);
                ctx.clearRect(0,0, canvas.width, canvas.height);
                if (pantalla.length != 1){
                	mapa.elem = pantalla[nivel];
                }
                ola = mapa.elem[0];
                if ((mapa.elem.length>20)||(ola.length>40))
                    relacionAspecto=20;
                else 
                    relacionAspecto=30;
                canvas.width = relacionAspecto*ola.length;
                canvas.height = relacionAspecto*mapa.elem.length;
                switch (n){
                    case 3:
                        ctx.font = canvas.width*88/1000+"px serif";
                        ctx.strokeText("3", canvas.width/2, canvas.height/2);
                        timeoutId = setTimeout(arranca,500);
                        break;
                    case 2:
                        ctx.font = canvas.width*88/1000+"px serif";
                        ctx.strokeText("2", canvas.width/2, canvas.height/2);
                        timeoutId = setTimeout(arranca,500);
                        break;
                    case 1:
                        ctx.font = canvas.width*88/1000+"px serif";
                        ctx.strokeText("1", canvas.width/2, canvas.height/2);
                        timeoutId = setTimeout(arranca,500);
                        break;
                    default: 
                        inicializaVariables(relacionAspecto);
                        cargaMapa();
                        pintaFantasmas();
                        pintaPacman();
                        for (var i=0; i<fantasmas.quien.length; i++){
                            if (fantasmas.quien[i]=="l")
                                comePacman(i);
                        }                       
                        pressingL=false; pressingR=false; pressingU=false; pressingD=false;
                        control();
                }
                //n-=1;
                n=(n>0)?n-1:0;
                return;
            }
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for (var i=0;i<mapa.src.length; i++){
                mapa.img.push(new Image());                
                mapa.img[i].onLoad = onImgLoad();
                mapa.img[i].src = mapa.src[i];
            }
            for (var i=0; i<pacman.src.length; i++){
                pacman.img.push(new Image());
                pacman.img[i].onLoad = onImgLoad();
                pacman.img[i].src = pacman.src[i];
            }
            for (var i=0;i<fantasmas.src.length; i++){
                fantasmas.img.push(new Image());
                fantasmas.img[i].onLoad = onImgLoad();
                fantasmas.img[i].src = fantasmas.src[i];
            }
            for (var i=0;i<bolas.src.length; i++){
                bolas.img.push(new Image());                
                bolas.img[i].onLoad = onImgLoad();
                bolas.img[i].src = bolas.src[i];
            }
            
            nivel = (nivel==null)?0:nivel;
/*
            function guarda(){
                var img    = canvas.toDataURL("image/png");
                if(window.XMLHttpRequest){
                    var ajax = new XMLHttpRequest();
                }
                ajax.open('POST', "guardaImg.php", true);
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajax.onreadystatechange = function() {
                    console.log(ajax.responseText);
                };
                ajax.send("imgData="+img+"&nombre=test");
            }
            

/*##########################################################################
 * ################# 		AJAX PA PUNTOS			########################
 * #######################################################################*/


//objeto HTTP_REQUEST
http_request = false;
if (window.XMLHttpRequest) {
	var ajax = new XMLHttpRequest();
	//Variable global 'ajax' pa ajax
}



var result;
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4) {
		result = ajax.responseText;
		respuesta = JSON.parse(result);
		console.log("ha respondio: " + result + " \nTranspot es: " + ajax);
		if ((ajax.status == 200)&&(respuesta != 'Error')) {					//A meter el nuevo registro de puntos
			actualizaTablero(respuesta);									
		} else {
			result = respuesta.responseText;
			console.log("ha respondio MAL! " + result);
		}
	}
};

function actualizaTablero(tablaPuntos){
	var tbody = document.getElementById('tablaPuntosBody');			
	var filas = document.getElementsByClassName("puntosF");			
	var puntosU = [].slice.call(document.getElementsByClassName("puntosU"));
	var puntosP = [].slice.call(document.getElementsByClassName("puntosP"));
	console.log(puntosU);
	console.log(puntosP);
	//Si no ganaste es que empiezas: borro
	if (!pacman.ganaste){
		for (var i=0; i<filas.length; i++){
			puntosU[i].innerHTML = "";
			puntosP[i].innerHTML = "";
		}
	}
	else if ((filas.length<tablaPuntos.length)||(tablaPuntos.length == 0)){
		var cajaP = document.createElement('td');		//Generacion del tr nuevo a insertar en los puntos
		cajaP.className = 'puntosP';
		puntosP.push(cajaP);
		var cajaN = document.createElement('td');
		cajaN.className = 'puntosU';
		puntosU.push(cajaN);
		var fila = document.createElement('tr' );
		fila.appendChild(cajaN);
		fila.appendChild(cajaP);
		fila.id = 'puntos'+	tablaPuntos.length;
		fila.className = 'puntosF';
		tbody.appendChild(fila);
	}
	if (puntosU.length > 0){
		for (var i=0; i<tablaPuntos.length; i++){				//insercion de lo obtenido en la consulta
			puntosU[i].innerHTML = tablaPuntos[i].usuario;
			puntosP[i].innerHTML = tablaPuntos[i].puntos;
		}
	}
}


function actualizaPuntuacion () {
	ajax.open('POST', '../php/control/controlPuntos.php', true);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	console.log("llamo con puntos: "+puntos+ ", nivel: "+nivel +" y pantallaID: "+pantallaId);
	if (pantallaId != -1)
		var envia = 'juego=pacman&modo=usr'+pantallaId+'&puntos='+puntos;
	else
		var envia = 'juego=pacman&modo=std'+nivel+'&puntos='+puntos;
	ajax.send(envia);
}