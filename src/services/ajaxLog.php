<?php
// Importer le nécessaire

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

            // var_dump($key . " / " . $input);

            if (empty($input) && $key !== 'lastname' && $key !== 'firstname' && $key !== 'avatar') {
                throw new DomainException("Attention, Le champ $key est vide.");
            } else if (strlen($input) > 30 && $key !== 'avatar') {
                throw new DomainException("Attention, Le texte saisi dépasse les 30 caractères autorisés.");
            } else {
                switch ($key) {
                    case 'nickname':
                        $nickname = htmlentities($input);
                        break;
                    case 'lastname':
                        $lastname = htmlentities($input);
                        break;
                    case 'firstname':
                        $firstname = htmlentities($input);
                        break;
                    case 'email':
                        $mailPattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
                        if (preg_match($mailPattern, $input) !== 1) {
                            throw new DomainException("L'adresse mail n'est pas correcte");
                        }
                        $email = $input;
                        break;
                    case 'password':
                        $passwordPattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/';
                        if (preg_match($passwordPattern, $input) !== 1) {
                            throw new DomainException("Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial");
                        }
                        $password = htmlentities($input);
                        break;
                };
            }
        }

        $user = $userM->getUserByMail($email);

        switch ($action) {
            case 'persist':
                // on commence par checker le mail qui doit être UNIQUE 
                if ($user) {
                    throw new DomainException("Attention, L'utilisateur existe déjà !");
                } else {
                    // Donc on peut sauvegarder le USER
                    // Gestion du fichier AVATAR 
                    if (array_key_exists('avatar', $_FILES) && !empty($_FILES['avatar']['name'])) {

                        // On définit le chemin de destination
                        $uploaddir = '../../asset/images/users/';
                        // On construit le chemin avec un nom UNIQUE de fichier : MD5(microtime + mail)
                        $avatar = $uploaddir . md5(microtime() . $email) . "." . substr($_FILES['avatar']['type'], 6);

                        // move_uploaded_file retourne true si ok => false si KO
                        if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $avatar)) {
                            throw new DomainException("Une erreur est survenue lors du téléchargement de votre photo");
                        }
                    }
                    // Enregistrement du nouvel user
                    // avec AVATAR
                    if (isset($avatar) && !empty($avatar)) {

                        // var_dump($avatar);

                        $password = password_hash($password, PASSWORD_BCRYPT);

                        echo $userM->setUser($nickname, $lastname, $firstname, $email, $password, $avatar);
                    } else {
                        // sans AVATAR

                        // var_dump("Sans AVATAR");

                        echo $userM->setUser($nickname, $lastname, $firstname, $email, $password);
                    }
                    \Models\Session::setOffset('info', `{$nickname} fait maintenant parti de la liste des utilisateurs.`);
                    echo `{$nickname} fait maintenant parti de la liste des utilisateurs.`;
                }
                break;

            case 'comparePWD':
                // on commence par checker le mail pour savoir s'il existe en BDD
                if (!($user)) {
                    throw new DomainException("Attention, Cette adresse mail n'est pas reconnue, veuillez la modifier ou vous inscrire.");
                } else {
                    // considère uniquement le password Hashé
                    // compare le $user['password'] hashé avec celui lu dans le champ input $password du form
                    if (!password_verify($password, $user['password'])) {
                        // var_dump("MdP incorrect");

                        throw new DomainException("Le mot de passe n'est pas correct");
                    }
                }
                break;

            case 'auth':
                \Models\Session::login($user['id'], $user['nickName'], $user['firstName'], $user['lastName'], $user['email'], $user['avatar'], $user['role_id']);

                \Models\Session::setOffset('info', `Vous êtes connecté. Bienvenue, {$user['nickName']} !`);

                // var_dump(\Models\Session::getUserEmail());

                // echo 'OK';
                echo \Models\Session::isConnected();
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
