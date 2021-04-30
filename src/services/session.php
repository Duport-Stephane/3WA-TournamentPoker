<?php

// Init Session
if (session_status() === PHP_SESSION_NONE) {
    // start
    session_start();
}

// declare(strict_types=1);
// 
// class Session
// {
//     public static function init(): void
//     {
//         // test if session exists or not
//         if (session_status() === PHP_SESSION_NONE) {
//             session_start();
//         }
//     }

//     public static function login(...$params): void
//     {
//         $_SESSION['user']['id']     = $params[0]['id'];
//         $_SESSION['user']['nickName']   = $params[0]['nickName'];
//         $_SESSION['user']['email']  = $params[0]['email'];
//     }

//     public static function status()
//     {
//         return self::init();
//     }

//     public static function logout(): void
//     {
//         if (!empty($_SESSION)) {
//             unset($_SESSION);
//             session_destroy();
//         }
//     }

//     public static function isConnected(): bool
//     {
//         return !empty($_SESSION['user']['name']) ? true : false;
//     }

//     /**
//      * TODO Error
//      */
//     public static function getUserConnected(): string
//     {
//         return self::isConnected() ? $_SESSION['user']['name'] : 'Vous n\'êtes pas encore connecté !!! ';
//     }
// }
