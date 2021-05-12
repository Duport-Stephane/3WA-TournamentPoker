<?php
// Importer le nécessaire
// Appel de la classe User
require_once '../models/User.php';

$userM = new User;

// var_dump($_SESSION);

// test POST
if (isset($_POST) && !empty($_POST)) {

    // Extraction des paramètres passés dans le POST
    var_dump("POST AJAX LOG");
    extract($_POST);

    if (isset($_SESSION['action']) && !empty($_SESSION['action'])) {
        try {
            foreach ($_POST as $key => $input) {
                if ($input['name'] != 'avatar' && empty($input)) {
                    throw new DomainException("Attention, Le champ $key est vide");
                }
            }
            if ($_SESSION['action'] === 'insert') {
                // on checke tous les inputs du form
                // on commence par le mail (unique) donc ne peut déjà exister en BDD 
                if ($userM->getUserByMail($email)){
                    throw new DomainException("Attention, L'utilisateur existe déjà !");
                }


                    // echo json_encode($userM->insert());
            }
        } catch (DomainException | PDOException $e) {
            echo $e->getMessage();
            die;
        }
    }

    header('Location: ../controller/layout.php?page=login');

    // Fin POST
}

// test GET
if (isset($_GET) && !empty($_GET)) {

    extract($_GET);

    if (isset($email) && !empty($email)) {
        try {
            echo "GET AJAX LOG : $email";
            // echo json_encode($userM->getUserByMail($email));

        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }
    }
}
