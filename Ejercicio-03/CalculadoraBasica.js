"use strict";
class Calculadora {
	
	constructor (){
		this.memoria = 0;
		this.operacion = "";
		this.resuelto = false;
		this.operador = "";
		this.n1 = "";
		this.n2 = "";
		this.opLeido = false;
	}
	
	restarMemoria() {
		this.memoria = Number(this.memoria) - Number(document.getElementById('pantalla').value);
	}
	
	sumarMemoria() {
		this.memoria = Number(this.memoria) + Number(document.getElementById('pantalla').value);
	}
	
	mostrarMemoria() {
		this.operacion = Number(this.memoria);
		document.getElementById('pantalla').value = Number(this.memoria);
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
		document.getElementById('pantalla').value += Number(n);
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
		if (this.operacion.length > 0) {
			this.operacion += "+";
		}
		document.getElementById('pantalla').value = "";
	}
	
	pulsarResta() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "-";
		}
		document.getElementById('pantalla').value = "";
	}
	
	pulsarMult() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "*";
		}
		document.getElementById('pantalla').value = "";
	}
	
	pulsarDiv() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "/";
		}
		document.getElementById('pantalla').value = "";
	}
	
	resolver() {
		try {
			for (var i=0; i < this.operacion.length; i++) {
				if(this.operacion[i] == '+') {
					this.operador = "+";
					this.opLeido = true;
				} else if (this.operacion[i] == '-') {
					this.operador = "-";
					this.opLeido = true;
				} else if (this.operacion[i] == '*') {
					this.operador = "*";
					this.opLeido = true;
				} else if (this.operacion[i] == '/') {
					this.operador = "/";
					this.opLeido = true;
				} else {
					if (!this.opLeido) {
						this.n1 += this.operacion[i];
					} else {
						this.n2 += this.operacion[i];
					}
				}
			}
			document.getElementById('pantalla').value = eval(Number(this.n1) + this.operador + Number(this.n2));
		} catch (err) {
			document.getElementById('pantalla').value = "Error = " + err;
		} finally {
			this.resuelto = true;
			this.n1 = "";
			this.n2 = "";
			this.opLeido = false;
		}
	}
}
var c = new Calculadora();






