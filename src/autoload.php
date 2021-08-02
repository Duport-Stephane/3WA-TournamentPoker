<?php

    spl_autoload_register(function ($className) {
        $className = str_replace('Models\\', 'models/', $className);
        require_once  './src/' . $className . '.php';
    });
