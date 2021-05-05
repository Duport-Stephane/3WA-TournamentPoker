<?php
// Importer le nécessaire
// Appel de la classe User
require_once '../models/User.php';
require_once '../models/Player.php';
require_once '../services/session.php';

$userM = new User;
$playerM = new Player;

// test POST
if (isset($_POST) && !empty($_POST)) {

    // Extraction des paramètres passés dans le POST
    extract($_POST);

    // Test INPUTS of addPlayerList, delPlayerList
    // pour savoir si au moins un de coché, et ensuite, les ajouter/enlever de la table PLAYER
    if (isset($_POST['checkboxuser'])) {
        try {
            if (empty($_POST['checkboxuser'])) {
                // Renvoyer un message si tous les inputs sont vides (avec une exception)
                throw new DomainException("Vous n'avez sélectionné aucune ligne !");
            } else {

                // on aura au moins une donnée à traiter donc on peut lancer la connexion à la bdd
                // require '../services/database.php';
                // nouvelle instance de connexion à la base donnée
                // $pdo = new Database;

                // echo ('Passage avant Switch');

                // Déterminer l'action à mener
                switch ($action) {
                    case 'addPlayerList':
                        // créer une nouvelle entrée dans la table PLAYER avec l'id du User et le numéro du tournoi $_SESSION['tournament'] )
                        $chkUsers = $_POST['checkboxuser'];
                        foreach ($chkUsers as $chkUser => $value) {
                            // on controle différents points avant d'ajouter dans la table Player : 

                            // ---> Si l'id est bien un entier
                            if (!is_int(intval($value))) {
                                throw new DomainException("L'ID de ce joueur n'est pas un entier !");
                            }

                            // ---> et si l'id est bien dans la table User
                            if (!($userM->isIdExist($value))) {
                                throw new DomainException("Ce joueur n'existe pas !");
                            }

                            // ---> et si l'id n'est pas déjà présent dans la table Player pour ce tournoi
                            if ($playerM->isPlayerExistForTournament($value, $_SESSION['tournament_id'])) {
                                throw new DomainException("Ce joueur est déjà validé pour ce tournoi !");
                            }

                            // si on est arrivé là, c'est OK, on l'ajoute à la table Player
                            echo json_encode($playerM->insertPlayer($value, $_SESSION['tournament_id']));
                        }
                        break;

                    case 'delPlayerList':
                        $chkUsers = $_POST['checkboxuser'];
                        foreach ($chkUsers as $chkUser => $value) {

                            //////@TODO Faire les controle avant la suppression : ID bien présent pour ce tournoi
                            $playerM->deletePlayer($value, $_SESSION['tournament_id']);
                        };
                        echo json_encode("Suppression effectuee");
                        break;

                    default:
                        // code...
                        throw new DomainException("Je ne sais pas comment on en est là !");
                        break;
                }
                // usage du multiple Exception
            }
        } catch (DomainException | PDOException $e) {
            echo $e->getMessage();
            die;
        }
    } else {
        throw new DomainException("Pour l'instant, aucune autre conditon à tester !");
    }
    // Fin POST
}


// test GET
if (isset($_GET) && !empty($_GET)) {

    if (isset($_GET['action']) && !empty($_GET['action']) && isset($_GET['type']) && !empty($_GET['type'])) {
        extract($_GET);

        if ($action === 'refresh') {

            // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
            switch ($type) {
                case 'users':
                    echo json_encode($userM->getUsers(1, $_SESSION['tournament_id']));
                    break;
                case 'players':
                    echo json_encode($userM->getPlayers($_SESSION['tournament_id']));
                    break;
                default:

                    break;
            }
        }
    }
}
