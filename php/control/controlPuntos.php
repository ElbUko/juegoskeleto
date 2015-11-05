<?php
include(dirname(__DIR__)."/control/session.php");					# archivo con el manejo de las sesiones
include(dirname(__DIR__)."/dao/consultas.php");				# Archivo con las consultas a BBDD

$juego = htmlspecialchars($_POST['juego']);						# Recojo los parametros
$modo = htmlspecialchars($_POST['modo']);
$usuario = null;
$puntos = htmlspecialchars($_POST['puntos']);
$respuesta[]= null;

//Tomo al usuario de la sesion
session_start();    
if (isset($_SESSION['usuario'])){
	$usuario = $_SESSION['usuario'];
}
else {
	$usuario = "nobody";
}

$respuesta = null;
if ($puntos != -1){
	metePuntos($juego, $modo, $usuario, $puntos);
}
$respuesta = damePuntos($juego, $modo, 10);


echo json_encode($respuesta);

?>