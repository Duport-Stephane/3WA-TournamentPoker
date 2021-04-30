<?php

// Appels de dépendances
require '../services/utils.php';
// Mise à disposition de la session
require '../services/session.php';
// Appel de la connexion à la bdd
require '../services/database.php';

// var_dump($_GET);
// var_dump($_SERVER);
// var_dump($_SESSION);
// die;

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    var_dump('PLAYER.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ../index.php');
    exit;
}

// 1 er chargement de la page 'Player'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // var_dump('PLAYER.PHP en GET');

    try {
        $pdo = new Database;
        $sql = 'SELECT id, nickName, firstName, lastName, avatar FROM user';
        $posts = $pdo->findAll($sql);

        $_SESSION['posts'] = $posts;

    } catch (PDOException $e) {
        echo $e->getMessage();
        die;
    }
}

header('location: ../controller/layout.php?page=players');