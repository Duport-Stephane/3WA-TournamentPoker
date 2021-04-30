<?php

// Appels de dépendances
require '../services/utils.php';
// Mise à disposition de la session
require '../services/session.php';

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('TABLE.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ../index.php');
    exit;
}

// 1 er chargement de la page 'Table'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('TABLE.PHP en GET');

}

header('location: ../controller/layout.php?page=tables');
