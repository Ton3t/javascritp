<?php

    $myfile = "../json/clientes.json";
    $datos = $_POST["datos"];
    $jsonData = file_get_contents($myfile);
    $data1 = json_decode($datos, true);
    $array = json_decode($jsonData, true);
    $jsonData = json_encode($data1, JSON_PRETTY_PRINT);
    file_put_contents($myfile, $jsonData);
    
    /*
    $datos = $_POST["datos"];
    file_put_contents("../json/clientes.json", $datos);
    */

?>