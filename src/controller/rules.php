<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    header('Location: ../../index.php?page=home');
    exit;
}

require_once './src/views/rules.phtml';
