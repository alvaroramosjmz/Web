<?php

require_once 'config/db.php';
require_once 'config/consultas.php';
require_once 'config/twig.php';

if (!isset($_GET['id']) || !ctype_digit($_GET['id'])) {
    header('Location: /portada.php');
    exit;
}

$id = (int) $_GET['id'];
$conexion = conectarBD();
$noticia = obtenerNoticia($conexion, $id);

if (!$noticia) {
    $conexion->close();
    header('Location: /portada.php');
    exit;
}

$imagenes = obtenerImagenes($conexion, $id);
$conexion->close();

echo renderizar('noticia_imprimir.twig', [
    'noticia' => $noticia,
    'imagenes' => $imagenes
]);