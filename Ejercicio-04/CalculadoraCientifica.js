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

class CalculadoraCientifica extends Calculadora {
	constructor() {
		super();
		this.uAng = "DEG";
		this.normal = true;
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
		var x = this.getPantalla();
		while (x >= 1) {
			res *= 10;
			x--;
		}
		this.setPantalla(res);
		this.resuelto = true;
	}

	eliminarUltimo() {
		var nuevaOp = "";
		for (var i=0; i < this.operacion.length-1; i++) {
			nuevaOp += this.operacion[i];
		}
		this.operacion = nuevaOp;
		this.setPantalla(this.operacion);
	}

	pi() {
		if (this.resuelto) {
			this.setPantalla("");
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += "π";
		this.setPantalla(this.getPantalla() + "π");
	}

	parentesisInicio() {
		if (this.resuelto) {
			this.setPantalla("");
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += "(";
		this.setPantalla(this.getPantalla() + "(");
	}

	parentesisFin() {
		if (this.resuelto) {
			this.setPantalla("");
			this.operacion = "";
			this.resuelto = false;
		}
		this.operacion += ")";
		this.setPantalla(this.getPantalla() + ")");
	}

	cambiarUnidadAngular() {
		if (this.uAng == "DEG") {
			this.uAng = "RAD";
		} else if (this.uAng == "RAD") {
			this.uAng = "GRAD";
		} else {
			this.uAng = "DEG";
		}
		document.getElementsByTagName("input")[1].value = this.uAng;
	}

	cambiarInversa() {
		if (this.normal) {
			document.getElementsByTagName("input")[13].value = "arcsin";
			document.getElementsByTagName("input")[14].value = "arccos";
			document.getElementsByTagName("input")[15].value = "arctan";
			this.normal = false;
		} else {
			document.getElementsByTagName("input")[13].value = "sin";
			document.getElementsByTagName("input")[14].value = "cos";
			document.getElementsByTagName("input")[15].value = "tan";
			this.normal = true;
		}
	}

	log() {
		var n = Number(this.getPantalla());
		var res = Math.log10(n);
		this.setPantalla(res);
		this.resuelto = true;
	}

	alCuadrado() {
		var n = Number(this.getPantalla());
		var res = n * n;
		this.setPantalla(res);
		this.resuelto = true;
	}

	sinh() {
		var n = Number(this.getPantalla());
		var res = Math.sinh(n);
		this.setPantalla(res);
		this.resuelto = true;
	}

	cosh() {
		var n = Number(this.getPantalla());
		var res = Math.cosh(n);
		this.setPantalla(res);
		this.resuelto = true;
	}

	tanh() {
		var n = Number(this.getPantalla());
		var res = Math.tanh(n);
		this.setPantalla(res);
		this.resuelto = true;
	}

	seno() {
		var n = Number(this.getPantalla());
		if (this.getPantalla() == "π") {
			n = Math.PI;
		}
		if (document.getElementsByTagName("input")[13].value == "sin") {
			var res = Math.sin(n);
		} else {
			var res = Math.asin(n);
		}
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		this.setPantalla(res);
		this.resuelto = true;
	}

	coseno() {
		var n = Number(this.getPantalla());
		if (this.getPantalla() == "π") {
			n = Math.PI;
		}
		if (document.getElementsByTagName("input")[13].value == "cos") {
			var res = Math.cos(n);
		} else {
			var res = Math.acos(n);
		}
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		this.setPantalla(res);
		this.resuelto = true;
	}

	tangente() {
		var n = Number(this.getPantalla());
		if (this.getPantalla() == "π") {
			n = Math.PI;
		}
		if (document.getElementsByTagName("input")[13].value == "tan") {
			var res = Math.tan(n);
		} else {
			var res = Math.atan(n);
		}
		if (this.uAng == "DEG") {
			res = res * 57.2958;
		} else if (this.uAng == "GRAD") {
			res = res * 63.662;
		}
		this.setPantalla(res);
		this.resuelto = true;
	}

	notacionCientifica() {
		var n = Number(this.getPantalla());
		var aux = 0;
		while (n >= 10) {
			n /= 10;
			aux++;
		}
		this.setPantalla(n + "e+" + aux);
		this.resuelto = true;
	}

	factorial() {
		var n = Number(this.getPantalla());
		var res = 1;
		while (n >= 1) {
			res *= n;
			n--;
		}
		this.setPantalla(res);
		this.resuelto = true;
	}

	elevar() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		this.operacion += "^";
		this.setPantalla(this.getPantalla() + "^");
	}

	exp() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		this.operacion += "x";
		this.setPantalla(this.getPantalla() + " Exp ");
	}

	pulsarSuma() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		this.operacion += "+";
		this.setPantalla(this.operacion);
	}

	pulsarResta() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		this.operacion += "-";
		this.setPantalla(this.operacion);
	}
	
	pulsarMult() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "*";
		}
		this.setPantalla(this.operacion);
	}
	
	pulsarDiv() {
		if (this.resuelto) {
			this.operacion = this.getPantalla();
			this.resuelto = false;
		}
		if (this.operacion.length > 0) {
			this.operacion += "/";
		}
		this.setPantalla(this.operacion);
	}

	vaciarMemoria() {
		this.memoria = 0;
	}

	almacenarMemoria() {
		this.memoria = this.getPantalla();
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
				} else if (this.operacion[i] == '%') {
					if (this.n1 != "") {
						if (this.operador != "") {
							if (this.n1 != "" && this.n2 != "") {
								this.n1 = eval(Number(this.n1) + this.operador + Number(this.n2));
								this.n2 = "";
							}
						}
						this.operador = "%";
						this.opLeido = true;
					}
				} else if (this.operacion[i] == '(') {

				} else if (this.operacion[i] == ')') {

				} else if (this.operacion[i] == 'x') {
					this.operador = "x";
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
			} else if (this.operador == "^") {
				this.calcularPotencia();
			} else {
				if (this.n2 == "") {
					this.setPantalla(Number(this.n1));
				} else {
					this.setPantalla(eval(Number(this.n1) + this.operador + Number(this.n2)));
				}
			}
		} catch (err) {
			this.setPantalla("Error = " + err);
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
		this.setPantalla(n);
	}

	calcularExp() {
		var n = Number(this.n1);
		var x = Number(this.n2);
		while (x > 0) {
			n *= 10;
			x--;
		}
		this.setPantalla(n);
	}
}

var c = new CalculadoraCientifica();



