<?php

function inicializarTwig() {
    require_once '/usr/local/lib/php/vendor/autoload.php';
    $loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
    return new \Twig\Environment($loader);
}

function renderizar($plantilla, $datos = []) {
    $twig = inicializarTwig();
    return $twig->render($plantilla, $datos);
}