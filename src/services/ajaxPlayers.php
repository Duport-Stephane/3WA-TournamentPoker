<?php
// Importer le nécessaire

// var_dump($_POST);
// var_dump($_GET);

$userM = new \Models\User;
$playerM = new \Models\Player;

if (isset($_POST) && !empty($_POST) && array_key_exists('action', $_POST)) {
    // on arrive ici lors de l'appui sur un des 2 boutons de la page Players, depuis modifPlayerList (via index / POST)

    extract($_POST);

    try {

        modifUser($action, $userM, $playerM);
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

    $tournament_id = 1;

    try {

        switch ($action) {
            case 'display':
                $users      = $userM->getUsers($tournament_id);
                $players    = $playerM->getPlayers($tournament_id);
                break;
            case 'refresh':
                // en fonction du contenu de action, remplir le tableau des USERS ou celui des PLAYERS

                switch ($type) {
                    case 'user':
                        echo json_encode($userM->getUsers($tournament_id));
                        break;
                    case 'player':
                        echo json_encode($playerM->getPlayers($tournament_id));
                        break;
                    default:
                        throw new DomainException('Erreur, retour à la page précédente.');
                }
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        header('Location: ./index.php?page=players&action=display');

        die;
    }
};


function modifUser($action, $userM, $playerM)
{

    // var_dump($_POST);
    // die;

    // Test INPUTS of addPlayerList, delPlayerList
    // pour savoir si au moins un de coché, et ensuite, les ajouter/enlever de la table PLAYER
    if (isset($_POST['checkboxuser']) && !empty($_POST['checkboxuser'])) {

        $chkUsers = $_POST['checkboxuser'];

        $tournament_id = 1;

        foreach ($chkUsers as $value) {

            // ---> Si l'id est bien un entier
            if (!is_int(intval($value))) {
                throw new DomainException('L\'identifiant de ce joueur n\'est pas un entier.');
            }


            // ---> si l'id est bien dans la table User
            if (!($userM->isIdExist(intval($value)))) {
                throw new DomainException('Ce joueur n\'existe pas ! L\'identifiant n\'est pas reconnu.');
            } else {
                // Déterminer l'action à mener
                switch ($action) {
                    case 'addPlayerList':
                        // on controle différents points avant d'ajouter dans la table Player : 

                        // ---> et si l'id n'est pas déjà présent dans la table Player pour ce tournoi
                        if (!empty($playerM->isPlayerExistTournament(intval($value), intval($tournament_id)))) {
                            throw new DomainException('Ce joueur est déjà validé pour ce tournoi !');
                        }

                        // créer une nouvelle entrée dans la table PLAYER avec l'id du User et le numéro du tournoi
                        $playerM->insertPlayer(intval($value), intval($tournament_id));

                        \Models\Session::setOffset('info', "La sélection fait maintenant partie des joueurs validés");
                        echo "La sélection fait maintenant partie des joueurs validés";

                        break;


                    case 'delPlayerList':
                        //controle avant la suppression : ID bien présent pour ce tournoi ?

                        if (!empty($playerM->isPlayerExistTournament(intval($value), intval($tournament_id)))) {
                            throw new DomainException('Ce joueur n\'est pas inscrit à ce tournoi !');
                        } else {
                            $playerM->deletePlayer(intval($value), intval($tournament_id));
                        };

                        \Models\Session::setOffset('info', "La sélection a bien été retirée de la liste des joueurs validés");
                        echo "La sélection a bien été retirée de la liste des joueurs validés";

                        break;

                    default:
                        // code...
                        throw new DomainException('Erreur, retour à la page précédente.');
                }
            }
        }
    } else {
        // Renvoyer un message s'il n'y pas de checkbox cochée
        throw new DomainException("Vous n'avez sélectionné aucune ligne dans cette liste !");
    }
}
