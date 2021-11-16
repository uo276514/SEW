var obj = new Object();
// http://api.openweathermap.org/data/2.5/weather?q=Oviedo&units=metric&lang=es&APPID=fa461273f7344fbfd66620c0a5bf7da4
obj.url = "https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2021-01-01T00:00&end_date=2021-01-31T23:59&time_trunc=day";
obj.error = "<h2>¡problemas! No puedo obtener información de <a href='https://www.ree.es/es/datos/generacion'>REData</a></h2>";
obj.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: obj.url,
		method: 'GET',
		success: function(data){
			obj.datos = data;
			obj.verJSON();
			obj.verDatos();
		},
		error:function(){
			document.write(obj.error);
		}
	});
}

obj.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='https://www.ree.es/es/datos/generacion'>REData</a> de los precios de la energía eléctrica en enero de 2021</h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(ovi.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
obj.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Título: " + obj.datos.data.type + "</p>");
	document.write("<p>Descripción: " + obj.datos.data.attributes.description + "</p>");
	// ENERGÍAS RENOVABLES:
	document.write("<p>Tipos de energía " + obj.datos.included[0].attributes.title + ":</p>");
	document.write("<ul>");
	for (i=0; i <= 7; i++) {
		document.write("<li>Energía:  " + obj.datos.included[0].attributes.content[i].attributes.title + "</li>");
		document.write("<ul>");
		for (j=0; j <= 30; j++) {
			document.write("<li>Balance día " + (j+1) + ":  " + obj.datos.included[0].attributes.content[i].attributes.values[j].value + " € ===> (" + obj.datos.included[0].attributes.content[i].attributes.values[j].percentage + "%)</li>");
		}
		document.write("<li>Total del mes:  " + obj.datos.included[0].attributes.content[i].attributes.total + " €</li></ul>");
	}
	document.write("</ul>");
	// ENERGÍAS NO RENOVABLES:
	document.write("<p>Tipos de energía " + obj.datos.included[1].attributes.title + ":</p>");
	document.write("<ul>");
	for (i=0; i <= 9; i++) {
		document.write("<li>Energía:  " + obj.datos.included[1].attributes.content[i].attributes.title + "</li>");
		document.write("<ul>");
		for (j=0; j <= 30; j++) {
			document.write("<li>Balance día " + (j+1) + ":  " + obj.datos.included[1].attributes.content[i].attributes.values[j].value + " € ===> (" + obj.datos.included[1].attributes.content[i].attributes.values[j].percentage + "%)</li>");
		}
		document.write("<li>Total del mes:  " + obj.datos.included[1].attributes.content[i].attributes.total + " €</li></ul>");
	}
	document.write("</ul>");
	//DEMANDA:
	document.write("<p>" + obj.datos.included[2].attributes.title + " (" + obj.datos.included[2].attributes.description + "):</p>");
	document.write("<ul>");
	for (i=0; i <= 2; i++) {
		document.write("<li>" + obj.datos.included[2].attributes.content[i].attributes.title + ":</li>");
		document.write("<ul>");
		for (j=0; j <= 30; j++) {
			document.write("<li>Balance día " + (j+1) + ":  " + obj.datos.included[2].attributes.content[i].attributes.values[j].value + " € ===> (" + obj.datos.included[2].attributes.content[i].attributes.values[j].percentage + "%)</li>");
		}
		document.write("<li>Total del mes:  " + obj.datos.included[2].attributes.content[i].attributes.total + " €</li></ul>");
	}
	document.write("</ul>");
};

var seg = new Object();
seg.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
seg.ciudad = "Segovia";
seg.unidades = "&units=metric";
seg.idioma = "&lang=es";
seg.url = "http://api.openweathermap.org/data/2.5/weather?q=" + seg.ciudad + seg.unidades + seg.idioma + "&APPID=" + seg.apikey;
seg.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
seg.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: seg.url,
		method: 'GET',
		success: function(data){
			seg.datos = data;
			seg.verJSON();
			seg.verDatos();
		},
		error:function(){
			document.write(seg.error);
		}
	});
}

seg.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(seg.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
seg.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Ciudad: " + seg.datos.name + "</p>");
	document.write("<p>País: " + seg.datos.sys.country + "</p>");
	document.write("<p>Latitud: " + seg.datos.coord.lat + " grados</p>");
	document.write("<p>Longitud: " + seg.datos.coord.lon + " grados</p>");
	document.write("<p>Temperatura: " + seg.datos.main.temp + " grados Celsius</p>");
	document.write("<p>Temperatura máxima: " + seg.datos.main.temp_max + " grados Celsius</p>");
	document.write("<p>Temperatura mínima: " + seg.datos.main.temp_min + " grados Celsius</p>");
	document.write("<p>Sensación térmica: " + seg.datos.main.feels_like + " grados Celsius</p>");
	document.write("<p>Presión: " + seg.datos.main.pressure + " milímetros</p>");
	document.write("<p>Humedad: " + seg.datos.main.humidity + "%</p>"); 
	document.write("<p>Amanece a las: " + new Date(seg.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Oscurece a las: " + new Date(seg.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Dirección del viento: " + seg.datos.wind.deg + "  grados</p>");
	document.write("<p>Velocidad del viento: " + seg.datos.wind.speed + " metros/segundo</p>");
	document.write("<p>Ráfagas de viento: " + seg.datos.wind.gust + " km/h</p>");
	document.write("<p>Hora de la medida: " + new Date(seg.datos.dt *1000).toLocaleTimeString() + "</p>");
	document.write("<p>Fecha de la medida: " + new Date(seg.datos.dt *1000).toLocaleDateString() + "</p>");
	document.write("<p>Descripción: " + seg.datos.weather[0].description + "</p>");
	document.write("<p>Visibilidad: " + seg.datos.visibility + " metros</p>");
	document.write("<p>Nubosidad: " + seg.datos.clouds.all + " %</p>");
	document.write("<img src='https://openweathermap.org/img/w/" + seg.datos.weather[0].icon + ".png' alt='" + seg.datos.weather[0].description + "' />");
};
