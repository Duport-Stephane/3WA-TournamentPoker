<?php
declare(strict_types=1);

namespace Models;

class Player extends \Database
{
    protected int $id;
    protected int $user_id;
    protected int $seat_id;
    protected int $table_id;
    protected int $tournament_id;

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of user_id
     */ 
    public function getUser_id()
    {
        return $this->user_id;
    }

    /**
     * Set the value of user_id
     *
     * @return  self
     */ 
    public function setUser_id($user_id)
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * Get the value of seat_id
     */ 
    public function getSeat_id()
    {
        return $this->seat_id;
    }

    /**
     * Set the value of seat_id
     *
     * @return  self
     */ 
    public function setSeat_id($seat_id)
    {
        $this->seat_id = $seat_id;

        return $this;
    }

    /**
     * Get the value of table_id
     */ 
    public function getTable_id()
    {
        return $this->table_id;
    }

    /**
     * Set the value of table_id
     *
     * @return  self
     */ 
    public function setTable_id($table_id)
    {
        $this->table_id = $table_id;

        return $this;
    }

    /**
     * Get the value of tournament_id
     */ 
    public function getTournament_id()
    {
        return $this->tournament_id;
    }

    /**
     * Set the value of tournament_id
     *
     * @return  self
     */ 
    public function setTournament_id($tournament_id)
    {
        $this->tournament_id = $tournament_id;

        return $this;
    }


    /**
     * Retourne l'ensemble des joueurs VALIDES dans la table PLAYER pour CE tournoi $_SESSION['tournament']
     * @param integer tournament_id
     *
     * @return array
     */
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
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }

        return $players ?? [];
    }

    /**
     * Test if user_id exist in table Player for this Tournament_id
     * @param {int} user_id
     * @param {int} tournament_id
     */
    public function isPlayerExistTournament(int $user_id, int $tournament_id)
    {
        $query ="SELECT user_id, tournament_id 
                FROM player 
                WHERE user_id = :user_id
                AND tournament_id = :tournament_id";
        $param = [
            ':user_id'          => $user_id,
            ':tournament_id'    => $tournament_id
        ];
        return $this->executeSql($query, $param);
    }

    /**
     *  Insert into PLAYER
     * @param int user_id
     * @param int tournament_id
     */
    public function insertPlayer (int $user_id, int $tournament_id){
        $query = "INSERT INTO player (user_id, tournament_id) 
                    VALUES (:user_id, :tournament_id)";
        $param = [
            ':user_id'          => $user_id,
            ':tournament_id'    => $tournament_id
        ];
        return $this->executeSql($query, $param);
    }

    /**
     *  Delete from PLAYER
     * @param int user_id
     * @param int tournament_id
     */
    public function deletePlayer(int $user_id, int $tournament_id)
    {
        $query = "DELETE FROM player 
                    WHERE user_id = :user_id
                    AND tournament_id = :tournament_id";
        $param = [
            ':user_id'          => $user_id,
            ':tournament_id'    => $tournament_id
        ];
        return $this->executeSql($query, $param);
    }
}