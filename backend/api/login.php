<?php

use Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

function handleLogin($db)
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        if (isset($data->username) && isset($data->password)) {
            $username = $data->username;
            $password = $data->password;

            try {
                $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
                $stmt->execute([$username]);

                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if (password_verify($password, $user['password'])) {
                    $payload = [
                        'uid' => $user['id']
                    ];
                    $jwt = JWT::encode($payload, $_ENV['SECRET_KEY'], 'HS256');
                    echo json_encode([
                        "success" => true,
                        "message" => "Логин успешен",
                        "token" => $jwt
                    ]);
                } else {
                    echo json_encode([
                        "success" => false,
                        "message" => "Неверный пароль."
                    ]);
                }
            } catch (PDOException $e) {
                echo json_encode([
                    "success" => false,
                    "message" => "Ошибка при обработке запроса."
                ]);
            }
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Недостаточно данных."
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Неверный метод запроса."
        ]);
    }
}
