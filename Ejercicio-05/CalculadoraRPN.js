"use strict";
class CalculadoraRPN {
	
	constructor (){
		this.pila = new Array();
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
					this.enter();
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
				case 'i':
					this.sen();
					break;
				case 'o':
					this.cos();
					break;
				case 'a':
					this.tan();
					break;
				case 'I':
					this.arcsen();
					break;
				case 'O':
					this.arccos();
					break;
				case 'A':
					this.arctan();
					break;
			}
		});
	}

	getPantalla() {
		return document.getElementsByTagName("textarea")[0].value;
	}

	setPantalla(value) {
		document.getElementsByTagName("textarea")[0].value = value;
	}

	getSubPantalla() {
		return document.getElementsByTagName("input")[0].value;
	}

	setSubPantalla(value) {
		document.getElementsByTagName("input")[0].value = value;
	}

	arctan() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.atan(n));
			this.setPantalla(this.imprimirPila());
		}
	}

	arccos() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.acos(n));
			this.setPantalla(this.imprimirPila());
		}
	}

	arcsen() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.asin(n));
			this.setPantalla(this.imprimirPila());
		}
	}

	tan() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.tan(n));
			this.setPantalla(this.imprimirPila());
		}
	}

	cos() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.cos(n));
			this.setPantalla(this.imprimirPila());
		}
	}

	sen() {
		if (this.pila.length >= 1) {
			var n = Number(this.pila.pop());
			this.pila.push(Math.sin(n));
			this.setPantalla(this.imprimirPila());
		}
	}
	
	vaciar() {
		this.setSubPantalla("");
	}
	
	leerNumero(n) {
		this.setSubPantalla(this.getSubPantalla() + Number(n));
	}
	
	coma() {
		this.setSubPantalla(this.getSubPantalla() + ".");
	}
	
	pulsarSuma() {
		if (this.pila.length >= 2) {
			var n1 = Number(this.pila.pop());
			var n2 = Number(this.pila.pop());
			this.pila.push(n2 + n1);
			this.setPantalla(this.imprimirPila());
		}
	}
	
	pulsarResta() {
		if (this.pila.length >= 2) {
			var n1 = Number(this.pila.pop());
			var n2 = Number(this.pila.pop());
			this.pila.push(n2 - n1);
			this.setPantalla(this.imprimirPila());
		}
	}
	
	pulsarMult() {
		if (this.pila.length >= 2) {
			var n1 = Number(this.pila.pop());
			var n2 = Number(this.pila.pop());
			this.pila.push(n2 * n1);
			this.setPantalla(this.imprimirPila());
		}
	}
	
	pulsarDiv() {
		if (this.pila.length >= 2) {
			var n1 = Number(this.pila.pop());
			var n2 = Number(this.pila.pop());
			this.pila.push(n2 / n1);
			this.setPantalla(this.imprimirPila());
		}
	}

	imprimirPila() {
		var pilaCont = "";
		for (var l=0; l < this.pila.length; l++) {
			pilaCont += " " + (l+1) + ".\t\t" + this.pila[l] + " \n";
		}
		return pilaCont;
	}
	
	enter() {
		if (this.getSubPantalla().length > 0) {
			this.pila.push(parseFloat(this.getSubPantalla()));
			this.setPantalla(this.imprimirPila());

			this.vaciar();
		}
	}
}

var c = new CalculadoraRPN();



