<?php

// Mise à disposition de la session
require_once '../services/session.php';

// Actions : Traitement (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    var_dump('regles.PHP en POST');

    // Si pas de param, je repars à l'accueil
    header('Location: ../index.php');
    exit;
}

// 1 er chargement de la page 'BONUS = CANVAS'
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    var_dump('regles.PHP en GET');

}

header('location: ../controller/layout.php?page=regles');
