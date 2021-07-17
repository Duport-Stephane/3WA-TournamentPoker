<?php

$userM = new \Models\User;

if (isset($_POST) && !empty($_POST) && array_key_exists('action', $_POST)) {
    // on arrive ici lors de l'appui sur le bouton DEL de la page DashboardAdmin

    extract($_POST);

    try {

        var_dump($_POST);
        // die;
    
        // Test INPUTS of delUserList
        // pour savoir si au moins un de coché
        if (isset($_POST['checkboxuser']) && !empty($_POST['checkboxuser'])) {
    
            $chkUsers = $_POST['checkboxuser'];
        
            foreach ($chkUsers as $value) {
    
                // ---> Si l'id est bien un entier
                if (!is_int(intval($value))) {
                    throw new DomainException('Danger, L\'identifiant de ce joueur n\'est pas un entier.');
                }

                            $userM->delUser(intval($value));

                        \Models\Session::setOffset('info', "Success, La sélection d'utilisateur a bien été supprimée de l'application");
                        echo "Success, La sélection d'utilisateur a bien été supprimée de l'application";
    
            }
        } else {
            // Renvoyer un message s'il n'y pas de checkbox cochée
            throw new DomainException("Warning, Vous n'avez sélectionné aucune ligne dans cette liste !");
        }

    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());

        // var_dump(\Models\Session::getOffset('alert'));

        echo $e->getMessage();

        // header('Location: ./index.php?page=players&action=display');

        die;
    }
    // Fin POST
}

// test GET
if (isset($_GET) && !empty($_GET) && isset($_GET['action'])) {

    extract($_GET);

    try {

        switch ($action) {
            case 'display':
                $users      = $userM->getUsers($tournament_id);
                break;
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        header('Location: ./index.php?page=dashboardAdmin');

        die;
    }
};
