"use strict";
class MapaDin {
	constructor (){
        //navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
	/*
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
    getMapaEstaticoGoogle(){
        var ubicacion=document.getElementsByTagName("main")[0];
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //var apiKey = "&key=AIzaSyBljS6b2LPAKKzLjYwVyzgVx8JuueSwqcA"; // mi API no funciona
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:yellow%7Clabel:U%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }
	*/
	init() {
		var oviedo = {lat: 43.3616142, lng: -5.8506767};
		var mapaOviedo = new google.maps.Map(document.getElementsByTagName("main")[0],{zoom: 8,center:oviedo});
		var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
	}
}
var mapa = new MapaDin();