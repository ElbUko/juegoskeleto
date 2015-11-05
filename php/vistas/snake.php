<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="AUTHOR" content="elb uko">
		<meta http-equiv="content-language" content="es-ES">
		<title>Snake</title>
	</head>
	<body onload="generaTablero()" >
		<?php
	        //incluyo los archivos necesarios
	        include("../dao/consultas.php");
	
	        //consulto los puntos
	        //echo("<script>var puntos = JSON.parse(".damePuntos('snake', 'std').")</scipt>");
	        $puntos = damePuntos('snake', 'std', 10);
			echo("<script>var tablaPuntos = ".json_encode($puntos)."; console.log(tablaPuntos)</script>\n");
        ?>
        
		<div id="formulario">
			<br/>
			<h3>Opciones</h3>
			<hr style="width:55%; margin-top:0px;"/>
			<br style="margin-top:5%;"/>
			<label ><i><b>Velocidad:</b></i></label>
			<br/>
			<input type="range"  id="velocidad"  placeholder="50%" style="width:100px;"/>
			<h6 style="margin-top: 0px;"><i>Min<span id="tab"> </span>Max</i></h6>
			<br/>
			<label ><i><b>Se crece...:</b></i></label>
			<br/>
			<label>al nacer:&thinsp;</label>
			<input type="number" id="nacer" min="1" max="50" placeholder="5" style="margin-left: 10px; width:28px;"/>
			<br/>
			<label>al comer:</label>
			<input type="number" id="engorda" min="1" max="10" placeholder="3" style="margin-left: 10px; width:28px;"/>
			<br/>
			<br style="margin-top:5%;"/>
			<label><i><b>Al chocar...</b></i></label>
			<br/>

			<input type="radio" name="valeChocar" />
			&nbsp;Sigues&nbsp;
			<br/>
			<input type="radio" name="valeChocar" checked="true" value="false" style="vertical-align: top;" />
			Mueres
			<br/>

			<br style="margin-top:5%;"/>
			<input type="submit" onclick="tomaConf()" value="Cambiar Ahora" />
			<br/>
			<input type="submit" onclick="empiezaPartida()" value="Empezar Asi" />
		</div>
		<div id="pantalla">

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
		<script>
			var body, pantalla, cuerpo;
		</script>
		<script type="text/javascript" src="../../js/snake.js"></script>
	</body>
</html>
<link type="text/css" rel="stylesheet" href="../../css/snake.css" />