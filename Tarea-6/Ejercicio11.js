"use strict";
class MapaDin {
	constructor() {
		
	}

	irLugar(lat, long) {
		var centro = {lat: parseFloat(lat), lng: parseFloat(long)};
		var mapaPorCoordenadas = new google.maps.Map(document.getElementById('mapa'),{
			zoom: 8,
			center:centro,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
		
		var infoWindow = new google.maps.InfoWindow;
				
		infoWindow.setPosition(centro);
		infoWindow.setContent('Coordenadas encontradas');
		infoWindow.open(mapaPorCoordenadas);
		mapaPorCoordenadas.setCenter(centro);
	}

	init() {
		var lat = parseFloat(document.getElementById('lat').value);
		var long = parseFloat(document.getElementById('lon').value);
		if (lat > 85 || lat < -85) {
			alert("Coordenadas inválidas, por favor, Latitud[-85,85]");
		} else {
			var centro = {lat: lat, lng: long};
			var mapaPorCoordenadas = new google.maps.Map(document.getElementById('mapa'),{
				zoom: 8,
				center:centro,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
			
			var infoWindow = new google.maps.InfoWindow;
					
			infoWindow.setPosition(centro);
			infoWindow.setContent('Coordenadas encontradas');
			infoWindow.open(mapaPorCoordenadas);
			mapaPorCoordenadas.setCenter(centro);
		}		
	}
}

var mapa = new MapaDin();