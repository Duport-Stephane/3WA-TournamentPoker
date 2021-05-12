<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once './src/views/partials/head.phtml'; ?>
</head>

<body>

    <header>
        <?php require_once './src/views/partials/header.phtml'; ?>
    </header>

    <main class='container'>

        <?php require_once './src/views/' . $page . '.phtml' ?>

        <?php if (Session::isOffsetExists('info') && !empty(Session::getOffset('info'))) : ?>
            <div id="notif" class="message alert alert-info">
                <p><?= Session::getOffset('info') ?></p>
            </div>
        <?php endif; ?>

    </main>

    <footer class='headband'>
        <?php require_once './src/views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='./asset/js/app.js'></script>

</body>

</html>