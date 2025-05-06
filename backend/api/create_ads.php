<?php

require_once __DIR__ . '/../config/db.php';

$uid = getToken();


$sql = "CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL CHECK (category IN ('auto', 'houses', 'electronics')),
    app_type TEXT NOT NULL CHECK (app_type IN ('buy', 'sell', 'exchange')),
    title TEXT NOT NULL CHECK (length(title) >= 3 AND length(title) <= 30),
    description TEXT NOT NULL CHECK (length(description) >= 6 AND length(description) <= 128),
    price INTEGER NOT NULL CHECK (price >= 1),
    image TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";

$db->exec($sql);

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    $category = trim($data['category'] ?? '');
    $app_type = trim($data['appType'] ?? '');
    $title = trim($data['title'] ?? '');
    $description = trim($data['description'] ?? '');
    $price = trim($data['price'] ?? '');
    $image = trim($data['image'] ?? '');
    $user_id = $uid;
    
    if (
        empty($category) || empty($app_type) || empty($title) ||
        empty($description) || empty($price) || empty($image)
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Все поля обязательны']);
        exit;
    }
    
    if (!in_array($category, ['auto', 'houses', 'electronics'])){
        http_response_code(400);
        echo json_encode(['error' => 'Недопустимая категория']);
        exit;
    }

    if (!filter_var($image, FILTER_VALIDATE_URL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Неверный формат URL']);
        exit;
    }

    if ($price < 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Цена не может быть числом меньше 0']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO ads (category,  app_type,  title, description, price, image, user_id) 
                           VALUES (:category, :app_type, :title, :description, :price, :image, :user_id)");

    $stmt->execute([
        ':category' => $category,
        ':app_type' => $app_type,
        ':title' => $title,
        ':description' => $description,
        ':price' => $price,
        ':image' => $image,
        ':user_id' => $user_id
    ]);

    echo json_encode(['success' => true]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Метод не поддерживается"]);
}