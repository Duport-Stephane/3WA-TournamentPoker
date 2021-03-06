<?php

require_once './src/autoload.php';

// Provision of the session
\Models\Session::init();

if (isset($_POST) && !empty($_POST)) {

    if (array_key_exists('action', $_POST) && !empty($_POST['action'])) {

        switch ($_POST['action']) {
            case 'addPlayerList':
            case 'delPlayerList':
                // Call from modifPlayerList from ADD ou REMOVE button on players page
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
            case 'updateUser':
                // call from update from Dashboard User
                $page = 'dashboardUser';
                require_once './src/services/ajaxLog.php';
                break;
            case 'updateAdmin':
                // call from update from Dashboard Admin
                $page = 'dashboardAdmin';
                require_once './src/services/ajaxLog.php';
                break;
            case 'delUserList':
                // call from delete button from Dashboard Admin
                $page = 'dashboardAdmin';
                require_once './src/services/ajaxUsers.php';
                break;
            default:
                header('Location: ./index.php?page=home');
        }
    }


} else if (isset($_GET) && !empty($_GET)) {

    if (array_key_exists('page', $_GET) && !empty($_GET['page']) && array_key_exists('action', $_GET) && !empty($_GET['action'])) {

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

        $page = $_GET['page'];
    }
} else {
    // First call, Display Home page
    $page = 'home';
}

require_once './src/controller/layout.php';
