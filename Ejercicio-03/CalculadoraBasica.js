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
		document.addEventListener('keydown', (event) => {
			const k = event.key;
			switch (k) {
				case '1':
					this.leerNumero(Number(1));
					break;
				case '2':
					this.leerNumero(Number(2));
					break;
				case '3':
					this.leerNumero(Number(3));
					break;
				case '4':
					this.leerNumero(Number(4));
					break;
				case '5':
					this.leerNumero(Number(5));
					break;
				case '6':
					this.leerNumero(Number(6));
					break;
				case '7':
					this.leerNumero(Number(7));
					break;
				case '8':
					this.leerNumero(Number(8));
					break;
				case '9':
					this.leerNumero(Number(9));
					break;
				case '0':
					this.leerNumero(Number(0));
					break;
				case '.':
					this.coma();
					break;
				case 'C':
					this.vaciar();
					break;
				case 'Enter':
					this.resolver();
					break;
				case '+':
					this.pulsarSuma();
					break;
				case '-':
					this.pulsarResta();
					break;
				case '*':
					this.pulsarMult();
					break;
				case '/':
					this.pulsarDiv();
					break;/*
				case 'm':
					this.mostrarMemoria();
					break;
				case 'k':
					this.sumarMemoria();
					break;
				case 'k':
					this.restarMemoria();
					break;*/
			}
		});
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






