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
				//texto = texto.replace(/(\r\n|\n|\r)/g, "");
				document.querySelector('main p').innerText += texto + '\u000A\u000A';				
			}
			lector.readAsText(archivo);
		}

		// if (archivo.type.match(/json.*/)) {
		// 	var lector = new FileReader();
		// 	document.getElementsByTagName('p')[3].innerText = "";
		// 	lector.onload = function (evento) {
		// 		var texto = lector.result;
		// 		texto = texto.replace(/(\r\n|\n|\r)/g, '\u000A');	
		// 		document.getElementsByTagName('p')[3].innerText += texto;			
		// 	}
		// 	lector.readAsText(archivo);
		// } else if (archivo.type.match(/xml.*/)) {
		// 	var lector = new FileReader();
		// 	document.getElementsByTagName('p')[5].innerText = "";
		// 	lector.onload = function (evento) {
		// 		var texto = lector.result;
		// 		texto = texto.replace(/(\r\n|\n|\r)/g, '\u000A');	
		// 		document.getElementsByTagName('p')[5].innerText += texto;			
		// 	}
		// 	lector.readAsText(archivo);
		// } else if (archivo.type.match(/text.*/)) {
		// 	var lector = new FileReader();
		// 	document.getElementsByTagName('p')[4].innerText = "";
		// 	lector.onload = function (evento) {
		// 		var texto = lector.result;
		// 		texto = texto.replace(/(\r\n|\n|\r)/g, '\u000A');	
		// 		document.getElementsByTagName('p')[4].innerText += texto;			
		// 	}
		// 	lector.readAsText(archivo);
		// }
	}
}

var lector = new Lector();