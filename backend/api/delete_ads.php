<?php

require_once __DIR__ . '/../config/db.php';
$uid = getToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['id'])) {
        echo json_encode(['error' => "ID не передан"]);
        exit;
    }

    $id = $_GET['id'];

    $stmt = $db->prepare("DELETE FROM ads WHERE id = :id AND user_id = :uid");
    $stmt->execute(['id' => $id, 'uid' => $uid]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Объявление удалено']);
    } else {
        echo json_encode(['error' => 'Объявление не найдено или нет прав']);
    }

} else {
    echo json_encode(['error' => "Неверный метод"]);
}