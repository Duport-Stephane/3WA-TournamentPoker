<?php

/////////////////////////////////// A SUPPRIMER //////////////////////////////////
// Display all errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/////////////////////////////////// FIN SUPPRESSION //////////////////////////////////


// Appels de dépendances
require './src/services/utils.php';
// Mise à disposition de la session
require './src/services/session.php';

// $_SESSION = [];
session_destroy();
unset($_SESSION);
// var_dump($_SESSION);
// die;

$_SESSION['page'] = 'home';
header('location: ./src/controller/layout.php?page=home');