"use strict";
class Botones {
	constructor() {}

	ocultarH1() {
		$("h1").hide();
	}

	mostrarH1() {
		$("h1").show();
	}

	cambiarAp2() {
		$("#presList").text("Lo siguiente es un listado con miembros:");
	}

	cambiarAp1() {
		$("#presList").text("Lista con algunos miembros:");
	}

	addLista() {
		$("#add").before("<ul><li>Mi padre Luis Alvarez</li><ul><li>Mi abuelo Jose Antonio</li><li>Mi abuela Reme</li></ul><li>Mi madre Carmen</li><ul><li>Mi abuelo Pepe</li><li>Mi abuela Carmen</li></ul></ul>");
		$("#addList").hide();
	}

	removeLista() {
		$("ul").remove();
	}

	mostrarInfo() {
		$("*", document.body).each(function() {
			var etPadre = $(this).parent().get(0).tagName;
			$(this).after("</p>");
			$(this).after(document.createTextNode( " --- INFO DEL ELEMENTO => Etiqueta padre : <"  + etPadre + "> elemento : <" + $(this).get(0).tagName +">"));
			$(this).after("<p>");
		});
		$("#showInfo").hide();
	}

	sumarEdades() {
		var total = 0;
		$("table tr td").each(function() {
			var celda = $.trim($(this).text());
			var valor = parseInt(celda);
			total = total + valor;
		});
		$("#sumarEdades").before("<p>Suma de todas las edades: " + total + "</p>");
		$("#sumarEdades").hide();
	}
}
var b = new Botones();
