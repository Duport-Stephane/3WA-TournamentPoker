<?php

declare(strict_types=1);

require_once './config/connect.php';

/**
 * Database class
 * Permet d'obtenir une connexion à une bdd de type MySQL
 */
abstract class Database
{
    protected PDO $_instance;

    public function __construct()
    {
        //	Connexion à la base de données
        try {
            $PDOAddress =   "mysql:host=" . DATABASE_HOST . 
                            ";dbname=" . DATABASE_NAME . 
                            ";charset=UTF8";

            $this->_instance = new PDO(
                $PDOAddress,
                DATABASE_USER,
                DATABASE_PASSWORD,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
                // require_once './src/services/connect.php'

            );
            $this->_instance->exec('SET NAMES utf8mb4 COLLATE utf8mb4_general_ci');

            if ($this->_instance === null) {
                throw new PDOException("La connexion a échouée", 1);
            }
        } catch (PDOException $e) {
            echo "Message d'erreur : $e->getMessage() /n Code erreur : $e->getCode()";
        }
    }

    public function executeSql($sql, array $values = array())
    {
        $query = $this->_instance->prepare($sql);
        $query->execute($values);
        return $this->_instance->lastInsertId();
    }

    public function findAll($sql, array $criteria = array()): array
    {
        $query = $this->_instance->prepare($sql);
        $query->execute($criteria);
        return $query->fetchAll();
    }

    public function findOne($sql, array $criteria = array())
    {
        $query = $this->_instance->prepare($sql);
        $query->execute($criteria);
        return $query->fetch();
    }
}
