<?php 

require_once "../config/database.php";

require_once "../objects/User.php";

require_once "../validator/validator.php";

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$_POST = json_decode(file_get_contents("php://input"), true) ? : [];

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

if (!isValidData($name, $email, $phone)) {
    http_response_code(422);

    echo json_encode(["message" => "Not valid data."], JSON_UNESCAPED_UNICODE);
    exit();
}

$user->name = $name;
$user->email = $email;
$user->phone = $phone;

if ($user->create()) {
    http_response_code(201);

    echo json_encode(["message" => "User created"]);
    exit();
} else {
    http_response_code(503);

    echo json_encode(["message" => "Failed to create user"]);
    exit();
}

