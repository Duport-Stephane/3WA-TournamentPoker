<?php
// Importer le nécessaire
// Appel de la classe User
require_once '../models/User.php';

$userM = new User;

// var_dump($_GET);
// var_dump($_POST);

// test POST
if (isset($_POST) && !empty($_POST) && isset($_POST['action']) && !empty($_POST['action'])) {

    // Extraction des paramètres passés dans le POST
    var_dump("POST AJAX LOG");
    extract($_POST);
    // var_dump($_POST);

    try {
        foreach ($_POST as $key => $input) {

            // var_dump($key . " / " . $input);

            if (empty($input) && $key !== 'lastname' && $key !== 'firstname' && $key !== 'avatar') {
                throw new DomainException("Attention, Le champ $key est vide.");
            } else if (strlen($input) > 30 && $key !== 'avatar') {
                throw new DomainException("Attention, Le texte saisi est trop long.");
            } else {
                switch ($key) {
                    case 'nickname':
                        $nickname = htmlspecialchars($input);
                        break;
                    case 'lastname':
                            $lastname = htmlspecialchars($input);
                        break;
                    case 'firstname':
                            $firstname = htmlspecialchars($input);
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
                            throw new DomainException("Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et un caractère spécial");
                        }
                        $password = $input;
                        break;
                };
            }
        }
        
        if ($action === 'insert') {
            // on commence par checker le mail qui doit être UNIQUE 
            if ($userM->getUserByMail($email)) {
                throw new DomainException("Attention, L'utilisateur existe déjà !");
            } else {
            // Donc on peut sauvegarder le USER
                // Gestion du fichier AVATAR 
                if (array_key_exists('avatar', $_FILES) && !empty($_FILES['avatar']['name'])) {
        
                    // On définit le chemin de destination
                    $uploaddir = '../../asset/images/user/'; 
                    // On construit le chemin avec un nom UNIQUE de fichier : MD5(microtime + mail)
                    $avatar = $uploaddir . md5(microtime() . $email). "." . substr($_FILES['avatar']['type'],6); 

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
                // echo "La création du USER s'est bien pasée !";
            }
        }

        if ($action === 'auth') {
            // récupère les infos du user en BDD à partir de son adresse mail
            // considère uniquement le password
            // compare ce password avec celui lu dans le champ input $password du form
            if (!password_verify($password, $userM->getUserByMail($email)['password'])) {
                throw new DomainException("Le mot de passe n'est pas correct");
            // } else {
            //     echo "OK";
            };
        };
    } catch (DomainException | PDOException $e) {
        echo $e->getMessage();
        die;
    }

    // header('Location: ../controller/layout.php?page=login');

    // Fin POST
}

// test GET
if (isset($_GET) && !empty($_GET)) {

    extract($_GET);

    if (isset($email) && !empty($email)) {
        try {
            // echo "GET AJAX LOG : $email";
            echo $userM->getUserByMail($email)['email'];
        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }
    }
}
