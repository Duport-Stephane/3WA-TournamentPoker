<?php

$userM = new \Models\User;

if (isset($_POST) && !empty($_POST) && isset($_POST['action']) && !empty($_POST['action'])) {

    extract($_POST);
    
    try {
        foreach ($_POST as $key => $input) {

            if (empty($input) && $key !== 'lastName' && $key !== 'firstName' && $key !== 'avatar') {
                throw new DomainException("Le champ $key est vide.");
            } else if (strlen($input) > 32 && $key !== 'avatar') {
                throw new DomainException("Le texte saisi dépasse les 32 caractères autorisés.");
            } else {
                switch ($key) {
                    case 'nickname':
                        $nickName = htmlentities($input);
                        break;
                    case 'firstname':
                        $firstName = htmlentities($input);
                        break;
                    case 'lastname':
                        $lastName = htmlentities($input);
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
                    case 'avatar':
                        $avatar = htmlentities($input);
                        break;
                    case 'role':
                        if ($input !== '') {
                            $role_id = intval($input);
                        } else {
                            $role_id = 2;
                        }
                        break;
                };
            }
        }

        if ($action === 'updateUser' || $action === 'updateAdmin' || $action === 'logout') {
            // if updateUser || updateAdmin, we can not modify the mail, so we get directly from Session
            $email = \Models\Session::getOffset1_Offset2('user', 'email');
        }

        $user = $userM->getUserByMail($email);

        switch ($action) {
            case 'persist':
            case 'updateUser':
            case 'updateAdmin':
                // We start by check the mail, who must be UNIQUE, to create (not used if updateUser || updateAdmin)
                if ($user && $action === 'persist') {
                    throw new DomainException("Attention, L'utilisateur existe déjà !");
                } else {
                    // Persist USER || ADMIN

                    // if AVATAR 
                    if (array_key_exists('avatar', $_FILES) && !empty($_FILES['avatar']['name'])) {

                        // file dir
                        $uploaddir = './asset/images/users/';
                        // unique name : MD5(microtime + mail)
                        $avatar = $uploaddir . md5(microtime() . $email) . "." . substr($_FILES['avatar']['type'], 6);

                        // move_uploaded_file return true if it's ok => false otherwise
                        if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $avatar)) {
                            throw new DomainException("Une erreur est survenue lors du téléchargement de votre photo");
                        }

                        // ***********************************************
                        // if UPDATE AVATAR, DELETE old picture
                        // ***********************************************
                        if (isset($avatar) && !empty($avatar)) {
                            unlink($user['avatar']);
                        }
                    } else {
                        // if no name in avatar input, we verify into database to get this, if exists
                        if (\Models\Session::getOffset1_Offset2('user', 'avatar') !== "") {
                            $avatar = \Models\Session::getOffset1_Offset2('user', 'avatar');
                        } else {
                            $avatar = "";
                        }
                    }

                    if (!isset($role_id) || $role_id === "") {
                        // It's at least USER : role_id=2
                        $role_id = 2;
                    }

                    if ($action === 'persist') {
                        
                        $password = password_hash($password, PASSWORD_BCRYPT);

                        \Models\Session::setOffset('info', `{$nickname} fait maintenant parti de la liste des utilisateurs.`);

                        $userM->setUser($nickname, $firstname, $lastname, $email, $password, $role_id, $avatar);

                        echo `{$nickname} fait maintenant parti de la liste des utilisateurs.`;
                    } else {

                        \Models\Session::setOffset('info', `Les informations ont bien été mises à jour.`);

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

                // We verify mail into database
                if (!($user)) {
                    throw new DomainException("Cette adresse mail n'est pas reconnue, veuillez la modifier ou vous inscrire.");
                } else {
                    // Looking only hashed password
                    // compare $user['password'] hashed with input one of form
                    if (!password_verify($password, $user['password'])) {
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
}

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
