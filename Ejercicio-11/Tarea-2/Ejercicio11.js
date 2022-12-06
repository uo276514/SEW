"use strict";
class Geolocalización {
	constructor (){
		navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
	}
	getPosicion(posicion){
		this.mensaje 		  = "Se ha realizado correctamente la petición de geolocalización";
		this.longitud         = posicion.coords.longitude;
		this.latitud          = posicion.coords.latitude;
		this.precision        = posicion.coords.accuracy;
	}
	verErrores(error){
		switch(error.code) {
		case error.PERMISSION_DENIED:
			this.mensaje = "El usuario ha bloqueado el acceso a su ubicación"
			break;
		case error.POSITION_UNAVAILABLE:
			this.mensaje = "Información de geolocalización no disponible"
			break;
		case error.TIMEOUT:
			this.mensaje = "La petición de geolocalización ha caducado"
			break;
		case error.UNKNOWN_ERROR:
			this.mensaje = "Se ha producido un error desconocido"
			break;
		}
	}
	verTodo() {
        var ubicacion=document.getElementsByTagName("main")[0];
        var datos=''; 
		datos+='<p>'+ this.mensaje +'</p>';
       
		datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        ubicacion.innerHTML = datos;
    }
}
var miPosicion = new Geolocalización();