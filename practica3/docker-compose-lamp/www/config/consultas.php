<?php

function obtenerNoticias($conexion) {
    $sql = "SELECT noticia.id, noticia.titulo,
            (SELECT imagen.nombre_archivo FROM imagen 
             WHERE imagen.id_noticia = noticia.id 
             LIMIT 1) AS imagen
            FROM noticia";
    $resultado = $conexion->query($sql);
    $noticias = [];
    while ($fila = $resultado->fetch_assoc()) {
        $noticias[] = $fila;
    }
    return $noticias;
}

function obtenerNoticia($conexion, $id) {
    $sql = "SELECT noticia.*, poblacion.nombre AS poblacion
            FROM noticia
            JOIN poblacion ON poblacion.id = noticia.id_poblacion
            WHERE noticia.id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $noticia = $resultado->fetch_assoc();
    $stmt->close();
    return $noticia;
}

function obtenerImagenes($conexion, $id) {
    $sql = "SELECT nombre_archivo FROM imagen WHERE id_noticia = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $imagenes = [];
    while ($fila = $resultado->fetch_assoc()) {
        $imagenes[] = $fila;
    }
    $stmt->close();
    return $imagenes;
}

function obtenerComentarios($conexion, $id) {
    $sql = "SELECT nombre, email, texto, fecha FROM comentario WHERE id_noticia = ? ORDER BY fecha DESC";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $comentarios = [];
    while ($fila = $resultado->fetch_assoc()) {
        $comentarios[] = $fila;
    }
    $stmt->close();
    return $comentarios;
}

function obtenerLocalidades($conexion) {
    $sql = "SELECT nombre FROM poblacion";
    $resultado = $conexion->query($sql);
    $localidades = [];
    while ($fila = $resultado->fetch_assoc()) {
        $localidades[] = $fila['nombre'];
    }
    return $localidades;
}

function guardarComentario($conexion, $nombre, $email, $texto, $id_noticia) {
    $sql = "INSERT INTO comentario (nombre, email, texto, fecha, id_noticia) VALUES (?, ?, ?, NOW(), ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('sssi', $nombre, $email, $texto, $id_noticia);
    $stmt->execute();
    $stmt->close();
}