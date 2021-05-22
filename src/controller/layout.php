<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once './src/views/partials/head.phtml'; ?>
</head>

<body>

    <header>
        <?php require_once './src/views/partials/header.phtml'; ?>

        <!-- <?= var_dump($page); ?> -->
        <!-- <?= var_dump(\appDS\models\Session::getAllSession()) ?> -->

        <?php if (\appDS\models\Session::isOffsetExists('user')) : { ?>
                <?= var_dump(\appDS\models\Session::getOffset('user')); ?>
        <?php }
        endif; ?>

    </header>

    <main class='container'>

        <?php //require_once './src/views/' . $page . '.phtml' ?>
        <?php require_once './src/controller/' . $page . '.php' ?>

        <div class="message"></div>
        <!-- <?php if (\appDS\models\Session::isOffsetExists('info') && !empty(\appDS\models\Session::getOffset('info'))) : ?>
            <div id="notif" class="message alert alert-info">
                <p><?= \appDS\models\Session::getOffset('info') ?></p>
            </div>
        <?php endif; ?>

        <?php if (\appDS\models\Session::isOffsetExists('alert') && !empty(\appDS\models\Session::getOffset('alert'))) : ?>
            <div class="message alert alert-alert">
                <p><?= \appDS\models\Session::getOffset('alert') ?></p>
            </div>
        <?php endif; ?> -->

    </main>

    <footer class='headband'>
        <?php require_once './src/views/partials/footer.phtml'; ?>
    </footer>

    <script type='module' src='./asset/js/app.js'></script>

</body>

</html>