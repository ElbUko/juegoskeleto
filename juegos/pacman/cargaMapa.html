<?php
	/*	Recibo los datos del post: 
	 *		- imgData: 	string base64 con la info de la foto
	 *		- mapadata: la info del mapa para js
	 *		- nombre:	un string con el nombre del mapa (***verificar aqui que no se meten exploits)
	 *		- nFilas y nColumnas:	La info del tamaño del mapa
     *      - numMapa:  La posicion guardada en mapasUsuarios.js
	 */
    $img64 = htmlspecialchars($_POST['imgData']);
    $img64 = str_replace(" ","+",$img64);           //En el post todos los + se cambian por espacios!
    $img = base64_decode(substr($img64,22));
    $mapa = htmlspecialchars($_POST['mapadata']);
    //$mapajs .= "]";
    $nombre = htmlspecialchars($_POST['nombre']);
    $nombreComp = "mapasUsuarios/$nombre.png";
    $nFil = htmlspecialchars($_POST['filas']);
    $nCol = htmlspecialchars($_POST['columnas']);
    $numMapa = htmlspecialchars($_POST['numMapa']);



    //Creo una imagen en memoria a partir de la cadena en base64:
    $im = imagecreatefromstring($img);
    if ($im !== false) {
        header('Content-Type: image/png');
        imagepng($im);
        //imagedestroy($im);
    }
    else {
        echo 'An error occurred.';
    }
    //Creo el fichero para almacenar la imagen creada en memoria
    $ancho = 10*$nCol;
    $alto = 10*$nFil;
    $nuevaImg = imagecreatetruecolor($ancho, $alto);
    imagecopy($nuevaImg, $im, 0,0,0,0, $ancho, $alto);
    imagepng($nuevaImg,"autogenerados/".$nombreComp);            //El directorio esta en $nombreComp
    imagedestroy($nuevaImg);
    imagedestroy($im);


    //Cambio el nombre al archivo mapasUsuariosXX.js para forzar al servidor a darlo de nuevo si se cambia
    if ($handle = opendir('autogenerados')) {
        echo "Directory handle: $handle\n";
        echo "Entries:\n";
        /* This is the correct way to loop over the directory. */
        while (false !== ($entry = readdir($handle))) {
            echo "$entry\n";
            if (substr($entry,-3,strlen($entry))==".js"){
                $version = substr($entry,13,-3)+1;          //13 es "mapasUsuarios" y -13 es ".js"
                $nuevo = "mapasUsuarios".$version.".js";
                rename("autogenerados/$entry","autogenerados/$nuevo");
            }
        }
        closedir($handle);
    }


    //Trato la info del mapa para escribirla como se debe y guardarla en el fichero js
    $mapajs = "\n,[\n";
    $caracter = 0;
    for ($i=0; $i <=strlen($mapa)-1 ; $i++) {      //para cada caracter de mapa recibido:
        if ($i % $nCol == 0){                   //si empieza una nueva fila añado vector js
            $mapajs .= '[';
        }
        if (($mapa[$i]=='d')||($mapa[$i]=='z')){  //para codificar 10 y 11 que no cabian en 1 caracter
            $mapajs .= '1';                 //añado el 1
            $mapa[$i]=($mapa[$i]=='d')?'0':'1';     //cambio el d o c por 0 o 1     
            $mapajs .= ($i % $nCol == $nCol-1)?"$mapa[$i]],\n":"$mapa[$i],";    //lo inserto sin espacio
        }  
        else {
            $mapajs .= ($i % $nCol == $nCol-1)?" $mapa[$i]],\n":" $mapa[$i],";
        }
    }
    $mapajs = rtrim($mapajs,", \n");
    $mapajs .= "]\n];";
    //Guardo el mapa en js
    //$archivo = "js/mapasUsuarios.js";
    $recurso = fopen("autogenerados/$nuevo", "r+");   
    fseek($recurso, -2, SEEK_END);
    fwrite($recurso, $mapajs);
    fclose($recurso);   

   

    //Añado la imagen a mapasUsuarios.html
    //Primero creo el contenido a añadir
    $nuevoContenido = "\n\t\t\t<a href='../pacman.php?mapas=usr&nivel=$numMapa' >\n";
    $nuevoContenido .= "\t\t\t\t<div class='mapaElem'>\n";
    $nuevoContenido .= "\t\t\t\t\t<div class='mapaNombre'>\n";
    $nuevoContenido .= "\t\t\t\t\t\t<p class='mapanombre'>$nombre</p>\n";
    $nuevoContenido .= "\t\t\t\t\t</div>\n";
    $nuevoContenido .= "\t\t\t\t\t<div class='mapaFoto'>\n";
    $nuevoContenido .= "\t\t\t\t\t\t<img src='$nombreComp' />\n";
    $nuevoContenido .= "\t\t\t\t\t</div>\n";
    $nuevoContenido .= "\t\t\t\t</div>\n";
    $nuevoContenido .= "\t\t\t</a>\n";
    $nuevoContenido .= "\t\t</div>\n";
    $nuevoContenido .= "\t</body>\n";
    $nuevoContenido .= "</html>";
    //y entro al archivo a guardar
    $archivo = "autogenerados/mapasUsuarios.html";
    $recurso = fopen($archivo, "r+");   
    fseek($recurso, -26, SEEK_END);
    fwrite($recurso, $nuevoContenido);
    $bytes = filesize($archivo);
//    $contenido = fread($recurso, $bytes);
    fclose($recurso);   


?>