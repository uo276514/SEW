"use strict";
class Calculadora {
	
	constructor (){
		this.memoria = 0;
		this.operacion = "";
		this.resuelto = false;
	}
	
	restarMemoria() {
		this.memoria = Number(this.memoria) - Number(document.getElementById('pantalla').value);
	}
	
	sumarMemoria() {
		this.memoria = Number(this.memoria) + Number(document.getElementById('pantalla').value);
	}
	
	mostrarMemoria() {
		this.operacion = this.memoria;
		document.getElementById('pantalla').value = this.memoria;
		this.resuelto = true;
	}
	
	vaciar() {
		this.operacion = "";
		document.getElementById('pantalla').value = "";
	}
	
	leerNumero(n) {
		if (this.resuelto) {
			document.getElementById('pantalla').value = "";
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += n;
		document.getElementById('pantalla').value += n;
	}
	
	coma() {
		if (this.resuelto) {
			document.getElementById('pantalla').value = "";
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += ".";
		document.getElementById('pantalla').value += ".";
	}
	
	pulsarSuma() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "+";
		document.getElementById('pantalla').value = "";
	}
	
	pulsarResta() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "-";
		document.getElementById('pantalla').value = "";
	}
	
	pulsarMult() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "*";
		document.getElementById('pantalla').value = "";
	}
	
	pulsarDiv() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "/";
		document.getElementById('pantalla').value = "";
	}
	
	resolver() {
		try {
			document.getElementById('pantalla').value = eval(this.operacion);
		} catch (err) {
			document.getElementById('pantalla').value = "Error = " + err;
		} finally {
			this.resuelto = true;
		}
	}
}

var c = new Calculadora();

function restarMemoria()
{
	c.restarMemoria();
}

function sumarMemoria()
{
	c.sumarMemoria();
}

function mostrarMemoria()
{
	c.mostrarMemoria();
}

function vaciar()
{
	c.vaciar();
}

function num(n)
{
	c.leerNumero(Number(n));
}

function coma()
{
	c.coma();
}

function division()
{
	c.pulsarDiv();
}

function suma()
{
	c.pulsarSuma();
}

function multiplicacion()
{
	c.pulsarMult();
}

function resta()
{
	c.pulsarResta();
}

function resolver()
{
	c.resolver();
}