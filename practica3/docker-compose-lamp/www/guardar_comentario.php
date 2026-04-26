<?php

require_once 'config/db.php';
require_once 'config/consultas.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

if (!isset($_POST['nombre'], $_POST['email'], $_POST['texto'], $_POST['id_noticia'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}

$nombre = trim(strip_tags($_POST['nombre']));
$email = trim(strip_tags($_POST['email']));
$texto = trim(strip_tags($_POST['texto']));
$id_noticia = $_POST['id_noticia'];

if ($nombre === '' || $email === '' || $texto === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos deben estar rellenos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'El email no es válido']);
    exit;
}

if (!ctype_digit($id_noticia)) {
    http_response_code(400);
    echo json_encode(['error' => 'Noticia no válida']);
    exit;
}

$id_noticia = (int) $id_noticia;
$conexion = conectarBD();
guardarComentario($conexion, $nombre, $email, $texto, $id_noticia);
$conexion->close();

header('Content-Type: application/json');
echo json_encode([
    'nombre' => $nombre,
    'email' => $email,
    'texto' => $texto,
    'fecha' => date('Y-m-d H:i:s')
]);