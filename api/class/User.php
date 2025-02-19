<?php 

class Client implements JsonSerializable {
    private int $id_user;
    private string $name;
    private int $money;
    private int $round;
    private array $id_questions;


    public function __construct(string $name) {
        $this->name = $name;
        
    }

    public function jsonSerialize() : array {
        return [
            'id_user' => $this->id_user,
            'name' => $this->name,
            'money' => $this->money,
            'round' => $this->round,
            'id_questions' => $this->id_questions
        ];
    }

    public function getIdUser(): int {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): void {
        $this->id_user = $id_user;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getMoney(): int {
        return $this->money;
    }

    public function setMoney(int $money): void {
        $this->money = $money;
    }

    public function getRound(): int {
        return $this->round;
    }

    public function setRound(int $round): void {
        $this->round = $round;
    }

    public function getIdQuestions(): array {
        return $this->id_questions;
    }

    public function setIdQuestions(array $id_questions): void {
        $this->id_questions = $id_questions;
    }
}





?>