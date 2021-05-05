
<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once '../views/partials/head.phtml'; ?>
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