"use strict";
class Lector {
	constructor() {
		
	}

	leerArchivos() {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			document.write("<p>Este navegador soporta el API File </p>");
		} else {
			document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
		}
		this.calcularTamañoArchivos();
	}

	calcularTamañoArchivos() {
		var nBytes = 0;
		var archivos = document.getElementById("examinarArchivos").files;
		var nArchivos = archivos.length;
		for (var i = 0; i < nArchivos; i++) {
			nBytes += archivos[i].size;
		}
		var nombresTiposTamaños="";
		for (var i = 0; i < nArchivos; i++) {
			nombresTiposTamaños += "<p>Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
		}
		
		document.getElementById("nArchivos").innerHTML = "Archivos seleccionados: " + nArchivos;
		document.getElementById("tTotal").innerHTML = "Tamaño total de los archivos: " + nBytes + " bytes";
		document.getElementById("nombres").innerHTML = nombresTiposTamaños;
	}
}

var lector = new Lector();