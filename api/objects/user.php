<?php

class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $name;
    public $email;
    public $phone;

    public function __construct($db)
    {
        $this->conn =$db;
    }

    function create() {

        if ($this->isExist()) {
            http_response_code(200);

            echo json_encode(["message" => "user already created"]);
            exit();
        }

        $query = "
            INSERT INTO ". $this->table_name ." (name, email, phone)
            VALUES (:name, :email, :phone);
        ";
    
        $stmt = $this->conn->prepare($query);
        $result = $stmt->execute([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone
        ]);

        if (!$result) {
            return false;
        }
        
        return true;
    }    
    
    function isExist() {
        $query = "
            SELECT * 
            FROM users u
            WHERE u.name = :name 
            and u.phone = :phone
            and u.email = :email;
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
                'name' => $this->name,
                'email' => $this->email,
                'phone' => $this->phone
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$result) {
            return false;
        }
        
        return true;
    }
}