<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('INSCRIPTION.PHP en POST');
    // die;

    
    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=home');
    exit;
}

// 1 er chargement de la page 'login'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('INSCRIPTION.PHP en GET');

}

header('location: ./index.php?page=inscription');
