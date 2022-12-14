<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name="author" content="Jorge López Peláez">
	<meta name="description" content="Practica-4_Ejercicio-7_MiBaseDatos">
	<meta name="keywords" content="PHP, bases, datos, BD">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MiBaseDatos</title>
                
    <link rel='stylesheet' type='text/css' href='Ejercicio7.css' />
</head>
<body>
<?php

    class BaseDatos {

        protected $db;
        
        public function __construct(){
            $this->db = new mysqli('localhost','DBUSER2022','DBPSWD2022');

            if($this->db->connect_error) {
                echo "<p>ERROR de conexión: " . $this->db->connect_error . "</p>";  
            }

            $nombreBD = "ejercicio_7";
            $query = "CREATE DATABASE IF NOT EXISTS " . $nombreBD;
            if($this->db->query($query) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la Base de Datos '" . $nombreBD . "'. Error: " . $this->db->error . "</p>";
            }            
        }

        public function crearTablas() {
            $this->db->select_db('ejercicio_7');

            // QUERY PARA CREAR LA TABLA Presidente
            $crearPresidente = "CREATE TABLE IF NOT EXISTS Presidente (
                                dni VARCHAR(9) NOT NULL,
                                nombre varchar(255) NOT null,
                                apellidos varchar(255) not null,
                                patrimonio int not null,
                                PRIMARY KEY (dni))";

            // QUERY PARA CREAR LA TABLA Arbitro
            $crearArbitro = "CREATE TABLE IF NOT EXISTS Arbitro (
                                dni VARCHAR(9) NOT NULL,
                                nombre varchar(255) NOT null,
                                apellidos varchar(255) not null,
                                dureza int not null,
                                PRIMARY KEY (dni))";

            // QUERY PARA CREAR LA TABLA Club
            $crearClub = "CREATE TABLE IF NOT EXISTS Club (
                                id VARCHAR(20) NOT NULL,
                                nombre varchar(255) NOT null,
                                ciudad varchar(255) not null,
                                pais varchar(255) not null,
                                liga varchar(255) not null,
                                estadio varchar(255) not null,
                                dniPresidente varchar(9) not null,
                                PRIMARY KEY (id),
                                foreign key (dniPresidente) references Presidente(dni))";

            // QUERY PARA CREAR LA TABLA Partido:
            $crearPartido = "CREATE TABLE IF NOT EXISTS Partido (
                                id VARCHAR(20) NOT NULL,
                                tipo varchar(255) not null,
                                idClubLocal varchar(20) not null,
                                idClubVisitante varchar(20) not null,
                                dniArbitro varchar(9) not null,
                                resultado varchar(255),
                                PRIMARY KEY (id),
                                foreign key (idClubLocal) references Club(id),
                                foreign key (idClubVisitante) references Club(id),
                                foreign key (dniArbitro) references Arbitro(dni))";

            // QUERY PARA CREAR LA TABLA Jugador:
            $crearJugador = "CREATE TABLE IF NOT EXISTS Jugador (
                                dni VARCHAR(9) NOT NULL,
                                nombre varchar(255) NOT null,
                                apellidos varchar(255) not null,
                                posicion varchar(255) not null,
                                idClub varchar(20) not null,
                                PRIMARY KEY (dni),
                                foreign key (idClub) references Club(id))";

            if($this->db->query($crearPresidente) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la tabla 'Presidente'. Error: " . $this->db->error . "</p>";
            }

            if($this->db->query($crearArbitro) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la tabla 'Arbitro'. Error: " . $this->db->error . "</p>";
            }

            if($this->db->query($crearClub) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la tabla 'Club'. Error: " . $this->db->error . "</p>";
            }

            if($this->db->query($crearPartido) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la tabla 'Partido'. Error: " . $this->db->error . "</p>";
            }

            if($this->db->query($crearJugador) === TRUE){
            } else { 
                echo "<p>ERROR en la creación de la tabla 'Jugador'. Error: " . $this->db->error . "</p>";
            }

            $this->db->close(); 
        }

        public function insertarDatosJugador() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['jDni'];
            $nombre = $_POST['jNombre'];
            $apellidos = $_POST['jApellidos'];
            $posicion = $_POST['jPosicion'];
            $idClub = $_POST['jIdClub'];

            if ($dni == "") {
                echo "<p>ERROR: dni del jugador no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre del jugador no puede ser vacío</p>";
            } else if ($apellidos == "") {
                echo "<p>ERROR: apellidos del jugador no puede ser vacío</p>";
            } else if ($posicion == "") {
                echo "<p>ERROR: posición del jugador no puede ser vacío</p>";
            } else if ($idClub == "") {
                echo "<p>ERROR: id del club del jugador no puede ser vacío</p>";
            } else {
                $consulta = "INSERT INTO Jugador (dni, nombre, apellidos, posicion, idClub) 
                                                 VALUES (?,?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('sssss', $dni, $nombre, $apellidos, $posicion, $idClub);
    
                if(!($consultaPre->execute() === TRUE)){
                    echo "<p>ERROR en la inserción en la tabla 'Jugador'. Error: " . $this->db->error . "</p>";
                }
            }           
            $this->db->close();
        }

        public function insertarDatosClub() {
            $this->db->select_db('ejercicio_7');

            $id = $_POST['cId'];
            $nombre = $_POST['cNombre'];
            $ciudad = $_POST['cCiudad'];
            $pais = $_POST['cPais'];
            $liga = $_POST['cLiga'];
            $estadio = $_POST['cEstadio'];
            $presi = $_POST['cPresidente'];

            if ($id == "") {
                echo "<p>ERROR: id del club no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre del club no puede ser vacío</p>";
            } else if ($ciudad == "") {
                echo "<p>ERROR: ciudad del club no puede ser vacío</p>";
            } else if ($pais == "") {
                echo "<p>ERROR: país del club no puede ser vacío</p>";
            } else if ($liga == "") {
                echo "<p>ERROR: la liga en la que juega el club no puede ser vacío</p>";
            } else if ($estadio == "") {
                echo "<p>ERROR: estadio del club no puede ser vacío</p>";
            } else if ($presi == "") {
                echo "<p>ERROR: dni del presidente del club no puede ser vacío</p>";
            } else {
                $consulta = "INSERT INTO Club (id, nombre, ciudad, pais, liga, estadio, dniPresidente) 
                                                 VALUES (?,?,?,?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('sssssss', $id, $nombre, $ciudad, $pais, $liga, $estadio, $presi);
    
                if(!($consultaPre->execute() === TRUE)){
                    echo "<p>ERROR en la inserción en la tabla 'Club'. Error: " . $this->db->error . "</p>";
                }
            }           
            $this->db->close();
        }

        public function insertarDatosPartido() {
            $this->db->select_db('ejercicio_7');

            $id = $_POST['pId'];
            $idLocal = $_POST['pIdLocal'];
            $idVisit = $_POST['pIdVisit'];
            $dniArbi = $_POST['pDniArbi'];
            $tipo = $_POST['pTipo'];
            $result = $_POST['pResult'];

            if ($id == "") {
                echo "<p>ERROR: id del partido no puede ser vacío</p>";
            } else if ($idLocal == "") {
                echo "<p>ERROR: id del club local del partido no puede ser vacío</p>";
            } else if ($idVisit == "") {
                echo "<p>ERROR: id del club visitante del partido no puede ser vacío</p>";
            } else if ($dniArbi == "") {
                echo "<p>ERROR: dni del árbitro del partido no puede ser vacío</p>";
            } else if ($tipo == "") {
                echo "<p>ERROR: el tipo de partido no puede ser vacío</p>";
            } else if ($result == "") {
                $result = "SIN-JUGAR";
            }else {
                $consulta = "INSERT INTO Partido (id, idClubLocal, idClubVisitante, dniArbitro, tipo, resultado) 
                                                 VALUES (?,?,?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('ssssss', $id, $idLocal, $idVisit, $dniArbi, $tipo, $result);
    
                if(!($consultaPre->execute() === TRUE)){
                    echo "<p>ERROR en la inserción en la tabla 'Partido'. Error: " . $this->db->error . "</p>";
                }
            }           
            $this->db->close();
        }

        public function insertarDatosArbitro() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['aDni'];
            $nombre = $_POST['aNombre'];
            $apellidos = $_POST['aApellidos'];
            $dureza = $_POST['aDureza'];

            if ($dni == "") {
                echo "<p>ERROR: dni del árbitro no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre del árbitro no puede ser vacío</p>";
            } else if ($apellidos == "") {
                echo "<p>ERROR: apellidos del árbitro no puede ser vacío</p>";
            } else if ($dureza < 0 || $dureza > 10) {
                echo "<p>ERROR: dureza del árbitro debe ser entre 0 y 10</p>";
            } else {
                $consulta = "INSERT INTO Arbitro (dni, nombre, apellidos, dureza) 
                                                 VALUES (?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('ssss', $dni, $nombre, $apellidos, $dureza);
    
                if(!($consultaPre->execute() === TRUE)){
                    echo "<p>ERROR en la inserción en la tabla 'Arbitro'. Error: " . $this->db->error . "</p>";
                }
            }           
            $this->db->close();
        }

        public function insertarDatosPresidente() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['pDni'];
            $nombre = $_POST['pNombre'];
            $apellidos = $_POST['pApellidos'];
            $patrimonio = $_POST['pDureza'];

            if ($dni == "") {
                echo "<p>ERROR: dni del presidente no puede ser vacío</p>";
            } else if ($nombre == "") {
                echo "<p>ERROR: nombre del presidente no puede ser vacío</p>";
            } else if ($apellidos == "") {
                echo "<p>ERROR: apellidos del presidente no puede ser vacío</p>";
            } else if ($patrimonio < 0) {
                echo "<p>ERROR: patrimonio del presidente debe ser positivo</p>";
            } else {
                $consulta = "INSERT INTO Presidente (dni, nombre, apellidos, patrimonio) 
                                                 VALUES (?,?,?,?)";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('sssi', $dni, $nombre, $apellidos, $patrimonio);
    
                if(!($consultaPre->execute() === TRUE)){
                    echo "<p>ERROR en la inserción en la tabla 'Presidente'. Error: " . $this->db->error . "</p>";
                }
            }           
            $this->db->close();
        }

        public function buscarClubsPorEstadio() {
            $this->db->select_db('ejercicio_7');

            $estadio = $_POST['buscarClubsPorEstadio'];
            if ($estadio == "") {
                return "<p>ERROR: nombre del estadio a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Club where estadio = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $estadio);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- nombre: " . $fila['nombre'] . " --- ciudad: " . $fila['ciudad'] . " --- país: " 
                                . $fila['pais'] . " --- liga: " . $fila['liga'] . " --- estadio: " . $fila['estadio'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún club que juege en ese estadio</p>";
                }
            }
            $this->db->close();
        }

        public function buscarClubesPorCiudad() {
            $this->db->select_db('ejercicio_7');

            $ciudad = $_POST['buscarClubsPorCiudad'];
            if ($ciudad == "") {
                return "<p>ERROR: ciudad del club a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Club where ciudad = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $ciudad);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- nombre: " . $fila['nombre'] . " --- ciudad: " . $fila['ciudad'] . " --- país: " 
                                . $fila['pais'] . " --- liga: " . $fila['liga'] . " --- estadio: " . $fila['estadio'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún club en esa ciudad</p>";
                }
            }
            $this->db->close();
        }

        public function buscarClubesPorPais() {
            $this->db->select_db('ejercicio_7');

            $pais = $_POST['buscarClubsPorPais'];
            if ($pais == "") {
                return "<p>ERROR: país del club a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Club where pais = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $pais);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- nombre: " . $fila['nombre'] . " --- ciudad: " . $fila['ciudad'] . " --- país: " 
                                . $fila['pais'] . " --- liga: " . $fila['liga'] . " --- estadio: " . $fila['estadio'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún club en ese país</p>";
                }
            }
            $this->db->close();
        }

        public function buscarJugadoresPorPosicion() {
            $this->db->select_db('ejercicio_7');

            $pos = $_POST['buscarJugadoresPorPosicion'];
            if ($pos == "") {
                return "<p>ERROR: posición a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Jugador where posicion = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $pos);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>dni: " . $fila["dni"] . " --- nombre: " . $fila['nombre'] . " --- apellidos: " . $fila['apellidos'] 
                                . " --- posición: " . $fila['posicion'] . " --- club: " . $fila['idClub'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún jugador en esa posición</p>";
                }
            }
            $this->db->close();
        }

        public function buscarPartidosPorTipo() {
            $this->db->select_db('ejercicio_7');

            $tipo = $_POST['buscarPartidosPorTipo'];
            if ($tipo == "") {
                return "<p>ERROR: tipo de partido a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Partido where tipo = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $tipo);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- idClubLocal: " . $fila['idClubLocal'] . " --- idClubVisitante: " . $fila['idClubVisitante'] 
                                . " --- dniArbitro: " . $fila['dniArbitro'] . " --- tipo: " . $fila['tipo'] . " --- resultado: " . $fila['resultado'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún partido de ese tipo</p>";
                }
            }
            $this->db->close();
        }

        public function buscarPartidosPorLocal() {
            $this->db->select_db('ejercicio_7');

            $club = $_POST['buscarPartidosPorLocal'];
            if ($club == "") {
                return "<p>ERROR: id del club a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Partido where idClubLocal = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $club);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- idClubLocal: " . $fila['idClubLocal'] . " --- idClubVisitante: " . $fila['idClubVisitante'] 
                                . " --- dniArbitro: " . $fila['dniArbitro'] . " --- tipo: " . $fila['tipo'] . " --- resultado: " . $fila['resultado'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún partido con ese club como local</p>";
                }
            }
            $this->db->close();
        }

        public function buscarPartidosPorVisitante() {
            $this->db->select_db('ejercicio_7');

            $club = $_POST['buscarPartidosPorVisitante'];
            if ($club == "") {
                return "<p>ERROR: id del club a buscar no puede ser vacío</p>"; 
            } else {
                $consulta = "SELECT * FROM Partido where idClubVisitante = ?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $club);
                $consultaPre->execute();
    
                $resultado =  $consultaPre->get_result();
    
                $res = "";
                if ($resultado->fetch_assoc() != NULL) {
                    $resultado->data_seek(0);
                    while($fila = $resultado->fetch_assoc()) {
                        $res .= "<p>id: " . $fila["id"] . " --- idClubLocal: " . $fila['idClubLocal'] . " --- idClubVisitante: " . $fila['idClubVisitante'] 
                                . " --- dniArbitro: " . $fila['dniArbitro'] . " --- tipo: " . $fila['tipo'] . " --- resultado: " . $fila['resultado'] . "</p>"; 
                    }
                    return $res;              
                } else {
                    return "<p>No se ha encontrado ningún partido con ese club como visitante</p>";
                }
            }
            $this->db->close();
        }

        public function updateResultado() {
            $this->db->select_db('ejercicio_7');

            $id = $_POST['upId'];
            $resultado = $_POST['upResult'];

            if ($id == "") {
                echo "<p>ERROR: id del partido a actualizar no puede ser vacío</p>";
            } else if ($resultado == "") {
                echo "<p>ERROR: resultado del partido no puede ser vacío</p>";
            } else {
                $consulta = "UPDATE Partido 
                            SET resultado=?
                            WHERE id=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('ss', $resultado, $id);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deleteClub() {
            $this->db->select_db('ejercicio_7');

            $id = $_POST['dIdClub'];
            if ($id == "") {
                echo "<p>ERROR: id del club a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM Club WHERE id=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $id);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deletePartido() {
            $this->db->select_db('ejercicio_7');

            $id = $_POST['dIdPartido'];
            if ($id == "") {
                echo "<p>ERROR: id del partido a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM Partido WHERE id=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $id);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deleteArbi() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['dDniArbi'];
            if ($dni == "") {
                echo "<p>ERROR: dni del árbitro a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM Arbitro WHERE dni=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $dni);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deletePresi() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['dDniPresi'];
            if ($dni == "") {
                echo "<p>ERROR: dni del presidente a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM Presidente WHERE dni=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $dni);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function deleteJugador() {
            $this->db->select_db('ejercicio_7');

            $dni = $_POST['dDniJugador'];
            if ($dni == "") {
                echo "<p>ERROR: dni del jugador a eliminar no puede ser vacío</p>"; 
            } else {
                $consulta = "DELETE FROM Jugador WHERE dni=?";
    
                $consultaPre = $this->db->prepare($consulta);
                $consultaPre->bind_param('s', $dni);
    
                $consultaPre->execute();
            }
            $this->db->close();
        }

        public function importarDatos() {
            $this->db->select_db('ejercicio_7');

            if ($_FILES['archivo']['tmp_name'] == null) {
                echo "<p>ERROR: No se ha seleccionado ningún archivo para importar los datos</p>";
            } else if ($_FILES['archivo']['type'] != "application/vnd.ms-excel") {
                echo "<p>ERROR: El archivo seleccionado para importar datos no es CSV</p>";
            } else if ($_FILES['archivo']['name'] == "inputClub.csv") {
                // datos de clubes
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $id = $linea[0];
                        $nombre = $linea[1];
                        $ciudad = $linea[2];
                        $pais = $linea[3];
                        $liga = $linea[4];
                        $estadio = $linea[5];
                        $presi = $linea[6];
        
                        $consulta = "INSERT INTO Club 
                                    (id, nombre, ciudad, pais, liga, estadio, dniPresidente) 
                                    VALUES (?,?,?,?,?,?,?)";
            
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('sssssss', $id, $nombre, $ciudad, $pais, $liga, $estadio, $presi);
            
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);
            } else if ($_FILES['archivo']['name'] == "inputArbitro.csv") {
                // datos de árbitros
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $dni = $linea[0];
                        $nombre = $linea[1];
                        $apellidos = $linea[2];
                        $dureza = $linea[3];
        
                        $consulta = "INSERT INTO Arbitro 
                                    (dni, nombre, apellidos, dureza) 
                                    VALUES (?,?,?,?)";
            
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('ssss', $dni, $nombre, $apellidos, $dureza);
            
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);
            } else if ($_FILES['archivo']['name'] == "inputPresidente.csv") {
                // datos de presidentes
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $dni = $linea[0];
                        $nombre = $linea[1];
                        $apellidos = $linea[2];
                        $patrimonio = $linea[3];
        
                        $consulta = "INSERT INTO Presidente 
                                    (dni, nombre, apellidos, patrimonio) 
                                    VALUES (?,?,?,?)";
            
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('sssi', $dni, $nombre, $apellidos, $patrimonio);
            
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);
            } else if ($_FILES['archivo']['name'] == "inputJugador.csv") {
                // datos de jugadores
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $dni = $linea[0];
                        $nombre = $linea[1];
                        $apellidos = $linea[2];
                        $posicion = $linea[3];
                        $idClub = $linea[4];
        
                        $consulta = "INSERT INTO Jugador 
                                    (dni, nombre, apellidos, posicion, idClub) 
                                    VALUES (?,?,?,?,?)";
            
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('sssss', $dni, $nombre, $apellidos, $posicion, $idClub);
            
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);            
            } else if ($_FILES['archivo']['name'] == "inputPartido.csv") {
                // datos de partidos
                $csv = fopen($_FILES['archivo']['tmp_name'], "r");
    
                while (!feof($csv)) {
                    $linea = fgetcsv($csv, 0, ";");
                    if ($linea) {
                        $id = $linea[0];
                        $tipo = $linea[1];
                        $local = $linea[2];
                        $visit = $linea[3];
                        $dniArbi = $linea[4];
                        $resultado = $linea[5];
    
                        $consulta = "INSERT INTO Partido 
                                    (id, tipo, idClubLocal, idClubVisitante, dniArbitro, resultado) 
                                    VALUES (?,?,?,?,?,?)";
    
                        $consultaPre = $this->db->prepare($consulta);
                        $consultaPre->bind_param('ssssss', $id, $tipo, $local, $visit, $dniArbi, $resultado);
    
                        $consultaPre->execute();                  
                    }
                }
                fclose($csv);
            }

            $this->db->close();
        }
    }

    $clubesPorEstadio = "<p></p>";
    $partidosPorTipo = "<p></p>";
    $clubesPorCiudad = "<p></p>";
    $clubesPorPais = "<p></p>";
    $jugadoresPorPosicion = "<p></p>";
    $partidosPorLocal = "<p></p>";
    $partidosPorVisitante = "<p></p>";

    if (count($_POST)>0) {
        $bd = new BaseDatos(); 
    
        if(isset($_POST['crearTablas'])) $bd->crearTablas();

        if(isset($_POST['insertarDatosClub'])) $bd->insertarDatosClub();
        if(isset($_POST['insertarDatosArbitro'])) $bd->insertarDatosArbitro();
        if(isset($_POST['insertarDatosPresidente'])) $bd->insertarDatosPresidente();
        if(isset($_POST['insertarDatosPartido'])) $bd->insertarDatosPartido();
        if(isset($_POST['insertarDatosJugador'])) $bd->insertarDatosJugador();

        if(isset($_POST['buscarPorEstadio'])) {
            $clubesPorEstadio = $bd->buscarClubsPorEstadio();
        }
        if(isset($_POST['buscarPorTipo'])) {
            $partidosPorTipo = $bd->buscarPartidosPorTipo();
        }
        if(isset($_POST['buscarPorCiudad'])) {
            $clubesPorCiudad = $bd->buscarClubesPorCiudad();
        }
        if(isset($_POST['buscarPorPais'])) {
            $clubesPorPais = $bd->buscarClubesPorPais();
        }
        if(isset($_POST['buscarPorPosicion'])) {
            $jugadoresPorPosicion = $bd->buscarJugadoresPorPosicion();
        }
        if(isset($_POST['buscarPorLocal'])) {
            $partidosPorLocal = $bd->buscarPartidosPorLocal();
        }
        if(isset($_POST['buscarPorVisitante'])) {
            $partidosPorVisitante = $bd->buscarPartidosPorVisitante();
        }

        if(isset($_POST['updateResultado'])) $bd->updateResultado();

        if(isset($_POST['eliminarClub'])) $bd->deleteClub();
        if(isset($_POST['eliminarArbi'])) $bd->deleteArbi();
        if(isset($_POST['eliminarPresi'])) $bd->deletePresi();
        if(isset($_POST['eliminarPartido'])) $bd->deletePartido();
        if(isset($_POST['eliminarJugador'])) $bd->deleteJugador();

        if(isset($_POST['cargarDatos'])) $bd->importarDatos();
    }

    // Interfaz (contenido HTML)
    /*
            <h2>Creación de tablas:</h2>
            <h2>Actualización de resultados de los partidos:</h2>
    */
    echo "  
           
            <h1>Base de datos</h1>
            
            <form action='#' method='post' name='creacion'>
            <input type='submit' class='button' name='crearTablas' value='Crear tablas' />
            </form>
            
            <h2>Búsqueda de información:</h2>

            <form action='#' method='post' name='busqueda'>
                <label for='buscarClubsPorEstadio'>Nombre del estadio: <input type='text' id='buscarClubsPorEstadio' name='buscarClubsPorEstadio' /></label> 
                <input type='submit' class='button' name='buscarPorEstadio' value='Buscar clubes por estadio en el que juegan' />
                <section>
                    <h3>Resultados:</h3>
                    $clubesPorEstadio
                </section>

                <label for='buscarPartidosPorTipo'>Tipo de partido: <input type='text' id='buscarPartidosPorTipo' name='buscarPartidosPorTipo' /></label> 
                <input type='submit' class='button' name='buscarPorTipo' value='Buscar partidos por el tipo' />
                <section>
                    <h3>Resultados:</h3>
                    $partidosPorTipo
                </section>

                <label for='buscarClubsPorCiudad'>Ciudad del club: <input type='text' id='buscarClubsPorCiudad' name='buscarClubsPorCiudad' /></label> 
                <input type='submit' class='button' name='buscarPorCiudad' value='Buscar clubes por ciudad' />
                <section>
                    <h3>Resultados:</h3>
                    $clubesPorCiudad
                </section>

                <label for='buscarClubsPorPais'>País del club: <input type='text' id='buscarClubsPorPais' name='buscarClubsPorPais' /></label> 
                <input type='submit' class='button' name='buscarPorPais' value='Buscar clubes por país' />
                <section>
                    <h3>Resultados:</h3>
                    $clubesPorPais
                </section>

                <label for='buscarJugadoresPorPosicion'>Posición: <input type='text' id='buscarJugadoresPorPosicion' name='buscarJugadoresPorPosicion' /></label> 
                <input type='submit' class='button' name='buscarPorPosicion' value='Buscar jugadores por posición' />
                <section>
                    <h3>Resultados:</h3>
                    $jugadoresPorPosicion
                </section>

                <label for='buscarPartidosPorLocal'>Equipo local: <input type='text' id='buscarPartidosPorLocal' name='buscarPartidosPorLocal' /></label> 
                <input type='submit' class='button' name='buscarPorLocal' value='Buscar partidos por equipo local' />
                <section>
                    <h3>Resultados:</h3>
                    $partidosPorLocal
                </section>

                <label for='buscarPartidosPorVisitante'>Equipo visitante: <input type='text' id='buscarPartidosPorVisitante' name='buscarPartidosPorVisitante' /></label> 
                <input type='submit' class='button' name='buscarPorVisitante' value='Buscar partidos por equipo visitante' />
                <section>
                    <h3>Resultados:</h3>
                    $partidosPorVisitante
                </section>
            </form>
        
            <form action='#' method='post' name='modificacion'>
                <label for='upId'>ID del partido: <input type='text' id='upId' name='upId' /></label>
                <label for='upResult'>Resultado: <input type='text' id='upResult' name='upResult' /></label> 
                <input type='submit' class='button' name='updateResultado' value='Actualizar resultado del partido' />
            </form>
                    
            <h2>Inserción de datos:</h2>

            <form action='#' method='post' enctype='multipart/form-data' name='importar'>
                <label for='archivo'>Selecciona el archivo CSV: <input type='file' id='archivo' name='archivo'/></label>
                <input type='submit' class='button' name='cargarDatos' value='Importar datos desde CSV' />
            </form>

            <form action='#' method='post' name='insercion'>
                <h3>Club:</h3>
                <label for='cId'>ID del club: <input type='text' id='cId' name='cId' /></label> 
                <label for='cNombre'>Nombre: <input type='text' id='cNombre' name='cNombre' /></label> 
                <label for='cCiudad'>Ciudad: <input type='text' id='cCiudad' name='cCiudad' /></label> 
                <label for='cPais'>País: <input type='text' id='cPais' name='cPais' /></label> 
                <label for='cLiga'>Liga en la que juega: <input type='text' id='cLiga' name='cLiga' /></label> 
                <label for='cEstadio'>Estadio del club: <input type='text' id='cEstadio' name='cEstadio' /></label>
                <label for='cPresidente'>DNI del presidente del club: <input type='text' id='cPresidente' name='cPresidente' /></label>
                <input type='submit' class='button' name='insertarDatosClub' value='Insertar datos del Club' />

                <h3>Árbitro:</h3>
                <label for='aDni'>DNI: <input type='text' id='aDni' name='aDni' /></label> 
                <label for='aNombre'>Nombre: <input type='text' id='aNombre' name='aNombre' /></label> 
                <label for='aApellidos'>Apellidos: <input type='text' id='aApellidos' name='aApellidos' /></label> 
                <label for='aDureza'>Dureza: <input type='number' id='aDureza' name='aDureza' /></label>
                <input type='submit' class='button' name='insertarDatosArbitro' value='Insertar datos del Árbitro' />

                <h3>Presidente:</h3>
                <label for='pDni'>DNI: <input type='text' id='pDni' name='pDni' /></label> 
                <label for='pNombre'>Nombre: <input type='text' id='pNombre' name='pNombre' /></label> 
                <label for='pApellidos'>Apellidos: <input type='text' id='pApellidos' name='pApellidos' /></label> 
                <label for='pDureza'>Patrimonio (millones): <input type='number' id='pDureza' name='pDureza' /></label>
                <input type='submit' class='button' name='insertarDatosPresidente' value='Insertar datos del Presidente' />

                <h3>Partido:</h3>
                <label for='pId'>ID del partido: <input type='text' id='pId' name='pId' /></label> 
                <label for='pIdLocal'>ID del club local: <input type='text' id='pIdLocal' name='pIdLocal' /></label> 
                <label for='pIdVisit'>ID del club visitante: <input type='text' id='pIdVisit' name='pIdVisit' /></label> 
                <label for='pDniArbi'>DNI del árbitro: <input type='text' id='pDniArbi' name='pDniArbi' /></label>
                <label for='pTipo'>Tipo de partido: <input type='text' id='pTipo' name='pTipo' /></label>
                <label for='pResult'>*Resultado: <input type='text' id='pResult' name='pResult' /></label>
                <input type='submit' class='button' name='insertarDatosPartido' value='Insertar datos del Partido' />

                <h3>Jugador:</h3>
                <label for='jDni'>DNI: <input type='text' id='jDni' name='jDni' /></label> 
                <label for='jNombre'>Nombre: <input type='text' id='jNombre' name='jNombre' /></label> 
                <label for='jApellidos'>Apellidos: <input type='text' id='jApellidos' name='jApellidos' /></label> 
                <label for='jPosicion'>Posición en la que juega: <input type='text' id='jPosicion' name='jPosicion' /></label>
                <label for='jIdClub'>ID del club en el que juega: <input type='text' id='jIdClub' name='jIdClub' /></label>
                <input type='submit' class='button' name='insertarDatosJugador' value='Insertar datos del Jugador' />
            </form>

            <h2>Borrado de datos:</h2>

            <form action='#' method='post' name='borrado'>
                <label for='dIdClub'>ID del club a borrar: <input type='text' id='dIdClub' name='dIdClub' /></label>
                <input type='submit' class='button' name='eliminarClub' value='Eliminar Club por ID' />

                <label for='dDniArbi'>DNI del árbitro a borrar: <input type='text' id='dDniArbi' name='dDniArbi' /></label>
                <input type='submit' class='button' name='eliminarArbi' value='Eliminar Árbitro por DNI' />

                <label for='dDniPresi'>DNI del presi a borrar: <input type='text' id='dDniPresi' name='dDniPresi' /></label>
                <input type='submit' class='button' name='eliminarPresi' value='Eliminar Presidente por DNI' />

                <label for='dIdPartido'>ID del partido a borrar: <input type='text' id='dIdPartido' name='dIdPartido' /></label>
                <input type='submit' class='button' name='eliminarPartido' value='Eliminar Partido por ID' />

                <label for='dDniJugador'>DNI del jugador a borrar: <input type='text' id='dDniJugador' name='dDniJugador' /></label>
                <input type='submit' class='button' name='eliminarJugador' value='Eliminar Jugador por DNI' />
            </form>
    ";

?>
</body>
</html>