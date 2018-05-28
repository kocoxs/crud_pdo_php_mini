<?php

function conect() {
  
  $db = null;
  $host = "localhost";
  $dbname = "crud_pdo";
  $user = "root";
  $password = "";

  try {
    $db = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8mb4', $user, $password);
    //echo 'Conectado a '.$db->getAttribute(PDO::ATTR_CONNECTION_STATUS);
  } catch(PDOException $ex) {
    //echo 'Error conectando a la BBDD. '.$ex->getMessage(); 
  }

  return $db;  
}

function getAll() {
  $db = conect();
  $result = [];
  if($db != null){
    // Utilizar la conexión aquí
    $sql = "select id, nombre, correo, DATE_FORMAT(fecha_nacimiento, '%m/%d/%Y') as 'fecha_nacimiento' from clientes";    

    foreach ($db->query($sql) as $row) {

        $item = array(
          'id' => $row['id'],
          'nombre' => $row['nombre'],
          'correo' => $row['correo'],
          'fecha_nacimiento' => $row['fecha_nacimiento']
        );
        array_push($result, $item);
    }
  }else{

  }

  return $result;
}

function crear() {
  $nombre = $_GET["nombre"];
  $correo = $_GET["correo"];
  $fecha = $_GET["fecha"];

  $db = conect();
  $result = false;
  if($db != null){

    try {
      $sentencia = $db->prepare("INSERT INTO clientes (nombre, correo, fecha_nacimiento) VALUES (?, ?, STR_TO_DATE(?, '%m/%d/%Y'))");

      $sentencia->bindParam(1, $nombre);
      $sentencia->bindParam(2, $correo);
      $sentencia->bindParam(3, $fecha);

      $sentencia->execute();

      $result = true;

    } catch (Exception $e) {
      // $e->getMessage()
    }
    
  } else {

  }

  return $result;
}

function editar(){
  $nombre = $_GET["nombre"];
  $correo = $_GET["correo"];
  $fecha = $_GET["fecha"];
  $id = $_GET["id"];

  $db = conect();
  $result = false;
  if($db != null){

    try {
      $sentencia = $db->prepare("Update clientes set nombre = ? , correo = ? , fecha_nacimiento = STR_TO_DATE(?, '%m/%d/%Y') where id = ?");

      $sentencia->bindParam(1, $nombre);
      $sentencia->bindParam(2, $correo);
      $sentencia->bindParam(3, $fecha);
      $sentencia->bindParam(4, $id);

      $sentencia->execute();

      $result = true;

    } catch (Exception $e) {
      // $e->getMessage()
    }
    
  } else {

  }

  return $result;
}

function eliminar() {
  $id = $_GET["id"];

  $db = conect();
  $result = false;
  if($db != null){

    try {
      $sentencia = $db->prepare("Delete from clientes where id = ?");

      $sentencia->bindParam(1, $id);

      $sentencia->execute();

      $result = true;

    } catch (Exception $e) {
      // $e->getMessage()
    }
    
  } else {

  }

  return $result;
}

function rutas() {
  
  if(isset($_GET["operacion"]) && $_GET["operacion"] != ""){

    $params = $_GET["operacion"];

    switch ($params) {
      case "listar":
          echo json_encode(getAll());
          return true;
      break;
      case "crear":
          echo json_encode(crear());
          return true;
      break;
      case "eliminar":
          echo json_encode(eliminar());
          return true;
      break;

      case "editar":
          echo json_encode(editar());
          return true;
      break;
      
      
    }

  }else{

  }

}

rutas();

?>