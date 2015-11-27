//eventos
            document.addEventListener('mouseover',rEntra);
            document.addEventListener('mouseout',rSale);
            document.addEventListener('mousedown',rPincha);
            document.addEventListener('mouseup',rSuelta);
            var rutaImg = '../img/pacman/';
            var menu = document.getElementById("menu");
            var mapa = document.getElementById("mapa");
            var cajatxtnombre = document.getElementById("nombre");
            var pinchao = false,
                entrao = false,
                puesto = false;

            //tamaños de los cuadros
            var maxColumn = 30, minColumn = 5,
                maxFilas = 19, minFilas = 5,
                nColumn = 20,
                nFilas = 15,
                tMenu = 40,         //tamaño de la casilla de menu
                tMapa = 30;     //tamaño de la casilla del mapa

            //elementos que almacenar:
            var elMenuSel=rutaImg+'par20V.png';

            //localizacion de imagenes
            var src = [rutaImg+'pacmanE1.png', rutaImg+'fantasma1.png', rutaImg+'fantasma2.png', rutaImg+'fantasma3.png', rutaImg+'bola.png', rutaImg+'bolon.png', rutaImg+'par20V.png',rutaImg+'par20H.png',rutaImg+'esq20NO.png',rutaImg+'esq20NE.png',rutaImg+'esq20SO.png',rutaImg+'esq20SE.png', rutaImg+'esqOC.png',rutaImg+'esqNC.png',rutaImg+'esqEC.png',rutaImg+'esqSC.png',rutaImg+'esqCC.png',rutaImg+'borrar.png'];


			
			function cargaMapa(pantalla){
				var filas = mapa.childNodes;
				var x = 0;
				for (var i=0; i<filas.length; i++){
					var casillas = filas[i].childNodes;
					for (var j=0; j<casillas.length; j++){
						if (pantalla[x] != 'x'){
							var img = document.createElement('img');
							src = rutaImg;
							switch (pantalla[x]){
                    			case 'p': {src += 'pacmanE1.png'; pacmanPuesto = true; break;}
			                    case 'a': {src += 'fantasma1.png'; break;}
			                    case 'c': {src += 'fantasma2.png'; break;}
			                    case 'l': {src += 'fantasma3.png'; break;}
			                    case 'o': {src += 'bola.png'; break;}
			                    case 'O': {src += 'bolon.png'; break;}
			                    case '1': {src += 'par20V.png'; break;}
			                    case '2': {src += 'par20H.png'; break;}
			                    case '6': {src += 'esq20NO.png'; break;}
			                    case '3': {src += 'esq20NE.png'; break;}
			                    case '5': {src += 'esq20SO.png'; break;}
			                    case '4': {src += 'esq20SE.png'; break;}
			                    case 'z': {src += 'esqOC.png'; break;}
			                    case '8': {src += 'esqNC.png'; break;}
			                    case '9': {src += 'esqEC.png'; break;}
			                    case 'd': {src += 'esqSC.png'; break;}
			                    default: {src += 'esqCC.png'; break;}
							}
							img.src = src;
							img.width = tMapa;
		                    img.className = 'elemMapaImg';
		                    casillas[j].appendChild(img);								
						}
						x += 1;
					}
				}
			}		

            //objeto HTTP_REQUEST
            http_request = false;
            if(window.XMLHttpRequest){
                 var ajax = new XMLHttpRequest();
            }


            function guardaMapa(){
                var nombre = cajatxtnombre.value;
                var tmn = 10;
                var canvas = document.getElementById("canvas");
                canvas.height = nFilas*tmn;
                canvas.width = nColumn*tmn;
                var ctx = canvas.getContext("2d");
                ctx.fillRect(0,0,canvas.width, canvas.height);
                //Construyo la matriz para guardar la info en el js
                var filas, divs, imgs = [], cadena = '', direcc, val, pos;
                filas = mapa.childNodes;
                imgs = menu.childNodes;
                for (var i=0; i<filas.length; i++){
                    divs = filas[i].childNodes;
                    //cadena += '[';                      //cada fila es nuevo vector
                    for (var j=0; j<divs.length; j++){
                        if (divs[j].firstChild != null){
                            direcc = divs[j].firstChild.src;
                            nombreImg = direcc.slice(direcc.lastIndexOf('/')+1,direcc.length);
                            //[val, pos] = sacaImagen(nombreImg)     NO TIRA en CHROME
                            cosa = sacaImagen(nombreImg);
                            val = cosa[0];
                            pos = cosa[1];
                            cadena += val;
                            ctx.drawImage(imgs[Math.floor(pos/2)].childNodes[pos%2],j*tmn,i*tmn,tmn,tmn);
                        }
                        else {
                            cadena += 'x';
                        }
                    }
                    //cadena += '],'                      //cerramos el vector
                }
                //lo mando con ajax
                var img    = canvas.toDataURL("image/png");
			    ajax.open('POST', "../php/control/pacmanGuardaMapa.php", true);
			    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			    console.log("¿es edicion? "+esEdicion);
			    if (esEdicion){
			    	var envia = "acc=edi&id="+id+"&imgData="+img+"&mapadata="+cadena+"&nombre="+nombre+"&nombreV="+nombreViejo+"&filas="+nFilas+"&columnas="+nColumn;	
		    	}
		    	else {
		    		var envia = "acc=cre&imgData="+img+"&mapadata="+cadena+"&nombre="+nombre+"&filas="+nFilas+"&columnas="+nColumn;
			    }
			    ajax.send(envia);
			
			    var boton = document.getElementById("guardar");
			    boton.disabled = true;
			    //console.log(cadena);
                
            }
            


            function sacaImagen(src){
                var val;
                switch(src){
                    case 'pacmanE1.png':    {val = 'p'; pos = 0;break;}
                    case 'fantasma1.png':   {val = 'a'; pos = 1;break;}
                    case 'fantasma2.png':   {val = 'c'; pos = 2;break;}
                    case 'fantasma3.png':   {val = 'l'; pos = 3;break;}
                    case 'bola.png':        {val = 'o'; pos = 4;break;}
                    case 'bolon.png':       {val = 'O'; pos = 5;break;}
                    case 'par20V.png':      {val = '1'; pos = 6;break;}
                    case 'par20H.png':      {val = '2'; pos = 7;break;}
                    case 'esq20NO.png':     {val = '6'; pos = 8;break;}
                    case 'esq20NE.png':     {val = '3'; pos = 9;break;}
                    case 'esq20SO.png':     {val = '5'; pos = 10;break;}
                    case 'esq20SE.png':     {val = '4'; pos = 11;break;}
                    case 'esqOC.png':       {val = 'z'; pos = 12;break;}
                    case 'esqNC.png':       {val = '8'; pos = 13;break;}
                    case 'esqEC.png':       {val = '9'; pos = 14;break;}
                    case 'esqSC.png':       {val = 'd'; pos = 15;break;}
                    case 'esqCC.png':       {val = '7'; pos = 16;break;}
                    default: val = '?';
                }
                return [val,pos];
            }



            ajax.onreadystatechange=function(){
            	if (ajax.readyState == 4){
                    if (ajax.status == 200){
                        result = ajax.responseText;
						//respuesta = JSON.parse(result);
						ponPopup('guardado');
						} else {
                        alert('No se ha podido guardar');
                    }   
                }             
            };
            