<?php

require_once __DIR__ . '/../config/db.php';
$uid = getToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['id'])) {
        echo json_encode(['error' => "ID не передан"]);
        exit;
    }

    $id = $_GET['id'];

    $stmt = $db->prepare('
    SELECT ads.*, users.username 
    FROM ads 
    JOIN users ON ads.user_id = users.id
    WHERE ads.id = :id
');
    $stmt->execute([':id' => $id]);

    $ad = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($ad) {
        echo json_encode(['message' => $ad]);
    } else {
        echo json_encode([
            'error' => 'Объявление не найдено',
            'id' => $id,
        ]);
    }
} else {
    echo json_encode(['error' => "Неверный метод"]);
}
