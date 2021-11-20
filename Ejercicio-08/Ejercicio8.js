"use strict";
class Ciudad {
	constructor(ciudad) {
		this.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
		this.ciudad = ciudad;
		this.unidades = "&units=metric";
		this.idioma = "&lang=es";
		this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
		this.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
	}

	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(data){
				this.datos = data;
				var c = new City(data);
				c.verJSON();
				c.verDatos();
			},
			error:function(){
				document.write(this.error);
			}
		});
	}
}

class City {
	constructor(data) {
		this.datos = data;
	}
	
	verJSON() {
		document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
		//document.write("<h2>JSON</h2>")
		//var str = JSON.stringify(this.datos, null, 2);
		//document.write("<pre>" + str + "</pre>");
	}

	verDatos() {
		document.write("<h2>Datos</h2>")
		document.write("<p>Ciudad: " + this.datos.name + "</p>");
		document.write("<p>País: " + this.datos.sys.country + "</p>");
		document.write("<p>Latitud: " + this.datos.coord.lat + " grados</p>");
		document.write("<p>Longitud: " + this.datos.coord.lon + " grados</p>");
		document.write("<p>Temperatura: " + this.datos.main.temp + " grados Celsius</p>");
		document.write("<p>Temperatura máxima: " + this.datos.main.temp_max + " grados Celsius</p>");
		document.write("<p>Temperatura mínima: " + this.datos.main.temp_min + " grados Celsius</p>");
		document.write("<p>Sensación térmica: " + this.datos.main.feels_like + " grados Celsius</p>");
		document.write("<p>Presión: " + this.datos.main.pressure + " milímetros</p>");
		document.write("<p>Humedad: " + this.datos.main.humidity + "%</p>"); 
		document.write("<p>Amanece a las: " + new Date(this.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
		document.write("<p>Oscurece a las: " + new Date(this.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
		document.write("<p>Dirección del viento: " + this.datos.wind.deg + "  grados</p>");
		document.write("<p>Velocidad del viento: " + this.datos.wind.speed + " metros/segundo</p>");
		document.write("<p>Ráfagas de viento: " + this.datos.wind.gust + " km/h</p>");
		document.write("<p>Hora de la medida: " + new Date(this.datos.dt *1000).toLocaleTimeString() + "</p>");
		document.write("<p>Fecha de la medida: " + new Date(this.datos.dt *1000).toLocaleDateString() + "</p>");
		document.write("<p>Descripción: " + this.datos.weather[0].description + "</p>");
		document.write("<p>Visibilidad: " + this.datos.visibility + " metros</p>");
		document.write("<p>Nubosidad: " + this.datos.clouds.all + " %</p>");
		document.write("<img src='https://openweathermap.org/img/w/" + this.datos.weather[0].icon + ".png' alt='" + this.datos.weather[0].description + "' />");
	}
}

var ovi = new Ciudad("Oviedo");
var seg = new Ciudad("Segovia");
var mal = new Ciudad("Malaga");
var mel = new Ciudad("Melilla");
var vall = new Ciudad("Valladolid")

