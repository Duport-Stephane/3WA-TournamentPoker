<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once './src/views/partials/head.phtml'; ?>
</head>

<body>

    <header>
        <?php if ($page !== 'game') : { ?>
                <?php require_once './src/views/partials/header.phtml'; ?>
        <?php } else : { ?>
            <h1 class="headband">
                <?php $tournament = new \Models\Tournament ?>
                <?= $tournament->getTournamentName(1) ?>
            </h1>
        <?php }
        endif; ?>
    </header>

    <main class='container'>

        <div class="message">
            <?php require_once './src/views/partials/message.phtml'; ?>
        </div>

        <?php require_once './src/controller/' . $page . '.php' ?>

    </main>

    <footer class='headband'>
        <?php require_once './src/views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='./asset/js/app.js'></script>

</body>

</html>