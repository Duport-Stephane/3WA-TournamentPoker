<?php
declare(strict_types=1);

namespace Models;

class User extends \Database
{
    protected string $nickName;
    protected string $firstName;
    protected string $lastName;
    protected string $email;
    protected string $password;
    protected string $avatar;
    protected int $role_id;
    protected int $dependUser_id;

    /**
     * Test if id exist in table
     * @param int user_id
     */
    public function isIdExist(int $user_id)
    {
        $query = 'SELECT id
                    FROM user
                    WHERE id = :user_id';
        $param = [
            ':user_id' => $user_id
        ];
        return $this->findOne($query, $param);
    }

    /**
     * Get Users
     * ????????? param integer role_id 1 pour admin ?????
     * @param integer dependUser_id
     * @param integer tournament_id
     *
     * @return array
     */
    // pour retourner l'ensemble des joueurs USER ou USER/ADMIN (mais pas admin seul)
    // La sous requête dans le NOT EXISTS permet de ne pas prendre les joueurs DEJA validés pour le tournoi actuel

    public function getUsers(int $tournament_id): array
    {
        try {
            $query = 'SELECT user.id, nickName, firstName, lastName, avatar, role_id
                FROM user
                WHERE role_id != :role_id
                -- AND dependUser_id = :dependUser_id
                AND NOT EXISTS 
                    (
                    SELECT user_id, tournament_id 
                    FROM player
                    WHERE user_id = user.id 
                    AND tournament_id = :tournament_id
                    )
                ORDER BY nickName';
            $param = [
                ':role_id'          => 1,                   // Admin
                // ':dependUser_id'    => $dependUser_id,
                ':tournament_id'    => $tournament_id
            ];

            $users = $this->findAll($query, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }
        return $users ?? [];
    }


    /**
     * pour retourner le nom du user passé en paramètre
     * @param integer user_id
     *
     * @return string Name of the user
     */ 
    public function getNicknameById(int $user_id): string
    {
        try {
            $sql = 'SELECT user.id, nickName
                FROM user
                INNER JOIN player ON user.id = :user_id';
            $param = [
                ':user_id' => $user_id
            ];

            $nickName = $this->findOne($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }

        return $nickName['nickName'];
    }

    /**
     * pour retourner les infos du user à partir de son email (unique)
     * @param {string} user_mail
     *
     * @return {array} info of the user
     */
    public function getUserByMail(string $user_email)
    {
        
        // var_dump($user_email);

        try {
            $sql = 'SELECT id, nickName, firstName, lastName, email, password, avatar, role_id, dependUser_id, created_at
            FROM user 
            WHERE email = :user_email';
            $param = [
                ':user_email' => $user_email
            ];

            $user = $this->findOne($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }

        // var_dump($user);

        return $user;
    }


    /**
     * Pour créer un user dans la BDD
     * @param {string} $nickname
     * @param {string} $lastname
     * @param {string} $firstname
     * @param {string} $email
     * @param {string} $pwd
     * @param {string} $avatar
     *  
     * @return string | null
     */
    public function setUser(string $nickname, string $lastname, string $firstname, string $email, string $password, string $avatar = "") : string
    {
        var_dump("insert into USER");

        try {
            $sql = 'INSERT INTO user(nickName, lastName, firstName, email, password, avatar, role_id) 
            VALUES (:nickname, :lastname, :firstname, :email, :password, :avatar, :role_id)';
            $param = [
                ':nickname'     => $nickname,
                ':lastname'     => $lastname,
                ':firstname'    => $firstname,
                ':email'        => $email,
                ':password'     => $password,
                ':avatar'       => $avatar,
                ':role_id'      => 2            // user
            ];
            $this->executeSql($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }
        return $this->_instance->lastInsertId();
    }
}
