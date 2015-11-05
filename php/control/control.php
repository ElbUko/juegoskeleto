<?php
include("session.php");										# archivo con el manejo de las sesiones
include(dirname(__DIR__)."/dao/consultas.php");				

$usr = htmlspecialchars($_POST['usr']);						# Recojo los parametros
$pass = htmlspecialchars($_POST['psswd']);
$respuesta[]= null;

if ($usr == 'deslogame'){
	$respuesta['invitado'] = logout();
	$respuesta['popup'] = false;
	$respuesta['login'] = false;
}
else {
	$registros = findUsers($usr);
	#Si el usuario no esta registrado lo creo
	$respuesta['popup'] = true;
	$respuesta['login'] = false;
	if (count($registros) == 0) {
		$nuevo_id = meteUsuario($usr,$pass);
		if ($nuevo_id != 0) {
			$respuesta['login'] = true;
			$respuesta['mensajePopup'] = "Bienvenido a Juegoskeleto!";
		}
		else {
			$respuesta['mensajePopup'] = "Hubo un problema en la insercion en nuestra base de datos";	
		}
	}
	else {
		if (($pass != null)&&($pass == $registros[0]['password'])){
			$respuesta['login'] = true;
			$respuesta['popup'] = false;
		}
		else {
			$respuesta['mensajePopup'] = "El usuario existe y esta no es la contraseña guardada";
		}
	}
}

if ($respuesta['login']){	
	login($usr);
}

echo json_encode($respuesta);






/*create table puntos(
    -> id int(11) not null auto_increment primary key,
    -> juego varchar(20) not null,
    -> modo varchar(20),
    -> usuario varchar(25) not null,
    -> puntos int(12) not null) engine= innodb;*/
?>
