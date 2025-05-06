<?php

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        echo json_encode(['error' => "ID не передан"]);
        exit;
    }

    $title = trim($data['title']);
    $description = trim($data['description']);
    $price = trim($data['price']);
    $image = trim($data['image']);
    $id = $data['id'];

    $stmt = $db->prepare("UPDATE ads SET title = :title, description = :description, price = :price, image = :image WHERE id = :id");

    $stmt->execute([
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'price' => $price,
        'image' => $image
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Объявление обновлено']);
    } else {
        echo json_encode(['error' => 'Объявление не найдено или нет прав']);
    }
} else {
    echo json_encode(['error' => "Неверный метод"]);
}
