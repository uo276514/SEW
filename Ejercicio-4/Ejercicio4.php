<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-4_PrecioPlata">
	<meta name="keywords" content="PHP, json, Plata, Precio, Euro">

    <title>ConsumoServiciosWeb</title>
                
    <link rel='stylesheet' type='text/css' href='Ejercicio4.css' />
</head>
<body>
<?php

    class CargaDatos {

        protected $url;
        protected $error;

        protected $precio;
        protected $base;
        protected $date;
        protected $unit;
        
        public function __construct(){
            $this->url = "https://metals-api.com/api/latest?access_key=0i8ukhjq0aa94b0er4iz2gtxcfy61dm17na17eygyns42w3o0h9q5d0wg3qd&base=EUR&symbols=XAG";
            $this->error = "";
        }

        public function cargarDatos() {
            $datos = file_get_contents($this->url);

            $json = json_decode($datos);

            if($json == null) {
                $this->error = "¡problemas! No se pudo obtener información de <a href='https://metals-api.com/home'>Metals-API</a>";
            }
            else {
                $this->error = "JSON decodificado correctamente";
            }

            $this->date = $json->date;
            $this->base = $json->base;
            $this->precio = $json->rates->XAG;
            $this->unit = $json->unit;
        }

        public function getPrecio() {
            return $this->precio;
        }

        public function getBase() {
            return $this->base;
        }

        public function getDate() {
            return $this->date;
        }

        public function getUnit() {
            return $this->unit;
        }

        public function getError() {
            return $this->error;
        }
    }

    $fecha = "";
    $precio = "";
    $sistema = "";
    $unit = "";

    $error = "";

    if (count($_POST)>0) {
        $cd = new CargaDatos(); 
    
        if(isset($_POST['p'])) $cd->cargarDatos();

        $fecha = "Fecha de la obtención del precio: " . $cd->getDate();
        $precio = "Precio de la plata: " . $cd->getPrecio() . " €";
        $sistema = "Sistema monetario: " . $cd->getBase();
        $unit = "Unidad: " . $cd->getUnit();

        $error = $cd->getError();
    }

    // Interfaz (contenido HTML)
    echo "  
           
            <h1>Carga de datos JSON del precio de la plata usando Metals-API</h1>  

            <p>$error</p>

            <form action='#' method='post' name='botones'>
                <input type='submit' class='button' name='p' value='Obtener precio de la plata' />
            </form>

            <p>Datos del precio de la plata:</p>
            <p>$fecha</p>
            <p>$precio</p>
            <p>$sistema</p>
            <p>$unit</p>
    ";

?>
</body>
</html>