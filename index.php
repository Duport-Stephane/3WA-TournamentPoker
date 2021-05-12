<?php

/////////////////////////////////// A SUPPRIMER //////////////////////////////////
// Display all errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/////////////////////////////////// FIN SUPPRESSION //////////////////////////////////


// Mise à disposition de la session
require_once './src/services/Session.php';
Session::init();

if(array_key_exists('page',$_GET) && !empty($_GET['page']) && $_GET['page'] !== "") {
    $page = $_GET['page'];
}else {
    $page = 'home';
};

require_once './src/controller/layout.php';