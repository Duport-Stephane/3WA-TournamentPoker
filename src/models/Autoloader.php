<?php

class Autoloader
{

    static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    static function autoload($class)
    {
        $class = str_replace('appDS\\models\\', '', $class);
        $class = str_replace('\\', '/', $class);
        var_dump($class);
        require './src/models/' . $class . '.php';
    }
}
