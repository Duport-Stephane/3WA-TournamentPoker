<?php
// var_dump(\appDS\Session::getOffset('user'));

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('LOGIN.PHP en POST');
    die;

    // tester l'action, récupérer les paramètres EMAIL et PASSAWORD et les comparer avec la BDD avant de LOG le user

    extract($_POST);

    
    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=home');
    exit;
}

// 1 er chargement de la page 'login'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('LOGIN.PHP en GET');
    // die;

    // vérifier la présence d'un adresse mail dans le localstorage
    // le cas échéant, afficher cette adresse dans le champ Email

}

require_once './src/views/login.phtml';
