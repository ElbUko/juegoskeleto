<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"></meta>
        <META NAME="AUTHOR" CONTENT="elb uko">
        <META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="es-ES">
        <link rel="stylesheet" type="text/css" href="css/editor.css">
        <link rel="stylesheet" type="text/css" href="../css/ppal.css">
        <script type="text/javascript" src="js/variables.js"></script>
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
            canvas {
                border: 1px solid black; 
                display: block;
                margin:auto;  
                vertical-align: middle;
            }
            body {align-items: center;}
        </style>
        <?php
			//incluyo los archivos necesarios
	        include_once("../php/dao/consultas.php");
	        
        	if ((isset($_GET['mapas']))&&(htmlspecialchars($_GET['mapas'])=='usr')){
            	$mapas = 'usr';
            	/*if ($handle = opendir('autogenerados')) {
	                while (false !== ($entry = readdir($handle))) {
	                    if (substr($entry,-3)==".js"){
	                        $version = $entry;
	                    }
	                }
	                closedir($handle);
	            }*/
			}
			else{
				$mapas = 'std';	
			}
			if (isset($_GET['id'])){
            	$nivel = htmlspecialchars($_GET['id']);
				$pantalla = damePantallaPorId($nivel)[0];
				$mapa = $pantalla['pantalla'];
				$nCol = $pantalla['columnas'];
				$nFil = $pantalla['filas'];
				$pantallaId = $pantalla['id'];
				$mapajs = "";
			    $caracter = 0;
			    for ($i=0; $i <=strlen($mapa)-1 ; $i++) {      //para cada caracter de mapa recibido:
			        if ($i % $nCol == 0){                   //si empieza una nueva fila añado vector js
			            $mapajs .= '[';
			        }
					if ($mapa[$i] == 'x'){
						$mapajs .= ($i % $nCol == $nCol-1)?"],":" ,";
					}
					elseif (($mapa[$i]=='d')||($mapa[$i]=='z')){  //para codificar 10 y 11 que no cabian en 1 caracter
			            $mapajs .= '1';                 //añado el 1
			            $mapa[$i]=($mapa[$i]=='d')?'0':'1';     //cambio el d o c por 0 o 1     
			            $mapajs .= ($i % $nCol == $nCol-1)?"$mapa[$i]],":"$mapa[$i],";    //lo inserto sin espacio
			        }  
					else {
			            $mapajs .= ($i % $nCol == $nCol-1)?" $mapa[$i]],":" $mapa[$i],";
			        }
			    }
			    $mapajs = rtrim($mapajs,",");
			    $mapajs .= "";
            }
			else {
				$nivel = 0;	
			}

            if ($mapas=="usr"){
                //echo("<script type='text/javascript' src='autogenerados/$version'></script>");
                echo("<script>
                console.log('eoveo');
                var p='pacman',c='ciego',l='listillo',a='asesino',o='bola',O = 'bolon';
                var nivel = 0;"); 
                if (isset($pantallaId)){
                	echo("pantallaId = $pantallaId;");
                }
				echo("
                mapasUsr = true; 
                mapa.elem = [$mapajs];
                </script>");
            }
            else{
                echo("<script type='text/javascript' src='js/mapas.js'></script>");  
                echo("<script>var nivel = 0;</script>"); 
            }
	
	        //consulto los puntos
	        //echo("<script>var puntos = JSON.parse(".damePuntos('snake', 'std').")</scipt>");
	        $puntos = damePuntos('pacman', $mapas.$nivel, 10);
			echo("\n<script>var tablaPuntos = ".json_encode($puntos).";</script>\n");
        ?>
    </head>
    <body onload="arranca();">
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
        <script type="text/javascript" src="js/controlDeTeclado.js"></script>
        <script type="text/javascript" src="js/mueve.js"></script>
        <script type="text/javascript" src="js/pinta.js"></script>
        <script type="text/javascript" src="js/iaCutre.js"></script>
        <script type="text/javascript" src="js/iaBuena.js"></script>
        <script type="text/javascript" src="js/principal.js"></script>
    </body>
</html>

