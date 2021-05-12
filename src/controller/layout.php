<?php
// Mise à disposition de la session
require_once '../services/session.php';
// if(isset($_SESSION['info'])) {
//     var_dump($_SESSION['info']);}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once '../views/partials/head.phtml'; ?>

    <label id="theme-switch" class="theme-switch" for="checkbox_theme">
        <input type="checkbox" id="checkbox_theme">
    </label>
    
</head>

<body>

    <header>
        <?php require_once '../views/partials/header.phtml'; ?>
    </header>

    <main class='container'>
        <?php require '../views/' . $_GET['page'] . '.phtml' ?>
        <div class="message">
            <?php require_once '../views/partials/message.phtml'; ?>
        </div>
    </main>

    <footer class='headband'>
        <?php require_once '../views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='../../asset/js/app.js'></script>

</body>

</html>