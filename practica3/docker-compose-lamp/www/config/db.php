<?php

define('DB_HOST', 'database');
define('DB_NAME', 'incidencias');
define('DB_USER', 'incidencias_user');
define('DB_PASS', 'incidencias_pass');

function conectarBD() {
    $conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conexion->connect_error) {
        die('Error de conexión: ' . $conexion->connect_error);
    }

    $conexion->set_charset('utf8mb4');

    return $conexion;
}