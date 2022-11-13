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
					break;
				case 'M':
					this.mostrarMemoria();
					break;
				case 'm':
					this.sumarMemoria();
					break;
				case 'n':
					this.restarMemoria();
					break;
				case 's':
					this.cambiarSigno();
					break;
				case 'r':
					this.raizCuadrada();
					break;
				case '%':
					this.modulo();
					break;
			}
		});
	}

	getPantalla() {
		return document.getElementsByTagName("input")[0].value;
	}

	setPantalla(value) {
		document.getElementsByTagName("input")[0].value = value;
	}
	
	restarMemoria() {
		this.memoria = Number(this.memoria) - Number(this.getPantalla());
	}
	
	sumarMemoria() {
		this.memoria = Number(this.memoria) + Number(this.getPantalla());
	}
	
	mostrarMemoria() {
		this.operacion = Number(this.memoria);
		this.setPantalla(Number(this.memoria));
		this.resuelto = true;
	}
	
	vaciar() {
		this.operacion = "";
		this.setPantalla("");
	}
	
	leerNumero(n) {
		if (this.resuelto) {
			this.setPantalla("");
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += n;
		this.setPantalla(this.getPantalla() + Number(n));
	}
	
	coma() {
		if (this.resuelto) {
			this.setPantalla("");
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += ".";
		this.setPantalla(this.getPantalla() + ".");
	}
	
	pulsarSuma() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "+";
		}
		this.setPantalla("");
	}
	
	pulsarResta() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "-";
		}
		this.setPantalla("");
	}
	
	pulsarMult() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "*";
		}
		this.setPantalla("");
	}
	
	pulsarDiv() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "/";
		}
		this.setPantalla("");
	}

	raizCuadrada() {
		var n = Number(this.getPantalla());
		var res = Math.sqrt(n);
		this.setPantalla(res);
		this.resuelto = true;
	}

	modulo() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "%";
		}
		this.setPantalla("");
	}

	cambiarSigno() {
		var aux = Number(this.getPantalla()) * -1;
		this.operacion = aux;
		this.setPantalla(this.operacion);
	}

	vaciarError() {
		this.memoria = 0;
		this.operacion = "";
		this.resuelto = false;
		this.operador = "";
		this.n1 = "";
		this.n2 = "";
		this.opLeido = false;
		this.setPantalla("");
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
				} else if (this.operacion[i] == '%') {
					this.operador = "%";
					this.opLeido = true;
				} else {
					if (!this.opLeido) {
						this.n1 += this.operacion[i];
					} else {
						this.n2 += this.operacion[i];
					}
				}
			}
			this.setPantalla(eval(Number(this.n1) + this.operador + Number(this.n2)));
		} catch (err) {
			this.setPantalla("Error = " + err);
		} finally {
			this.resuelto = true;
			this.n1 = "";
			this.n2 = "";
			this.opLeido = false;
		}
	}
}
var c = new Calculadora();






