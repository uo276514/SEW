"use strict";
class CargaDeDatos {
	constructor() {
		this.apikey = "2s7m3a788vu98kdco7ac9p6y89meatwubja2p14zwc7ij309z7jv1sc79mcb";
		this.url = "https://commodities-api.com/api/latest?access_key=" + this.apikey + "&base=EUR&symbols=WTIOIL,BRENTOIL";  
		this.error = "<h2>¡problemas! No puedo obtener información de <a href='https://commodities-api.com/dashboard'>Commodities-API</a></h2>";
	}
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(data){
				//this.datos = data;
				var e = new MostrarDatos(data);
				e.cabecera();
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
	cabecera() {
		document.write("<!DOCTYPE html>");
		document.write("<html lang=\"es\">");
		document.write("<head>" +
						"<meta charset=\"UTF-8\">" +
						"<meta name=\"author\" content=\"Jorge López Peláez\">" +
						"<meta name=\"description\" content=\"Practica-3_Ejercicio-10_Petroleo\">" +
						"<meta name=\"keywords\" content=\"JavaScript, json, Petroleo\">" +
						"<meta name=\"viewport\" content =\"width=device-width, initial-scale=1.0\">");

		document.write("<title>Ejercicio10</title>" +	
						"<link rel=\"stylesheet\" type=\"text/css\" href=\"Ejercicio10.css\" />" +
						"<script src=\"Ejercicio10.js\"></script>" +
						"</head>");

		document.write("<body>");

		document.write("<h1>Datos en JSON desde <a href='https://commodities-api.com/dashboard'>Commodities-API</a> de los precios del petróleo</h1>");
	}

	verdatos() {
		document.write("<h2>Datos</h2>");

		let fecha = this.datos.data.date;
        let wti = 1/new Number(this.datos.data.rates.WTIOIL);
        let brent = 1/new Number(this.datos.data.rates.BRENTOIL);
		document.write("<p>Estos son los precios de los principales referentes en el mundo del petróleo a día de hoy</p>");
		document.write("<p>WTI: "    + wti.toFixed(2)   + "€ por barril</p>");
		document.write("<p>El WTI (West Texas Intermediate) es una mezcla de varios petróleos crudos locales estadounidenses ligeros y dulces.</p>");
		document.write("<p>BRENT: "  + brent.toFixed(2) + "€ por barril</p>");
		document.write("<p>El BRENT es un petróleo ligero de alta calidad que se extrae del yacimiento británico de Brent</p>");
		document.write("<p>Fecha de solicitud: "  + fecha            + "</p>");

		document.write("</body>");
		document.write("</html>");
	}
}
var cd = new CargaDeDatos();
