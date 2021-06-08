<?php
declare(strict_types=1);

namespace Models;

use DateTime;

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




}