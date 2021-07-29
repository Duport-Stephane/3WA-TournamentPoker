<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    header('Location: ./index.php?page=home');
    die;
}

require_once './src/views/login.phtml';
