<?php

// Appels de dépendances
// Appel de la classe User
// require_once './src/models/User.php';
// Appel de la connexion à la bdd
// require './src/models/Database.php';

$userM = new \appDS\models\User;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('PLAYER.PHP en POST');

    // @TODO : //////////////// ROLE_ID != 1 a modifier pour être plus généraliste ? //////////////////     
    // @TODO : //////////////// DEPEND_USER_ID Prendre en compte pour n'afficher que les joueurs connu de cette admin //////////////////    

    if (isset($_POST['action']) && !empty($_POST['action']) && isset($_POST['type']) && !empty($_POST['type'])) {
        // on peut supprimer le test sur ACTION qui ne sert pas pour l'instant

        extract($_POST);
        // var_dump($_POST);

        $tournament_id = 1;

        // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
        switch ($type) {
            case 'User':
                $_SESSION['info'] = "La sélection fait maintenant partie des joueurs validés";
                echo json_encode($userM->getUsers());
                break;
            case 'Player':
                $_SESSION['info'] = "La sélection a bien été retirée de la liste des joueurs validés";
                echo json_encode($userM->getPlayers($tournament_id));
                break;
        }
    }
    // Si pas de param, je repars à l'accueil
    header('Location: ../index.php?page=home');
    exit;
}

// 1 er chargement de la page 'Player'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('PLAYER.PHP en GET');

    try {

        // if(Session::isConnected()){
        $tournament_id = 1;
        $users      = $userM->getUsers();
        // var_dump($users);
        // die;
        $players    = $userM->getPlayers($tournament_id);
        // } else {
        // throw new DomainException('Veuillez vous connecter pour accéder à cette page.');
        // }

    } catch (DomainException $e) {
        \appDS\models\Session::setOffset('alert', $e->getMessage());

        header('location: ./index.php?page=home');
        die;
    }
}
require_once './src/views/players.phtml';
