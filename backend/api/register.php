<?php


function handleRegister($db) {
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
    
        if (isset($data->username) && isset($data->password) && isset($data->email)) {
            $username = $data->username;
            $password = password_hash($data->password, PASSWORD_BCRYPT);
            $email = $data->email;
    
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(["message" => "Неверный формат email."]);
                exit;
            }
    
            try {
                $stmt = $db->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
                $stmt->execute([$username, $email]);
                
                if ($stmt) {
                    echo json_encode(["message" => "Пользователь с таким именем или email уже существует."]);
                } else {
                    $stmt = $db->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
                    $stmt->execute([$username, $password, $email]);
    
                    echo json_encode(["message" => "Пользователь успешно зарегистрирован."]);
                }
            } catch (PDOException $e) {
                echo json_encode(["message" => "Ошибка при регистрации. Пожалуйста, попробуйте позже."]);
            }
        } else {
            echo json_encode(["message" => "Недостаточно данных для регистрации."]);
        }
    }    
}