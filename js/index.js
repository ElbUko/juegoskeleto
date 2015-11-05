var tiemoutId,
    respuesta;
var popup = document.getElementById("popSalta");
var popupMsg = document.getElementById("popSaltaMsg");
var user = document.getElementById("regFormUsr");
var form = document.getElementById("regForm");
var cajaLog = document.getElementById("cajaNombre");

//Caja de login
if (defaultUsr.substring(0,8) == "invitado") {
	user.placeholder = defaultUsr;
} else {
	document.getElementById("cajaNombreTxt").innerHTML = defaultUsr;
	form.style.display = 'none';
	cajaLog.style.display = 'block';
	console.log('usuario');
}

//objeto HTTP_REQUEST
http_request = false;
if (window.XMLHttpRequest) {
	var ajax = new XMLHttpRequest();
	//Variable global 'ajax' pa ajax
}
function sacaReg(met) {
	var user = document.getElementById("regFormUsr").value;
	var pass = document.getElementById("regFormPsswd").value;
	if ((user == "") || (user == null)) {
		popupMsg.innerHTML = "¡Hace falta algun nombre de usuario";
		sacaPopup();
	} else {
		ajax.open('POST', "php/control/control.php", true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var envia = "usr=" + user + "&psswd=" + pass;
		ajax.send(envia);
	}
}

var result;
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4) {
		result = ajax.responseText;
		respuesta = JSON.parse(result);
		console.log("ha respondio: " + result + " \nTranspot es: " + ajax);
		if (ajax.status == 200) {
			if (!respuesta.login && !respuesta.popup) {
				user.placeholder = respuesta.invitado;							//// LOGOUT!1
				defaultUsr = respuesta.invitado;
				invitado = true;	
				document.getElementById("regFormUsr").value = "";
				var form = document.getElementById("regForm");
				form.style.display = 'block';
				var cajaLog = document.getElementById("cajaNombre");
				cajaLog.style.display = 'none';
			} else if ((respuesta != null) || (respuesta != undefined))
				hazLogin(respuesta);
			else
				console.log('no hay respuesta');
		} else {
			result = respuesta.responseText;
			console.log("ha respondio MAL! " + result);
		}
	}
};

function hazLogin(respuesta) {
	if (respuesta.popup) {
		popupMsg.innerHTML = respuesta.mensajePopup;
		sacaPopup();
	}
	if (respuesta.login) {
		defaultUsr = document.getElementById("regFormUsr").value;					///LOGINNN
		invitado = false;
		document.getElementById("cajaNombreTxt").innerHTML = defaultUsr;
		var form = document.getElementById("regForm");
		form.style.display = 'none';
		var cajaLog = document.getElementById("cajaNombre");
		cajaLog.style.display = 'block';
		document.getElementById("regFormPsswd").value = "";
	}
}

function sacaPopup() {
	if (respuesta == undefined)
		popup.style.backgroundColor = '#faa';
	else if (respuesta.popup.login)
		popup.style.backgroundColor = '#afa';
	else
		popup.style.backgroundColor = '#faa';
	popup.style.display = "block";
	popup.style.opacity = "1";
	tiemoutId = setTimeout(quitaLoginPopup, 5000);
}

function hazLogout() {
	ajax.open('POST', "php/control/control.php", true);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var envia = "usr=deslogame&psswd=";
	ajax.send(envia);
	return;
}

function quitaLoginPopup() {
	clearTimeout(tiemoutId);
	if (popup.style.opacity == 0) {
		popup.style.display = "none";
		popup.style.opacity == "1";
		popupMsg.innerHTML = "";
	} else
		popup.style.opacity -= "0.01";
	tiemoutId = setTimeout(quitaLoginPopup, 10);
	return;
}

/*
 Use JSON to transfer data types (arrays and objects) between client and server.
 In PHP:
 json_encode
 json_decode

 In JavaScript:
 JSON.stringify
 JSON.parse

 PHP:
 echo json_encode($id_numbers);

 JavaScript:
 id_numbers = JSON.parse(msg);
 */
