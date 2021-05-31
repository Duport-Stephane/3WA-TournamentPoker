<?php

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('PLAYERS.PHP en POST');

    // @TODO : //////////////// ROLE_ID != 1 a modifier pour être plus généraliste ? //////////////////     
    // @TODO : //////////////// DEPEND_USER_ID Prendre en compte pour n'afficher que les joueurs connu de cette admin //////////////////    

    // if (isset($_POST['action']) && !empty($_POST['action']) && isset($_POST['type']) && !empty($_POST['type'])) {
    //     // on peut supprimer le test sur ACTION qui ne sert pas pour l'instant

    //     extract($_POST);
    //     // var_dump($_POST);

    //     $tournament_id = 1;

    //     // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
    //     switch ($type) {
    //         case 'User':
    //             $_SESSION['info'] = "La sélection fait maintenant partie des joueurs validés";
    //             echo json_encode($userM->getUsers());
    //             break;
    //         case 'Player':
    //             $_SESSION['info'] = "La sélection a bien été retirée de la liste des joueurs validés";
    //             echo json_encode($playerM->getPlayers($tournament_id));
    //             break;
    //     }
    // }
    // // Si pas de param, je repars à l'accueil
    // header('Location: ./index.php?page=players&action=display');
    // exit;
}

// 1 er chargement de la page 'Player'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // var_dump('PLAYERS.PHP en GET');

    // Test de la connexion !!!!!!

        // if(!Session::isConnected()){
        // throw new DomainException('Veuillez vous connecter pour accéder à cette page.');
        // }

}
require_once './src/views/players.phtml';
