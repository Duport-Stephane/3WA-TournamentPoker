<?php

var_dump($_POST);
var_dump($_GET);

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
            
            var_dump("avant " . $key . " = " . $input);
            
            if (empty($input) && $key !== 'lastName' && $key !== 'firstName' && $key !== 'avatar') {
                throw new DomainException("Le champ $key est vide.");
            } else if (strlen($input) > 32 && $key !== 'avatar') {
                throw new DomainException("Le texte saisi dépasse les 32 caractères autorisés.");
            } else {
                switch ($key) {
                    case 'nickname':
                        $nickName = htmlentities($input);
                        var_dump("apres " . $key . " = " . $nickName);
                        break;
                    case 'firstname':
                        $firstName = htmlentities($input);
                        var_dump("apres " . $key . " = " . $firstName);
                        break;
                    case 'lastname':
                        $lastName = htmlentities($input);
                        var_dump("apres " . $key . " = " . $lastName);
                        break;
                    case 'email':
                        $mailPattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
                        if (preg_match($mailPattern, $input) !== 1) {
                            throw new DomainException("L'adresse mail n'est pas correcte");
                        }
                        $email = $input;
                        var_dump("apres " . $key . " = " . $email);
                        break;
                    case 'password':
                        $passwordPattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/';
                        if (preg_match($passwordPattern, $input) !== 1) {
                            throw new DomainException("Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial");
                        }
                        $password = htmlentities($input);
                        var_dump("apres " . $key . " = " . $password);
                        break;
                    case 'avatar':
                        $avatar = htmlentities($input);
                        var_dump("apres " . $key . " = " . $avatar);
                        break;
                    case 'role':

                        // var_dump($input);

                        if ($input !== '') {
                            $role_id = intval($input);
                        } else {
                            $role_id = 2;
                        }
                        var_dump("apres " . $key . " = " . $role_id);
                        break;
                };
            }
        }

        if ($action === 'updateUser' || $action === 'updateAdmin' || $action === 'logout') {
            // Si updateUser || updateAdmin, on ne peut pas modifier le mail, donc on le récupère directement dans la session
            $email = \Models\Session::getOffset1_Offset2('user', 'email');
        }

        $user = $userM->getUserByMail($email);

        var_dump($user);

        switch ($action) {
            case 'persist':
            case 'updateUser':
            case 'updateAdmin':
                // on commence par checker le mail qui doit être UNIQUE pour la création (mais pas utilisé si updateUser || updateAdmin)
                if ($user && $action === 'persist') {
                    throw new DomainException("Attention, L'utilisateur existe déjà !");
                } else {
                    // Donc on peut sauvegarder le USER || ADMIN

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
                    } else {
                        // S'il n'y a pas de nom de fichier dans l'input avatar, on vérifie qu'il n'existe pas déjà un visuel en BdD pour le reprendre
                        if (\Models\Session::getOffset1_Offset2('user', 'avatar') !== "") {
                            $avatar = \Models\Session::getOffset1_Offset2('user', 'avatar');
                        } else {
                            $avatar = "";
                        }
                    }

                    // var_dump($role_id);

                    if (!isset($role_id) || $role_id === "") {
                        // c'est au moins un USER : role_id=2
                        $role_id = 2;
                    }

                    var_dump($role_id);
                    
                    // Enregistrement du nouvel user
                    if ($action === 'persist') {
                        
                        // var_dump("PERSIST /pseudo= " . $nickName . " /prenom= " . $firstName . " /nom= " . $lastName . " /mail= " . $email . " /role_id= " . $role_id . " /avatar= " . $avatar);
                        // die;

                        $password = password_hash($password, PASSWORD_BCRYPT);

                        \Models\Session::setOffset('info', `{$nickname} fait maintenant parti de la liste des utilisateurs.`);

                        // avec AVATAR
                        // if (isset($avatar) && !empty($avatar)) {
                            $userM->setUser($nickname, $firstname, $lastname, $email, $password, $role_id, $avatar);
                        //} else {
                            // sans AVATAR
                            // var_dump("Sans AVATAR");
                            // var_dump($password);
                        //    $userM->setUser($nickname, $firstname, $lastname, $email, $password, $role_id);
                        //}
                        echo `{$nickname} fait maintenant parti de la liste des utilisateurs.`;
                    } else {
                        var_dump(\Models\Session::getOffset('user'));
                        // die;

                        \Models\Session::setOffset('info', `Les informations ont bien été mises à jour.`);

                        // Mise à jour du User
                        //if (isset($avatar) && !empty($avatar)) {
                            // avec AVATAR

                            // var_dump('UPDATE ' . $user['id'] . " /pseudo= " . $nickName . " /prenom= " . $firstName . " /nom= " . $lastName . " /mail= " . $email . " /role_id= " . $role_id . " /avatar= " . $avatar);
                            // die;

                            // Persit update info in Log Session
                            \Models\Session::login(
                                $user['id'],
                                $nickName,
                                $firstName,
                                $lastName,
                                $email,
                                $role_id,
                                $avatar
                            );

                            $userM->updateUser($user['id'], $nickName, $firstName, $lastName, $role_id, $avatar);
                        //} else {
                            // sans AVATAR

                        //    var_dump('UPDATE ' . $user['id'] . " /pseudo= " . $nickName . " /prenom= " . $firstName . " /nom= " . $lastName . " /mail= " . $email . " /role_id= " . $role_id );
                            // die;

                            // Persit update info in Log Session
                            // \Models\Session::login(
                            //     $user['id'],
                            //     $nickName,
                            //     $firstName,
                            //     $lastName,
                            //     $email,
                            //     $role_id,
                            //     ""
                            // );

                            // $userM->updateUser($user['id'], $nickName, $firstName, $lastName, $role_id);
                        // }
                        echo `Les informations ont bien été mises à jour.`;
                        if ($action === 'updateUser') {
                            header('Location: ./index.php?page=dashboardUser');
                        } else {
                            header('Location: ./index.php?page=dashboardAdmin');
                        }
                        die;
                    }
                }
                break;

            case 'auth':

                // var_dump($user ['id']);

                // on commence par checker le mail pour savoir s'il existe en BDD
                if (!($user)) {
                    throw new DomainException("Cette adresse mail n'est pas reconnue, veuillez la modifier ou vous inscrire.");
                } else {
                    // considère uniquement le password Hashé
                    // compare le $user['password'] hashé avec celui lu dans le champ input $password du form
                    if (!password_verify($password, $user['password'])) {
                        // var_dump("MdP incorrect");
                        throw new DomainException("Le mot de passe n'est pas correct");
                    } else {
                        \Models\Session::login(
                            $user['id'],
                            htmlentities($user['nickName']),
                            htmlentities($user['firstName']),
                            htmlentities($user['lastName']),
                            $user['email'],
                            $user['role_id'],
                            $user['avatar']
                        );

                        \Models\Session::setOffset('info', `Vous êtes connecté. Bienvenue, {$user['nickName']} !`);

                        echo $user['id'];
                        header('Location: ./index.php?page=home&action=null');
                        die;
                    }
                }
                break;

            case 'logout':
                if (\Models\Session::isConnected()) {
                    \Models\Session::logout();
                    \Models\Session::setOffset('info', 'Vous êtes déconnecté.');
                    echo 'Vous êtes déconnecté.';
                    header('Location: ./index.php?page=home&action=null');
                    die;
                }
                break;
        }
    } catch (DomainException $e) {
        \Models\Session::setOffset('alert', $e->getMessage());
        echo $e->getMessage();

        if ($e->getCode() === 404) {
            header('Location: ./index.php?page=404');
        }
        die;
    }

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

        if ($e->getCode() === 404) {
            header('Location: ./index.php?page=404');
        } else {
            header('Location: ./index.php?page=login');
        }
        die;
    }
}
