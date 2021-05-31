<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once './src/views/partials/head.phtml'; ?>
</head>

<body>

    <header>
        <?php if ($page !== 'game') : { ?>
                <?php require_once './src/views/partials/header.phtml'; ?>

                <?php if (\Models\Session::isOffsetExists('user')) : { ?>
                        <?= var_dump(\Models\Session::getUserEmail()); ?>
                <?php }
                endif; ?>
        <?php }
        endif; ?>
    </header>

    <main class='container'>

        <?php require_once './src/controller/' . $page . '.php' ?>

        <div class="message">
            <?php if (\Models\Session::isOffsetExists('info') && !empty(\Models\Session::getOffset('info'))) : ?>
                <p id="notif" class="alert alert-info">
                    <?= \Models\Session::getOffset('info') ?>
                </p>
                <?php \Models\Session::unsetOffset('info'); ?> 
            <?php endif; ?>

            <?php if (\Models\Session::isOffsetExists('alert') && !empty(\Models\Session::getOffset('alert'))) : ?>
                <p class="alert alert-alert">
                    <?= \Models\Session::getOffset('alert') ?>
                </p>
                <?php \Models\Session::unsetOffset('alert'); ?>
            <?php endif; ?>
        </div>

    </main>

    <footer class='headband'>
        <?php require_once './src/views/partials/footer.phtml'; ?>
        <?php if ($page === 'game') : { ?>
                <a href="./index.php?page=home"><img src="./asset/images/carte-R.jpg" alt="home">Accueil</a>
        <?php }
        endif; ?>
    </footer>

    <script type='module' src='./asset/js/app.js'></script>

</body>

</html>