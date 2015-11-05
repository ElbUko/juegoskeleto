
           
                

var antiguo, actual;
var esFantasma, esPacman;
var pacmanPuesto = false;


/*#######################################################################################
                    GENERACION DEL HTML
#########################################################################################*/
            function generaEditor(){
            //la cuadricula del menu
                var k = 0, elem, fila, id;
                while (k<src.length){
                    if (k%2==0){
                        fila = document.createElement("div");
                        fila.className = "filaMenu";
                        menu.appendChild(fila);
                    }
                    elem = document.createElement("img");
                    elem.src = src[k];
                    elem.id = src[k];
                    elem.width = tMenu;
                    elem.className = "elemMenu";
                    if (src[k]=='img/par20V.png'){
                        elem.style.border = "4px solid #66ff00";
                    }
                    fila.appendChild(elem);
                    k += 1;
                }
            //la cuadricula para colocar cosas
                for (i = 0; i < nFilas; i++) {
                    fila = document.createElement("div");
                    fila.className = "filaMapa";
                    mapa.appendChild(fila);
                    for (j = 0; j < nColumn; j++) {
                        elem = document.createElement("div");
                        id = i+','+j;
                        elem.id = id;
                        elem.className = "elemMapa";
                        fila.appendChild(elem);
                    }
                }
	        }



/*#######################################################################################
                    CONTROL DE EVENTOS
#########################################################################################*/

   // Control de eventos
            function rPincha(event){
                if (event.target.className == 'elemMenu') {
                    clickaMenu(event, 'clicka');
                }
                else if ((!pinchao)&&(!puesto)&&((event.target.className == 'elemMapa')||(event.target.className == 'elemMapaImg'))) {
                    pinchao = true;
                    clickao(event);
                }
                else if ((event.target.className == 'opcion')&&(event.target.id != 'ojo')){
                    quitaPonFC(event);
                }
            }
            function rSuelta(){
                pinchao = false;
                puesto = false;
            }
            function rEntra(event){
                var donde = event.target.className;
                if ((donde == 'elemMenu')&&(event.target.id != elMenuSel)) {
                    clickaMenu(event, 'entra');
                }
                else if (donde == 'opcion'){
                    decoraOpciones(event);
                }
                else if (((donde == 'elemMapa')||(donde == 'elemMapaImg'))&&(pinchao)&&(!puesto)) {
                    clickao(event);
                }
                entrao = true;
            }
            function rSale(event){
                if ((event.target.className == 'elemMenu')&&(event.target.id != elMenuSel)) {
                    clickaMenu(event, 'sale');
                }
                entrao = false;
                if (event.target.id == 'ojo'){
                    var casillas = document.getElementsByClassName('elemMapa');
                    for (var i=0; i<casillas.length; i++){
                        casillas[i].style.borderTop = '1px solid white';
                        casillas[i].style.borderLeft = '1px solid white';
                    }
                    mapa.style.marginRight = 0+'px';
                    mapa.style.marginLeft = 0+'px';
                }
                if (event.target.className == 'opcion'){
                    var casilla = event.target;
                    casilla.style.border = '2px solid white';
                }
                puesto = false;
            }




/*#######################################################################################
                    FUNCIONES PRINCIPALES
#########################################################################################*/                    
//VARIABLES GLOBALES IMPORTANTES:
//    elMenuSel:      almacena que elemento del menu está seleccionado (ej: /img/pacmanE1.png)


            function clickaMenu(event,accion){
                var clickao = event.target.id;
                switch (accion){
                    case "clicka": 
                        if (elMenuSel != ""){
                            antiguo = document.getElementById(elMenuSel);
                            antiguo.style.border = "4px solid #aaa";
                        }
                        elMenuSel = clickao;
                        actual = document.getElementById(clickao);
                        actual.style.border = "4px solid #66ff00";
                        break;
                    case "entra":
                        clickao = document.getElementById(clickao);
                        clickao.style.border = "4px solid orange";
                        break;
                    case "sale":
                        clickao = document.getElementById(clickao);
                        clickao.style.border = "4px solid #aaa";
                        break;
                    default:
                        console.log('ea');
                }
                return;
            }
            //
            function clickao(event){
                var clickao;
                //Para que si ya se ha bloqueao el poner cmabiando elMenuSel = "" no vuelva a liberar.
                if (elMenuSel != ""){
                    if ((event.target.className == 'elemMapa')||(event.target.className == 'elemMapaImg')) {    //Es del mapa
                        var donde;
                        if (event.target.tagName == 'IMG'){             //ya tiene imagen y la quitamos       
                            clickao = event.target.parentNode.id;
                            donde = event.target.parentNode;
                            if (donde.hasChildNodes){
                                cual = donde.firstChild.src;
                                cual = 'img/' +cual.slice(cual.lastIndexOf('/')+1,cual.length);
                                if (cual != elMenuSel){
                                    if (cual == 'img/pacmanE1.png'){
                                        liberaMenu(cual);
                                    }
                                    donde.removeChild(donde.firstChild);   
                                }
                            }
                        }
                        else {
                            donde = document.getElementById(clickao);
                            clickao = event.target.id;
                        }
                        var elem = document.getElementById(elMenuSel);
                        if (elMenuSel != 'img/borrar.png'){
                            pon(clickao);
                        } 
                        if (elMenuSel == 'img/pacmanE1.png'){
                            bloqueaMenu(elem);
                        }
                    }
                }
            }
            function pon(clickao){
                var donde = document.getElementById(clickao);
                if (!donde.hasChildNodes()){
                    var elem = document.createElement("img");
                    elem.src = elMenuSel;
                    elem.width = tMapa;
                    elem.className = 'elemMapaImg';
                    donde.appendChild(elem);
                    puesto = true;
                }
                return;
            }
            function bloqueaMenu(elem){
                elem.style.opacity = 0.3;
                elem.style.backgroundColor = '#ddd';
                elem.style.border = "4px solid #aaa";
                antiguo = document.getElementById(elMenuSel);
                pacmanPuesto = true;
                elMenuSel = "";
            }
            function liberaMenu(cual){
                var elem = document.getElementById(cual);
                elem.style.opacity = 1;
                elem.style.backgroundColor = '#000';
                pacmanPuesto = false;
            }
            function decoraOpciones(event){
                if (event.target.id == 'ojo'){
                    var casillas = document.getElementsByClassName('elemMapa');
                    for (var i=0; i<casillas.length; i++){
                        casillas[i].style.border = 0;
                    }
                    mapa.style.marginRight = nColumn/2+'px';
                    mapa.style.marginLeft = nColumn/2+'px';
                }
                else {
                    var opcion = event.target;
                    opcion.style.border = '2px solid black';
                    opcion.style.borderRadius = "5%";
                }
            }






/*#######################################################################################
                    DE BONITO DE OPCIONES
#########################################################################################*/
         
            //funcionalidad de los botones de añadir o quitar filas y columnas
            function quitaPonFC(event){
                if (event.target.id == 'papelera'){
                    var casillas = document.getElementsByClassName('elemMapa');
                    for (var i=0; i<casillas.length; i++){
                        if (casillas[i].hasChildNodes()){
                            casillas[i].removeChild(casillas[i].firstChild);
                        }
                    }
                }
                else if (event.target.id == 'masC' ){
                    if (nColumn < maxColumn){
                        var filas = document.getElementsByClassName('filaMapa');
                        var i = 0;
                        for (var i=0; i<filas.length; i++){
                            elem = document.createElement("div");
                            id = i+','+nColumn;
                            elem.id = id;
                            elem.className = "elemMapa";
                            filas[i].appendChild(elem);
                            i += 1;
                        }
                        if (nColumn == minColumn){
                            cambia = document.getElementById('menosC');
                            cambia.style.opacity = 1;
                            cambia.style.backgroundColor = '#fff';
                        }
                        nColumn += 1;
                        if (nColumn == maxColumn){
                            cambia = document.getElementById('masC');
                            cambia.style.opacity = 0.3;
                            cambia.style.backgroundColor = '#ddd';
                        }
                    }
                }
                else if (event.target.id == 'menosC' ){
                    if (nColumn > minColumn){
                        var filas = document.getElementsByClassName('filaMapa');
                        for (var i=0; i<filas.length; i++){
                            filas[i].removeChild(filas[i].lastChild);
                        }
                        if (nColumn == maxColumn){
                            cambia = document.getElementById('masC');
                            cambia.style.opacity = 1;
                            cambia.style.backgroundColor = '#fff';
                        }
                        nColumn -= 1;
                        if (nColumn == minColumn){
                            cambia = document.getElementById('menosC');
                            cambia.style.opacity = 0.3;
                            cambia.style.backgroundColor = '#ddd';
                        }  
                    }
                }
                else if (event.target.id == 'masF' ){
                    if (nFilas < maxFilas){
                        var i = nFilas;
                        fila = document.createElement("div");
                        fila.className = "filaMapa";
                        mapa.appendChild(fila);
                        for (j = 0; j < nColumn; j++) {
                            elem = document.createElement("div");
                            id = i+','+j;
                            elem.id = id;
                            elem.className = "elemMapa";
                            fila.appendChild(elem);
                        }
                        if (nFilas == minFilas){
                            cambia = document.getElementById('menosF');
                            cambia.style.opacity = 1;
                            cambia.style.backgroundColor = '#fff';
                        }
                        nFilas += 1;
                        if (nFilas == maxFilas){
                            cambia = document.getElementById('masF');
                            cambia.style.opacity = 0.3;
                            cambia.style.backgroundColor = '#ddd';
                        }
                    }
                }
                else if (event.target.id == 'menosF' ){
                    if (nFilas > minFilas){
                        mapa.removeChild(mapa.lastChild);
                        if (nFilas == maxFilas){
                            cambia = document.getElementById('masF');
                            cambia.style.opacity = 1;
                            cambia.style.backgroundColor = '#fff';
                        }
                        nFilas -= 1;
                        if (nFilas == minFilas){
                            cambia = document.getElementById('menosF');
                            cambia.style.opacity = 0.3;
                            cambia.style.backgroundColor = '#ddd';
                        }                        
                    }
                }
                return;
            }



         
            
            

/*#######################################################################################
                    POPUP
#########################################################################################*/
function verificaGuarda(){
    var todoBien = true;
    var mensaje = null;
    //comprobar si hay pacman
    if (!pacmanPuesto){
        todoBien = false;
        cual = "noPacman";
    }
    //comprobar que al menos hay una de comida
    var hayComida = false,
        filas = mapa.childNodes,
        divs, direcc;
    for (var i=0; i<filas.length; i++){
        divs = filas[i].childNodes;
        for (var j=0; j<divs.length; j++){
            if (divs[j].firstChild != null){
                direcc = divs[j].firstChild.src;
                if (direcc.slice(direcc.lastIndexOf('/')+1,direcc.length) == 'bola.png'){
                    hayComida = true;
                }
            }
        }
    }
    if (todoBien && !hayComida){
        todoBien = false;
        cual = "noComida";
    }
    //comprobar si ha puesto nombre
    var cajatxtnombrepop = document.getElementById("popupNombre");
    if ((cajatxtnombrepop.style.display != "none")&&(cajatxtnombrepop.value != "")){
        cajatxtnombre.value = cajatxtnombrepop.value;
    }
    if (todoBien && (cajatxtnombre.value == "" || cajatxtnombre.value == undefined)){
        todoBien = false;
        cual = "noNombre";
    }
    //comprobar si ya existe el nombre
    //comprobar si ya existe la pantalla
    if (todoBien){
        todoBien = guardaMapa();
    }
    else {
         ponPopup(cual);
    }
}


function ponPopup(cual){
    var popupBtnYesDisplay = false;
    var fondoPopup = document.getElementsByClassName("popup")[0];
    var popup = document.getElementById("confirma");
    var popupMsg = document.getElementById("popupMsg");
    var popupNombre = document.getElementById("popupNombre");
    var popupBtnYes = document.getElementById("popupBtnYes");
    var popupBtnNoMsg = document.getElementById("popupBtnNoMsg");
    var popupBtnYesMsg = document.getElementById("popupBtnYesMsg");
    switch (cual){      //cual es un problema. Si no lo hay en default casco el "Ha ido bien!"
        case "noPacman": {
            popupMsg.innerHTML = "¡¿Es que quieres jugar sin prota?!<br />Vete a ver la tele!";
            popupBtnYes.style.display = "none";
            popupNombre.style.display = "none";
            popupBtnNoMsg.innerHTML = "Va, pongo uno.";
            break;
        }
        case "noNombre": {
            popupMsg.innerHTML = "Has hecho algo, por eso de nombrarlo... nombre?";
            popupBtnYes.style.display = "inline";
            popupNombre.style.display = "block";
            popupBtnYesMsg.innerHTML = "Guardar";
            popupBtnNoMsg.innerHTML = "Cancelar";
            break;
        }
        case "noComida": {
            popupMsg.innerHTML = "Si no pones al menos una bolita...<br /> ¡el juego no acaba!";
            popupBtnYes.style.display = "none";
            popupNombre.style.display = "none";
            popupBtnNoMsg.innerHTML = "Venga va, pongo alguna";
            break;
        }
        default: {
            popupMsg.innerHTML = "Guardado! Quieres probarlo? Dale a mapas de usuarios.";
            popupBtnYes.style.display = "none";
            popupBtnGoMsg.innerHTML = "Mapas de usuarios";
            popupBtnGo.style.display = "inline-block";
            popupBtnNoMsg.innerHTML = "Dejame aqui otro ratito";
            popupNombre.style.display = "none";
        } 
    }
    fondoPopup.style.display = 'block';
    popup.style.display = 'block';
}

function quitaPopup(cual){
    var fondoPopup = document.getElementsByClassName("popup")[0];
    var popup = document.getElementById(cual);
    fondoPopup.style.display = 'none';
    popup.style.display = 'none';
    var cajatxtnombre = document.getElementById("nombre");
    var cajatxtnombrepop = document.getElementById("popupNombre");
    if ((cajatxtnombrepop.style.display != "none")&&(cajatxtnombrepop.value != "")){
        cajatxtnombre.value = cajatxtnombrepop.value;
    }
}