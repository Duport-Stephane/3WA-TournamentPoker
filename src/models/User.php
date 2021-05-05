<?php

declare(strict_types=1);

// Appel de la connexion à la bdd
require_once '../services/database.php';

class User extends Database
{
    protected string $nickName;
    protected string $firstName;
    protected string $lastName;
    protected string $email;
    protected string $password;
    protected string $avatar;
    protected int $role_id;
    protected int $dependUser_id;
    // protected PDO $_instance;

    // public function __construct()
    // {
    //     $_instance = new Database;
    // }

    /**
     * Get Users
     * ????????? param integer role_id 1 pour admin ?????
     * @param integer dependUser_id
     * @param integer tournament_id
     *
     * @return array
     */
    // pour retourner l'ensemble des joueurs USER ou USER/ADMIN (mais pas admin seul)
    // La requête dans le NOT EXISTS permet de ne pas prendre les joueurs DEJA validés pour le tournoi actuel

    public function getUsers(int $dependUser_id, int $tournament_id): array
    {
        try {
            $sql = 'SELECT user.id, nickName, firstName, lastName, avatar, role_id, dependUser_id 
                FROM user
                WHERE role_id != :role_id
                AND dependUser_id = :dependUser_id
                AND NOT EXISTS 
                    (
                    SELECT user_id, tournament_id 
                    FROM player
                    WHERE user_id = user.id 
                    AND tournament_id = :tournament_id
                    )
                ORDER BY nickName';
            $param = [
                ':role_id'          => 1,
                ':dependUser_id'    => $dependUser_id,
                ':tournament_id'    => $tournament_id
            ];

            $users = $this->findAll($sql, $param);
        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }

        return $users ?? [];
    }


    /**
     * Get Players
     * @param integer tournament_id
     *
     * @return array
     */
    // pour retourner l'ensemble des joueurs VALIDES dans la table PLAYER
    // pour CE tournoi $_SESSION['tournament']

    public function getPlayers(int $tournament_id): array
    {
        try {
            $sql = 'SELECT user.id, nickName, firstName, lastName, user.avatar 
                FROM user
                INNER JOIN player ON user_id = user.id
                INNER JOIN tournament ON tournament_id = :tournament_id
                ORDER BY nickName';
            $param = [
                ':tournament_id' => $tournament_id
            ];

            $players = $this->findAll($sql, $param);
        } catch (DomainException $e) {
            echo $e->getMessage();
            die;
        }

        return $players ?? [];
    }
}
