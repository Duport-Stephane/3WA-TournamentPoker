<?php

    spl_autoload_register(function ($className) {
        $className = str_replace('Models\\', 'models/', $className);
        // $className = str_replace('\\', '/', $className);

        // var_dump($className);

        require_once  './src/' . $className . '.php';
    });
