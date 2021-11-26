"use strict";
class Lector {
	constructor() {
	}

	calcularTamanioArchivos() {
		document.getElementById("contenido").innerText = "";
		var nBytes = 0,
		archivos = document.getElementById("examinarArchivos").files,
		nArchivos = archivos.length;
		for (var i = 0; i < nArchivos; i++) {
			nBytes += archivos[i].size;
		}
		var nombresTiposTamanios="";
		for (var i = 0; i < nArchivos; i++) {
			nombresTiposTamanios += "<p>Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
			this.mostrarContenido(archivos[i])
		}
		
		document.getElementById("nArchivos").innerHTML = "Archivos seleccionados: " + nArchivos;
		document.getElementById("tTotal").innerHTML = "Tamaño total de los archivos: " + nBytes + " bytes";
		document.getElementById("nombres").innerHTML = nombresTiposTamanios;
	}

	mostrarContenido(archivo) {
		if (archivo.type.match(/text.*/) || archivo.type.match(/json.*/) || archivo.type.match(/xml.*/)) {
			var lector = new FileReader();
			lector.onload = function (evento) {
				document.getElementById("contenido").innerText += lector.result + "\n\n";					
			}
			lector.readAsText(archivo);
		}
	}
}

var lector = new Lector();