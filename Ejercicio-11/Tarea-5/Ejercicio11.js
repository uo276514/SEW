"use strict";
class MapaDin {
	constructor() {
		
	}
	init() {
		var centro = {lat: 43.3616142, lng: -5.8506767};
		var mapaGeoposicionado = new google.maps.Map(document.querySelector('main'),{
			zoom: 8,
			center:centro,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
		
		var infoWindow = new google.maps.InfoWindow;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
				
				infoWindow.setPosition(pos);
				infoWindow.setContent('Localización encontrada');
				infoWindow.open(mapaGeoposicionado);
				mapaGeoposicionado.setCenter(pos);
			}, function() {
				handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
			});
		} else {
			handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
		}
	}

	getPosicion(posicion){
		this.mensaje          = "Se ha realizado correctamente la petición de geolocalización";
		this.longitud         = posicion.coords.longitude;
		this.latitud          = posicion.coords.latitude;
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

	handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: Ha fallado la geolocalización' : 'Error: Su navegador no soporta geolocalización');
		infoWindow.open(mapaGeoposicionado);
	}
}

var mapa = new MapaDin();