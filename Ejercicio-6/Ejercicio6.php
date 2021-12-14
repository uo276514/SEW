<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-6_BaseDatos">
	<meta name="keywords" content="PHP, bases, datos, BD">

    <title>BaseDatos</title>
                
    <link rel='stylesheet' type='text/css' href='Ejercicio6.css' />
</head>
<body>
<?php

    class BaseDatos {

        protected $db;
        protected $mEdad;
        protected $pM;
        protected $pF;
        protected $mPericia;
        protected $mTiempo;
        protected $pTareaOK;
        protected $mValoracion;
        
        public function __construct(){
            $this->db = new mysqli('localhost','DBUSER2021','DBPSWD2021');

            if($this->db->connect_error) {
                echo "<p>ERROR de conexión: " . $this->db->connect_error . "</p>";  
            }

            // SELECCIÓN DE LA BASE DE DATOS
            $this->db->select_db('basedatossew');

            $this->mEdad = 0;
            $this->pM = 0;
            $this->pF = 0;
            $this->mPericia = 0;
            $this->mTiempo = 0;
            $this->pTareaOK = 0;
            $this->mValoracion = 0;
        }

        public function getMediaEdad() {
            return $this->mEdad;
        }

        public function getPorcentajeM() {
            return $this->pM;
        }

        public function getPorcentajeF() {
            return $this->pF;
        }

        public function getMediaPericia() {
            return $this->mPericia;
        }

        public function getMediaTiempo() {
            return $this->mTiempo;
        }

        public function getPorcentajeTareaOK() {
            return $this->pTareaOK;
        }

        public function getMediaValoracion() {
            return $this->mValoracion;
        }

        public function crearBD() {
            $nombreBD = $_POST['txtCrearBD'];
            $query = "CREATE DATABASE IF NOT EXISTS " . $nombreBD;
            if($this->db->query($query) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la Base de Datos '" . $nombreBD . "'. Error: " . $this->db->error . "</p>";
            }

            $this->db->close();  
        }

        public function crearTabla() {          
            $nombreTabla = $_POST['txtCrearTabla'];
            
            if ($nombreTabla == "") {
                // QUERY PARA CREAR LA TABLA PruebasUsabilidad:
                $crearTabla = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
                    dni VARCHAR(9) NOT NULL,
                    nombre varchar(255) NOT null,
                    apellidos varchar(255) not null,
                    email varchar(255) not null,
                    telefono varchar(255) not null,
                    edad int not null,
                    sexo varchar(255) not null,
                    pericia int,
                    tiempo int,
                    tareaOK varchar(255),
                    comentarios varchar(255),
                    propuestas varchar(255),
                    valoracion int,
                    PRIMARY KEY (dni))";

                if($this->db->query($crearTabla) === TRUE){
                } else { 
                    echo "<p>ERROR en la creación de la tabla 'PruebasUsabilidad'. Error: " . $this->db->error . "</p>";
                }
            } else {
                // QUERY PARA CREAR UNA TABLA USANDO EL CAMPO DE TEXTO (sólo con id)
                $crearTabla = "CREATE TABLE IF NOT EXISTS " . $nombreTabla . " (
                    id INT NOT NULL AUTO_INCREMENT,
                    PRIMARY KEY (id))";

                if($this->db->query($crearTabla) === TRUE){
                } else { 
                    echo "<p>ERROR en la creación de la tabla '" . $nombreTabla . "'. Error: " . $this->db->error . "</p>";
                }
            }
            $this->db->close(); 
        }

        public function insertarDatos() {
            $dni = $_POST['inDni'];
            $nombre = $_POST['inNombre'];
            $apellidos = $_POST['inApellidos'];
            $email = $_POST['inEmail'];
            $telefono = $_POST['inTelefono'];
            $edad = $_POST['inEdad'];
            $sexo = $_POST['inSexo'];
            $pericia = $_POST['inPericia'];
            $tiempo = $_POST['inTiempo'];
            $tareaOKstring = $_POST['inTareaOK'];
            $comentarios = $_POST['inComentarios'];
            $propuestas = $_POST['inPropuestas'];
            $valoracion = $_POST['inValoracion'];
            
            if ($tareaOKstring == "s" || $tareaOKstring == "S") {
                $tareaOK = "si";
            } else {
                $tareaOK = "no";
            }

            if ($sexo == "m") { $sexo = "M"; }
            if ($sexo == "f") { $sexo = "F"; }

            if ($dni == "") {
                echo "<p>ERROR: dni no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre no puede ser vacío</p>";
            } else if ($apellidos == "") {
                echo "<p>ERROR: apellidos no puede ser vacío</p>";
            } else if ($email == "") {
                echo "<p>ERROR: email no puede ser vacío</p>";
            } else if ($telefono == "") {
                echo "<p>ERROR: telefóno no puede ser vacío</p>";
            } else if ($edad <= 0) {
                echo "<p>ERROR: edad no puede ser inferior o igual a 0</p>";
            } else if ($sexo != "M" && $sexo != "F") {
                echo "<p>ERROR: sexo debe ser M o F</p>";
            } else if ($pericia != "" && ($pericia < 0 || $pericia > 10)) {
                echo "<p>ERROR: pericia debe ser entre 0 y 10</p>";
            } else if ($tiempo != "" && $tiempo < 0) {
                echo "<p>ERROR: tiempo debe ser al menos 0</p>";
            } else if ($valoracion != "" && ($valoracion < 0 || $valoracion > 10)) {
                echo "<p>ERROR: valoración debe ser entre 0 y 10</p>";
            } else {
                $consulta = "INSERT INTO PruebasUsabilidad 
                    (dni, nombre, apellidos, email, telefono, edad, sexo, pericia, tiempo, tareaOK, comentarios, propuestas, valoracion) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('sssssisiisssi', $dni, $nombre, $apellidos, $email, $telefono, $edad, $sexo, $pericia,
                                                            $tiempo, $tareaOK, $comentarios, $propuestas, $valoracion);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function buscarDatos() {
            $dni = $_POST['bDni'];
            if ($dni == "") {
                echo "<p>ERROR: dni a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM PruebasUsabilidad where dni = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $dni);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "dni: " . $fila["dni"] . " - nombre: " . $fila['nombre'] . " - apellidos: " . $fila['apellidos'] . " - Email: " 
                                . $fila['email'] . " - teléfono: " . $fila['telefono'] . " - edad: " . $fila['edad'] . " - sexo: " . $fila['sexo']; 
                    }
                    return $res;              
                } else {
                    echo "No se ha encontrado ningún dni que coincida";
                }
            }
            $this->db->close();
        }

        public function updateDatos() {
            $dni = $_POST['modDni'];
            $nombre = $_POST['modNombre'];
            $apellidos = $_POST['modApellidos'];
            $email = $_POST['modEmail'];
            $telefono = $_POST['modTelefono'];
            $edad = $_POST['modEdad'];
            $sexo = $_POST['modSexo'];
            $pericia = $_POST['modPericia'];
            $tiempo = $_POST['modTiempo'];
            $tareaOKstring = $_POST['modTareaOK'];
            $comentarios = $_POST['modComentarios'];
            $propuestas = $_POST['modPropuestas'];
            $valoracion = $_POST['modValoracion'];

            if ($tareaOKstring == "s" || $tareaOKstring == "S") {
                $tareaOK = "si";
            } else {
                $tareaOK = "no";
            }

            if ($sexo == "m") { $sexo = "M"; }
            if ($sexo == "f") { $sexo = "F"; }

            if ($dni == "") {
                echo "<p>ERROR: dni no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre no puede ser vacío</p>";
            } else if ($apellidos == "") {
                echo "<p>ERROR: apellidos no puede ser vacío</p>";
            } else if ($email == "") {
                echo "<p>ERROR: email no puede ser vacío</p>";
            } else if ($telefono == "") {
                echo "<p>ERROR: telefóno no puede ser vacío</p>";
            } else if ($edad <= 0) {
                echo "<p>ERROR: edad no puede ser inferior o igual a 0</p>";
            } else if ($sexo != "M" && $sexo != "F") {
                echo "<p>ERROR: sexo debe ser M o F</p>";
            } else if ($pericia != "" && ($pericia < 0 || $pericia > 10)) {
                echo "<p>ERROR: pericia debe ser entre 0 y 10</p>";
            } else if ($tiempo != "" && $tiempo < 0) {
                echo "<p>ERROR: tiempo debe ser al menos 0</p>";
            } else if ($valoracion != "" && ($valoracion < 0 || $valoracion > 10)) {
                echo "<p>ERROR: valoración debe ser entre 0 y 10</p>";
            } else {
                $consulta = "UPDATE PruebasUsabilidad 
                            SET nombre=?, apellidos=?, email=?, telefono=?, edad=?, sexo=?, pericia=?, 
                                tiempo=?, tareaOK=?, comentarios=?, propuestas=?, valoracion=?
                            WHERE dni=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('ssssisiisssis', $nombre, $apellidos, $email, $telefono, $edad, $sexo, $pericia,
                                                            $tiempo, $tareaOK, $comentarios, $propuestas, $valoracion, $dni);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deleteDatos() {
            $dni = $_POST['dDni'];
            if ($dni == "") {
                echo "<p>ERROR: dni a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM PruebasUsabilidad WHERE dni=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $dni);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function generarInforme() {
            $consulta = "SELECT * FROM PruebasUsabilidad";

            $resultado =  $this->db->query($consulta);

            if ($resultado->num_rows > 0) {
                $filas = $resultado->num_rows;

                while($row = $resultado->fetch_assoc()) {
                    $this->mEdad += $row['edad'];
                    if ($row['sexo'] == "M") {
                        $this->pM++;
                    } else {
                        $this->pF++;
                    }
                    $this->mPericia += $row['pericia'];
                    $this->mTiempo += $row['tiempo'];
                    if ($row['tareaOK'] == "si") {
                        $this->pTareaOK++;
                    }
                    $this->mValoracion += $row['valoracion'];
                }

                $this->mEdad = $this->mEdad / $filas;
                $this->pM = $this->pM / $filas * 100;
                $this->pF = $this->pF / $filas * 100;
                $this->mPericia = $this->mPericia / $filas;
                $this->mTiempo = $this->mTiempo / $filas;
                $this->pTareaOK = $this->pTareaOK / $filas * 100;
                $this->mValoracion = $this->mValoracion / $filas;
            } else {
                echo "<p>ERROR: Tabla vacía</p>"; 
            }
            $this->db->close();
        }

        public function importarCSV() {
            if ($_FILES['archivo']['tmp_name'] == null) {
                echo "<p>ERROR: No se ha seleccionado ningún archivo para importar los datos</p>";
            } else if ($_FILES['archivo']['type'] != "application/vnd.ms-excel") {
                echo "<p>ERROR: El archivo seleccionado para importar datos no es CSV</p>";
            } else {
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $dni = $linea[0];
                        $nombre = $linea[1];
                        $apellidos = $linea[2];
                        $email = $linea[3];
                        $telefono = $linea[4];
                        $edad = $linea[5];
                        $sexo = $linea[6];
                        $pericia = $linea[7];
                        $tiempo = $linea[8];
                        $tareaOK = $linea[9];
                        $comentarios = $linea[10];
                        $propuestas = $linea[11];
                        $valoracion = $linea[12];
        
                        $consulta = "INSERT INTO PruebasUsabilidad 
                                    (dni, nombre, apellidos, email, telefono, edad, sexo, pericia, tiempo, tareaOK, comentarios, propuestas, valoracion) 
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('sssssisiisssi', $dni, $nombre, $apellidos, $email, $telefono, $edad, $sexo, $pericia,
                                                                    $tiempo, $tareaOK, $comentarios, $propuestas, $valoracion);
            
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);
            }
            $this->db->close();
        }

        public function exportarCSV() {
            $consulta = "SELECT * FROM PruebasUsabilidad";

            $resultado =  $this->db->query($consulta);

            if ($resultado->num_rows > 0) {
                $filas = $resultado->num_rows;

                $csv = fopen("pruebasUsabilidad.csv", "w+");

                while($row = $resultado->fetch_assoc()) {
                    $dni =          $row['dni'];
                    $nombre =       $row['nombre'];
                    $apellidos =    $row['apellidos'];
                    $email =        $row['email'];
                    $telefono =     $row['telefono'];
                    $edad =         $row['edad'];
                    $sexo =         $row['sexo'];
                    $pericia =      $row['pericia'];
                    $tiempo =       $row['tiempo'];
                    $tareaOK =      $row['tareaOK'];
                    $comentarios =  $row['comentarios'];
                    $propuestas =   $row['propuestas'];
                    $valoracion =   $row['valoracion'];

                    $texto = $dni.";".$nombre.";".$apellidos.";".$email.";".$telefono.";".$edad.";".$sexo.";".$pericia.";".
                                $tiempo.";".$tareaOK.";".$comentarios.";".$propuestas.";".$valoracion."\n";
                    
                    if ($csv) {
                        fwrite($csv, $texto);
                    }
                }
            } else {
                echo "<p>ERROR: Tabla vacía</p>"; 
            }
            fclose($csv);
            $this->db->close();
        }
    }

    $result = "";

    $mediaEdad = "";
    $porcentajeSexos = "";
    $mediaPericia = "";
    $mediaTiempo = "";
    $porcentajeTareaOK = "";
    $mediaValoracion = "";

    if (count($_POST)>0) {
        $bd = new BaseDatos(); 
    
        if(isset($_POST['crearBD'])) $bd->crearBD();
        if(isset($_POST['crearTabla'])) $bd->crearTabla();
        if(isset($_POST['insertarDatos'])) $bd->insertarDatos();
        if(isset($_POST['buscarDatos'])) {
            $result = $bd->buscarDatos();
        }
        if(isset($_POST['modificarDatos'])) $bd->updateDatos();
        if(isset($_POST['eliminarDatos'])) $bd->deleteDatos();
        if(isset($_POST['informe'])) {
            $bd->generarInforme();
            $mediaEdad = "Edad media de los usuarios: " . $bd->getMediaEdad();
            $porcentajeSexos = "Porcentaje de usuarios por sexo-> M: " . $bd->getPorcentajeM() . "% - F: " . $bd->getPorcentajeF() . "%";
            $mediaPericia = "Valor medio de la pericia informática de los usuarios: " . $bd->getMediaPericia();
            $mediaTiempo = "Tiempo medio para la tarea: " . $bd->getMediaTiempo() . " segundos";
            $porcentajeTareaOK = "Porcentaje de usuarios que han relaizado la tarea correctamente: " . $bd->getPorcentajeTareaOK() . "%";
            $mediaValoracion = "Media de las valoraciones de los usuarios sobre la aplicación: " . $bd->getMediaValoracion();
        }
        if(isset($_POST['cargarCSV'])) $bd->importarCSV();
        if(isset($_POST['exportarCSV'])) $bd->exportarCSV();
    }

    // Interfaz (contenido HTML)
    echo "  
           
            <h1>Base de datos</h1> 

            <h2>Creación de BD y tablas:</h2>

            <form action='#' method='post' name='creacion'>
                <label for='crearBD'>Nombre de la BD: <input type='text' id='crearBD' name='txtCrearBD' /></label>                
                <input type='submit' class='button' name='crearBD' value='Crear Base de Datos' />

                <label for='crearTabla'>Nombre de la tabla: <input type='text' id='crearTabla' name='txtCrearTabla' /></label>
                <input type='submit' class='button' name='crearTabla' value='Crear una tabla' />
            </form>

            <h2>Inserción de datos en la tabla:</h2>

            <form action='#' method='post' name='insercion'>
                <label for='inDni'>DNI: <input type='text' id='inDni' name='inDni' /></label> 
                <label for='inNombre'>Nombre: <input type='text' id='inNombre' name='inNombre' /></label> 
                <label for='inApellidos'>Apellidos: <input type='text' id='inApellidos' name='inApellidos' /></label> 
                <label for='inEmail'>Email: <input type='text' id='inEmail' name='inEmail' /></label> 
                <label for='inTelefono'>Teléfono: <input type='text' id='inTelefono' name='inTelefono' /></label> 
                <label for='inEdad'>Edad: <input type='number' id='inEdad' name='inEdad' /></label> 
                <label for='inSexo'>Sexo (M/F): <input type='text' id='inSexo' name='inSexo' /></label> 
                <label for='inPericia'>Pericia informática (0-10): <input type='number' id='inPericia' name='inPericia' /></label> 
                <label for='inTiempo'>Tiempo tardado (s): <input type='number' id='inTiempo' name='inTiempo' /></label> 
                <label for='inTareaOK'>Resuelta (s/n): <input type='text' id='inTareaOK' name='inTareaOK' /></label> 
                <label for='inComent'>Comentarios: <input type='text' id='inComent' name='inComentarios' /></label> 
                <label for='inPropuestas'>Propuestas: <input type='text' id='inPropuestas' name='inPropuestas' /></label> 
                <label for='inValoracion'>Valoración (0-10): <input type='number' id='inValoracion' name='inValoracion' /></label> 
                <input type='submit' class='button' name='insertarDatos' value='Insertar datos en la tabla' />
            </form>

            <h2>Búsqueda de datos en la tabla:</h2>

            <form action='#' method='post' name='busqueda'>
                <label for='bDni'>DNI: <input type='text' id='bDni' name='bDni' /></label> 
                <input type='submit' class='button' name='buscarDatos' value='Buscar datos en la tabla por DNI' />
                <p>$result</p>
            </form>

            <h2>Modificación de datos en la tabla:</h2>

            <form action='#' method='post' name='modificacion'>
                <label for='modDni'>DNI: <input type='text' id='modDni' name='modDni' /></label>
                <label for='modNombre'>Nombre: <input type='text' id='modNombre' name='modNombre' /></label> 
                <label for='modApellidos'>Apellidos: <input type='text' id='modApellidos' name='modApellidos' /></label> 
                <label for='modEmail'>Email: <input type='text' id='modEmail' name='modEmail' /></label> 
                <label for='modTelefono'>Teléfono: <input type='text' id='modTelefono' name='modTelefono' /></label> 
                <label for='modEdad'>Edad: <input type='number' id='modEdad' name='modEdad' /></label> 
                <label for='modSexo'>Sexo (M/F): <input type='text' id='modSexo' name='modSexo' /></label> 
                <label for='modPericia'>Pericia informática (0-10): <input type='number' id='modPericia' name='modPericia' /></label> 
                <label for='modTiempo'>Tiempo tardado (s): <input type='number' id='modTiempo' name='modTiempo' /></label> 
                <label for='modTareaOK'>Resuelta (s/n): <input type='text' id='modTareaOK' name='modTareaOK' /></label> 
                <label for='modComent'>Comentarios: <input type='text' id='modComent' name='modComentarios' /></label> 
                <label for='modPropuestas'>Propuestas: <input type='text' id='modPropuestas' name='modPropuestas' /></label> 
                <label for='modValoracion'>Valoración (0-10): <input type='number' id='modValoracion' name='modValoracion' /></label> 
                <input type='submit' class='button' name='modificarDatos' value='Modificar datos de la tabla por DNI' />
            </form>

            <h2>Borrado de datos de la tabla:</h2>

            <form action='#' method='post' name='borrado'>
                <label for='dDni'>DNI: <input type='text' id='dDni' name='dDni' /></label>
                <input type='submit' class='button' name='eliminarDatos' value='Eliminar datos de la tabla por DNI' />
            </form>

            <form action='#' method='post' name='generar'>
                <input type='submit' class='button' name='informe' value='Generar informe' />
                <p>$mediaEdad</p>
                <p>$porcentajeSexos</p>
                <p>$mediaPericia</p>
                <p>$mediaTiempo</p>
                <p>$porcentajeTareaOK</p>
                <p>$mediaValoracion</p>
            </form>

            <form action='#' method='post' enctype='multipart/form-data' name='importar'>
                <input type='file' name='archivo'/>
                <input type='submit' class='button' name='cargarCSV' value='Importar datos de CSV a la tabla' />
            </form>

            <form action='#' method='post' name='exportar'>
                <input type='submit' class='button' name='exportarCSV' value='Exportar datos de la tabla a CSV' />
            </form>
    ";

?>
</body>
</html>