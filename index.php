<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"></meta>
        <META NAME="AUTHOR" CONTENT="elb uko">
        <META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="es-ES">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JuegosKeleto!</title>
        <link rel="shortcut icon" href="pacman/img/fantasma1.png" type="image/png" />
        <?php
        //incluyo los archivos necesarios
        include("php/control/session.php");

        //Activacion de la sesion
        session_start();    
        if (isset($_SESSION['usuario'])){
            echo("<script>var defaultUsr='".$_SESSION['usuario']."', invitado = false;</script>\n");
        }
        else {
            $usuarioInvitado = creaInvitado();  //Contador para la sesion de invitado
            echo("<script>var defaultUsr= '$usuarioInvitado', invitado = true;</script>\n");
            $_SESSION['usuario'] = $usuarioInvitado;
        }
        ?>
    </head>
    <body>
    	<div id="nav">
            <div id="NavBtns">
                <div class="NavBtn">
                    <a href="portal.html" target="ventana" class="linkMenu">
                        <p class="txtBotonHead">Juegos</p>
                    </a>
                </div>
                <div class="NavBtn">
                    <a href="portal.html" target="ventana" class="linkMenu">
                        <p class="txtBotonHead">Info</p>
                    </a>
                </div>
            </div>
            <div id="login">
                <!--Este es el formulario sin registro-->
                <form id="regForm" action="javascript:sacaReg('act')" method="POST" display="block">
                    <div id="regFormFields">
                        <p class="regFormField">
                            <label class="regFormField">
                                <small>Usuario: </small>
                                <input type="text" id="regFormUsr" name="userName" class="regFormFieldBox" maxlength="20" minlength="4">
                            </label>
                        </p>
                        <p class="regFormField">
                            <label class="regFormField">
                                <small>Contraseña: </small>
                                <input type="password" id="regFormPsswd" name="psswd" class="regFormFieldBox" maxlength="20" minlength="1">
                            </label>
                        </p>
                    </div>
                    <button id="btnLogin" type="submit"><h5>Entrar</h5><h6>Sin registro!</h6></button>
                </form>
                <!--Esta es la caja cuando estas logao-->
                <div id="cajaNombre" >
                    <p id="cajaNombreTxt"></p>  
                    <button id="cajaNombreBtnLogout" onclick="hazLogout()"><h5>Salir</h5></button>
                </div>
                <!--Esto es el popup de mensajes del login o no-->
                <div id="popSalta" class="popupVentana">
                    <small id="popSaltaMsg"></small>
                </div>
            </div>
        </div>
        <div class="popup" style="display:none; opacity: 0.6;"></div>
    	<iframe src="portal.html" name="ventana" width="100%"  height="94%" frameBorder="0">No tira</iframe>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
<link type="text/css" rel="stylesheet" href="css/ppal2.css" />