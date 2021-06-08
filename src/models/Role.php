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

    public function getRoleNameById (int $role_id) 
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
     * Get all roleName
     */

    public function getAllRoleName()
    {
        $query = "SELECT id, roleName 
        FROM role";
        return $this->findAll($query, []);
    }

    /**
     *  Insert into Role
     * @param string roleName
     */
    public function insertRole (string $roleName){
        $query = "INSERT INTO role (roleName) 
                    VALUES (:roleName)";
        $param = [
            ':roleName' => $roleName
        ];
        return $this->executeSql($query, $param);
    }

    /**
     *  Delete from Role
     * @param int role_id
     */
    public function deleteRole(int $role_id)
    {
        $query = "DELETE FROM role 
                    WHERE role_id = :role_id";
        $param = [
            ':role_id'          => $role_id
        ];
        return $this->executeSql($query, $param);
    }
}