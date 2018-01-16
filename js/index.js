
var Juegoskeleto = function() {
	//var jskeletobk = "http://juegoskeleto.netne.net/puerta.php";
	var jskeletobk = "http://localhost/juegoskeleto/jskeletobk/puerta.php";
	var backAlive = false;
	this.bk = (function(){return backAlive;})();
	this.ajax = function(manejador){		
		var data = {
			'evt': manejador,
			'usr': login.formUsr.value,
			'pss': login.formPsswd.value
		}
		var xhr = new XMLHttpRequest();
		xhr.open('POST', jskeletobk, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.withCredentials = true;
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function(){
        	if (this.readyState == 4){
        		if (this.status == 200){
					try {
						var resp = this.responseText;
						login.data = JSON.parse(resp);
						login[manejador]();
					}
					catch(e){
						console.log("Error en el ws: "+e);
					}
				}
			}
        };
		return false;
	};
	var	login = {
		data: {
			login: 			false,
			user: 			"",
			popup: 			false,
			popupMsg: 		""
		},
		popup: 		document.getElementById("popSalta"),
		popupMsg: 	document.getElementById("popSaltaMsg"),
		form: 		document.getElementById("regForm"),
		formUsr: 	document.getElementById("regFormUsr"),
		formPsswd:  document.getElementById("regFormPsswd"),
		cajaLog: 	document.getElementById("cajaNombre"),
		cajaUsr:	document.getElementById("cajaNombreTxt"),

		ping: function(){
			if (this.data.login) {
				this.cajaUsr.innerHTML = this.data.user;
				this.form.style.display = 'none';
				this.cajaLog.style.display = 'block';
			} else {
				this.formUsr.placeholder = this.data.user;
			}
			return false;
		},
		loga: function(){
			if (this.data.login) {
				this.form.style.display = 'none';
				this.cajaUsr.innerHTML = this.formUsr.value;
				this.cajaLog.style.display = 'block';
				this.formUsr.value = '';
				this.formPsswd.value = '';
				this.ponPopup();
			}
			if (this.data.popup)
				this.ponPopup();
			return false;
		},
		desloga: function(){
			this.formUsr.text = '';
			this.formUsr.placeholder = this.data.user;
			this.form.style.display = 'block';
			this.cajaLog.style.display = 'none';
		},
		ponPopup: function(){
			this.popupMsg.innerHTML = this.data.popupMsg;
			if (this.data.login)
				this.popup.style.backgroundColor = '#afa';
			else
				this.popup.style.backgroundColor = '#faa';
			this.popup.style.display = "block";
			this.popup.style.opacity = "1";
			tiemoutId = setTimeout(this.quitaPopup, 3000);
		},
		quitaPopup: function(){
			clearTimeout(tiemoutId);
			if (login.popup.style.opacity <= 0) {
				login.popup.style.display = "none";
				login.popup.style.opacity == "1";
				login.popupMsg.innerHTML = "";
				tiemoutId = null;
			} else{
				login.popup.style.opacity -= "0.01";
				tiemoutId = setTimeout(login.quitaPopup, 10);
			}
		}
	};
	this.loga = function(){
		if (login.formUsr.value == "" || login.formUsr.value == null) {
			login.data.popupMsg = "¡Hace falta algun nombre de usuario";
			login.ponPopup();
		}
		else{
			this.ajax('loga');
		}
	};
	this.desloga = function(){h.ajax('desloga');};
	this.onLoad = function(a){
		login.formUsr.value = "";
		this.ajax('ping');
	};
};
var h;
function onLoad(){
	h = new Juegoskeleto();
	h.onLoad();
};

/*

var tiemoutId,
    respuesta;
var popup = document.getElementById("popSalta");
var popupMsg = document.getElementById("popSaltaMsg");
var user = document.getElementById("regFormUsr");
var form = document.getElementById("regForm");
var cajaLog = document.getElementById("cajaNombre");
var jskeletobk = "http://juegoskeleto.esy.es/";
jskeletobk = "http://juegoskeleto.netne.net/";

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
//http_request = false;
//if (window.XMLHttpRequest) {
var ajax = new XMLHttpRequest();
	//Variable global 'ajax' pa ajax
//}
function sacaReg(met) {
	var user = document.getElementById("regFormUsr").value;
	var pass = document.getElementById("regFormPsswd").value;
	if ((user == "") || (user == null)) {
		popupMsg.innerHTML = "¡Hace falta algun nombre de usuario";
		sacaPopup();
	} else {
		ajax.open('POST', jskeletobk+"php/control/control.php", true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var envia = "usr=" + user + "&psswd=" + pass;
		ajax.send(envia);
	}
}

var result;
ajax.onreadystatechange = function() {
	console.log('entra:');
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
	ajax.open('POST', jskeletobk+"php/control/control.php", true);
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
