<?php

// Mise à disposition de la session
require_once '../services/session.php';

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('LOGIN.PHP en POST');
    die;

    // tester l'action, récupérer les paramètres EMAIL et PASSAWORD et les comparer avec la BDD avant de LOG le user


    
    // Si pas de param, je repars à l'accueil
    header('Location: ../index.php');
    exit;
}

// 1 er chargement de la page 'login'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('LOGIN.PHP en GET');

    // vérifier la présence d'un adresse mail dans le localstorage
    // le cas échéant, afficher cette adresse dans le champ Email

}

header('location: ../controller/layout.php?page=login');