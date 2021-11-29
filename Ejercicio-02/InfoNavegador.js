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
		document.write(this.javaActivo);
	}
}
var infoNavegador = new InfoNav();