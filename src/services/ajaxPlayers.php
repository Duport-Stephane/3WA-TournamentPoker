<?php
// Importer le nécessaire
// Appel de la classe User
require_once '../models/User.php';
require_once '../models/Player.php';
require_once '../services/session.php';

$userM = new User;
$playerM = new Player;

// var_dump($_SESSION);

// test POST
if (isset($_POST) && !empty($_POST)) {

    // Extraction des paramètres passés dans le POST
    extract($_POST);

    // Test INPUTS of addPlayerList, delPlayerList
    // pour savoir si au moins un de coché, et ensuite, les ajouter/enlever de la table PLAYER
    if (isset($_POST['checkboxuser'])) {
        try {
            if (empty($_POST['checkboxuser'])) {
                // Renvoyer un message s'il n'y pas d'id dans la checkbox
                throw new DomainException("Attention, Vous n'avez sélectionné aucune ligne !");
            } else {
                $tournament_id = $_SESSION['tournament_id'];

                // Déterminer l'action à mener
                switch ($action) {
                    case 'addPlayerList':
                        // créer une nouvelle entrée dans la table PLAYER avec l'id du User et le numéro du tournoi $_SESSION['tournament_id'] )
                        $chkUsers = $_POST['checkboxuser'];
                        foreach ($chkUsers as $chkUser => $value) {
                            // on controle différents points avant d'ajouter dans la table Player : 

                            // ---> Si l'id est bien un entier
                            if (!is_int(intval($value))) {
                                throw new DomainException('Danger, Les informations de ce joueur ne sont pas correctes ! L\'identifiant n\'est pas un entier.');
                            }

                            // ---> et si l'id est bien dans la table User
                            if (!($userM->isIdExist(intval($value)))) {
                                throw new DomainException('Danger, Ce joueur n\'existe pas ! L\'identifiant n\'est pas reconnu.');
                            }

                            // ---> et si l'id n'est pas déjà présent dans la table Player pour ce tournoi
                            if ($playerM->isPlayerExistForTournament(intval($value), intval($tournament_id))) {
                                throw new DomainException('Danger, Ce joueur est déjà validé pour ce tournoi !');
                            }

                            // si on est arrivé là, c'est OK, on l'ajoute à la table Player
                            $playerM->insertPlayer(intval($value), intval($tournament_id));
                        }

                        $_SESSION['User'] = $userM->getUsers(intval(1), intval($tournament_id));
                        $_SESSION['Player'] = $userM->getPlayers(intval($tournament_id));
                        echo "La sélection fait maintenant partie des joueurs validés";
                        // header('location: ../controller/layout.php?page=players');
                        break;

                    case 'delPlayerList':
                        $chkUsers = $_POST['checkboxuser'];
                        foreach ($chkUsers as $chkUser => $value) {
                            //controle avant la suppression : ID bien présent pour ce tournoi ?
                            // if($playerM->isPlayerExistForTournament(intval($value), intval($_SESSION['tournament_id']))) {
                            $playerM->deletePlayer(intval($value), intval($tournament_id));
                            // }else {
                            //     throw new DomainException('Danger, Ce joueur n\'est pas inscrit à ce tournoi !');

                            // };
                        };

                        $_SESSION['User'] = $userM->getUsers(intval(1), intval($tournament_id));
                        $_SESSION['Player'] = $userM->getPlayers(intval($tournament_id));
                        echo "La sélection a bien été retirée de la liste des joueurs validés";
                        // header('location: ../controller/layout.php?page=players');
                        break;

                    default:
                        // code...
                        throw new DomainException('Danger, Je ne sais pas comment on en est là !');
                        break;
                }
                // usage du multiple Exception
            }
        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }
    } else {
        echo 'Attention, Vous n\'avez sélectionné aucune ligne !';
        die;
    }
    // Fin POST
}


// test GET
if (isset($_GET) && !empty($_GET)) {

    if (isset($_GET['action']) && !empty($_GET['action']) && isset($_GET['type']) && !empty($_GET['type'])) {
        extract($_GET);
        try {
            // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
            switch ($type) {
                case 'User':
                    echo json_encode($userM->getUsers(1, $_SESSION['tournament_id']));
                    break;
                case 'Player':
                    echo json_encode($userM->getPlayers($_SESSION['tournament_id']));
                    break;
                default:
                    throw new DomainException('Danger, Je ne sais pas comment on en est là !');
                    break;
            }
        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }
    }
}
