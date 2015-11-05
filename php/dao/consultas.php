<?php
include_once(dirname(__DIR__)."../../config.php");								# Archivo en el que almaceno las variables de conexion


#######################################################################################
##########				INDEX / GENERAL			###############################
############################################################################

function findUsers($usr){
	global $host, $root, $clave, $db;
	$conn = mysqli_connect($host, $root, $clave, $db);		# Abro conexion con la BBDD
	$registros = array();
	$sql = "SELECT * FROM usuarios where username like ?";		# Preparo la sentencia
	$pre = mysqli_prepare($conn, $sql);							# Preparo la consulta
	mysqli_stmt_bind_param($pre, "s", $usr);					# indico los datos a reemplazar con su tipo
	mysqli_stmt_execute($pre);									# Ejecuto la consulta
	mysqli_stmt_bind_result($pre, $id, $username, $password);		# asocio los nombres de campo a nombres de variables
	while(mysqli_stmt_fetch($pre)) {							# Capturo los resultados y los guardo en un array
	$registros[] = array('id'=>$id,
						'username'=>$username,
						'password'=>$password);
	}
	mysqli_stmt_close($pre);									# Cierro la consulta
	mysqli_close($conn);										# Cierro la conexion
	return $registros;											# Devuelvo los usuarios
}

function meteUsuario($usr, $pass){
	global $host, $root, $clave, $db;
	$conn = mysqli_connect($host, $root, $clave, $db);		# Abro conexion con la BBDD
	$sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
	$pre = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($pre, "ss", $usr, $pass);
	mysqli_stmt_execute($pre);
	$nuevo_id = mysqli_insert_id($conn);
	mysqli_stmt_close($pre);
	mysqli_close($conn);										# Cierro la conexion
	return $nuevo_id;
}

function damePuntos($juego, $modo, $cantidad){
	global $host, $root, $clave, $db;
	$conn = mysqli_connect($host, $root, $clave, $db);		# Abro conexion con la BBDD
	$registros = array();
	$sql = "SELECT * FROM puntos WHERE juego LIKE ? AND modo LIKE ? ORDER BY puntos DESC LIMIT ?";		# Preparo la sentencia
	$pre = mysqli_prepare($conn, $sql);							# Preparo la consulta
	mysqli_stmt_bind_param($pre, "ssi", $juego, $modo, $cantidad);					# indico los datos a reemplazar con su tipo
	mysqli_stmt_execute($pre);									# Ejecuto la consulta
	mysqli_stmt_bind_result($pre, $id, $juego, $modo, $jugador, $puntos);		# asocio los nombres de campo a nombres de variables
	while(mysqli_stmt_fetch($pre)) {							# Capturo los resultados y los guardo en un array
	$registros[] = array('id'=>$id,
						'juego'=>$juego,
						'modo'=>$modo,
						'usuario'=>$jugador,
						'puntos'=>$puntos);
	}
	mysqli_stmt_close($pre);									# Cierro la consulta
	mysqli_close($conn);										# Cierro la conexion
	return $registros;											# Devuelvo los usuarios
}

function metePuntos($juego, $modo, $jugador, $puntos){
	global $host, $root, $clave, $db;
	$conn = mysqli_connect($host, $root, $clave, $db);		# Abro conexion con la BBDD
	$sql = "INSERT INTO puntos (juego, modo, usuario, puntos) VALUES (?, ?, ?, ?)";
	$pre = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($pre, "sssi", $juego, $modo, $jugador, $puntos);
	mysqli_stmt_execute($pre);
	$nuevo_id = mysqli_insert_id($conn);
	mysqli_stmt_close($pre);
	mysqli_close($conn);										# Cierro la conexion
	return $nuevo_id;
}


#######################################################################################
##########				PACMAN			###############################
############################################################################



?>