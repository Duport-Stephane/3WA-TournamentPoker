<?php
// Importer le nécessaire

use Models\Role;

// var_dump($_POST);
// var_dump($_GET);

$userM = new \Models\User;

// test POST
if (isset($_POST) && !empty($_POST) && isset($_POST['action']) && !empty($_POST['action'])) {

    // Extraction des paramètres passés dans le POST
    // var_dump("POST AJAX LOG");
    extract($_POST);

    // var_dump($_POST);

    try {
        foreach ($_POST as $key => $input) {
            // Traitement des saisies utilisateurs

            var_dump($key . " / " . $input);

            if (empty($input) && $key !== 'lastName' && $key !== 'firstName' && $key !== 'avatar') {
                throw new DomainException("Attention, Le champ $key est vide.");
            } else if (strlen($input) > 32 && $key !== 'avatar') {
                throw new DomainException("Attention, Le texte saisi dépasse les 32 caractères autorisés.");
            } else {
                switch ($key) {
                    case 'nickName':
                        $nickName = htmlentities($input);
                        break;
                    case 'lastName':
                        $lastName = htmlentities($input);
                        break;
                    case 'firstName':
                        $firstName = htmlentities($input);
                        break;
                    case 'email':
                        $mailPattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
                        if (preg_match($mailPattern, $input) !== 1) {
                            throw new DomainException("L'adresse mail n'est pas correcte");
                        }
                        $email = $input;
                        break;
                    case 'password':
                        $passwordPattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/';
                        if (preg_match($passwordPattern, $input) !== 1) {
                            throw new DomainException("Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial");
                        }
                        $password = htmlentities($input);
                        break;
                };
            }
        }

        if ($action === 'update') {
            // Si update, on ne peut pas modifier le mail, donc on le récupère directement dans la session
            $email = \Models\Session::getOffset1_Offset2('user', 'email');
        }

        $user = $userM->getUserByMail($email);

        var_dump($user);

        switch ($action) {
            case 'persist':
            case 'update':
                // on commence par checker le mail qui doit être UNIQUE pour la création (mais pas pour l'update)
                if ($user && $action === 'persist') {
                    throw new DomainException("Attention, L'utilisateur existe déjà !");
                } else {
                    // Donc on peut sauvegarder le USER
                    // Gestion du fichier AVATAR 
                    if (array_key_exists('avatar', $_FILES) && !empty($_FILES['avatar']['name'])) {

                        // On définit le chemin de destination
                        $uploaddir = './asset/images/users/';
                        // On construit le chemin avec un nom UNIQUE de fichier : MD5(microtime + mail)
                        $avatar = $uploaddir . md5(microtime() . $email) . "." . substr($_FILES['avatar']['type'], 6);

                        // move_uploaded_file retourne true si ok => false si KO
                        if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $avatar)) {
                            throw new DomainException("Une erreur est survenue lors du téléchargement de votre photo");
                        }

                        // ***********************************************
                        // si UPDATE de AVATAR, il faut supprimer la photo existante
                        // ***********************************************
                        if (isset($avatar) && !empty($avatar)) {
                            unlink($user['avatar']);
                        }

                    }
                    // Enregistrement du nouvel user
                    if ($action === 'persist') {

                        var_dump('PERSIST ' . $email);
                        // var_dump($password);
                        
                        $password = password_hash($password, PASSWORD_BCRYPT);

                        \Models\Session::setOffset('info', `{$nickname} fait maintenant parti de la liste des utilisateurs.`);
                        
                        // avec AVATAR
                        if (isset($avatar) && !empty($avatar)) {
                            $userM->setUser($nickname, $lastname, $firstname, $email, $password, $avatar);
                        } else {
                            // sans AVATAR
                            // var_dump("Sans AVATAR");
                            // var_dump($password);
                            $userM->setUser($nickname, $lastname, $firstname, $email, $password);
                        }
                        echo `{$nickname} fait maintenant parti de la liste des utilisateurs.`;

                    } else if ($action === 'update') {

                        // var_dump('UPDATE ' . $user['id'] . " / ".$nickName." / ". $lastName." / ". $firstName." / ".$role);
                        // die;

                        \Models\Session::setOffset('info', `Les informations ont bien été mises à jour.`);
                        
                        // Mise à jour du User
                        if (isset($avatar) && !empty($avatar)) {
                            // avec AVATAR
                            $userM->updateUser($user['id'], $nickName, $lastName, $firstName, $avatar);
                        } else {
                            // sans AVATAR
                            $userM->updateUser($user['id'], $nickName, $lastName, $firstName);
                        }
                        echo `Les informations ont bien été mises à jour.`;

                        // \Models\Session::login(
                        //     $user['id'],
                        //     $nickName,
                        //     $firstName,
                        //     $lastName,
                        //     $email,
                        //     $avatar,
                        //     $role
                        // );
                    }
                }
                break;

            case 'auth':

                // var_dump($user ['id']);

                // on commence par checker le mail pour savoir s'il existe en BDD
                if (!($user)) {
                    throw new DomainException("Attention, Cette adresse mail n'est pas reconnue, veuillez la modifier ou vous inscrire.");
                } else {
                    // considère uniquement le password Hashé
                    // compare le $user['password'] hashé avec celui lu dans le champ input $password du form
                    if (!password_verify($password, $user['password'])) {
                        // var_dump("MdP incorrect");
                        throw new DomainException("Le mot de passe n'est pas correct");
                    } else {
                        \Models\Session::login($user['id'], 
                                                $user['nickName'], 
                                                $user['firstName'], 
                                                $user['lastName'], 
                                                $user['email'], 
                                                $user['avatar'], 
                                                $user['role_id']);

                        \Models\Session::setOffset('info', `Vous êtes connecté. Bienvenue, {$user['nickName']} !`);

                        echo $user['id'];
                        header('Location: ./index.php?page=home&action=');
                        die;
                    }
                }
                break;
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();
        die;
    }

    // header('Location: ../controller/layout.php?page=login');

    // Fin POST
}

// test GET
if (isset($_GET) && !empty($_GET)) {

    extract($_GET);

    try {
        if (isset($action) && !empty($action)) {
            \Models\Session::logout();

            echo \Models\Session::isConnected();
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        header('Location: ./index.php?page=login');

        die;
    }
}
