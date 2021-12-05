<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-3_CalculadoraRPN">
	<meta name="keywords" content="PHP, Calculadora, RPN">
    
    <title>CalculadoraRPN</title>
                
    <link rel='stylesheet' type='text/css' href='CalculadoraRPN.css' />
</head>
<body>
<?php

session_start();

class Calculadora {

    protected $pila;
    protected $subpantalla;
    protected $pantalla;

    public function __construct() {
        $this->pila = array();
        $this->pantalla = "";
        $this->subpantalla = "";
    }

    public function coma() {
        $this->subpantalla .= ".";
        $this->pila = $_SESSION['pila'];
    }

    public function leerNumero($n) {
		$this->subpantalla .= $n;
        $this->pila = $_SESSION['pila'];
    }

    public function vaciar() {
        $_SESSION['subpantalla'] = "";
        $this->pila = $_SESSION['pila'];
    }

    public function pulsarSuma() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 2) {
            $n1 = array_shift($this->pila);
            $n2 = array_shift($this->pila);
            $suma = $n1 + $n2;
            array_unshift($this->pila, $suma);
        }
    }

    public function pulsarResta() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 2) {
            $n1 = array_shift($this->pila);
            $n2 = array_shift($this->pila);
            $resta = $n1 - $n2;
            array_unshift($this->pila, $resta);
        }
    }

    public function pulsarMult() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 2) {
            $n1 = array_shift($this->pila);
            $n2 = array_shift($this->pila);
            $mult = $n1 * $n2;
            array_unshift($this->pila, $mult);
        }
    }

    public function pulsarDiv() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 2) {
            $n1 = array_shift($this->pila);
            $n2 = array_shift($this->pila);
            $div = $n1 / $n2;
            array_unshift($this->pila, $div);
        }
    }

    public function imprimirPila() {
        $this->pantalla = "";
        for ($i=0; $i < count($this->pila); $i++) {
            $this->pantalla .= " " . ($i+1) . ".\t\t" . $this->pila[$i] . " \n";
        }
    }

    public function enter() {
        $this->pila = $_SESSION['pila'];
        try {
            $expresion = $_SESSION["subpantalla"];
            if ($expresion != "") {
                array_unshift($this->pila, $expresion);
                $this->imprimirPila();
            }
            $_SESSION["subpantalla"] = "";
        } catch (Exception $e) {
            $this->subpantalla = "Error: " .$e->getMessage();
        }
    }

    public function sen() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $seno = sin($n);
            array_unshift($this->pila, $seno);
        }
    }

    public function cos() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $coseno = cos($n);
            array_unshift($this->pila, $coseno);
        }
    }

    public function tan() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $tg = tan($n);
            array_unshift($this->pila, $tg);
        }
    }

    public function arcsen() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $arcsen = asin($n);
            array_unshift($this->pila, $arcsen);
        }
    }

    public function arccos() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $arccos = acos($n);
            array_unshift($this->pila, $arccos);
        }
    }

    public function arctan() {
        $this->pila = $_SESSION['pila'];
        if (count($this->pila) >= 1) {
            $n = array_shift($this->pila);
            $arctg = atan($n);
            array_unshift($this->pila, $arctg);
        }
    }

    public function getPantalla() {
        return $this->pantalla;
    }

    public function getSubpantalla() {
        return $this->subpantalla;
    }

    public function getPila() {
        return $this->pila;
    }
}

$operacion = "";
$pantalla = "";
$subpantalla = "";
$pila = array();


//Solo se ejecutará si se ha pulsado un botón
if (count($_POST)>0) 
    {   
        $c = new Calculadora();

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
        if(isset($_POST['enter'])) $c->enter();
        if(isset($_POST['sen'])) $c->sen();
        if(isset($_POST['cos'])) $c->cos();
        if(isset($_POST['tan'])) $c->tan();
        if(isset($_POST['arcsen'])) $c->arcsen();
        if(isset($_POST['arccos'])) $c->arccos();
        if(isset($_POST['arctan'])) $c->arctan();
        
        $subpantalla = $c->getSubpantalla();
        $c->imprimirPila();
        $pantalla = $c->getPantalla();
        $pila = $c->getPila();

        $_SESSION['pila'] = $pila;
        $_SESSION['pantalla'] = $pantalla;
        
        if( isset( $_SESSION['subpantalla'] ) ) {
            $_SESSION['subpantalla'] .= $subpantalla;
        } else {
            $_SESSION['subpantalla'] = $subpantalla;
        }

        $pila = $_SESSION['pila'];
        $operacion =  $_SESSION['subpantalla'];
        $subpantalla = $operacion;
        $pantalla = $_SESSION['pantalla'];
    }

    // Interfaz (contenido HTML)
    echo "  
        <h1>Calculadora RPN</h1>
        <form action='#' method='post' name='botones'>

            <label for='pantalla'>NADA</label>
            <textarea id='pantalla' name='pantalla' disabled>$pantalla</textarea>

            <label for='subpantalla'>NADA</label>
            <input type='text' id='subpantalla' name='subpantalla' value='$subpantalla' disabled />		
            
            <input type='submit' class='button' name='arcsen' value='arcsen' />
            <input type='submit' class='button' name='arccos' value='arccos' />
            <input type='submit' class='button' name='arctan' value='arctan' />
            <input type='submit' class='button' name='/' value='/'      />

            <input type='submit' class='button' name='sen' value='sen'    />
            <input type='submit' class='button' name='cos' value='cos'    />
            <input type='submit' class='button' name='tan' value='tan'    />
            <input type='submit' class='button' name='*' value='*'      />

            <input type='submit' class='button' name='7' value='7'      />
            <input type='submit' class='button' name='8' value='8'      />
            <input type='submit' class='button' name='9' value='9'      />
            <input type='submit' class='button' name='-' value='-'      />

            <input type='submit' class='button' name='4' value='4'      />
            <input type='submit' class='button' name='5' value='5'      />
            <input type='submit' class='button' name='6' value='6'      />
            <input type='submit' class='button' name='+' value='+'      />

            <input type='submit' class='button' name='1' value='1'      />
            <input type='submit' class='button' name='2' value='2'      />
            <input type='submit' class='button' name='3' value='3'      />
            <input type='submit' class='button' name='enter' value='Enter'  />

            <input type='submit' class='button' name='C' value='C'      />
            <input type='submit' class='button' name='0' value='0'      />
            <input type='submit' class='button' name='p' value='.'      />
            
        </form>
    ";
?>
</body>
</html>