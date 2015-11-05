<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"></meta>
        <META NAME="AUTHOR" CONTENT="elb uko">
        <META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="es-ES">
        <title>Pacman - editor de niveles</title>
        <link rel="stylesheet" type="text/css" href="css/editor.css">
        <link rel="stylesheet" type="text/css" href="../css/ppal.css">
        <script type="text/javascript" src="js/editor.js"></script>
        <?php            
            if ($handle = opendir('autogenerados')) {
                while (false !== ($entry = readdir($handle))) {
                    if (substr($entry,-3,strlen($entry))==".js"){
                        $version = $entry;
                    }
                }
                closedir($handle);
            }
            echo("<script type='text/javascript' src='autogenerados/$version'></script>");
        ?>
        </head>
    <body>
        <div id="editor">
            <div id="menu"></div>
            <div id="mapa"></div>
        
            <div id="opciones">
                <div><img id="ojo" class="opcion" src="img/ojo.png"/></div>
                <div><img id="papelera" class="opcion" src="img/papelera.png"/></div>
                <div>
                    <p>Columnas</p>
                    <img id="masC" class="opcion" src="img/mas.png"/>
                    <img id="menosC" class="opcion" src="img/menos.png"/>
                </div>
                <div>
                    <p>Filas</p>
                    <img id="masF" class="opcion" src="img/mas.png"/>
                    <img id="menosF" class="opcion" src="img/menos.png"/>
                </div>
                <div>
                    <p>Nombre:</p>
                    <input id="nombre" type="text" maxlength="20">
                </div>
                <div id="guardar" onClick="verificaGuarda()" ><p>Guardar</p></div>
            </div>
        </div>
        <center><a href="autogenerados/mapasUsuarios.html"><p id="mapasUsuarios">mapas de usuarios</p></a></center>
        <canvas id="canvas" style="display: none;"></canvas>
        
        <!--Popups-->
        <div class="popup" style="display: none;"></div>
        <div id="confirma" class="popupVentana" style="display: none;">
            <p id="popupMsg"></p>
            <input id="popupNombre" type="text" maxlength="20" style="display: none;">
            <button id="popupBtnYes" class="popupBtn" onClick="verificaGuarda()" style="display: none;">
                <p id="popupBtnYesMsg"></p>
            </button>
            <button id="popupBtnGo" class="popupBtn" onClick="document.location.href = 'autogenerados/mapasUsuarios.html'" style="display: none;">
                <p id="popupBtnGoMsg"></p>
            </button>
            <button id="popupBtnNo" class="popupBtn" onClick="quitaPopup('confirma')">
                <p id="popupBtnNoMsg"></p>
            </button>
        </div>
        <script>
            //eventos
            document.addEventListener('mouseover',rEntra);
            document.addEventListener('mouseout',rSale);
            document.addEventListener('mousedown',rPincha);
            document.addEventListener('mouseup',rSuelta);
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
            var elMenuSel='img/par20V.png';

            //localizacion de imagenes
            var src = ['img/pacmanE1.png', 'img/fantasma1.png', 'img/fantasma2.png', 'img/fantasma3.png', 'img/bola.png', 'img/bolon.png', 'img/par20V.png','img/par20H.png','img/esq20NO.png','img/esq20NE.png','img/esq20SO.png','img/esq20SE.png', 'img/esqOC.png','img/esqNC.png','img/esqEC.png','img/esqSC.png','img/esqCC.png','img/borrar.png'];


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
                            direcc = divs[j].firstChild.src
                            nombreImg = direcc.slice(direcc.lastIndexOf('/')+1,direcc.length);
                            //[val, pos] = sacaImagen(nombreImg)     NO TIRA en CHROME
                            cosa = sacaImagen(nombreImg)
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
                ajax.open('POST', "cargaMapa.php", true);
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                var envia = "imgData="+img+"&mapadata="+cadena+"&nombre="+nombre+"&filas="+nFilas+"&columnas="+nColumn+"&numMapa="+pantalla.length;
                ajax.send(envia);

                var boton = document.getElementById("guardar");
                boton.disabled = true;
                console.log(cadena)
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
                        ponPopup('guardado');
                    } else {
                        alert('No se ha podido guardar');
                    }   
                }             
            }
            generaEditor();
        </script>
    </body>
</html>


