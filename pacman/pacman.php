<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"></meta>
        <META NAME="AUTHOR" CONTENT="elb uko">
        <META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="es-ES">
        <link rel="stylesheet" type="text/css" href="css/editor.css">
        <link rel="stylesheet" type="text/css" href="../css/ppal.css">
        <title>Pacman</title>
        <style>#formulario {
				display: inline-block;
				vertical-align: top;
				width: 15%;
				text-align: center;
				min-width: 100px;
				/*border: 1px solid black;*/
			}
        	#pantalla {
				display: inline-block;
				padding-top: 1%;
				width: 60%;
				height: 80%;
				/*border: 1px solid red;*/
			}
			#puntuaciones {
				display: inline-block;
				vertical-align: top;
				width: 15%;
				text-align: center;
				min-width: 100px;
				/*border: 1px solid black;*/
			}
			#puntuacion {
				text-align: right;
				margin-right: 25%;
			}
			#puntuacion p {
				font-style: italic;
			}
			#puntos{
				font-weight: bold;
			}
        </style>
        <?php
        	if ((isset($_GET['mapas']))&&(htmlspecialchars($_GET['mapas'])=='usr')){
            	$mapas = 'usr';
            	if ($handle = opendir('autogenerados')) {
	                while (false !== ($entry = readdir($handle))) {
	                    if (substr($entry,-3)==".js"){
	                        $version = $entry;
	                    }
	                }
	                closedir($handle);
	            }
			}
			else{
				$mapas = 'std';	
			}
			if (isset($_GET['nivel'])){
            	$nivel = htmlspecialchars($_GET['nivel']);
            }
			else {
				$nivel = 0;	
			}

            if ($mapas=="usr"){
                echo("<script type='text/javascript' src='autogenerados/$version'></script>");
                echo("<script>var nivel = $nivel;</script>");
            }
            else{
                echo("<script type='text/javascript' src='js/mapas.js'></script>");  
                echo("<script>var nivel = 0;</script>"); 
            }
			
			//incluyo los archivos necesarios
	        include("../php/dao/consultas.php");
	
	        //consulto los puntos
	        //echo("<script>var puntos = JSON.parse(".damePuntos('snake', 'std').")</scipt>");
	        $puntos = damePuntos('pacman', $mapas.$nivel, 10);
			echo("<script>var tablaPuntos = ".json_encode($puntos)."; console.log(tablaPuntos)</script>\n");
        ?>
        <style>
            canvas {
                border: 1px solid black; 
                display: block;
                margin:auto;  
                vertical-align: middle;
            }
            body {align-items: center;}
        </style>
    </head>
    <body onload="arranca()">
    	<div id="formulario"></div>
    	<div id="pantalla">
	        <canvas id="canvas"></canvas>
			<div id="puntuacion">
				<p>Puntos:</p>
				<p id="puntos">500</p>
			</div>
		</div>
		<div id="puntuaciones">
			<br/>
			<h3>Mejores
			<br>
			Puntuaciones</h3>
			<hr style="width:55%; margin-top:0px;"/>
			<table id='tablaPuntos'>
				<thead><tr><td>Usuario</td><td>Puntos</tr></thead>
				<tbody id='tablaPuntosBody'>
				<?php
					for ($i=0; $i < sizeof($puntos); $i++) { 
						echo("\t\t\t\t<tr id='puntos".$i."' class='puntosF'>\n");
						echo("\t\t\t\t\t<td class='puntosU'>".$puntos[$i]['usuario']."</td>\n");
						echo("\t\t\t\t\t<td class='puntosP'>".$puntos[$i]['puntos']."</td>\n");
						echo("\t\t\t\t</tr>\n");
					}
				?>
				</tbody>
			</table>
		</div>
		<audio id="audioTestElem" autoplay onEnded="this.currentTime = 0.345;" preload="auto" >
			<!--<source src="PacmanBuko.mp3" type="audio/mpeg" >-->
      	 	<source src="PacmanBuko.ogg" type="audio/ogg; codecs=vorbis">
     		<!--<source src="PacmanBuko.m4a" type="audio/mp4" >-->
      		no audio for you
    	</audio>
        <script type="text/javascript" src="js/variables.js"></script>
        <script type="text/javascript" src="js/controlDeTeclado.js"></script>
        <script type="text/javascript" src="js/mueve.js"></script>
        <script type="text/javascript" src="js/pinta.js"></script>
        <script type="text/javascript" src="js/iaCutre.js"></script>
        <script type="text/javascript" src="js/iaBuena.js"></script>
        <script type="text/javascript" src="js/principal.js"></script>
        <script>
        		function actualizaPuntuacion () {
					ajax.open('POST', '../php/control/controlPuntos.php', true);
					ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					console.log("llamo con puntos: "+puntos+ " y nivel: "+nivel);
					<?php echo("var envia = 'juego=pacman&modo=".$mapas."'+nivel+'&puntos='+puntos;\n");?>
					ajax.send(envia);
				}
		
        </script>
    </body>
</html>

