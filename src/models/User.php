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
     * Find all Users in array, order by $sort and with $findText caractere in nickName
     *
     * @return array
     */

    public function getAllUsers(): array
    {
        try {
            $query = 'SELECT user.id, nickName, firstName, lastName, avatar, role_id, created_at
                FROM user
                ORDER BY nickName';
            $param = [
            ];

            $users = $this->findAll($query, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }
        return $users ?? [];
    }

    /**
     * Get players in tournament (only user)
     * @param integer tournament_id
     *
     * @return array
     */
    // NOT EXISTS : only players not yet in this tournament

    public function getUsers(int $tournament_id): array
    {
        try {
            $query = 'SELECT user.id, nickName, firstName, lastName, avatar, role_id, created_at
                FROM user
                WHERE role_id != :role_id
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
     * Get nickName of user with this id
     * @param integer user_id
     *
     * @return string Name of the user
     */
    public function getNickNameById(int $user_id): string
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
     * Get user info by unique mail
     * @param string user_mail
     *
     * @return array
     */
    public function getUserByMail(string $user_email)
    {
        try {
            $sql = 'SELECT id, nickName, firstName, lastName, email, password, avatar, role_id, created_at
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
     * Create new user in database
     * @param string $nickName
     * @param string $firstName
     * @param string $lastName
     * @param string $email
     * @param string $pwd
     * @param string $avatar
     *  
     * @return string | null
     */
    public function setUser(string $nickName, string $firstName, string $lastName, string $email, string $password, int $role_id, string $avatar = ""): string
    {                        
        // var_dump("PHP SET USER /pseudo= " . $nickName . " /prenom= " . $firstName . " /nom= " . $lastName . " /mail= " . $email . " /role_id= " . $role_id . " /avatar= " . $avatar);
        // die;

        try {
            $sql = 'INSERT INTO user(nickName, firstName, lastName, email, password, role_id, avatar) 
            VALUES (:nickName, :firstName, :lastName, :email, :password, :role_id, :avatar)';
            $param = [
                ':nickName'     => $nickName,
                ':firstName'    => $firstName,
                ':lastName'     => $lastName,
                ':email'        => $email,
                ':password'     => $password,
                ':role_id'      => $role_id,
                ':avatar'       => $avatar
            ];
            $this->executeSql($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }
        return $this->_instance->lastInsertId();
    }


    /**
     * Update user in database
     * @param string  $nickName
     * @param string  $firstName
     * @param string  $lastName
     * @param int     $role
     * @param string  $avatar
     *  
     * @return string
     */
    public function updateUser(int $user_id, string $nickName, string $firstName, string $lastName, int $role_id, string $avatar = ""): void
    {
        try {
            $sql = 'UPDATE user SET nickName = :nickName, firstName = :firstName, lastName = :lastName, role_id = :role_id, avatar = :avatar
            WHERE id = :user_id';

            $param = [
                ':user_id'      => $user_id,
                ':nickName'     => $nickName,
                ':firstName'    => $firstName,
                ':lastName'     => $lastName,
                ':role_id'      => $role_id,
                ':avatar'       => $avatar
            ];
            $this->executeSql($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }
    }


    /**
     * Delete user
     * @param int user_id
     */
    public function delUser(int $user_id)
    {
        try {
            $sql = 'DELETE FROM user
                    WHERE id = :user_id';
            $param = [
                ':user_id' => $user_id
            ];
            $this->executeSql($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        };
    }
}
