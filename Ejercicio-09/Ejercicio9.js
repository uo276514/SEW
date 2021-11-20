"use strict";
class Meteo {
	constructor(city){
		this.apikey = "47b790fd0fc41878c80c57c9846132cb";
		this.ciudad = city;
		this.tipo = "&mode=xml";
		this.unidades = "&units=metric";
		this.idioma = "&lang=es";
		this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
		this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
	}
	cargarDatos(){
		$.ajax({
			dataType: "xml",
			url: this.url,
			method: 'GET',
			success: function(datos){
				
				//Presentación del archivo XML en modo texto
				//$("h5").text((new XMLSerializer()).serializeToString(datos));
			
				//Extracción de los datos contenidos en el XML
				var totalNodos            = $('*',datos).length;
				var ciudad                = $('city',datos).attr("name");
				var longitud              = $('coord',datos).attr("lon");
				var latitud               = $('coord',datos).attr("lat");
				var zonaHoraria           = $('timezone',datos).text();
				var pais                  = $('country',datos).text();
				var amanecer              = $('sun',datos).attr("rise");
				var minutosZonaHoraria    = new Date().getTimezoneOffset();
				var amanecerMiliSeg1970   = Date.parse(amanecer);
					amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
				var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
				var oscurecer             = $('sun',datos).attr("set");
				var oscurecerMiliSeg1970  = Date.parse(oscurecer);
					oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
				var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
				
				var temperatura           = $('temperature',datos).attr("value");
				var temperaturaMin        = $('temperature',datos).attr("min");
				var temperaturaMax        = $('temperature',datos).attr("max");
				var temperaturaUnit       = $('temperature',datos).attr("unit");
				var feelsLike             = $('feels_like',datos).attr("value");
				var feelsLikeUnit         = $('feels_like',datos).attr("unit");
				
				var humedad               = $('humidity',datos).attr("value");
				var humedadUnit           = $('humidity',datos).attr("unit");
				
				var presion               = $('pressure',datos).attr("value");
				var presionUnit           = $('pressure',datos).attr("unit");
				
				var velocidadViento       = $('speed',datos).attr("value");
				var velocidadVientoUnit   = $('speed',datos).attr("unit");
				var nombreViento          = $('speed',datos).attr("name");
				var rafagas               = $('gusts',datos).attr("value");
				var direccionViento       = $('direction',datos).attr("value");
				var codigoViento          = $('direction',datos).attr("code");
				var nombreDireccionViento = $('direction',datos).attr("name");
				
				var nubosidad             = $('clouds',datos).attr("value");
				var nombreNubosidad       = $('clouds',datos).attr("name");
				
				var visibilidad           = $('visibility',datos).attr("value");
				
				var precipitacionValue    = $('precipitation',datos).attr("value");
				var precipitacionMode     = $('precipitation',datos).attr("mode");
				
				var descripcion           = $('weather',datos).attr("value");
				var icon                  = $('weather',datos).attr("icon");
				
				var horaMedida            = $('lastupdate',datos).attr("value");
				var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
					horaMedidaMiliSeg1970-= minutosZonaHoraria * 60 * 1000;
				var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
				var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
				
				document.write("<h2>Datos</h2>")
				document.write("<p>Número de elementos del XML: " + totalNodos + "</p>");
				document.write("<p>Ciudad: " + ciudad + "</p>");
				document.write("<p>Longitud: " + longitud + "</p>");
				document.write("<p>Latitud: " + latitud + "</p>");
				document.write("<p>Zona horaria: " + zonaHoraria + "</p>");
				document.write("<p>País: " + pais + "</p>");
				document.write("<p>Amanece a las: " + amanecerLocal + "</p>");
				document.write("<p>Oscurece a las: " + oscurecerLocal + "</p>");
				document.write("<p>Temperatura: " + temperatura + " grados Celsius</p>");
				document.write("<p>Temperatura mínima: " + temperaturaMin + " grados Celsius</p>");
				document.write("<p>Temperatura máxima: " + temperaturaMax + " grados Celsius</p>");
				document.write("<p>Temperatura (unidades): " + temperaturaUnit + "</p>");
				document.write("<p>Sensación térmica: " + feelsLike + " grados Celsius</p>");
				document.write("<p>Sensación térmica (unidades): " + feelsLikeUnit + "</p>");
				document.write("<p>Humedad: " + humedad + " " + humedadUnit + "</p>");
				document.write("<p>Presión: " + presion + " " + presionUnit + "</p>");
				document.write("<p>Velocidad del viento: " + velocidadViento + " " + velocidadVientoUnit + "</p>");
				document.write("<p>Nombre del viento: " + nombreViento + "</p>");
				document.write("<p>Ráfagas del viento: " + rafagas + " km/h</p>");
				document.write("<p>Dirección del viento: " + direccionViento + " grados</p>");
				document.write("<p>Código del viento: " + codigoViento + "</p>");
				document.write("<p>Nombre del viento: " + nombreDireccionViento + "</p>");
				document.write("<p>Nubosidad: " + nubosidad + "</p>");
				document.write("<p>Nombre nubosidad: " + nombreNubosidad + "</p>");
				document.write("<p>Visibilidad: " + visibilidad + " metros</p>");
				document.write("<p>Precipitación valor: " + precipitacionValue + "</p>");
				document.write("<p>Precipitación modo: " + precipitacionMode + "</p>");
				document.write("<p>Descripción: " + descripcion + "</p>");
				document.write("<p>Hora de la medida: " + horaMedidaLocal + "</p>");
				document.write("<p>Fecha de la medida: " + fechaMedidaLocal + "</p>");
				document.write("<p><img src='https://openweathermap.org/img/w/" + icon + ".png' alt='" + icon + "' /></p>");
				
				},
			error:function(){
				$("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
				$("h4").remove();
				$("h5").remove();
				$("p").remove();
				}
		});
	}
	crearElemento(tipoElemento, texto, insertarAntesDe){
		// Crea un nuevo elemento modificando el árbol DOM
		// El elemnto creado es de 'tipoElemento' con un 'texto' 
		// El elemnto se coloca antes del elemnto 'insertarAntesDe'
		var elemento = document.createElement(tipoElemento); 
		elemento.innerHTML = texto;
		$(insertarAntesDe).before(elemento);
	}
	verXML(){
		//Muestra el archivo JSON recibido
		this.crearElemento("h2","Datos en XML desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
		this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
		this.crearElemento("h4","XML","footer"); // Crea un elemento con DOM        
		this.crearElemento("h5","","footer"); // Crea un elemento con DOM para el string con XML
		this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
		this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
		this.cargarDatos();
		$("button").attr("disabled","disabled");
	}
}
var ovi = new Meteo("Oviedo");
var seg = new Meteo("Segovia");
var mal = new Meteo("Malaga");
var mel = new Meteo("Melilla");
var vall = new Meteo("Valladolid");
