<?php

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('DASHBOARD USER.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ./index.php?page=dashboardUSer');
    die;
}

// 1 er chargement de la page 'Table'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('DASHBOARD USER.PHP en GET');

    $roleM = new \Models\Role;
    // role du user
    $roleName = $roleM->getRoleNameById(\Models\Session::getOffset1_Offset2('user', 'role_id'))['roleName'];
}

require_once './src/views/dashboardUser.phtml';
