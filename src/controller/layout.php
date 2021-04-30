<?php
// var_dump($_GET);

?>


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="L'application 3W Tournament Poker permet de gérer une partie, un tournoi ou même un championnat de poker Texas Hold'hem. Créer votre partie en quelques clics, enregistrer les joueurs et lancer le chronomètre... Shuffle Up and Deal !">
    <title>3W Tournament Poker</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <link rel="stylesheet" href="../../asset/css/normalize.css" />
    <link rel="stylesheet" href="../../asset/css/style.css">

    <link rel="shortcut icon" href="../../asset/images/logo.ico">

</head>

<body class='fond-Page'>

    <header>
        <?php require_once '../views/partials/header.phtml'; ?>
    </header>

    <main class='container'>
        <?php require '../views/' . $_GET['page'] . '.phtml' ?>
    </main>

    <footer class='headband'>
        <?php require_once '../views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='../../asset/js/app.js'></script>

</body>

</html>