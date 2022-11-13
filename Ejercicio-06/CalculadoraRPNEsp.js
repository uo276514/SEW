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
				case 'm':
					this.kmToM();
					break;
				case 'c':
					this.mToCm();
					break;
				case 'k':
					this.mToKm();
					break;
				case 'i':
					this.cm3ToL();
					break;
				case 'M':
					this.lToM3();
					break;
				case 'l':
					this.m3ToL();
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

	m3ToL() {
		if (this.pila.length >= 1) {
			var m3= Number(this.pila.pop());
			var L = m3 * 1000;
			this.pila.push(L);
			this.setPantalla(this.imprimirPila());
		}
	}

	lToM3() {
		if (this.pila.length >= 1) {
			var L = Number(this.pila.pop());
			var m3 = L / 1000;
			this.pila.push(m3);
			this.setPantalla(this.imprimirPila());
		}
	}

	cm3ToL() {
		if (this.pila.length >= 1) {
			var cm3 = Number(this.pila.pop());
			var L = cm3 / 1000;
			this.pila.push(L);
			this.setPantalla(this.imprimirPila());
		}
	}

	mToKm() {
		if (this.pila.length >= 1) {
			var m = Number(this.pila.pop());
			var km = m / 1000;
			this.pila.push(km);
			this.setPantalla(this.imprimirPila());
		}
	}

	mToCm() {
		if (this.pila.length >= 1) {
			var m = Number(this.pila.pop());
			var cm = m * 100;
			this.pila.push(cm);
			this.setPantalla(this.imprimirPila());
		}
	}

	kmToM() {
		if (this.pila.length >= 1) {
			var km = Number(this.pila.pop());
			var m = km * 1000;
			this.pila.push(m);
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
			this.pila.push(n1 + n2);
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
			pilaCont += " " + (l+1) + ".\t\t\t\t" + this.pila[l] + " \n";
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



