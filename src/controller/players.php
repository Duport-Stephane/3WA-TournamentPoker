<?php

// Appels de dépendances
// Appel de la connexion à la bdd
require_once '../services/database.php';
// Appel de la classe User
require_once '../models/User.php';
// Mise à disposition de la session
require_once '../services/Session.php';

$userM = new User;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // var_dump('PLAYER.PHP en POST');
    
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
                echo json_encode($userM->getUsers(1, $tournament_id));
                break;
                case 'Player':
                    $_SESSION['info'] = "La sélection a bien été retirée de la liste des joueurs validés";
                    echo json_encode($userM->getPlayers($tournament_id));
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
    
    // var_dump('PLAYER.PHP en GET');

    try {
        if(SESSION::isConnected()){

            // $tournament_id = 1;
            
            // $users      = $userM->getUsers($_SESSION['user']['id'], $tournament_id);
            // $players    = $userM->getPlayers($tournament_id);

        } else {

            throw new DomainException('Veuillez vous connecter pour accéder à cette page.');

        }

    } catch (DomainException $e) {
        SESSION::setOffset('info', $e->getMessage());
        // var_dump(Session::getOffset(('info')));

        // echo $e->getMessage();

        header('location: ./index.php?page=home');
        die;
    }
}
header('location: ./index.php?page=players');