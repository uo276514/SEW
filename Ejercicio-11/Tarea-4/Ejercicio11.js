"use strict";
class MapaDin {
	constructor() {
		
	}
	init() {
		var oviedo = {lat: 43.3616142, lng: -5.8506767};
		var mapaOviedo = new google.maps.Map(document.getElementById('mapa'),{zoom: 8,center:oviedo});
		var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
	}
}
var mapa = new MapaDin();