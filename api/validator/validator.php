<?php

function isValidData($name, $email, $phone) {
    if (empty($name) || empty($email) || empty($phone)) {
        http_response_code(422);
    
        return false;
    }

    if (
        !isValidPhoneNumber($phone) 
        || !filter_var($email, FILTER_VALIDATE_EMAIL) 
        || !preg_match("/^[a-zA-Zа-яёА-ЯЁ]+$/u", $name)
    ) {
        return false;
    }    

    return true;
}

function isValidPhoneNumber($phone) {
    if (preg_match('/^\+7\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/', $phone)){
        return true;
    }

    return false;
}