<?php
/*	Recibo los datos del post:
 * 	EL 1er parametro es la accion: Crear, borrar o editar. En funcion de eso redirijo a cada una de las funciones:
 * 		- acc:	cre | edi | bor
 */
 session_start();    
 if (isset($_SESSION['usuario'])){
	$usuario = $_SESSION['usuario'];
 }
 else {
	$usuario = "nobody";
 }
 if (isset($_POST['acc'])){
 	$acc = htmlspecialchars($_POST['acc']);
	 echo $acc;
	if ($acc != 'bor') {
		$img64 = htmlspecialchars($_POST['imgData']);
	    $img64 = str_replace(" ","+",$img64);           //En el post todos los + se cambian por espacios!
	    $img = base64_decode(substr($img64,22));
	    $pantalla = htmlspecialchars($_POST['mapadata']);
	    $nombre = htmlspecialchars($_POST['nombre']);
	    $nFil = htmlspecialchars($_POST['filas']);
	    $nCol = htmlspecialchars($_POST['columnas']); 
	}
	$resultao = null;
 	switch ($acc) {
		case 'cre':
			/*	Parametros de esta accion:
			 * 		- imgData: 	string base64 con la info de la foto
			 *		- mapadata: la info del mapa para js
			 *		- nombre:	un string con el nombre del mapa (***verificar aqui que no se meten exploits)
			 *		- nFilas y nColumnas:	La info del tamaño del mapa
			 */
		    $resultao = creaMapa($usuario, $img, $pantalla, $nombre, $nFil, $nCol);
			break;
		case 'edi':
			/* Venga va, sera borrado y creacion. Pametros; ambos
			 */
			$id = htmlspecialchars($_POST['id']);
			$nombreV = htmlspecialchars($_POST['nombreV']);
			borraMapa($usuario, $id, $nombreV);
			$resultao = creaMapa($usuario, $img, $pantalla, $nombre, $nFil, $nCol);
			break;
		case 'bor':
			/* Parametros de esta accion
			 * 		-id y nombre porseaca
			 */
			$id = htmlspecialchars($_POST['id']);
			$nombre = htmlspecialchars($_POST['nombre']);
			borraMapa($usuario, $id, $nombre);
			break;
  	}
	return $resultao;
}



function creaMapa($usuario, $img, $pantalla, $nombre, $nFil, $nCol){
	$nombreComp = dirname(__DIR__)."/../img/mapasUsuarios/$nombre.png";	
	//GUARDO UN FICHERO .PNG CON LA IMAGEN DE LA PANTALLA
	//Creo una imagen en memoria a partir de la cadena en base64:pacman/autogenerados
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
    imagepng($nuevaImg,$nombreComp);            //El directorio esta en $nombreComp
    imagedestroy($nuevaImg);
    imagedestroy($im);
	
	//LLAMO A CONSULTAS PARA HACER LA INSERCION EN BBDD
	include_once(dirname(__DIR__)."/dao/consultas.php");	
	$chulta = metePantalla($pantalla, $nombre, $usuario, $nFil, $nCol);
	return $chulta;
	
}

/*
function editaMapa($id, $img, $pantalla, $nombre, $nFil, $nCol){
	$nombreComp = dirname(__DIR__)."/../img/mapasUsuarios/$nombre.png";
	//LLAMO A CONSULTAS PARA HACER LA EDICION EN BBDD
	include(dirname(__DIR__)."/dao/consultas.php");	
	session_start();    
	if (isset($_SESSION['usuario'])){
		$usuario = $_SESSION['usuario'];
	}
	else {
		$usuario = "nobody";
	}
	$registro = damePantallaPorId($id);
	if ($registro[0]['usuario']== $usuario){
		editaPantalla($id, $pantalla, $nombre, $nFil, $nCol);
		return "pantalla: $pantalla \n nombre: $id, $nombre.png  Usuario: $usuario Filas: $nFil Columnas: $nCol";
	}
	else {
		return "Error: El usuario no es el correcto";
	}
}*/

function borraMapa($usuario, $id, $nombre){
	//LLAMO A CONSULTAS PARA HACER EL BORRADO EN BBDD
	include_once(dirname(__DIR__)."/dao/consultas.php");	
	$registro = damePantallaPorId($id);
	if ($registro[0]['usuario']== $usuario && $registro[0]['nombre']==$nombre){
		$resul = borraPantalla($id, $nombre);
		if ($resul == true){					//Si ha devuelto true el borrado de pantalla, borro la imagen
			$nombreComp = dirname(__DIR__)."/../img/mapasUsuarios/$nombre.png";
			unlink($nombreComp);			
		}		
		else{
			return "Lo sentimos, hubo un error";
		}
	}
	else {
		return "Lo sentimos, hubo un error";
	}
	header('Location: ../vistas/pacmanUsrs.php');
}
?>