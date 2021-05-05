<?php
// Importer le nécessaire
// Appel de la classe User
require_once '../models/User.php';
require_once '../services/session.php';

$userM = new User;

// test POST
if (!isset($_POST) && empty($_POST)) {

    // Test INPUTS of addPlayerList, delPlayerList
    // pour savoir si au moins un de coché, et ensuite, les ajouter/enlever de la table PLAYER
    if (isset($_POST['checkboxuser'])) {
        try {
            if (!empty($_POST['checkboxuser'])) {
                // Renvoyer un message si tous les inputs sont vides (avec une exception)
                throw new DomainException("Vous n'avez sélectionné aucune ligne !");
            } else {
                // on aura au moins une donnée à traiter donc on peut lancer la connexion à la bdd
                require '../services/database.php';
                // nouvelle instance de connexion à la base donnée
                $pdo = new Database;

                // Extraction des paramètres passés dans le POST
                extract($_POST);

                // Déterminer l'action à mener
                switch ($action) {
                    case 'addPlayerList':
                        // créer une nouvelle entrée dans la table PLAYER avec l'id du User et le numéro du tournoi $_SESSION['tournament'] )
                        $chkUser = $_POST['checkboxuser'];
                        foreach ($chkUser as $chkUsers => $value) {
                            // on controle différents points avant d'ajouter dans la table Player : 

                            // ---> Si l'id est bien un entier
                            if (!is_int(intval($value))) {
                                throw new DomainException("Ce joueur n'existe pas !");
                            }

                            // ---> et si l'id est bien dans la table User
                            $sql = 'SELECT id
                                FROM user
                                WHERE id = :user_id';
                            $param = [
                                ':user_id' => $value
                            ];

                            $isPresent = $pdo->findOne($sql, $param);
                            if (!$isPresent) {
                                throw new DomainException("Ce joueur n'existe pas !");
                            }

                            // ---> et si l'id n'est pas déjà présent dans la table Player pour ce tournoi
                            $sql = 'SELECT user_id, tournament_id 
                                FROM player 
                                WHERE user_id = :user_id
                                AND tournament_id = :tournament_id';
                            $param = [
                                ':user_id'          => $value,
                                ':tournament_id'    => $_SESSION['tournament_id']
                            ];
                            $isPresent = $pdo->findOne($sql, $param);

                            if ($isPresent) {
                                throw new DomainException("Ce joueur est déjà validé pour ce tournoi !");
                            }

                            // si on est arrivé là, c'est OK, on l'ajoute à la table Player
                            $sql = 'INSERT INTO player (user_id, tournament_id) 
                            VALUES (:user_id, :tournament_id)';
                            $param = [
                                ':user_id'          => $value,
                                ':tournament_id'    => $_SESSION['tournament_id']
                            ];

                            $pdo->executeSql($sql, $param);
                        }

                        break;
                    case 'delPlayerList':
                        // Test si c'est bien un entier, car dans le model ca sera à nouveau vérifier
                        if (is_int(intval($userId))) {
                            // $userM->delUserById($userId);
                            // // test si user exist et si le pwd assoc est correct
                            // if (!$user = $userM->auth($email))
                            //     throw new DomainException("L'utilisateur est inconnu");
                            // else if (!password_verify($password, $user['password']))
                            //     throw new DomainException("Mot de passe incorrect");
                            // // Session : ajout du user dans la session
                            // // Session::login($user);
                            // // Renvoi de l'id et le nom du user au callback ajax
                            // echo json_encode([$user['id'], $user['name']]);
                        }
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
    }
    // Fin POST
}


// test GET
if (isset($_GET) && !empty($_GET)) {
    if (isset($_GET['action']) && !empty($_GET['action']) && isset($_GET['type']) && !empty($_GET['type'])) {
        extract($_GET);

        // en fonction du contenu de TYPE, remplir le tableau des USERS ou celui des PLAYERS
        switch ($type) {
            case 'user':
                echo json_encode($userM->getUsers(1, $_SESSION['tournament_id']));
                break;
            case 'player':
                echo json_encode($userM->getPlayers($_SESSION['tournament_id']));
                break;
            default:

                break;
        }
    }
}
