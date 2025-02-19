<?php 

class Client implements JsonSerializable {
    private string $name;
    private int $money;
    private int $round;
    private array $id_questions;

    public function __construct(string $name, int $money, int $round, array $id_questions) {
        $this->name = $name;
        
    }

    public function jsonSerialize() : array {
        return [
            'name' => $this->name,
            'money' => $this->money,
            'round' => $this->round,
            'id_questions' => $this->id_questions
        ];
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