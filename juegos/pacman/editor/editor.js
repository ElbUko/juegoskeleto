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
		minFilas :	5,
		tmnImg : 	10
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
		puesto : 	false,
		pacmanPuesto: false
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
		nombre : 	document.getElementById('nombre'),
		pacman : 	document.getElementById('pacman'),
		menuSel : 	document.getElementById('pacman'),
		ponCol : 	document.getElementById('ponCol'),
		quitaCol : 	document.getElementById('quitaCol'),
		ponFila : 	document.getElementById('ponFila'),
		quitaFila :	document.getElementById('quitaFila'),
		casillas : 	document.getElementsByClassName('elemMapa')
	},
	mapingImgSimbolo : {
		pacmanE1 : 	'p',
		fantasma1 : 'a',
		fantasma2 : 'c',
		fantasma3 : 'l',
		bola : 		'o',
		bolon : 	'0',
		par20V : 	'1',
		par20H : 	'2',
		esq20NE : 	'3',
		esq20SE : 	'4',
		esq20SO : 	'5',
		esq20NO : 	'6',
		esqCC : 	'7',
		esqNC : 	'8',
		esqEC : 	'9',
		esqSC : 	'd',
		esqOC : 	'z'
	},
	canvas : undefined,
	ctx : undefined
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
function esImagen(elemDom){
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
function noHayPacman(){
	return !vg.flags.pacmanPuesto;	
}
function tieneBola(div){
	return div.src.indexOf('bola.png') != -1
}
function noHayNombre(){
	return vg.elemDom.nombre.value.trim() == '';
}


/*#######################################################################################
                     CONTROL DE EVENTOS
#########################################################################################*/
//EVT
function rPincha(evt){
	var t = evt.target;  
    if (esClaseMenu(t)){
    	accionMenuPinchado(t);
    } else if (hayMenuSel() && esClaseMapa(t) && !vg.flags.pinchao && !vg.flags.puesto) {
        cambiaElementoMapa(evt.target);
    }
    vg.flags.pinchao = true;
}
function rSuelta(){
	vg.flags.pinchao = false;
	vg.flags.puesto = false;
};
function rEntra(evt){
    if (hayMenuSel() && esClaseMapa(evt.target) && vg.flags.pinchao && !vg.flags.puesto) {
    	cambiaElementoMapa(evt.target);
    }
}
function rSale(evt){
    vg.flags.puesto = false;
}


/*#######################################################################################
                     CONTROL DE VARIABLES
#########################################################################################*/

function accionMenuPinchado(target){
	if (hayMenuSel()) {
		desmarcaMenuSel();
	}
	vg.elemDom.menuSel = target;
	marcaMenuSel();
}
function DeseleccionaMenu(){
	desmarcaMenuSel();
	vg.elemDom.menuSel = {id:''};
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

function cambiaElementoMapa(target){
	var casilla;
	if (esImagen(target)){
		if (esImagenPacman(target)){
			habilita(vg.elemDom.pacman);
			vg.flags.pacmanPuesto = false;
		}
		casilla = target.parentNode;
		quitaImagen(casilla);
	} else {
		casilla = target;
	}
	if (!estaBorrando() && !casilla.hasChildNodes()){
		ponImagen(casilla);
	}
	if (esPacmanSel()){
		deshabilita(vg.elemDom.menuSel)
		DeseleccionaMenu();
		vg.flags.pacmanPuesto = true;
	}
}

function verificaGuarda(){
	if (noHayPacman()){
		ponPopup('noPacman');
	}
	else if (noHayBolita()){
		ponPopup('noComida');
	}
	else if (noHayNombre()){
		ponPopup('noNombre');
	}
	else {
		guardaMapa();
	}
		//TODO comprobar si existe el nombre o la pantalla
}


function noHayBolita(){
	var filas = vg.elemDom.mapa.childNodes;
	for (var i=0; i<filas.length; i++){
		divs = filas[i].childNodes;
		for (var j=0; j<divs.length; j++){
			if (divs[j].firstChild != null && tieneBola(divs[j].firstChild)) {
				return false;
			}
		}
	}
	return true;
}

/*#######################################################################################
                     ALTERACIONES AL CSS
#########################################################################################*/
//CSS
function deshabilita(htmlElem){
	htmlElem.classList.add(vg.tipoElem.deshab);	
}
function habilita(htmlElem){
	htmlElem.classList.remove(vg.tipoElem.deshab);	
}
function marcaMenuSel(){
	vg.elemDom.menuSel.classList.remove(vg.tipoElem.menu);
	vg.elemDom.menuSel.classList.add(vg.tipoElem.menuSel);
}
function desmarcaMenuSel(){
	vg.elemDom.menuSel.classList.remove(vg.tipoElem.menuSel);
	vg.elemDom.menuSel.classList.add(vg.tipoElem.menu);
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
function ponImagen(casilla){
	var elem = document.createElement("img");
	elem.src = vg.elemDom.menuSel.src;
	elem.className = 'elemMapaImg';
	elem.onmousedown = function(){return false};
	casilla.appendChild(elem);
	vg.flags.spuesto = true;
}
function quitaImagen(casilla){
	casilla.removeChild(casilla.firstChild);
}
function borraMapa(){
	for (var i=0; i<vg.elemDom.casillas.length; i++){
		var hijo = vg.elemDom.casillas[i].firstChild;
		if (hijo != null){
			vg.elemDom.casillas[i].removeChild(hijo);
		}
	}
	habilita(vg.elemDom.pacman);
}
function creaMapa(){
	vg.dim.cols = vg.dim.colsIni;
    for (let i=0; i<vg.dim.filasIni; i++) {
    	ponFila();
	}
	var imgs = document.getElementsByTagName('img');
	for(let i=0; i<imgs.length; i++){
		imgs[i].onmousedown = function(){return false};
	}
}
function ponFila(){
	vg.dim.filas += 1;
	var fila = document.createElement('div');
	fila.id = 'fila' + vg.dim.filas;
	vg.elemDom.mapa.appendChild(fila);
	fila.className = 'filaMapa';
	vg.elemDom.mapa.appendChild(fila);
	for (let i=0; i<vg.dim.cols; i++){
		ponCasilla(vg.dim.filas, i);
	} 
}
function quitaFila(){
	vg.dim.filas -= 1;
	vg.elemDom.mapa.removeChild(vg.elemDom.mapa.lastChild);
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



/*#######################################################################################
                    POPUP
#########################################################################################*/

var popup = {
	msg : '',
	noMsg : 'No',
	siMsg : 'Si',
	input : false,
	si : false,
	no : true,
	tipo : undefined,
	elemDom : {
		fondoPopup : document.getElementsByClassName("popup")[0],
		popup : document.getElementById("confirma"),
		popupMsg : document.getElementById("popupMsg"),
		popupInput : document.getElementById("popupInput"),
		popupBtnYes : document.getElementById("popupBtnYes"),
		popupBtnNo : document.getElementById("popupBtnNo"),
		popupBtnNoMsg : document.getElementById("popupBtnNoMsg"),
		popupBtnYesMsg : document.getElementById("popupBtnYesMsg")
	},
	limpia : function(){
		this.msg = '';
		this.noMsg = 'No';
		this.siMsg = 'Si';
		this.input = false;
		this.si = false;
		this.no = true;
		this.tipo = undefined;
	},
	carga : function() {
		this.elemDom.popupMsg.innerHTML = this.msg;
		this.elemDom.popupInput.style.display = this.input ? 'block' : 'none';
		this.elemDom.popupBtnYes.style.display = this.si ? 'inline-block' : 'none';
		this.elemDom.popupBtnNo.style.display = this.no ? 'inline-block' : 'none';
		this.elemDom.popupBtnNoMsg.innerHTML = this.noMsg;
		this.elemDom.popupBtnYesMsg.innerHTML = this.siMsg;
	},
	pon : function() {
		this.elemDom.fondoPopup.style.display = 'block';
		this.elemDom.popup.style.display = 'block';
	}, 
	quita : function(){
		this.elemDom.fondoPopup.style.display = 'none';
		this.elemDom.popup.style.display = 'none';
	}
}

function ponPopup(cual, msg){
	if (cual == "noPacman") {
		popup.msg = "¡¿Es que quieres jugar sin prota?!<br />Vete a ver la tele!";
		popup.noMsg = "Va, pongo uno.";
	}
	else if (cual == "noNombre") {
		popup.msg = "Has hecho algo, por eso de nombrarlo... nombre?";
		popup.input = true;
		popup.siMsg = "Guardar";
		popup.noMsg = "Cancelar";
	} 
	else if (cual == "borra") {
		popup.msg = "¿Seguro que quieres limpiar el mapa?";
	} 
	else if (cual == "noComida") {
		popup.msg = "Si no pones al menos una bolita...<br /> ¡el juego no acaba!";
		popup.noMsg = "Venga va, pongo alguna";
	}
	else if (cual == 'guardada') {
		popup.msg = "Guardado! Quieres probarlo? Dale a mapas de usuarios.";
		popup.siMsg = "Mapas de usuarios";
		popup.noMsg = "Dejame aqui otro ratito";
	}
	else if (cual == 'error') {
		popup.msg = msg;
		popup.noMsg = "Anda que...";
	}
	popup.si = cual == "noNombre" || cual == "borra" || cual == "guardada";
	popup.tipo = cual;
	popup.carga();
	popup.pon();
}

function popupClick(btn){
	if (popup.tipo == 'noNombre'){
		var cajatxtnombrepop = document.getElementById("popupInput");
		if (cajatxtnombrepop.style.display != "none" && cajatxtnombrepop.value != "") {
			vg.elemDom.nombre.value = cajatxtnombrepop.value.trim();
		} else {
			vg.elemDom.nombre.value = 'Sin nombre';
		}
		guardaMapa();
	}
	if (btn == 'popupBtnYes'){
		if (popup.tipo == 'borra'){
			borraMapa();
		}
	} 
	popup.quita();
	popup.limpia();
}

creaMapa();


function inicializaCanvas(nFilas, nColumn){
	vg.canvas = document.getElementById("canvas");
	canvas.height = nFilas * vg.dim.tmnImg;
	canvas.width = nColumn * vg.dim.tmnImg;
	vg.ctx = canvas.getContext("2d");
	vg.ctx.fillStyle = '#000';
	vg.ctx.fillRect(0,0,canvas.width, canvas.height);
}
function pintaCasillaEnCanvas(x, y, img){
	var tmn = vg.dim.tmnImg;
	vg.ctx.drawImage(img, x*tmn, y*tmn, tmn, tmn);
}
function sacaElemCadena(src){
	var idImg = src.substring(src.lastIndexOf('/')+1, src.length-4);
	return vg.mapingImgSimbolo[idImg];
}
function guardaMapa(){
	var filas = vg.elemDom.mapa.childNodes;
	inicializaCanvas(filas.length, filas[0].childNodes.length);
	var cadena = '';
	for (var i=0; i<filas.length; i++) {
		var casillas = filas[i].childNodes;
		for (var j=0; j<casillas.length; j++){
			if (casillas[j].hasChildNodes()){
				var img = casillas[j].firstChild;
				pintaCasillaEnCanvas(j, i, img);
				cadena += sacaElemCadena(img.src);
			} else {
				cadena += 'x';
			}
		}
	}
	enviaDatos(cadena);
}

function enviaDatos(cadena){
	var img    = vg.canvas.toDataURL("image/png");
	var data = {
		evt : 'pacAltaMapa',
		nombre : vg.elemDom.nombre.value,
		filas : vg.dim.filas+1,
		columnas : vg.dim.cols+1,
		mapadata : cadena,
		imgdata : img
	}

	var url = "http://localhost/juegoskeleto/jskeletobk/puerta.php";
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.withCredentials = true;
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function(){
    	if (this.readyState == 4){
    		if (this.status == 200){
				try {
					var resp = JSON.parse(this.responseText);
					if (resp.ok){
						ponPopup('guardada');
					} else {
						ponPopup('error', resp.error);
					}
				}
				catch(e){
					console.log("Error en el ws: "+e);
				}
			}
		}
    };
}




//        var rutaImg = 'img/';
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
        