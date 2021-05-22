<?php

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('CANVAS.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ../../index.php?page=home');
    exit;
}

// 1 er chargement de la page 'BONUS = CANVAS'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('CANVAS.PHP en GET');

}

require_once './src/views/bonus.phtml';
