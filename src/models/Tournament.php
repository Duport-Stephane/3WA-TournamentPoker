<?php

declare(strict_types=1);

namespace Models;

class Tournament extends \Database
{
    protected int $id;
    protected string $name;
    protected int $created_at;
    protected int $started_at;
    protected int $closed_at;
    protected int $tableMax;
    protected string $avatar;


    public function getAllTournamentOn()
    {
        $query = "SELECT id, name, created_at, started_at, closed_at, tableMax, avatar 
        FROM tournament
        WHERE closed_at IS NULL
        ORDER BY started_at";
        return $this->findAll($query, []);
    }


    /**
     * Get Tournament Name with this id
     * @param integer tournament_id
     *
     * @return string Name of the tournament
     */
    public function getTournamentName(int $tournament_id): string
    {
        try {
            $sql = 'SELECT tournament.id, name
                FROM tournament
                WHERE tournament.id = :tournament_id';
            $param = [
                ':tournament_id' => $tournament_id
            ];

            $name = $this->findOne($sql, $param);
        } catch (\DomainException $e) {
            echo $e->getMessage();
            die;
        }

        return $name['name'];
    }
}
