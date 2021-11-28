"use strict";
class Asignatura {
	constructor() {
		this.nombre = "Software y estándares en la Web";
		this.titulacion = "Grado en Ingeniería Informática del Software";
		this.centro = "Escuela de Ingeniería Informática";
		this.universidad = "Universidad de Oviedo";
		this.curso = "2021-2022";
		this.estudiante = "Jorge López Peláez";
		this.email = "uo276514@uniovi.es";
	}

	writeTitulo1() {
		document.write("<h1>");
		document.write(this.nombre);
		document.write("</h1>");
	}

	writeTitulo2() {
		document.write("<h2>");
		document.write(this.titulacion);
		document.write("</h2>");
	}

	writeTitulo3() {
		document.write("<h3>");
		document.write(this.centro);
		document.write("</h3>");
	}

	writeTitulo4() {
		document.write("<h4>");
		document.write(this.universidad);
		document.write("</h4>");
	}

	writeParrafos() {
		document.write("<p>Curso actual: ");
		document.write(this.curso);
		document.write("</p>");
		document.write("<p>Nombre del estudiante: ");
		document.write(this.estudiante);
		document.write("</p>");
		document.write("<p>Email del estudiante: ");
		document.write(this.email);
		document.write("</p>");
	}
}
var asig = new Asignatura();
