<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // var_dump('TABLE.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=home');
    exit;
}

// First display
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Test if the user is connected
    try {
        if (!\Models\Session::isConnected()) {
            throw new DomainException('Veuillez vous connecter pour accéder à cette page.');
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();
        header('Location: ./index.php?page=home');
        die;
    }
}


require_once './src/views/tables.phtml';
