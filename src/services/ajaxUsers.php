<?php

$userM = new \Models\User;
$playerM = new \Models\Player;

if (isset($_POST) && !empty($_POST) && array_key_exists('action', $_POST)) {

    extract($_POST);

    try {

        // Test INPUTS of delUserList
        if (isset($_POST['checkboxuser']) && !empty($_POST['checkboxuser'])) {

            $chkUsers = $_POST['checkboxuser'];

            foreach ($chkUsers as $value) {

                // if 'id' is not an integer
                if (!is_int(intval($value))) {
                    throw new DomainException('L\'identifiant de ce joueur n\'est pas un entier.');
                }

                // if 'id' is not in User's array
                if (!($userM->isIdExist(intval($value)))) {
                    throw new DomainException('Ce joueur n\'existe pas ! L\'identifiant n\'est pas reconnu.');
                } else {
                    // if this user is in player's array -> remove
                    $tournament_id = 1; // only 1 tournament for the moment, with id = 1
                    if (empty($playerM->isPlayerExistTournament(intval($value), intval($tournament_id)))) {
                        $playerM->deletePlayer(intval($value), intval($tournament_id));
                    };

                    $userM->delUser(intval($value));

                    \Models\Session::setOffset('info', "La sélection d'utilisateur a bien été supprimée de l'application");
                    echo "La sélection d'utilisateur a bien été supprimée de l'application";
                }
            }
        } else {
            // Any checkbox checked
            throw new DomainException("Vous n'avez sélectionné aucune ligne dans cette liste !");
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        if ($e->getCode() === 404) {
            header('Location: ./index.php?page=404');
        }
        die;
    }
}

if (isset($_GET) && !empty($_GET) && isset($_GET['action'])) {

    extract($_GET);

    try {
        
        header('Location: ./index.php?page=dashboardAdmin');

    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        if ($e->getCode() === 404) {
            header('Location: ./index.php?page=404');
        }
        die;
    }
};
