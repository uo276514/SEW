"use strict";
class Lector {
	constructor() {
	}

	calcularTamanioArchivos() {
		document.querySelector('main p').innerText = "";
		var nBytes = 0,
		archivos = document.getElementsByTagName("input")[0].files,
		nArchivos = archivos.length;
		for (var i = 0; i < nArchivos; i++) {
			nBytes += archivos[i].size;
		}
		var nombresTiposTamanios="";
		for (var i = 0; i < nArchivos; i++) {
			nombresTiposTamanios += "Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"" ;
			this.mostrarContenido(archivos[i])
		}
		
		document.getElementsByTagName('p')[0].innerHTML = "Archivos seleccionados: " + nArchivos;
		document.getElementsByTagName('p')[1].innerHTML = "Tamaño total de los archivos: " + nBytes + " bytes";
		document.getElementsByTagName('p')[2].innerHTML = nombresTiposTamanios;
	}

	mostrarContenido(archivo) {
		if (archivo.type.match(/text.*/) || archivo.type.match(/json.*/) || archivo.type.match(/xml.*/)) {
			var lector = new FileReader();
			lector.onload = function (evento) {
				var texto = lector.result;
				texto = texto.replace(/(\r\n|\n|\r)/g, "");
				document.querySelector('main p').innerText += texto;					
			}
			lector.readAsText(archivo);
		}
	}
}

var lector = new Lector();