<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="AUTHOR" content="elb uko">
        <meta http-equiv="content-language" content="es-ES">
        <META http-equiv="cache-control" content="no-cache">
        <title>Pacman - mapas de usuarios</title>
        <link rel="stylesheet" type="text/css" href="../../css/ppal2.css">
    </head>
    <body>
		<script src="../../js/pacmanUsrs.js"></script>
    	<h3 id='mapasUsuarios'>Mapas de Usuarios</h3>
    	<p id='disclaimer3'>Estas son las pantallas hechas por otros usuarios. Si quieres hacer tus propias pantallas puedes hacerlo en el 
    		<a href="../../pacman/editor.php" id="mapasUsrBtnEditor">EDITOR de mapas!!</a>
    	</p>
    	<div>
    		<?php 
	    		session_start();    
	    		$usuario = $_SESSION['usuario'];
    			include(dirname(__DIR__)."/dao/consultas.php");	
    			$pantallas = damePantallas();
				for ($i=0; $i < sizeof($pantallas); $i++){
					echo("
						<div class='mapaElem'>
							<a href='../../pacman/pacman.php?mapas=usr&id=".$pantallas[$i]['id']."'>
								<p class='mapaNombre'>".$pantallas[$i]['nombre']."</p>
								<img src='../../img/mapasUsuarios/".$pantallas[$i]['nombre'].".png' class='mapaFoto'>
							</a>
							<div id='mapasNotas'>
								<p class='mapaUsr'>".$pantallas[$i]['usuario']."</p>"
					);
								if ($usuario == $pantallas[$i]['usuario']){
									echo("
										<form action='../../pacman/editor.php' method='post' class='mapaForm'>
							    			<input type='hidden' name='id' value='".$pantallas[$i]['id']."' />
							    			<input type='hidden' name='nombre' value='".$pantallas[$i]['nombre']."' />
							    			<input type='hidden' name='pantalla' value='".$pantallas[$i]['pantalla']."' />
							    			<input type='hidden' name='columnas' value='".$pantallas[$i]['columnas']."' />
							    			<input type='hidden' name='filas' value='".$pantallas[$i]['filas']."' />
							    			<input type='submit' value='' id='mapaBtnEdit' class='mapaBtnForm' alt='Editar' title='Editar pantalla'/>
							    		</form>
										<form action='../control/pacmanGuardaMapa.php' method='post' class='mapaForm'>
											<input type='hidden' name='acc' value='bor' />
							    			<input type='hidden' name='id' value='".$pantallas[$i]['id']."' />
							    			<input type='hidden' name='nombre' value='".$pantallas[$i]['nombre']."' />
							    			<input type='submit' value='' id='mapaBtnBorra' class='mapaBtnForm' alt='Borrar' title='Borrar pantalla'/>
							    		</form>
									");	
								}
					echo("	
							</div>
						</div>
					");
				}				
    		?>
		</div>
	</body>
</html>