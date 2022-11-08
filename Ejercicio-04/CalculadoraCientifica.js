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

	raizCuadrada() {
		var n = Number(document.getElementById('pantalla').value);
		var res = Math.sqrt(n);
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	modulo() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "%";
		}
		document.getElementById('pantalla').value = "";
	}

	cambiarSigno() {
		var aux = Number(document.getElementById('pantalla').value) * -1;
		this.operacion = aux;
		document.getElementById('pantalla').value = this.operacion;
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

class CalculadoraCientifica extends Calculadora {
	constructor() {
		super();
		this.uAng = "DEG";
		document.addEventListener('keydown', (event) => {
			const k = event.key;
			switch (k) {
				case '(':
					this.parentesisInicio();
					break;
				case ')':
					this.parentesisFin();
					break;
				case 'Backspace':
					this.eliminarUltimo();
					break;
				case 'E':
					this.vaciarError();
					break;
				case 'l':
					this.log();
					break;
				case '!':
					this.factorial();
					break;
				case 'p':
					this.pi();
					break;
				case 'x':
					this.exp();
					break;
				case 'd':
					this.potencia10();
					break;
				case 'c':
					this.alCuadrado();
					break;
				case 'L':
					this.elevar();
					break;
				case 'i':
					this.seno();
					break;
				case 'I':
					this.sinh();
					break;
				case 'o':
					this.coseno();
					break;
				case 'O':
					this.cosh();
					break;
				case 'a':
					this.tangente();
					break;
				case 'A':
					this.tanh();
					break;
				case 'g':
					this.cambiarUnidadAngular();
					break;
				case 'F':
					this.notacionCientifica();
					break;
				case 'V':
					this.vaciarMemoria();
					break;
				case 'S':
					this.almacenarMemoria();
					break;
			}
		});
	}

	potencia10() {
		var res = 1;
		var x = document.getElementById('pantalla').value;
		while (x >= 1) {
			res *= 10;
			x--;
		}
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	eliminarUltimo() {
		var nuevaOp = "";
		for (var i=0; i < this.operacion.length-1; i++) {
			nuevaOp += this.operacion[i];
		}
		this.operacion = nuevaOp;
		document.getElementById('pantalla').value = this.operacion;
	}

	pi() {
		if (this.resuelto) {
			document.getElementById('pantalla').value = "";
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += "π";
		document.getElementById('pantalla').value += "π";
	}

	parentesisInicio() {
		if (this.resuelto) {
			document.getElementById('pantalla').value = "";
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += "(";
		document.getElementById('pantalla').value += "(";
	}

	parentesisFin() {
		if (this.resuelto) {
			document.getElementById('pantalla').value = "";
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += ")";
		document.getElementById('pantalla').value += ")";
	}

	cambiarUnidadAngular() {
		if (this.uAng == "DEG") {
			this.uAng = "RAD";
		} else if (this.uAng == "RAD") {
			this.uAng = "GRAD";
		} else {
			this.uAng = "DEG";
		}
		document.getElementById('g').value = this.uAng;
	}

	log() {
		var n = Number(document.getElementById('pantalla').value);
		var res = Math.log10(n);
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	alCuadrado() {
		var n = Number(document.getElementById('pantalla').value);
		var res = n * n;
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	sinh() {
		var n = Number(document.getElementById('pantalla').value);
		var res = Math.sinh(n);
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	cosh() {
		var n = Number(document.getElementById('pantalla').value);
		var res = Math.cosh(n);
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	tanh() {
		var n = Number(document.getElementById('pantalla').value);
		var res = Math.tanh(n);
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	seno() {
		var n = Number(document.getElementById('pantalla').value);
		if (document.getElementById('pantalla').value == "π") {
			n = Math.PI;
		}
		var res = Math.sin(n);
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	coseno() {
		var n = Number(document.getElementById('pantalla').value);
		if (document.getElementById('pantalla').value == "π") {
			n = Math.PI;
		}
		var res = Math.cos(n);
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	tangente() {
		var n = Number(document.getElementById('pantalla').value);
		if (document.getElementById('pantalla').value == "π") {
			n = Math.PI;
		}
		var res = Math.tan(n);
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	notacionCientifica() {
		var n = Number(document.getElementById('pantalla').value);
		var aux = 0;
		while (n >= 10) {
			n /= 10;
			aux++;
		}
		document.getElementById('pantalla').value = n + "e+" + aux;
		this.resuelto = true;
	}

	factorial() {
		var n = Number(document.getElementById('pantalla').value);
		var res = 1;
		while (n >= 1) {
			res *= n;
			n--;
		}
		document.getElementById('pantalla').value = res;
		this.resuelto = true;
	}

	elevar() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "^";
		document.getElementById('pantalla').value += "^";
	}

	exp() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "x";
		document.getElementById('pantalla').value += " Exp ";
	}

	pulsarSuma() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "+";
		document.getElementById('pantalla').value = this.operacion;
	}

	pulsarResta() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		this.operacion += "-";
		document.getElementById('pantalla').value = this.operacion;
	}
	
	pulsarMult() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "*";
		}
		document.getElementById('pantalla').value = this.operacion;
	}
	
	pulsarDiv() {
		if (this.resuelto) {
			this.operacion = document.getElementById('pantalla').value;
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "/";
		}
		document.getElementById('pantalla').value = this.operacion;
	}

	vaciarMemoria() {
		this.memoria = 0;
	}

	almacenarMemoria() {
		this.memoria = document.getElementById('pantalla').value;
	}

	vaciarError() {
		this.memoria = 0;
		this.operacion = "";
		this.resuelto = false;
		this.operador = "";
		this.n1 = "";
		this.n2 = "";
		this.opLeido = false;
		document.getElementById('pantalla').value = "";
	}

	resolver() {
		try {
			for (var i=0; i < this.operacion.length; i++) {
				if(this.operacion[i] == '+') {
					if (this.n1 == "") {
						this.n1 += "+";
					} else if (this.operador != "") {
						if (this.n1 != "" && this.n2 != "") {
							this.n1 = eval(Number(this.n1) + this.operador + Number(this.n2));
							this.n2 = "";
							this.operador = "+";
							this.opLeido = true;
						} else if (this.n2 == "") {
							this.n2 += "+";
						} else {
							this.operador = "+";
							this.opLeido = true;
						}
					} else {
						this.operador = "+";
						this.opLeido = true;
					}
				} else if (this.operacion[i] == '-') {
					if (this.n1 == "") {
						this.n1 += "-";
					} else if (this.operador != "") {
						if (this.n1 != "" && this.n2 != "") {
							this.n1 = eval(Number(this.n1) + this.operador + Number(this.n2));
							this.n2 = "";
							this.operador = "-";
							this.opLeido = true;
						} else if (this.n2 == "") {
							this.n2 += "-";
						} else {
							this.operador = "-";
							this.opLeido = true;
						}
					} else {
						this.operador = "-";
						this.opLeido = true;
					}
				} else if (this.operacion[i] == '*') {
					if (this.n1 != "") {
						if (this.operador != "") {
							if (this.n1 != "" && this.n2 != "") {
								this.n1 = eval(Number(this.n1) + this.operador + Number(this.n2));
								this.n2 = "";
							}
						}
						this.operador = "*";
						this.opLeido = true;
					}
				} else if (this.operacion[i] == '/') {
					if (this.n1 != "") {
						if (this.operador != "") {
							if (this.n1 != "" && this.n2 != "") {
								this.n1 = eval(Number(this.n1) + this.operador + Number(this.n2));
								this.n2 = "";
							}
						}
						this.operador = "/";
						this.opLeido = true;
					}
				} else if (this.operacion[i] == '(') {

				} else if (this.operacion[i] == ')') {

				} else if (this.operacion[i] == 'x') {
					this.operador = "x";
					this.opLeido = true;
				} else if (this.operacion[i] == 'm') {
					this.operador = "m";
					this.opLeido = true;
				} else if (this.operacion[i] == '^') {
					this.operador = "^";
					this.opLeido = true;
				} else {
					if (!this.opLeido) {
						if (this.operacion[i] == 'π') {
							this.n1 = Math.PI;
						} else {
							this.n1 += this.operacion[i];
						}
					} else {
						if (this.operacion[i] == 'π') {
							this.n2 = Math.PI;
						} else {
							this.n2 += this.operacion[i];
						}
					}
				}
			}
			if (this.operador == "x") {
				this.calcularExp();
			} else if (this.operador == "m") {
				this.calcularModulo();
			} else if (this.operador == "^") {
				this.calcularPotencia();
			} else {
				if (this.n2 == "") {
					document.getElementById('pantalla').value = Number(this.n1);
				} else {
					document.getElementById('pantalla').value = eval(Number(this.n1) + this.operador + Number(this.n2));
				}
			}
		} catch (err) {
			document.getElementById('pantalla').value = "Error = " + err;
		} finally {
			this.resuelto = true;
			this.n1 = "";
			this.n2 = "";
			this.operador = "";
			this.opLeido = false;
		}
	}

	calcularPotencia() {
		var n = Number(this.n1);
		var aux = n;
		var x = Number(this.n2);
		while (x > 1) {
			n *= aux;
			x--;
		}
		document.getElementById('pantalla').value = n;
	}

	calcularModulo() {
		var n = Number(this.n1);
		var x = Number(this.n2);
		while (n >= x) {
			n -= x;
		}
		document.getElementById('pantalla').value = n;
	}

	calcularExp() {
		var n = Number(this.n1);
		var x = Number(this.n2);
		while (x > 0) {
			n *= 10;
			x--;
		}
		document.getElementById('pantalla').value = n;
	}
}

var c = new CalculadoraCientifica();



