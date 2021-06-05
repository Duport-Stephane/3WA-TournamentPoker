<?php
declare(strict_types=1);

namespace Models;

class Role extends \Database
{
    protected int $id;
    protected int $roleName;

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of roleName
     */
    public function getRoleName()
    {
        return $this->roleName;
    }

    /**
     * Set the value of roleName
     *
     * @return  self
     */
    public function setRoleName($roleName)
    {
        $this->roleName = $roleName;

        return $this;
    }

    /**
     * Get roleName by id
     */

    public function getRoleNameById ($role_id) 
    {
        $query = "SELECT id, roleName 
        FROM role 
        WHERE id = :role_id";
        $param = [
            ':role_id' => $role_id
        ];
        return $this->findOne($query, $param);
    }

    /**
     *  Insert into Role
     * @param int user_id
     * @param int tournament_id
     */
    // public function insertPlayer (int $user_id, int $tournament_id){
    //     $query = "INSERT INTO player (user_id, tournament_id) 
    //                 VALUES (:user_id, :tournament_id)";
    //     $param = [
    //         ':user_id'          => $user_id,
    //         ':tournament_id'    => $tournament_id
    //     ];
    //     return $this->executeSql($query, $param);
    // }

    /**
     *  Delete from Role
     * @param int role_id
     */
    // public function deletePlayer(int $user_id, int $tournament_id)
    // {
    //     $query = "DELETE FROM player 
    //                 WHERE user_id = :user_id
    //                 AND tournament_id = :tournament_id";
    //     $param = [
    //         ':user_id'          => $user_id,
    //         ':tournament_id'    => $tournament_id
    //     ];
    //     return $this->executeSql($query, $param);
    // }
}