<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-1_CalculadoraBasica">
	<meta name="keywords" content="PHP, Calculadora, Basica">
    
    <title>CalculadoraBasica</title>
                
    <link rel='stylesheet' type='text/css' href='CalculadoraBasica.css' />
</head>
<body>
<?php

    
session_start();

class Calculadora {

    protected $memoria;
    protected $pantalla;

    public function __construct() {
        $this->memoria = 0;
        $this->pantalla = "";
    }

    public function mostrarMemoria() {
        $_SESSION['pantalla'] = $_SESSION['memoria'];
        $this->memoria = $_SESSION['memoria'];
    }

    public function sumarMemoria() {
        try {
            $expresion = $_SESSION['pantalla'];
            $resultado = eval("return $expresion;");
            $this->memoria = $_SESSION['memoria'] + $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
    }

    public function restarMemoria() {
        try {
            $expresion = $_SESSION['pantalla'];
            $resultado = eval("return $expresion;");
            $this->memoria = $_SESSION['memoria'] - $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        } 
    }

    public function coma() {
        $this->pantalla .= ".";
        $this->memoria = $_SESSION['memoria'];
    }

    public function leerNumero($n) {
		$this->pantalla .= $n;
        $this->memoria = $_SESSION['memoria'];
    }

    public function vaciar() {
        $_SESSION['pantalla'] = "";
        $this->memoria = $_SESSION['memoria'];
    }

    public function pulsarSuma() {
        $this->pantalla = "+";
        $this->memoria = $_SESSION['memoria'];
    }

    public function pulsarResta() {
        $this->pantalla .= "-";
        $this->memoria = $_SESSION['memoria'];
    }

    public function pulsarMult() {
        $this->pantalla .= "*";
        $this->memoria = $_SESSION['memoria'];
    }

    public function pulsarDiv() {
        $this->pantalla .= "/";
        $this->memoria = $_SESSION['memoria'];
    }

    public function resolver() {
        try {
            $expresion = $_SESSION["pantalla"];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $this->pantalla = $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        } 
        $this->memoria = $_SESSION['memoria'];
    }

    public function getPantalla() {
        return $this->pantalla;
    }

    public function getMemoria() {
        return $this->memoria;
    }
}

$operacion = "";
$pantalla = "";
$memoria = 0;

//Solo se ejecutará si se ha pulsado un botón
if (count($_POST)>0) 
    {   
        $c = new Calculadora();

        if(isset($_POST['mrc'])) $c->mostrarMemoria();
        if(isset($_POST['m+'])) $c->sumarMemoria();
        if(isset($_POST['m-'])) $c->restarMemoria();
        if(isset($_POST['0'])) $c->leerNumero("0");
        if(isset($_POST['1'])) $c->leerNumero("1");
        if(isset($_POST['2'])) $c->leerNumero("2");
        if(isset($_POST['3'])) $c->leerNumero("3");
        if(isset($_POST['4'])) $c->leerNumero("4");
        if(isset($_POST['5'])) $c->leerNumero("5");
        if(isset($_POST['6'])) $c->leerNumero("6");
        if(isset($_POST['7'])) $c->leerNumero("7");
        if(isset($_POST['8'])) $c->leerNumero("8");
        if(isset($_POST['9'])) $c->leerNumero("9");
        if(isset($_POST['p'])) $c->coma();
        if(isset($_POST['C'])) $c->vaciar();
        if(isset($_POST['/'])) $c->pulsarDiv();
        if(isset($_POST['*'])) $c->pulsarMult();
        if(isset($_POST['+'])) $c->pulsarSuma();
        if(isset($_POST['-'])) $c->pulsarResta();
        if(isset($_POST['='])) $c->resolver();
        
        $pantalla = $c->getPantalla();
        $memoria = $c->getMemoria();
        $_SESSION['memoria'] = $memoria;
        
        if( isset( $_SESSION['pantalla'] ) ) {
            $_SESSION['pantalla'] .= $pantalla;
        } else {
            $_SESSION['pantalla'] = $pantalla;
        }
        
        $memoria = $_SESSION['memoria'];
        $operacion =  $_SESSION['pantalla'];
        $pantalla = $operacion;
    }

    // Interfaz (contenido HTML)
    echo "  
        <h1>Calculadora básica</h1>
        <form action='#' method='post' name='botones'>
            <label for='pantalla'>NADA</label>
            <input type='text' id='pantalla' name='pantalla' value='$pantalla' disabled />
            
            <input type='submit' class='button' name='mrc' value='mrc'/>
            <input type='submit' class='button' name='m+' value='m+'/>
            <input type='submit' class='button' name='m-' value='m-'/>
            <input type='submit' class='button' name='/' value='/'/>
            <input type='submit' class='button' name='7' value='7'/>
            <input type='submit' class='button' name='8' value='8'/>
            <input type='submit' class='button' name='9' value='9'/>
            <input type='submit' class='button' name='*' value='*'/>
            <input type='submit' class='button' name='4' value='4'/>
            <input type='submit' class='button' name='5' value='5'/>
            <input type='submit' class='button' name='6' value='6'/>
            <input type='submit' class='button' name='-' value='-'/>
            <input type='submit' class='button' name='1' value='1'/>
            <input type='submit' class='button' name='2' value='2'/>
            <input type='submit' class='button' name='3' value='3'/>
            <input type='submit' class='button' name='+' value='+'/>
            <input type='submit' class='button' name='0' value='0'/>
            <input type='submit' class='button' name='p' value='.'/>
            <input type='submit' class='button' name='C' value='C'/>
            <input type='submit' class='button' name='=' value='='/>                 
        </form>
    ";
 
?>
</body>
</html>