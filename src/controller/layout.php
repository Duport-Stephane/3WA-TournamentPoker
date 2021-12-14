<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once './src/views/partials/head.phtml'; ?>
</head>

<body>

    <header>
        <?php if ($page !== 'game') : { ?>
                <?php require_once './src/views/partials/header.phtml'; ?>
            <?php }
        else : { ?>
                <h1 class="headband flex-around">
                    <?php $tournament = new \Models\Tournament ?>
                    <?= $tournament->getTournamentName(1) ?>
                    <nav>
                        <a href="./index.php?page=home" class='medium home'>Accueil</a>
                        <a href="./index.php?page=players&action=display" class='medium players'>Joueurs</a>
                        <a href="./index.php?page=tables" class='medium tables'>Tables</a>
                    </nav>
                </h1>
        <?php }
        endif; ?>
    </header>


    <main class='container'>

        <?php require_once './src/controller/' . $page . '.php' ?>

        <div class="message">
            <?php require_once './src/views/partials/message.phtml'; ?>
        </div>

    </main>

    <footer class='headband'>
        <?php require_once './src/views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='./asset/js/app.js'></script>

</body>

</html>