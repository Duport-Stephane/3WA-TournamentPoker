<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('TABLE.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=home');
    exit;
}

// 1 er chargement de la page 'Table'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('TABLE.PHP en GET');

}

header('location: ./index.php?page=tables');
