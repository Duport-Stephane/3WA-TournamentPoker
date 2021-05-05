<?php

// Appels de dépendances
// require_once '../services/utils.php';
// Mise à disposition de la session
require_once '../services/session.php';
// Appel de la connexion à la bdd
require_once '../services/database.php';
// Appel de la classe User
require_once '../models/User.php';

// var_dump($_GET);
// var_dump($_SERVER);
$_SESSION['tournament_id'] = 1;
// var_dump($_SESSION);
// print_r($_SESSION);
// die;

$userM = new User;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('PLAYER.PHP en POST');

    // @TODO : //////////////// ROLE_ID != 1 a modifier pour être plus généraliste ? //////////////////     
    // @TODO : //////////////// DEPEND_USER_ID Prendre en compte pour n'afficher que les joueurs connu de cette admin //////////////////    

    if (isset($_POST['action']) && !empty($_POST['action']) && isset($_POST['type']) && !empty($_POST['type'])) {
        extract($_POST);

        // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
        switch ($type) {
            case 'user':
                // $_SESSION['users'] = $users;
                echo json_encode($userM->getUsers(1, $_SESSION['tournament_id']));
                break;
            case 'player':
                // $_SESSION['players'] = $players;
                echo json_encode($userM->getPlayers($_SESSION['tournament_id']));
                break;
            default:

                break;
        }
    }
        // Si pas de param, je repars à l'accueil
    header('Location: ../index.php');
    exit;
}

// 1 er chargement de la page 'Player'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('PLAYER.PHP en GET');

}

header('location: ../controller/layout.php?page=players');