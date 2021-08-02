<?php

$userM = new \Models\User;
$playerM = new \Models\Player;

if (isset($_POST) && !empty($_POST) && array_key_exists('action', $_POST)) {

    extract($_POST);

    try {

        modifUser($action, $userM, $playerM);
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());

        echo $e->getMessage();

        die;
    }
}

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

        if ($e->getCode() === 404) {
            header('Location: ./index.php?page=404');
        } else {
            header('Location: ./index.php?page=players&action=display');
        }
        die;
    }
};


function modifUser($action, $userM, $playerM)
{
    // Test INPUTS of addPlayerList, delPlayerList
    if (isset($_POST['checkboxuser']) && !empty($_POST['checkboxuser'])) {

        $chkUsers = $_POST['checkboxuser'];

        $tournament_id = 1;

        foreach ($chkUsers as $value) {

            // if 'id' is not an integer
            if (!is_int(intval($value))) {
                throw new DomainException('Danger, L\'identifiant de ce joueur n\'est pas un entier.');
            }

            // if 'id' is not in User's array
            if (!($userM->isIdExist(intval($value)))) {
                throw new DomainException('Danger, Ce joueur n\'existe pas ! L\'identifiant n\'est pas reconnu.');
            } else {
                // if it's OK
                switch ($action) {
                    case 'addPlayerList':

                        // If 'id' is in Player's array for THIS tournament
                        if (!empty($playerM->isPlayerExistTournament(intval($value), intval($tournament_id)))) {
                            throw new DomainException('Danger, Ce joueur est déjà validé pour ce tournoi !');
                        }

                        // Persit this user in player's array
                        $playerM->insertPlayer(intval($value), intval($tournament_id));

                        \Models\Session::setOffset('info', "La sélection fait maintenant partie des joueurs validés");
                        echo "Success, La sélection fait maintenant partie des joueurs validés";

                        break;

                    case 'delPlayerList':
                        //Test before remove : 'ID' exist for this tournament ?

                        if (!empty($playerM->isPlayerExistTournament(intval($value), intval($tournament_id)))) {
                            throw new DomainException('Danger, Ce joueur n\'est pas inscrit à ce tournoi !');
                        } else {
                            $playerM->deletePlayer(intval($value), intval($tournament_id));
                        };

                        \Models\Session::setOffset('info', "La sélection a bien été retirée de la liste des joueurs validés");
                        echo "Success, La sélection a bien été retirée de la liste des joueurs validés";

                        break;

                    default:
                        throw new DomainException('Erreur, retour à la page précédente.');
                }
            }
        }
    } else {
        // Any checkbox checked
        throw new DomainException("Vous n'avez sélectionné aucune ligne dans cette liste !");
    }
}
