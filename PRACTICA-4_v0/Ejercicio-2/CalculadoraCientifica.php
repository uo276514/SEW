<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-2_CalculadoraCientifica">
	<meta name="keywords" content="PHP, Calculadora, Cientifica">
    <!--Definición de la ventana gráfica-->
	<meta name ="viewport" content ="width=device-width, initial-scale=1.0">
    
    <title>CalculadoraCientifica</title>
                
    <link rel='stylesheet' type='text/css' href='CalculadoraCientifica.css' />
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

    public function vaciarError() {
        $_SESSION['pantalla'] = "";
        $_SESSION['memoria'] = 0; 
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

    public function raizCuadrada() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = sqrt($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria'];
    }

    public function cambiarSigno() {
        $p = $_SESSION["pantalla"];
        $_SESSION["pantalla"] = "-" . $p;
    }

    public function modulo() {
        $this->pantalla = "%";
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

class CalculadoraCientifica extends Calculadora {

    protected $unidadAngular;

    public function __construct() {
        $this->unidadAngular = $_SESSION['uAng'];
    }

    public function vaciarMemoria() {
        $this->memoria = 0;
        $_SESSION['memoria'] = 0;
    }

    public function sobreescribirMemoria() {
        try {
            $expresion = $_SESSION['pantalla'];
            $resultado = eval("return $expresion;");
            $this->memoria = $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
    }

    public function abrirParentesis() {
        $this->pantalla .= "(";
        $this->memoria = $_SESSION['memoria']; 
    }
    
    public function cerrarParentesis() {
        $this->pantalla .= ")";
        $this->memoria = $_SESSION['memoria']; 
    }

    public function factorial() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = 1;
            while ($resultado >= 1) {
                $res *= $resultado;
                $resultado--;
            }
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function pi() {
        $this->pantalla .= "3.1416";
        $this->memoria = $_SESSION['memoria']; 
    }

    public function eliminarUltimo() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $nuevaExp = substr($expresion, 0, -1);
            $this->pantalla = $nuevaExp;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function exp() {
        $this->pantalla = "e";
        $this->memoria = $_SESSION['memoria']; 
    }

    public function log() {
        try {
            $expresion = "log10(" . $_SESSION['pantalla'] . ")";
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $this->pantalla = $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria'];
    }

    public function potencia10() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = 1;
            while ($resultado >= 1) {
                $res *= 10;
                $resultado--;
            }
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function alCuadrado() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $this->pantalla = $resultado * $resultado;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function elevar() {
        $this->pantalla = "**";
        $this->memoria = $_SESSION['memoria'];
    }

    public function notacionCientifica() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = 0;
            while ($resultado >= 10) {
                $resultado /= 10;
                $res++;
            }
            $this->pantalla = $resultado . "E+" . $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function sin() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            if ($this->unidadAngular == "DEG") {
                $resultado *= 57.2958;
            } else if ($this->unidadAngular == "GRAD") {
                $resultado *= 63.662;
            }
            $res = sin($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function cos() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            if ($this->unidadAngular == "DEG") {
                $resultado *= 57.2958;
            } else if ($this->unidadAngular == "GRAD") {
                $resultado *= 63.662;
            }
            $res = cos($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function tan() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            if ($this->unidadAngular == "DEG") {
                $resultado *= 57.2958;
            } else if ($this->unidadAngular == "GRAD") {
                $resultado *= 63.662;
            }
            $res = tan($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria']; 
    }

    public function sinh() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = sinh($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria'];
    }

    public function cosh() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = cosh($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria'];
    }

    public function tanh() {
        try {
            $expresion = $_SESSION['pantalla'];
            $_SESSION["pantalla"] = "";
            $resultado = eval("return $expresion;");
            $res = tanh($resultado);
            $this->pantalla = $res;
        } catch (Exception $e) {
            $this->pantalla = "Error: " .$e->getMessage();
        }
        $this->memoria = $_SESSION['memoria'];
    }

    public function cambiarUnidadAngular() {
        $unidad = $_SESSION['uAng'];
        if ($unidad == "DEG") {
			$this->unidadAngular = "RAD";
		} else if ($unidad == "RAD") {
			$this->unidadAngular = "GRAD";
		} else {
			$this->unidadAngular = "DEG";
		}
    }

    public function getUnidadAngular() {
        return $this->unidadAngular;
    }
}

$operacion = "";
$pantalla = "";
$memoria = 0;
$uAngular = "DEG";

//Solo se ejecutará si se ha pulsado un botón
if (count($_POST)>0) 
    {   
        $c = new CalculadoraCientifica();

        if(isset($_POST['MR'])) $c->mostrarMemoria();
        if(isset($_POST['M+'])) $c->sumarMemoria();
        if(isset($_POST['M-'])) $c->restarMemoria();
        if(isset($_POST['MS'])) $c->sobreescribirMemoria();
        if(isset($_POST['MC'])) $c->vaciarMemoria();
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
        if(isset($_POST['('])) $c->abrirParentesis();
        if(isset($_POST[')'])) $c->cerrarParentesis();
        if(isset($_POST['+/-'])) $c->cambiarSigno();
        if(isset($_POST['!'])) $c->factorial();
        if(isset($_POST['pi'])) $c->pi();
        if(isset($_POST['CE'])) $c->vaciarError();
        if(isset($_POST['R'])) $c->eliminarUltimo();
        if(isset($_POST['mod'])) $c->modulo();
        if(isset($_POST['exp'])) $c->exp();
        if(isset($_POST['log'])) $c->log();
        if(isset($_POST['10x'])) $c->potencia10();
        if(isset($_POST['cuadrado'])) $c->alCuadrado();
        if(isset($_POST['elevar'])) $c->elevar();
        if(isset($_POST['NC'])) $c->notacionCientifica();
        if(isset($_POST['grados'])) $c->cambiarUnidadAngular();
        if(isset($_POST['sin'])) $c->sin();
        if(isset($_POST['cos'])) $c->cos();
        if(isset($_POST['tan'])) $c->tan();
        if(isset($_POST['sinh'])) $c->sinh();
        if(isset($_POST['cosh'])) $c->cosh();
        if(isset($_POST['tanh'])) $c->tanh();
        if(isset($_POST['raiz'])) $c->raizCuadrada();
        
        $pantalla = $c->getPantalla();
        $memoria = $c->getMemoria();
        $uAngular = $c->getUnidadAngular();
        $_SESSION['uAng'] = $uAngular;
        $_SESSION['memoria'] = $memoria;
        
        if( isset( $_SESSION['pantalla'] ) ) {
            $_SESSION['pantalla'] .= $pantalla;
        } else {
            $_SESSION['pantalla'] = $pantalla;
        }
        
        $uAngular = $_SESSION['uAng'];
        $memoria = $_SESSION['memoria'];
        $operacion =  $_SESSION['pantalla'];
        $pantalla = $operacion;
    }

    // Interfaz (contenido HTML)
    echo "  
        <h1>Calculadora científica</h1>
        <form action='#' method='post' name='botones'>   

            <label for='pantalla'>by Jorge López</label>
            <input type='text' id='pantalla' name='pantalla' value='$pantalla' disabled=disabled />

            <p>
                <input type='submit' class='button' name='grados' value='$uAngular'  />					
                <input type='submit' class='button' name='sinh' value='sinh'    />						
                <input type='submit' class='button' name='cosh' value='cosh'    />						
                <input type='submit' class='button' name='tanh' value='tanh'    />						
                <input type='submit' class='button' name='NC' value='F-E'     />		
            </p>
            
            <p>
                <input type='submit' class='button' name='MC' value='MC' >
                <input type='submit' class='button' name='MR' value='MR' >
                <input type='submit' class='button' name='M+' value='M+' >
                <input type='submit' class='button' name='M-' value='M-' >
                <input type='submit' class='button' name='MS' value='MS' >
            </p>

            <input type='submit' class='button' name='cuadrado' value='x^2'  />
            <input type='submit' class='button' name='elevar' value='x^y'  />
            <input type='submit' class='button' name='sin' value='sin'  />							
            <input type='submit' class='button' name='cos' value='cos'  />						
            <input type='submit' class='button' name='tan' value='tan'  />					
            <input type='submit' class='button' name='raiz' value='√'    />			
            <input type='submit' class='button' name='10x' value='10^x' />
            <input type='submit' class='button' name='log' value='log'  /> 							
            <input type='submit' class='button' name='exp' value='Exp'  />
            <input type='submit' class='button' name='mod' value='Mod'  />

            <input type='submit' class='button' name='nada' value='↑'   />
            <input type='submit' class='button' name='CE' value='CE'  />				
            <input type='submit' class='button' name='C' value='C'   />
            <input type='submit' class='button' name='R' value='←'   />
            <input type='submit' class='button' name='/' value='/'   />

            <input type='submit' class='button' name='pi' value='π'   />		
            <input type='submit' class='button' name='7' value='7'   />
            <input type='submit' class='button' name='8' value='8'   />
            <input type='submit' class='button' name='9' value='9'   />
            <input type='submit' class='button' name='*' value='*'   />

            <input type='submit' class='button' name='!' value='n!'  />
            <input type='submit' class='button' name='4' value='4'   />
            <input type='submit' class='button' name='5' value='5'   />
            <input type='submit' class='button' name='6' value='6'   />
            <input type='submit' class='button' name='-' value='-'   />

            <input type='submit' class='button' name='+/-' value='+/-' />
            <input type='submit' class='button' name='1' value='1'   />
            <input type='submit' class='button' name='2' value='2'   />
            <input type='submit' class='button' name='3' value='3'   />
            <input type='submit' class='button' name='+' value='+'   />

            <input type='submit' class='button' name='(' value='('   />		
            <input type='submit' class='button' name=')' value=')'   />			
            <input type='submit' class='button' name='0' value='0'   />
            <input type='submit' class='button' name='p' value='.'   />
            <input type='submit' class='button' name='=' value='='   />

        </form>
    ";
 
?>
</body>
</html>