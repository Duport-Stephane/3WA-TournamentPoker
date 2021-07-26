<?php

// First display
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
}

\Models\Session::logout();


require_once './src/views/logout.phtml';
