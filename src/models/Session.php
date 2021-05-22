<?php
declare(strict_types=1);

namespace appDS\models;

// // Init Session
// if (session_status() === PHP_SESSION_NONE) {
//     // start
//     session_start();
// }


class Session
{
    public static function init(): void
    {
        // test if session exists or not
        // if (session_status() === PHP_SESSION_NONE) {
        session_start();
        // }
    }

    public static function login(int $id, string $pseudo, string $prenom, string $nom, string $email, string $avatar, int $role_id): void
    {
        $_SESSION['user'] = [
            'id'        => $id,
            'pseudo'    => $pseudo,
            'prenom'    => $prenom,
            'nom'       => $nom,
            'email'     => $email,
            'avatar'    => $avatar,
            'role_id'   => $role_id
        ];
        // var_dump($_SESSION['user']['email']);
    }

    public static function logout(): void
    {
        if (!empty($_SESSION)) {
            unset($_SESSION);
            session_destroy();
        }
    }

    public static function isConnected(): bool
    {
        return !empty($_SESSION['user']['email']) ? true : false;
    }

    public static function getOffset($offset): string
    {
        return implode(',' , $_SESSION[$offset]);
    }

    public static function setOffset($offset, $value)
    {
        $_SESSION[$offset] = $value;
    }

    public static function isOffsetExists($offset)
    {
        return isset($_SESSION[$offset]);
    }

    public static function unsetOffset($offset)
    {
        if (isset($_SESSION[$offset])) {
            unset($_SESSION[$offset]);
        }
    }

    public static function getAllSession()
    {
        return $_SESSION;
    }

}
