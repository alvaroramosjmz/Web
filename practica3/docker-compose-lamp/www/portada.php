<?php

require_once 'config/db.php';
require_once 'config/consultas.php';
require_once 'config/twig.php';

$conexion = conectarBD();
$noticias = obtenerNoticias($conexion);
$conexion->close();

echo renderizar('portada.twig', [
    'noticias' => $noticias
]);