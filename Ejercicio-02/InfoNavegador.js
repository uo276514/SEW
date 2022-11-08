"use strict";
class InfoNav {
	constructor() {
		this.nombre = navigator.appName;
		this.idioma = navigator.language;
		this.version = navigator.appVersion;
		this.plataforma = navigator.platform;
		this.vendedor = navigator.vendor;
		this.agente = navigator.userAgent;
		this.javaActivo = navigator.javaEnabled();
		this.geolocalizacion = navigator.geolocation; // ??
		this.idiomas = navigator.languages; // ??
	}

	writeNombre() {
		document.write(this.nombre);
	}

	writeIdioma() {
		document.write(this.idioma);
	}

	writeRestoInfo() {
		document.write(this.version + " -- ");
		document.write(this.plataforma + " -- ");
		document.write(this.vendedor + " -- ");
		document.write(this.agente + " -- ");
		document.write(this.javaActivo + " -- ");
		document.write(this.geolocalizacion + " -- ");
		document.write(this.idiomas);
	}
}
var infoNavegador = new InfoNav();