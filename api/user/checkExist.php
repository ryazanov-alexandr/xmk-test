<?php 

require_once "../config/database.php";

require_once "../objects/User.php";

require_once  "../validator/validator.php";

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = isset($_GET) ? $_GET : [];

if (!isValidData($data['name'], $data['email'], $data['phone'])) {
    http_response_code(422);

    echo json_encode(["message" => "Not valid data."], JSON_UNESCAPED_UNICODE);
    exit();
}

$user->name = $data['name'];
$user->email = $data['email'];
$user->phone = $data['phone'];

echo $_COOKIE['submit'];

if (!$user->isExist()) {
    echo json_encode(["isExist" => false]);
} else {
    echo json_encode(["isExist" => true], JSON_UNESCAPED_UNICODE);
}


