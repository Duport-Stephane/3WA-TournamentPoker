<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('DASHBOARD ADMIN.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=dashboardUSer');
    die;
}

// 1 er chargement de la page 'Table'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // var_dump('DASHBOARD ADMIN.PHP en GET');

    $roleM = new \Models\Role;
    // role du user
    $roleName = $roleM ->getRoleNameById(\Models\Session::getOffset1_Offset2('user', 'role_id'))['roleName'];
    // on récupère la liste des rôles pour les afficher en COMBO LIST
    $roles = $roleM->getAllRoleName();
    
    // on récupère la liste des tournois à venir (closed_at = null) pour les afficher en Tableau
    $tournament = new \Models\Tournament;
    $tournaments = $tournament->getAllTournamentOn();
    // var_dump($tournaments);
    
}

require_once './src/views/dashboardAdmin.phtml';
