"use strict";
class CargaDatos {
	constructor() {
		this.url = "https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2021-01-01T00:00&end_date=2021-01-31T23:59&time_trunc=day";
		this.error = "<h2>¡problemas! No puedo obtener información de <a href='https://www.ree.es/es/datos/generacion'>REData</a></h2>";
	}
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(data){
				this.datos = data;
				var e = new MostrarDatos(data);
				e.verJSON();
				e.verdatos();
			},
			error:function(){
				document.write(this.error);
			}
		});
	}
}
class MostrarDatos {
	constructor(data) {
		this.datos = data;
	}
	verJSON() {
		document.write("<h1>Datos en JSON desde <a href='https://www.ree.es/es/datos/generacion'>REData</a> de los precios de la energía eléctrica en enero de 2021</h1>");
		//document.write("<h2>JSON</h2>")
		//var str = JSON.stringify(this.datos, null, 2);
		//document.write("<pre>" + str + "</pre>");
	}

	verdatos() {
		document.write("<h2>Datos</h2>")
		document.write("<p>Título: " + this.datos.data.type + "</p>");
		document.write("<p>Descripción: " + this.datos.data.attributes.description + "</p>");
		// ENERGÍAS RENOVABLES:
		document.write("<p>Tipos de energía " + this.datos.included[0].attributes.title + ":</p>");
		document.write("<ul>");
		for (var i=0; i <= 7; i++) {
			document.write("<li>Energía:  " + this.datos.included[0].attributes.content[i].attributes.title + "</li>");
			document.write("<ul>");
			for (var j=0; j <= 30; j++) {
				document.write("<li>Balance día " + (j+1) + ":  " + this.datos.included[0].attributes.content[i].attributes.values[j].value + " € ===> (" + this.datos.included[0].attributes.content[i].attributes.values[j].percentage + "%)</li>");
			}
			document.write("<li>Total del mes:  " + this.datos.included[0].attributes.content[i].attributes.total + " €</li></ul>");
		}
		document.write("</ul>");
		// ENERGÍAS NO RENOVABLES:
		document.write("<p>Tipos de energía " + this.datos.included[1].attributes.title + ":</p>");
		document.write("<ul>");
		for (var i=0; i <= 9; i++) {
			document.write("<li>Energía:  " + this.datos.included[1].attributes.content[i].attributes.title + "</li>");
			document.write("<ul>");
			for (var j=0; j <= 30; j++) {
				document.write("<li>Balance día " + (j+1) + ":  " + this.datos.included[1].attributes.content[i].attributes.values[j].value + " € ===> (" + this.datos.included[1].attributes.content[i].attributes.values[j].percentage + "%)</li>");
			}
			document.write("<li>Total del mes:  " + this.datos.included[1].attributes.content[i].attributes.total + " €</li></ul>");
		}
		document.write("</ul>");
		//DEMANDA:
		document.write("<p>" + this.datos.included[2].attributes.title + " (" + this.datos.included[2].attributes.description + "):</p>");
		document.write("<ul>");
		for (var i=0; i <= 2; i++) {
			document.write("<li>" + this.datos.included[2].attributes.content[i].attributes.title + ":</li>");
			document.write("<ul>");
			for (var j=0; j <= 30; j++) {
				document.write("<li>Balance día " + (j+1) + ":  " + this.datos.included[2].attributes.content[i].attributes.values[j].value + " € ===> (" + this.datos.included[2].attributes.content[i].attributes.values[j].percentage + "%)</li>");
			}
			document.write("<li>Total del mes:  " + this.datos.included[2].attributes.content[i].attributes.total + " €</li></ul>");
		}
		document.write("</ul>");
	}
}
var cd = new CargaDatos();
