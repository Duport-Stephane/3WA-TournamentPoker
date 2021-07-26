<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('DASHBOARD ADMIN.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=dashboardAdmin');
    die;
}

// 1 er chargement de la page 'Table'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // var_dump('DASHBOARD ADMIN.PHP en GET');

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

    $roleM = new \Models\Role;
    // role du user, only for Admin
    if (\Models\Session::getOffset1_Offset2('user', 'role_id')) {
        $roleName = $roleM ->getRoleNameById(\Models\Session::getOffset1_Offset2('user', 'role_id'))['roleName'];
        // on récupère la liste des rôles pour les afficher en COMBO LIST
        $roles = $roleM->getAllRoleName();
    }

    // liste des joueurs inscrits sur l'appli
    $user = new \Models\User;
    $users = $user->getAllUsers('nickName','%');

    // on récupère la liste des tournois à venir (closed_at = null) pour les afficher en Tableau
    $tournament = new \Models\Tournament;
    $tournaments = $tournament->getAllTournamentOn();
    // var_dump($tournaments);
    
}

require_once './src/views/dashboardAdmin.phtml';
