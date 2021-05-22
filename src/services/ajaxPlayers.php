<?php
// Importer le nécessaire

// var_dump($_POST);
// var_dump($_GET);

// test POST
if (isset($_POST) && !empty($_POST)) {

    // Appel de la classe User
    // require '../models/User.php';
    // require '../models/Player.php';

    $userM = new \appDS\models\User;
    $playerM = new \appDS\models\Player;

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
                $tournament_id = 1;

                $chkUsers = $_POST['checkboxuser'];
                foreach ($chkUsers as $chkUser => $value) {

                    // ---> Si l'id est bien un entier
                    if (!is_int(intval($value))) {
                        throw new DomainException('Danger, Les informations de ce joueur ne sont pas correctes ! L\'identifiant n\'est pas un entier.');
                    }
                    // Déterminer l'action à mener
                    switch ($action) {
                        case 'addPlayerList':
                            // on controle différents points avant d'ajouter dans la table Player : 
                            // ---> si l'id est bien dans la table User
                            if (!($userM->isIdExist(intval($value)))) {
                                throw new DomainException('Danger, Ce joueur n\'existe pas ! L\'identifiant n\'est pas reconnu.');
                            }

                            // ---> et si l'id n'est pas déjà présent dans la table Player pour ce tournoi
                            if ($playerM->isPlayerExistForTournament(intval($value), intval($tournament_id))) {
                                throw new DomainException('Danger, Ce joueur est déjà validé pour ce tournoi !');
                            }

                            // créer une nouvelle entrée dans la table PLAYER avec l'id du User et le numéro du tournoi $_SESSION['tournament_id'] )
                            // si on est arrivé là, c'est OK, on l'ajoute à la table Player
                            $playerM->insertPlayer(intval($value), intval($tournament_id));

                            // $_SESSION['User'] = $userM->getUsers(intval(1), intval($tournament_id));
                            // $_SESSION['Player'] = $userM->getPlayers(intval($tournament_id));
                            echo "La sélection fait maintenant partie des joueurs validés";
                            // header('location: ../controller/layout.php?page=players');
                            break;

                        case 'delPlayerList':
                            //controle avant la suppression : ID bien présent pour ce tournoi ?

                            // if($playerM->isPlayerExistForTournament(intval($value), intval($_SESSION['tournament_id']))) {
                            $playerM->deletePlayer(intval($value), intval($tournament_id));
                            // }else {
                            //     throw new DomainException('Danger, Ce joueur n\'est pas inscrit à ce tournoi !');

                            // };

                            // $_SESSION['User'] = $userM->getUsers(intval(1), intval($tournament_id));
                            // $_SESSION['Player'] = $userM->getPlayers(intval($tournament_id));
                            echo "La sélection a bien été retirée de la liste des joueurs validés";
                            // header('location: ../controller/layout.php?page=players');
                            break;

                        default:
                            // code...
                            throw new DomainException('Danger, Je ne sais pas comment on en est là !');
                            break;
                    }
                }
                // usage du multiple Exception
            }
        } catch (DomainException $e) {
            \appDS\models\Session::setOffset('alert', $e->getMessage());
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
            $tournament = 1;

            switch ($type) {
                case 'user':
                    echo json_encode($userM->getUsers());
                    break;
                case 'player':
                    echo json_encode($userM->getPlayers($tournament));
                    break;
                default:
                    throw new DomainException('Danger, Je ne sais pas comment on en est là !');
                    break;
            }
        } catch (DomainException $e) {
            \appDS\models\Session::setOffset('alert', $e->getMessage());
            echo $e->getMessage();
            die;
        }
    }
}
