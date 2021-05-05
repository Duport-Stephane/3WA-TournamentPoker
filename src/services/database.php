<?php

declare(strict_types=1);

// Pour l'accès à la BDD sur l'T_IS_IDENTICAL// $pdo = new PDO('mysql:host=db.3wa.io;dbname=stephanedup_tournamentpoker','stephanedup','4de4aa2ada2ad77f4b495e0d884105d0');

/**
 * Database class
 * Permet d'obtenir une connexion à une bdd de type MySQL
 */
abstract class Database
{
    protected static $_instance;
    
    public function __construct()
    {
        //	Connexion à la base de données
        try {
            self::$_instance = new PDO(
                // 'mysql:host=localhost;dbname=tournamentpoker;charset=UTF8',
                // 'root',
                // '',
                'mysql:host=db.3wa.io;dbname=stephanedup_tournamentpoker;charset=UTF8',
                'stephanedup',
                '4de4aa2ada2ad77f4b495e0d884105d0',
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    ]
                );
                self::$_instance->exec('SET NAMES utf8mb4 COLLATE utf8mb4_general_ci');
                
                if (self::$_instance === null) {
                throw new PDOException("La connexion a échouée", 1);
            }
        } catch (PDOException $e) {
            echo "Message d'erreur : $e->getMessage() /n Code erreur : $e->getCode()";
        }
    }

    public function executeSql($sql, array $values = array())
    {
        $query = self::$_instance->prepare($sql);
        $query->execute($values);
        return self::$_instance->lastInsertId();
    }

    public function findAll($sql, array $criteria = array()): array
    {
        $query = self::$_instance->prepare($sql);
        $query->execute($criteria);
        return $query->fetchAll();
    }

    public function findOne($sql, array $criteria = array())
    {
        $query = self::$_instance->prepare($sql);
        $query->execute($criteria);
        return $query->fetch();
    }
}
