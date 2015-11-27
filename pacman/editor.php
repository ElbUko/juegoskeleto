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
                <div><img id="ojo" class="opcion" src="../img/pacman/ojo.png"/></div>
                <div><img id="papelera" class="opcion" src="../img/pacman/papelera.png"/></div>
                <div>
                    <p>Columnas</p>
                    <img id="masC" class="opcion" src="../img/pacman/mas.png"/>
                    <img id="menosC" class="opcion" src="../img/pacman/menos.png"/>
                </div>
                <div>
                    <p>Filas</p>
                    <img id="masF" class="opcion" src="../img/pacman/mas.png"/>
                    <img id="menosF" class="opcion" src="../img/pacman/menos.png"/>
                </div>
                <div>
                    <p>Nombre:</p>
                    <input id="nombre" type="text" maxlength="20">
                </div>
                <div id="guardar" onClick="verificaGuarda()" ><p>Guardar</p></div>
            </div>
        </div>
        <center><a href="../php/vistas/pacmanUsrs.php"><p id="mapasUsuarios">mapas de usuarios</p></a></center>
        <canvas id="canvas" style="display: none;"></canvas>
        
        <!--Popups-->
        <div class="popup" style="display: none;"></div>
        <div id="confirma" class="popupVentana" style="display: none;">
            <p id="popupMsg"></p>
            <input id="popupNombre" type="text" maxlength="20" style="display: none;">
            <button id="popupBtnYes" class="popupBtn" onClick="verificaGuarda()" style="display: none;">
                <p id="popupBtnYesMsg"></p>
            </button>
            <button id="popupBtnGo" class="popupBtn" onClick="document.location.href = '../php/vistas/pacmanUsrs.php'" style="display: none;">
                <p id="popupBtnGoMsg"></p>
            </button>
            <button id="popupBtnNo" class="popupBtn" onClick="quitaPopup('confirma')">
                <p id="popupBtnNoMsg"></p>
            </button>
        </div>
        <script src='js/editor2.js'></script>
        <?php           
        	if (isset($_POST['columnas'])){
        		echo "<script>
        				nColumn = ".htmlspecialchars($_POST['columnas']).";
        				nFilas = ".htmlspecialchars($_POST['filas']).";
        			</script>";
			}
			echo "<script>generaEditor();</script>";
	        if (isset($_POST['pantalla'])){
				$pantalla = htmlspecialchars($_POST['pantalla']);
				$nombre = htmlspecialchars($_POST['nombre']);
				$columnas = htmlspecialchars($_POST['columnas']);
				$filas = htmlspecialchars($_POST['filas']);
				$id = htmlspecialchars($_POST['id']);
				echo("
				<script>
					var pantalla = '$pantalla';
					nombre = '$nombre';
					nombreViejo = nombre;
					cajatxtnombre.value = nombre;
					cargaMapa(pantalla);
					id = $id;
					esEdicion = true;		
				 </script>");
	        }
      ?>
    </body>
</html>


