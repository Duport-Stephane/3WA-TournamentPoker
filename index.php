<?php

/////////////////////////////////// A SUPPRIMER //////////////////////////////////
// Display all errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/////////////////////////////////// FIN SUPPRESSION //////////////////////////////////

require_once './src/autoload.php';

// Provision of the session
\Models\Session::init();

// var_dump($_SESSION);



// Creer une variable tableau $adminPages = [] avec la liste de toutes les pages où il faut être admin pour y accéder




// var_dump($_POST);
// var_dump($_GET);

// *************** POST ***************
if (isset($_POST) && !empty($_POST)) {

    var_dump("POST");
    // var_dump($_POST);
    // var_dump($_POST['action']);
    // die;

    if (array_key_exists('action', $_POST) && !empty($_POST['action'])) {

        var_dump($_POST['action']);
        // die;

        switch ($_POST['action']) {
            case 'addPlayerList':
            case 'delPlayerList':
                // Call from modifPlayerList from ADD ou DEL button on players page
                $page = 'players';
                require_once './src/services/ajaxPlayers.php';

                break;
            case 'persist':
                // Call from persistUser from inscription page
                $page = 'inscription';
                require_once './src/services/ajaxLog.php';
                break;
            case 'auth':
                // Call from loginUser from login page
                $page = 'login';
                require_once './src/services/ajaxLog.php';
                break;
            case 'update':
                // call from update from Dashboard
                $page = 'dashboardUSer';
                require_once './src/services/ajaxLog.php';
                break;
            default:
                header('location: ./index.php?page=home');
        }
    }


    // *************** GET ***************
} else if (isset($_GET) && !empty($_GET)) {

    if (array_key_exists('page', $_GET) && !empty($_GET['page']) && array_key_exists('action', $_GET) && !empty($_GET['action'])) {

        ///////////////////////// ???????? et Refrech Tab User après avoir modiPlayerList

        var_dump("GET Action");
        var_dump($_GET['action']);

        switch ($_GET['action']) {
            case 'display':
                //call from "Joueurs" page and action from Display Tab User  
                $page = 'players';
                require_once './src/services/ajaxPlayers.php';
                break;
            case 'logout':
                // call from userKnonw with user_email
                $page = 'logout';
                require_once './src/services/ajaxLog.php';
                break;
        }
    } else if (array_key_exists('page', $_GET) && !empty($_GET['page'])) {
        // No specific treatment, Display requested page (except home)

        var_dump("GET Page");

        $page = $_GET['page'];
    }
} else {
    // First call, Display Home page

    var_dump("Page Home");

    // Session::logout();
    $page = 'home';
}

require_once './src/controller/layout.php';
