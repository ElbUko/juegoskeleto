/*
 * 
 */
//CNFG
var vg = {
	dim : {
		filas : 	-1,
		cols :		-1,
		filasIni : 	15,
		colsIni : 	20,
		maxCols: 	30,
		maxFilas : 	19, 
		minCols : 	5,
		minFilas :	5
	},
	tipoElem : {
		menu : 		'elemMenu',
		menuSel : 	'elemMenuSel',
		mapa : 		'elemMapa',
		mapaImg : 	'elemMapaImg',
		opcion : 	'opcion',
		deshab : 	'deshabilitado'
	}, 
	flags : {
		pinchao : 	false,
		entrao : 	false,
		puesto : 	false
	},
	opc : {
		ojo : 		'ojo',
		papelera : 	'papelera',
		ponCol : 	'ponCol',
		quitaCol : 	'quitaCol',
		ponFila : 	'ponFila',
		quitaFila : 'quitaFila',
		guarda : 	'guarda'
	},
	evt : {
		clic : 		'clic',
		entra : 	'entra',
		sale : 		'sale'
	},
	elemDom : {
		menu : 		document.getElementById('menu'),
		mapa : 		document.getElementById('mapa'),
		opciones : 	document.getElementById('opciones'),
		pacman : 	document.getElementById('pacman'),
		menuSel : 	document.getElementById('pacman'),
		ponCol : 	document.getElementById('ponCol'),
		quitaCol : 	document.getElementById('quitaCol'),
		ponFila : 	document.getElementById('ponFila'),
		quitaFila :	document.getElementById('quitaFila'),
		casillas : 	document.getElementsByClassName('elemMapa')
	}
};
document.addEventListener('mouseover',	rEntra);
document.addEventListener('mouseout',	rSale);
document.addEventListener('mousedown',	rPincha);
document.addEventListener('mouseup',	rSuelta);


//NGC
function esClaseMenu(elemDom){
	return elemDom.className == vg.tipoElem.menu 
		|| elemDom.className == vg.tipoElem.menuSel;
}
function esClaseMapa(elemDom){
	return elemDom.className == vg.tipoElem.mapa 
		|| elemDom.className == vg.tipoElem.mapaImg;
}
function esClaseOpcion(elemDom){
	return elemDom.className == vg.tipoElem.opcion;
}
function tieneImagen(elemDom){
	return elemDom.tagName == 'IMG';
}
function hayMenuSel(){
	return vg.elemDom.menuSel.id != '';
}
function esOjo(elemDom){
	return elemDom.id == vg.opc.ojo;
}
function esPacmanSel(){
	return vg.elemDom.menuSel.id == 'pacman';
}
function estaBorrando(){
	return vg.elemDom.menuSel.id == 'borra';
}
function esImagenPacman(img){
	return vg.elemDom.pacman.src == img.src;
}


/*#######################################################################################
                     CONTROL DE EVENTOS
#########################################################################################*/
//EVT
function rPincha(evt){
	var t = evt.target;  
    if (esClaseMenu(t) && vg.elemDom.menuSel.id != '') {
    	cambiaSeleccionMenu(t);
    } 
    else if (esClaseMenu(t) && vg.elemDom.menuSel.id == '') {
    	SeleccionaMenu(t);
    } 
    else if (esClaseOpcion(t)){
    	ejecutaOpcion(t.id);
    } 
    else if (esClaseMapa(t) && !vg.flags.pinchao && !vg.flags.puesto) {
        cambiaElementoMapa(evt.target);
    }
    vg.flags.pinchao = true;
}
function rSuelta(){
	vg.flags.pinchao = false;
	vg.flags.puesto = false;
};
function rEntra(evt){
	if (esOjo(evt.target)){
		ponMapaBonito();
	}
    if (esClaseMapa(evt.target) && vg.flags.pinchao && !vg.flags.puesto) {
    	cambiaElementoMapa(evt.target);
    }
    vg.flags.entrao = true;
}
function rSale(evt){
    vg.flags.entrao = false;
    vg.flags.puesto = false;
    if (esOjo(evt.target)){
    	quitaMapaBonito();
    }
}


/*#######################################################################################
                     CONTROL GENERAL
#########################################################################################*/

function cambiaSeleccionMenu(elemDom){
	desmarcaMenu(vg.elemDom.menuSel);
	vg.elemDom.menuSel = elemDom;
	marcaMenu(vg.elemDom.menuSel);
}
function SeleccionaMenu(elemDom){
	vg.elemDom.menuSel = elemDom;
	marcaMenu(vg.elemDom.menuSel);
}
function DeseleccionaMenu(){
	desmarcaMenu(vg.elemDom.menuSel);
	vg.elemDom.menuSel = {id:''};
}
function ejecutaOpcion(id){
	if (id == vg.opc.papelera){
		ponPopup('seguro');
		borraMapa();
	} else if (id == vg.opc.ponCol){
		controlaPonCol();
	} else if (id == vg.opc.quitaCol){
		controlaQuitaCol();
	} else if (id == vg.opc.ponFila){
		controlaPonFila();
	} else if (id == vg.opc.quitaFila){
		controlaQuitaFila();
	}
}
function controlaPonFila(){
	habilita(vg.elemDom.quitaFila);
	if (vg.dim.filas >= vg.dim.maxFilas){
		deshabilita(vg.elemDom.ponFila);
	}
	if (vg.dim.filas <= vg.dim.maxFilas){
		ponFila();
	}
}
function controlaQuitaFila(){
	habilita(vg.elemDom.ponFila);
	if (vg.dim.filas <= vg.dim.minFilas){
		deshabilita(vg.elemDom.quitaFila);
	}
	if (vg.dim.filas >= vg.dim.minFilas){
		quitaFila();
	}
}
function controlaPonCol(){
	habilita(vg.elemDom.quitaCol);
	if (vg.dim.cols >= vg.dim.maxCols){
		deshabilita(vg.elemDom.ponCol);
	}
	if (vg.dim.cols <= vg.dim.maxCols){
		ponColumna();
	}
}
function controlaQuitaCol(){
	habilita(vg.elemDom.ponCol);
	if (vg.dim.cols <= vg.dim.minCols){
		deshabilita(vg.elemDom.quitaCol);
	}
	if (vg.dim.cols >= vg.dim.minCols){
		quitaColumna();
	}
}

function cambiaElementoMapa(casilla){
	if (hayMenuSel()) {
		var cuadroClic = casilla;
		if (tieneImagen(casilla)){
			if (esImagenPacman(casilla)){
				habilita(pacman);				
			}
			casilla = casilla.parentNode;
			casilla.removeChild(casilla.firstChild);
		}
		if (!estaBorrando() && !casilla.hasChildNodes()){
			ponImagen(casilla);
		}
		if (esPacmanSel()){
			deshabilita(vg.elemDom.menuSel)
			DeseleccionaMenu();
		}
	}
}
function ponImagen(casilla){
	var elem = document.createElement("img");
	elem.src = vg.elemDom.menuSel.src;
	elem.className = 'elemMapaImg';
	casilla.appendChild(elem);
	vg.flags.spuesto = true;
}


/*#######################################################################################
                     TRANSFORMACIONES CSS
#########################################################################################*/
//CSS
function deshabilita(htmlElem){
	htmlElem.classList.add(vg.tipoElem.deshab);	
}
function habilita(htmlElem){
	htmlElem.classList.remove(vg.tipoElem.deshab);	
}
function marcaMenu(opcion){
	opcion.classList.remove(vg.tipoElem.menu);
	opcion.classList.add(vg.tipoElem.menuSel);
}
function desmarcaMenu(opcion){
	opcion.classList.remove(vg.tipoElem.menuSel);
	opcion.classList.add(vg.tipoElem.menu);
}
function ponMapaBonito(){
	for (var i=0; i<vg.elemDom.casillas.length; i++){
		vg.elemDom.casillas[i].classList.add('elemMapaBonito');
	}
}
function quitaMapaBonito(){
    for (var i=0; i<vg.elemDom.casillas.length; i++){
    	vg.elemDom.casillas[i].classList.remove('elemMapaBonito');
    }
}


/*#######################################################################################
                     ALTERACIONES AL DOM
#########################################################################################*/
//DOM
function borraMapa(){
	for (var i=0; i<vg.elemDom.casillas.length; i++){
		var hijo = vg.elemDom.casillas[i].firstChild;
		if (hijo != null){
			vg.elemDom.casillas[i].removeChild(hijo);
		}
	}
}
function creaMapa(){
	vg.dim.cols = vg.dim.colsIni;
    for (let i=0; i<vg.dim.filasIni; i++) {
    	ponFila();
	}
}
function ponFila(){
	vg.dim.filas += 1;
	var fila = document.createElement('div');
	fila.id = 'fila' + vg.dim.filas;
	vg.elemDom.mapa.appendChild(fila);
	fila.className = 'filaMapa';
	mapa.appendChild(fila);
	for (let i=0; i<vg.dim.cols; i++){
		ponCasilla(vg.dim.filas, i);
	} 
}
function quitaFila(){
	vg.dim.filas -= 1;
	vg.elemDom.mapa.removeChild(mapa.lastChild);
}
function ponCasilla(numFila, numCol){
	var fila = document.getElementById('fila'+numFila);
	var casilla = document.createElement('div');
	casilla.id = numFila+'_'+numCol;
	casilla.className = 'elemMapa';
	fila.appendChild(casilla);
}
function ponColumna(){
	vg.dim.cols += 1;
	for (let i=0; i<=vg.dim.filas; i++){
		ponCasilla(i, vg.dim.cols);
	}	
}
function quitaColumna(){
	var filas = document.getElementsByClassName('filaMapa');
	for (var i=0; i<filas.length; i++){
		filas[i].removeChild(filas[i].lastChild);
	}
	vg.dim.cols -= 1;
}


creaMapa();


//         var antiguo, actual;
//         var esFantasma, esPacman;
//         var pacmanPuesto = false;
//         var rutaImg = 'img/';
//         var esEdicion = false;
//         var id = null;




//         /*#######################################################################################
//                             FUNCIONES PRINCIPALES
//         #########################################################################################*/                    
//         //VARIABLES GLOBALES IMPORTANTES:
// //            elMenuSel:      almacena que elemento del menu está seleccionado (ej: /img/pacmanE1.png)



//                     //





//         /*#######################################################################################
//                             POPUP
//         #########################################################################################*/
//         function verificaGuarda(){
//             var todoBien = true;
//             var mensaje = null;
//             //comprobar si hay pacman
//             if (!pacmanPuesto){
//                 todoBien = false;
//                 cual = "noPacman";
//             }
//             //comprobar que al menos hay una de comida
//             var hayComida = false,
//                 filas = mapa.childNodes,
//                 divs, direcc;
//             for (var i=0; i<filas.length; i++){
//                 divs = filas[i].childNodes;
//                 for (var j=0; j<divs.length; j++){
//                     if (divs[j].firstChild != null){
//                         direcc = divs[j].firstChild.src;
//                         if (direcc.slice(direcc.lastIndexOf('/')+1,direcc.length) == 'bola.png'){
//                             hayComida = true;
//                         }
//                     }
//                 }
//             }
//             if (todoBien && !hayComida){
//                 todoBien = false;
//                 cual = "noComida";
//             }
//             //comprobar si ha puesto nombre
//             var cajatxtnombrepop = document.getElementById("popupNombre");
//             if ((cajatxtnombrepop.style.display != "none")&&(cajatxtnombrepop.value != "")){
//                 cajatxtnombre.value = cajatxtnombrepop.value;
//             }
//             if (todoBien && (cajatxtnombre.value == "" || cajatxtnombre.value == undefined)){
//                 todoBien = false;
//                 cual = "noNombre";
//             }
//             //comprobar si ya existe el nombre
//             //comprobar si ya existe la pantalla
//             if (todoBien){
//                 todoBien = guardaMapa();
//             }
//             else {
//                  ponPopup(cual);
//             }
//         }


//         function ponPopup(cual){
//             var popupBtnYesDisplay = false;
//             var fondoPopup = document.getElementsByClassName("popup")[0];
//             var popup = document.getElementById("confirma");
//             var popupMsg = document.getElementById("popupMsg");
//             var popupNombre = document.getElementById("popupNombre");
//             var popupBtnYes = document.getElementById("popupBtnYes");
//             var popupBtnNoMsg = document.getElementById("popupBtnNoMsg");
//             var popupBtnYesMsg = document.getElementById("popupBtnYesMsg");
//             switch (cual){      //cual es un problema. Si no lo hay en default casco el "Ha ido bien!"
//                 case "noPacman": {
//                     popupMsg.innerHTML = "¡¿Es que quieres jugar sin prota?!<br />Vete a ver la tele!";
//                     popupBtnYes.style.display = "none";
//                     popupNombre.style.display = "none";
//                     popupBtnNoMsg.innerHTML = "Va, pongo uno.";
//                     break;
//                 }
//                 case "noNombre": {
//                     popupMsg.innerHTML = "Has hecho algo, por eso de nombrarlo... nombre?";
//                     popupBtnYes.style.display = "inline";
//                     popupNombre.style.display = "block";
//                     popupBtnYesMsg.innerHTML = "Guardar";
//                     popupBtnNoMsg.innerHTML = "Cancelar";
//                     break;
//                 }
//                 case "noComida": {
//                     popupMsg.innerHTML = "Si no pones al menos una bolita...<br /> ¡el juego no acaba!";
//                     popupBtnYes.style.display = "none";
//                     popupNombre.style.display = "none";
//                     popupBtnNoMsg.innerHTML = "Venga va, pongo alguna";
//                     break;
//                 }
//                 default: {
//                     popupMsg.innerHTML = "Guardado! Quieres probarlo? Dale a mapas de usuarios.";
//                     popupBtnYes.style.display = "none";
//                     popupBtnGoMsg.innerHTML = "Mapas de usuarios";
//                     popupBtnGo.style.display = "inline-block";
//                     popupBtnNoMsg.innerHTML = "Dejame aqui otro ratito";
//                     popupNombre.style.display = "none";
//                 } 
//             }
//             fondoPopup.style.display = 'block';
//             popup.style.display = 'block';
//         }

//         function quitaPopup(cual){
//             var fondoPopup = document.getElementsByClassName("popup")[0];
//             var popup = document.getElementById(cual);
//             fondoPopup.style.display = 'none';
//             popup.style.display = 'none';
//             var cajatxtnombre = document.getElementById("nombre");
//             var cajatxtnombrepop = document.getElementById("popupNombre");
//             if ((cajatxtnombrepop.style.display != "none")&&(cajatxtnombrepop.value != "")){
//                 cajatxtnombre.value = cajatxtnombrepop.value;
//             }
//         }

//         //eventos
//                     document.addEventListener('mouseover',rEntra);
//                     document.addEventListener('mouseout',rSale);
//                     document.addEventListener('mousedown',rPincha);
//                     document.addEventListener('mouseup',rSuelta);
//                     var rutaImg = 'img/';
//                     var menu = document.getElementById("menu");
//                     var mapa = document.getElementById("mapa");
//                     var cajatxtnombre = document.getElementById("nombre");
//                     var pinchao = false,
//                         entrao = false,
//                         puesto = false;

//                     //tamaños de los cuadros
//                     var maxColumn = 30, minColumn = 5,
//                         maxFilas = 19, minFilas = 5,
//                         nColumn = 20,
//                         nFilas = 15,
//                         tMenu = 40,         //tamaño de la casilla de menu
//                         tMapa = 30;     //tamaño de la casilla del mapa

//                     //elementos que almacenar:
//                     var elMenuSel=rutaImg+'par20V.png';

//                     //localizacion de imagenes
//                     var src = [rutaImg+'pacmanE1.png', rutaImg+'fantasma1.png', rutaImg+'fantasma2.png', rutaImg+'fantasma3.png', rutaImg+'bola.png', rutaImg+'bolon.png', rutaImg+'par20V.png',rutaImg+'par20H.png',rutaImg+'esq20NO.png',rutaImg+'esq20NE.png',rutaImg+'esq20SO.png',rutaImg+'esq20SE.png', rutaImg+'esqOC.png',rutaImg+'esqNC.png',rutaImg+'esqEC.png',rutaImg+'esqSC.png',rutaImg+'esqCC.png',rutaImg+'borrar.png'];


        			
//         			function cargaMapa(pantalla){
//         				var filas = mapa.childNodes;
//         				var x = 0;
//         				for (var i=0; i<filas.length; i++){
//         					var casillas = filas[i].childNodes;
//         					for (var j=0; j<casillas.length; j++){
//         						if (pantalla[x] != 'x'){
//         							var img = document.createElement('img');
//         							src = rutaImg;
//         							switch (pantalla[x]){
//                             			case 'p': {src += 'pacmanE1.png'; pacmanPuesto = true; break;}
//         			                    case 'a': {src += 'fantasma1.png'; break;}
//         			                    case 'c': {src += 'fantasma2.png'; break;}
//         			                    case 'l': {src += 'fantasma3.png'; break;}
//         			                    case 'o': {src += 'bola.png'; break;}
//         			                    case 'O': {src += 'bolon.png'; break;}
//         			                    case '1': {src += 'par20V.png'; break;}
//         			                    case '2': {src += 'par20H.png'; break;}
//         			                    case '6': {src += 'esq20NO.png'; break;}
//         			                    case '3': {src += 'esq20NE.png'; break;}
//         			                    case '5': {src += 'esq20SO.png'; break;}
//         			                    case '4': {src += 'esq20SE.png'; break;}
//         			                    case 'z': {src += 'esqOC.png'; break;}
//         			                    case '8': {src += 'esqNC.png'; break;}
//         			                    case '9': {src += 'esqEC.png'; break;}
//         			                    case 'd': {src += 'esqSC.png'; break;}
//         			                    default: {src += 'esqCC.png'; break;}
//         							}
//         							img.src = src;
//         							img.width = tMapa;
//         		                    img.className = 'elemMapaImg';
//         		                    casillas[j].appendChild(img);								
//         						}
//         						x += 1;
//         					}
//         				}
//         			}		

//                     //objeto HTTP_REQUEST
//                     http_request = false;
//                     if(window.XMLHttpRequest){
//                          var ajax = new XMLHttpRequest();
//                     }


//                     function guardaMapa(){
//                         var nombre = cajatxtnombre.value;
//                         var tmn = 10;
//                         var canvas = document.getElementById("canvas");
//                         canvas.height = nFilas*tmn;
//                         canvas.width = nColumn*tmn;
//                         var ctx = canvas.getContext("2d");
//                         ctx.fillRect(0,0,canvas.width, canvas.height);
//                         //Construyo la matriz para guardar la info en el js
//                         var filas, divs, imgs = [], cadena = '', direcc, val, pos;
//                         filas = mapa.childNodes;
//                         imgs = menu.childNodes;
//                         for (var i=0; i<filas.length; i++){
//                             divs = filas[i].childNodes;
//                             //cadena += '[';                      //cada fila es nuevo vector
//                             for (var j=0; j<divs.length; j++){
//                                 if (divs[j].firstChild != null){
//                                     direcc = divs[j].firstChild.src;
//                                     nombreImg = direcc.slice(direcc.lastIndexOf('/')+1,direcc.length);
//                                     //[val, pos] = sacaImagen(nombreImg)     NO TIRA en CHROME
//                                     cosa = sacaImagen(nombreImg);
//                                     val = cosa[0];
//                                     pos = cosa[1];
//                                     cadena += val;
//                                     ctx.drawImage(imgs[Math.floor(pos/2)].childNodes[pos%2],j*tmn,i*tmn,tmn,tmn);
//                                 }
//                                 else {
//                                     cadena += 'x';
//                                 }
//                             }
//                             //cadena += '],'                      //cerramos el vector
//                         }
//                         //lo mando con ajax
//                         var img    = canvas.toDataURL("image/png");
//         			    ajax.open('POST', "../php/control/pacmanGuardaMapa.php", true);
//         			    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         			    console.log("¿es edicion? "+esEdicion);
//         			    if (esEdicion){
//         			    	var envia = "acc=edi&id="+id+"&imgData="+img+"&mapadata="+cadena+"&nombre="+nombre+"&nombreV="+nombreViejo+"&filas="+nFilas+"&columnas="+nColumn;	
//         		    	}
//         		    	else {
//         		    		var envia = "acc=cre&imgData="+img+"&mapadata="+cadena+"&nombre="+nombre+"&filas="+nFilas+"&columnas="+nColumn;
//         			    }
//         			    ajax.send(envia);
        			
//         			    var boton = document.getElementById("guardar");
//         			    boton.disabled = true;
//         			    //console.log(cadena);
                        
//                     }
                    


//                     function sacaImagen(src){
//                         var val;
//                         switch(src){
//                             case 'pacmanE1.png':    {val = 'p'; pos = 0;break;}
//                             case 'fantasma1.png':   {val = 'a'; pos = 1;break;}
//                             case 'fantasma2.png':   {val = 'c'; pos = 2;break;}
//                             case 'fantasma3.png':   {val = 'l'; pos = 3;break;}
//                             case 'bola.png':        {val = 'o'; pos = 4;break;}
//                             case 'bolon.png':       {val = 'O'; pos = 5;break;}
//                             case 'par20V.png':      {val = '1'; pos = 6;break;}
//                             case 'par20H.png':      {val = '2'; pos = 7;break;}
//                             case 'esq20NO.png':     {val = '6'; pos = 8;break;}
//                             case 'esq20NE.png':     {val = '3'; pos = 9;break;}
//                             case 'esq20SO.png':     {val = '5'; pos = 10;break;}
//                             case 'esq20SE.png':     {val = '4'; pos = 11;break;}
//                             case 'esqOC.png':       {val = 'z'; pos = 12;break;}
//                             case 'esqNC.png':       {val = '8'; pos = 13;break;}
//                             case 'esqEC.png':       {val = '9'; pos = 14;break;}
//                             case 'esqSC.png':       {val = 'd'; pos = 15;break;}
//                             case 'esqCC.png':       {val = '7'; pos = 16;break;}
//                             default: val = '?';
//                         }
//                         return [val,pos];
//                     }



//                     ajax.onreadystatechange=function(){
//                     	if (ajax.readyState == 4){
//                             if (ajax.status == 200){
//                                 result = ajax.responseText;
//         						//respuesta = JSON.parse(result);
//         						ponPopup('guardado');
//         						} else {
//                                 alert('No se ha podido guardar');
//                             }   
//                         }             
//                     };
                    
//         generaEditor();
        