var ovi = new Object();
ovi.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
ovi.ciudad = "Oviedo";
ovi.unidades = "&units=metric";
ovi.idioma = "&lang=es";
ovi.url = "http://api.openweathermap.org/data/2.5/weather?q=" + ovi.ciudad + ovi.unidades + ovi.idioma + "&APPID=" + ovi.apikey;
ovi.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
ovi.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: ovi.url,
		method: 'GET',
		success: function(data){
			ovi.datos = data;
			ovi.verJSON();
			ovi.verDatos();
		},
		error:function(){
			document.write(ovi.error);
		}
	});
}

ovi.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(ovi.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
ovi.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Ciudad: " + ovi.datos.name + "</p>");
	document.write("<p>País: " + ovi.datos.sys.country + "</p>");
	document.write("<p>Latitud: " + ovi.datos.coord.lat + " grados</p>");
	document.write("<p>Longitud: " + ovi.datos.coord.lon + " grados</p>");
	document.write("<p>Temperatura: " + ovi.datos.main.temp + " grados Celsius</p>");
	document.write("<p>Temperatura máxima: " + ovi.datos.main.temp_max + " grados Celsius</p>");
	document.write("<p>Temperatura mínima: " + ovi.datos.main.temp_min + " grados Celsius</p>");
	document.write("<p>Sensación térmica: " + ovi.datos.main.feels_like + " grados Celsius</p>");
	document.write("<p>Presión: " + ovi.datos.main.pressure + " milímetros</p>");
	document.write("<p>Humedad: " + ovi.datos.main.humidity + "%</p>"); 
	document.write("<p>Amanece a las: " + new Date(ovi.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Oscurece a las: " + new Date(ovi.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Dirección del viento: " + ovi.datos.wind.deg + "  grados</p>");
	document.write("<p>Velocidad del viento: " + ovi.datos.wind.speed + " metros/segundo</p>");
	document.write("<p>Ráfagas de viento: " + ovi.datos.wind.gust + " km/h</p>");
	document.write("<p>Hora de la medida: " + new Date(ovi.datos.dt *1000).toLocaleTimeString() + "</p>");
	document.write("<p>Fecha de la medida: " + new Date(ovi.datos.dt *1000).toLocaleDateString() + "</p>");
	document.write("<p>Descripción: " + ovi.datos.weather[0].description + "</p>");
	document.write("<p>Visibilidad: " + ovi.datos.visibility + " metros</p>");
	document.write("<p>Nubosidad: " + ovi.datos.clouds.all + " %</p>");
	document.write("<img src='https://openweathermap.org/img/w/" + ovi.datos.weather[0].icon + ".png' alt='" + ovi.datos.weather[0].description + "' />");
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

var mel = new Object();
mel.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
mel.ciudad = "Melilla";
mel.unidades = "&units=metric";
mel.idioma = "&lang=es";
mel.url = "http://api.openweathermap.org/data/2.5/weather?q=" + mel.ciudad + mel.unidades + mel.idioma + "&APPID=" + mel.apikey;
mel.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
mel.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: mel.url,
		method: 'GET',
		success: function(data){
			mel.datos = data;
			mel.verJSON();
			mel.verDatos();
		},
		error:function(){
			document.write(mel.error);
		}
	});
}

mel.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(mel.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
mel.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Ciudad: " + mel.datos.name + "</p>");
	document.write("<p>País: " + mel.datos.sys.country + "</p>");
	document.write("<p>Latitud: " + mel.datos.coord.lat + " grados</p>");
	document.write("<p>Longitud: " + mel.datos.coord.lon + " grados</p>");
	document.write("<p>Temperatura: " + mel.datos.main.temp + " grados Celsius</p>");
	document.write("<p>Temperatura máxima: " + mel.datos.main.temp_max + " grados Celsius</p>");
	document.write("<p>Temperatura mínima: " + mel.datos.main.temp_min + " grados Celsius</p>");
	document.write("<p>Sensación térmica: " + mel.datos.main.feels_like + " grados Celsius</p>");
	document.write("<p>Presión: " + mel.datos.main.pressure + " milímetros</p>");
	document.write("<p>Humedad: " + mel.datos.main.humidity + "%</p>"); 
	document.write("<p>Amanece a las: " + new Date(mel.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Oscurece a las: " + new Date(mel.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Dirección del viento: " + mel.datos.wind.deg + "  grados</p>");
	document.write("<p>Velocidad del viento: " + mel.datos.wind.speed + " metros/segundo</p>");
	document.write("<p>Ráfagas de viento: " + mel.datos.wind.gust + " km/h</p>");
	document.write("<p>Hora de la medida: " + new Date(mel.datos.dt *1000).toLocaleTimeString() + "</p>");
	document.write("<p>Fecha de la medida: " + new Date(mel.datos.dt *1000).toLocaleDateString() + "</p>");
	document.write("<p>Descripción: " + mel.datos.weather[0].description + "</p>");
	document.write("<p>Visibilidad: " + mel.datos.visibility + " metros</p>");
	document.write("<p>Nubosidad: " + mel.datos.clouds.all + " %</p>");
	document.write("<img src='https://openweathermap.org/img/w/" + mel.datos.weather[0].icon + ".png' alt='" + mel.datos.weather[0].description + "' />");
};

var mal = new Object();
mal.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
mal.ciudad = "Malaga";
mal.unidades = "&units=metric";
mal.idioma = "&lang=es";
mal.url = "http://api.openweathermap.org/data/2.5/weather?q=" + mal.ciudad + mal.unidades + mal.idioma + "&APPID=" + mal.apikey;
mal.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
mal.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: mal.url,
		method: 'GET',
		success: function(data){
			mal.datos = data;
			mal.verJSON();
			mal.verDatos();
		},
		error:function(){
			document.write(mal.error);
		}
	});
}

mal.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(mal.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
mal.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Ciudad: " + mal.datos.name + "</p>");
	document.write("<p>País: " + mal.datos.sys.country + "</p>");
	document.write("<p>Latitud: " + mal.datos.coord.lat + " grados</p>");
	document.write("<p>Longitud: " + mal.datos.coord.lon + " grados</p>");
	document.write("<p>Temperatura: " + mal.datos.main.temp + " grados Celsius</p>");
	document.write("<p>Temperatura máxima: " + mal.datos.main.temp_max + " grados Celsius</p>");
	document.write("<p>Temperatura mínima: " + mal.datos.main.temp_min + " grados Celsius</p>");
	document.write("<p>Sensación térmica: " + mal.datos.main.feels_like + " grados Celsius</p>");
	document.write("<p>Presión: " + mal.datos.main.pressure + " milímetros</p>");
	document.write("<p>Humedad: " + mal.datos.main.humidity + "%</p>"); 
	document.write("<p>Amanece a las: " + new Date(mal.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Oscurece a las: " + new Date(mal.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Dirección del viento: " + mal.datos.wind.deg + "  grados</p>");
	document.write("<p>Velocidad del viento: " + mal.datos.wind.speed + " metros/segundo</p>");
	document.write("<p>Ráfagas de viento: " + mal.datos.wind.gust + " km/h</p>");
	document.write("<p>Hora de la medida: " + new Date(mal.datos.dt *1000).toLocaleTimeString() + "</p>");
	document.write("<p>Fecha de la medida: " + new Date(mal.datos.dt *1000).toLocaleDateString() + "</p>");
	document.write("<p>Descripción: " + mal.datos.weather[0].description + "</p>");
	document.write("<p>Visibilidad: " + mal.datos.visibility + " metros</p>");
	document.write("<p>Nubosidad: " + mal.datos.clouds.all + " %</p>");
	document.write("<img src='https://openweathermap.org/img/w/" + mal.datos.weather[0].icon + ".png' alt='" + mal.datos.weather[0].description + "' />");
};

var vall = new Object();
vall.apikey = "fa461273f7344fbfd66620c0a5bf7da4";
vall.ciudad = "Valladolid";
vall.unidades = "&units=metric";
vall.idioma = "&lang=es";
vall.url = "http://api.openweathermap.org/data/2.5/weather?q=" + vall.ciudad + vall.unidades + vall.idioma + "&APPID=" + vall.apikey;
vall.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
vall.cargarDatos = function(){
	$.ajax({
		dataType: "json",
		url: vall.url,
		method: 'GET',
		success: function(data){
			vall.datos = data;
			vall.verJSON();
			vall.verDatos();
		},
		error:function(){
			document.write(vall.error);
		}
	});
}

vall.verJSON = function(){
	document.write("<h1>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h1>");
	//document.write("<h2>JSON</h2>")
	//var str = JSON.stringify(vall.datos, null, 2);
	//document.write("<pre>" + str + "</pre>");
}
vall.verDatos = function(){
	
	document.write("<h2>Datos</h2>")
	document.write("<p>Ciudad: " + vall.datos.name + "</p>");
	document.write("<p>País: " + vall.datos.sys.country + "</p>");
	document.write("<p>Latitud: " + vall.datos.coord.lat + " grados</p>");
	document.write("<p>Longitud: " + vall.datos.coord.lon + " grados</p>");
	document.write("<p>Temperatura: " + vall.datos.main.temp + " grados Celsius</p>");
	document.write("<p>Temperatura máxima: " + vall.datos.main.temp_max + " grados Celsius</p>");
	document.write("<p>Temperatura mínima: " + vall.datos.main.temp_min + " grados Celsius</p>");
	document.write("<p>Sensación térmica: " + vall.datos.main.feels_like + " grados Celsius</p>");
	document.write("<p>Presión: " + vall.datos.main.pressure + " milímetros</p>");
	document.write("<p>Humedad: " + vall.datos.main.humidity + "%</p>"); 
	document.write("<p>Amanece a las: " + new Date(vall.datos.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Oscurece a las: " + new Date(vall.datos.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
	document.write("<p>Dirección del viento: " + vall.datos.wind.deg + "  grados</p>");
	document.write("<p>Velocidad del viento: " + vall.datos.wind.speed + " metros/segundo</p>");
	document.write("<p>Ráfagas de viento: " + vall.datos.wind.gust + " km/h</p>");
	document.write("<p>Hora de la medida: " + new Date(vall.datos.dt *1000).toLocaleTimeString() + "</p>");
	document.write("<p>Fecha de la medida: " + new Date(vall.datos.dt *1000).toLocaleDateString() + "</p>");
	document.write("<p>Descripción: " + vall.datos.weather[0].description + "</p>");
	document.write("<p>Visibilidad: " + vall.datos.visibility + " metros</p>");
	document.write("<p>Nubosidad: " + vall.datos.clouds.all + " %</p>");
	document.write("<img src='https://openweathermap.org/img/w/" + vall.datos.weather[0].icon + ".png' alt='" + vall.datos.weather[0].description + "' />");
};

