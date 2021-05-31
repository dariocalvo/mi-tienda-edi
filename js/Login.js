	  	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('usuario').focus();
		escucharEventos();
	}
	
	function escucharEventos(){
		Control('enviar').addEventListener('click', verificar);
		Control('usuario').addEventListener('focus', function(event){event.target.value = "";});	  
		Control('contraseña').addEventListener('focus', function(event){event.target.value = "";});
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var i = 1;
		var regla = /^(?!\s).+$/;
		var elemento = "";
		var error=false;
			while (i > 0){
				error=false;
				elemento = document.querySelector('[tabindex = "'+i+'"]').id;
				i++;
				if (!ValidarExpreg(Control(elemento).value, regla)){
					alert ('Error en el campo '+elemento+', no puede estar vacío ni comenzar con espacios.');
					error=true;
					Control(elemento).focus();
					break;
				}else{
					error=false;
				}
				if (elemento == 'enviar') {i=-1;}
			}
		if (!error){
			Control('spinner').style.display= "inline-grid";
			Control('enviar').style.display= "none";
			Enviar();
		}	
	}

	function Enviar(){// hace la funcion submit utilizando petición asincrónica al servidor y trae la respuesta sin salir de la pagina
			var servidor = "https://app-calvo-back.herokuapp.com/";
			EnviarGet(servidor);	
	}
/*
	function EnviarAlServidor(servidor, Respuesta){// enviar peticion al servidor sin salir de la pagina
		// Crear un objeto xml
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.open("GET", servidor, true);
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE){
				if(xmlhttp.status == 200){
					Respuesta(xmlhttp.responseText);// me muestre la respuesta del servidor si todo fue OK
					Control('spinner').style.display= "none";
				}else{
					alert("Ocurrió un error.");
				}
			}
		}
		// Creo un objeto con los datos ingresados en el formulario
		var usuario = {nombre: Control("usuario").value, pass: Control("contraseña").value};

		// envío el mensaje al servidor con los datos
		xmlhttp.send(usuario);
	}

	function Respuesta(mensaje){
		alert ("El servidor responde: " + mensaje);
	}
*/



function EnviarGet(servidor) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", servidor, true);
	//xmlhttp.open("POST", servidor, true);
	//xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.onreadystatechange = function () {
        
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.responseText);
            }
            else {
                alert("ocurrio un error");
            }
        }
    }
	
	var usuario = {nombre: Control("usuario").value, pass: Control("contraseña").value};
	//xmlhttp.setRequestHeader("contant-Disposition", 'attachment; filename="' +  nombreArchivo + '"');
    xmlhttp.send(usuario);
}


