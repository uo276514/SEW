$(document).ready(function(){
	$("#ocultar").click(function(){
		$("h1").hide();
	});
	$("#mostrar").click(function(){
		$("h1").show();
	});
	$("#btn1").click(function(){
		$("#presList").text("Lo siguiente es un listado con miembros:");
	});
	$("#btn2").click(function(){
		$("#presList").text("Lista con algunos miembros:");
	});
	$("#addList").click(function(){
		$("#add").before("<ul><li>Mi padre Luis Alvarez</li><ul><li>Mi abuelo Jose Antonio</li><li>Mi abuela Reme</li></ul><li>Mi madre Carmen</li><ul><li>Mi abuelo Pepe</li><li>Mi abuela Carmen</li></ul></ul>");
		$("#addList").hide();
	});
	$("#removeList").click(function(){
		$("ul").remove();
	});
	$("#showInfo").click(function(){
		$("*", document.body).each(function() {
			var etPadre = $(this).parent().get(0).tagName;
			$(this).after("</p>");
			$(this).after(document.createTextNode( " --- INFO DEL ELEMENTO => Etiqueta padre : <"  + etPadre + "> elemento : <" + $(this).get(0).tagName +">"));
			$(this).after("<p>");
		});
		$("#showInfo").hide();
	});
	$("#sumarEdades").click(function(){
		var total = 0;
		$("table tr td").each(function() {
			var celda = $.trim($(this).text());
			var valor = parseInt(celda);
			total = total + valor;
		});
		$("#sumarEdades").before("<p>Suma de todas las edades: " + total + "</p>");
		$("#sumarEdades").hide();
	});
});