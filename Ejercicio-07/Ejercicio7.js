"use strict";
class Botones {
	constructor() {}

	getBtnAddLista() {
		return document.getElementsByTagName("button")[4];
	}

	getBtnRemoveLista() {
		return document.getElementsByTagName("button")[5];
	}

	ocultarH1() {
		$("h1").hide();
	}

	mostrarH1() {
		$("h1").show();
	}

	cambiarAp2() {
		$("p[title=par12]").text("Lo siguiente es un listado con miembros:");
	}

	cambiarAp1() {
		$("p[title=par12]").text("Lista con algunos miembros:");
	}

	addLista() {
		$("p[title=lista]").before("<ul><li>Mi amigo Martín Fernández</li><li>El amigo de Martín, José</li><li>Mi amiga Laura Ramírez</li><li>El amigo de Laura, Cucu</li><li>Mi amigo David González</li><li>La amiga de David, Natalia</li></ul>");
		$("button[value=I]").hide();
	}

	removeLista() {
		if (!$("button[value=I]").is(':visible')) {
			$("ul").remove();
			$("button[value=E]").hide();
		}
	}

	mostrarInfo() {
		$("*", document.body).each(function() {
			var etPadre = $(this).parent().get(0).tagName;
			$("p[title=elementosPadre]").after("</p>");
			$("p[title=elementosPadre]").after(document.createTextNode( " --- INFO DEL ELEMENTO => Etiqueta padre : <"  + etPadre + "> elemento : <" + $(this).get(0).tagName +">"));
			$("p[title=elementosPadre]").after("<p>");
		});
		$("button[value=showInfo]").hide();
		/*
		$("*", document.body).each(function() {
			var etPadre = $(this).parent().get(0).tagName;
			$(this).after("</p>");
			$(this).after(document.createTextNode( " --- INFO DEL ELEMENTO => Etiqueta padre : <"  + etPadre + "> elemento : <" + $(this).get(0).tagName +">"));
			$(this).after("<p>");
		});


		$("*", document.body).each(function() {
			var etiquetaPadre = $(this).parent().get(0).tagName;
			$("p[title=elementosPadre]").after("<p>Etiqueta padre: <" + etiquetaPadre + "> elemento: <" + $(this).get(0).tagName + "></p>")
            //$(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
		*/
	}

	sumarEdades() {
		var total = 0;
		var col1 = 0;
		var col2 = 0;
		var col3 = 0;
		var col4 = 0;
		var filas = 0;
		var contadorFilas = 1;
		var casillasRecorridas = 0;

		$("table tr td").each(function() {
			var celda = $.trim($(this).text());
			var valor = parseInt(celda);
			total = total + valor;
			filas = filas + valor;
			casillasRecorridas = casillasRecorridas + 1;
			
			if (casillasRecorridas == 1 || casillasRecorridas == 5 || casillasRecorridas == 9) {
				col1 = col1 + valor;
			} else if (casillasRecorridas == 2 || casillasRecorridas == 6 || casillasRecorridas == 10) {
				col2 = col2 + valor;
			} else if (casillasRecorridas == 3 || casillasRecorridas == 7 || casillasRecorridas == 11) {
				col3 = col3 + valor;
			} else if (casillasRecorridas == 4 || casillasRecorridas == 8 || casillasRecorridas == 12) {
				$("button[value=sumarEdades]").before("<p>Suma de fila " + contadorFilas + ": " + filas + "</p>");
				contadorFilas = contadorFilas + 1;
				col4 = col4 + valor;
				filas = 0;
			}
		});
		$("button[value=sumarEdades]").before("<p>Suma de columna 1: " + col1 + "</p>");
		$("button[value=sumarEdades]").before("<p>Suma de columna 2: " + col2 + "</p>");
		$("button[value=sumarEdades]").before("<p>Suma de columna 3: " + col3 + "</p>");
		$("button[value=sumarEdades]").before("<p>Suma de columna 4: " + col4 + "</p>");
		$("button[value=sumarEdades]").before("<p>Suma de todas las edades: " + total + "</p>");
		$("button[value=sumarEdades]").hide();
	}
}
var b = new Botones();
