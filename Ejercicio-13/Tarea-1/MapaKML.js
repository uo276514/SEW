"use strict";
class Lector {
	constructor() {
	}

	leerArchivo(files) {
		var archivo = files[0];
		var areaVisualizacion = document.getElementsByTagName('p')[1];
		if (!archivo.type.match(/xml.*/) && !archivo.type.match(/text.*/) &&!archivo.type.match(/application.*/)) {
			var lector = new FileReader();
			lector.onload = function (evento) {
				areaVisualizacion.innerText = lector.result;
			}      
			lector.readAsText(archivo);
		} else {
			alert("Error : ¡¡¡ Archivo no válido !!!");
		}  
	}

	cogerInfoKML() {
		if (document.getElementsByTagName('p')[1].textContent == "") {
			alert("Aún no se ha seleccionado ningún archivo KML");
		} else {
			var lines = document.getElementsByTagName('p')[1].textContent.split("\t");
			var textos = new Array();
			var coordenadasArray = new Array();
			var mapa = new MapaDin();
			mapa.init();
			for(var i=0; i < lines.length; i++) {
				if (lines[i].length >= 16 && (lines[i].match("<name>Nacimiento") || lines[i].match("<name>Residencia"))) {
					textos.push(lines[i].substring(6, lines[i].length-7));
				} else if (lines[i].length >= 20 && lines[i].match("<Point><coordinates>")) {
					var coordString = lines[i].substring(20,lines[i].length-24);
					var coord = coordString.split(",");
					coordenadasArray.push(coord);
				}
			}
			mapa.mostrarMarcador(coordenadasArray, textos);
		}
		document.getElementsByTagName('p')[1].textContent = "";
	}
}

class MapaDin {
	constructor() {
		this.madrid;
		this.mapa;
	}

	mostrarMarcador(array, textos) {
		for (var i=0; i < array.length; i++) {
			var coord = array[i];
			var pos = {lat: parseFloat(coord[1]), lng: parseFloat(coord[0])};
			var marcador = new google.maps.Marker({position:pos,map:this.mapa,title:textos[i]});
		}		
	}

	init() {
		this.madrid = {lat: 40.41831, lng: -3.70275};
		this.mapa = new google.maps.Map(document.querySelector('main'),{zoom: 6,center:this.madrid});		
	}
}

var lector = new Lector();
var mapa = new MapaDin();