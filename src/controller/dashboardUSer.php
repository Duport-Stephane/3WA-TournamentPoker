<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    header('Location: ./index.php?page=dashboardUser');
    die;
}

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

    $roleM = new \Models\Role;
    // role of user, only for Admin
    if (\Models\Session::getOffset1_Offset2('user', 'role_id')) {
        $roleName = $roleM->getRoleNameById((int)\Models\Session::getOffset1_Offset2('user', 'role_id'))['roleName'];
    };

    // Tournament with closed_at = null
    $tournament = new \Models\Tournament;
    $tournaments = $tournament->getAllTournamentOn();
}

require_once './src/views/dashboardUser.phtml';
