<?php

// var_dump($_GET);
// var_dump($_POST);

// session_start();
// var_dump($_SESSION);

\Models\Session::logout();

// var_dump($_SESSION);
// die;

// Notif -> Message indiquant la déconnexion
// $_SESSION['info'] = "Bon Débaras";

header('Location: ./index.php?page=home');
exit;
