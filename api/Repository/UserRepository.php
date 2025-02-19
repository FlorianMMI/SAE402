<?php

require_once "EntityRepository.php";
require_once "class/User.php";

class UserRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }
    
    public function findAll() {
        $requete = $this -> cnx -> prepare("SELECT * FROM User");
        $requete -> execute();
        $answer = $requete -> fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }

    public function finduser($user) {
        $requete = $this->cnx->prepare("SELECT * FROM User WHERE players_names = :user");
        $requete->bindParam(':user', $user);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }

    // public function finditems($user) {
    //     $requete = $this->cnx->prepare("SELECT shop.achat FROM shop INNER JOIN User ON shop.id_user = User.id_user WHERE User.players_name = :user");
    //     $requete->bindParam(':user', $user);
    //     $requete->execute();
    //     $answer = $requete->fetchAll(PDO::FETCH_CLASS);
    //     return $answer;
    // }

}





?>