<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

function getToken(){

$headers = getallheaders();
$tokenHeader = $headers['Authorization'] ?? '';


try {
    $decoded = JWT::decode($tokenHeader, new Key($_ENV['SECRET_KEY'], 'HS256'));
    return $decoded->uid;
}
catch (Exception) {
    http_response_code(401);
    echo json_encode(["error" => "invalid token"]);
}
    
}