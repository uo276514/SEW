"use strict";
class Pantalla {
	constructor() {	}
	pantallaCompleta() {
		var elem = document.getElementById("mapa");
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		}
	}
}

class LectorYMapaDin {
	constructor() {
		this.centro;
		this.mapa;
	}

	leerArchivo(files) {
		var archivo = files[0];
		var areaVisualizacion = document.getElementById("areaVisualizacion");
		if (archivo.type.match(/text.*/)) {
			var lector = new FileReader();
			lector.onload = function (evento) {
				areaVisualizacion.innerText = lector.result;
			}      
			lector.readAsText(archivo);
		} else {
			alert("Error : ¡¡¡ Archivo no válido !!!");
		}  
	}

	cogerInfo() {
		if (document.getElementById("areaVisualizacion").textContent == "") {
			alert("Aún no se ha seleccionado el fichero de partidos");
		} else {
			var lines = document.getElementById("areaVisualizacion").textContent.split(";");
			var textos = new Array();
			var texto = "";
			var coordenadasArray = new Array();
			var ubi = [this.latitud, this.longitud];
			coordenadasArray.push(ubi);
			textos.push("Usted se encuentra aquí");
			for(var i=0; i < lines.length; i++) {
				if (lines[i].length > 5) {
					var partes = lines[i].split(",");
					var partido = partes[0];
					var estadio = partes[1];
					var lat = partes[2].split(":")[1];
					var long = partes[3].split(":")[1];
					var difLat = parseFloat(lat) - parseFloat(this.latitud);
					var difLong = parseFloat(long) - parseFloat(this.longitud);
					var dist = Math.sqrt(Math.pow(difLat,2) + Math.pow(difLong,2));
					texto += "Partido: " + partido + ", en el estadio " + estadio + ". Distancia al estadio: " + dist + "\n";
					textos.push(estadio + " (" + partido + ")");
					var coord = [lat, long];
					coordenadasArray.push(coord);
				}
			}
			this.mostrarMarcador(coordenadasArray, textos);
		}
		document.getElementById("infoPartidos").innerText = texto;
		document.getElementById("areaVisualizacion").textContent = "";
	}

	mostrarMarcador(array, textos) {
		for (var i=0; i < array.length; i++) {
			var coord = array[i];
			var pos = {lat: parseFloat(coord[0]), lng: parseFloat(coord[1])};
			var marcador = new google.maps.Marker({position:pos,map:this.mapa,title:textos[i]});
		}		
	}

	getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;        
    }

	init() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
		}
		this.centro = {lat: 40.41831, lng: -3.70275};
		this.mapa = new google.maps.Map(document.getElementById('mapa'),{zoom: 5,center:this.centro});		
	}
}

var lectorYmapa = new LectorYMapaDin();
var redim = new Pantalla();
