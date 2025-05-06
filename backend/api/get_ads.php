<?php 

require_once __DIR__ . '/../config/db.php';
$uid = getToken();


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare('SELECT ads.*, users.username 
        FROM ads 
        JOIN users ON ads.user_id = users.id 
        WHERE ads.user_id = :uid');
    $stmt->execute(['uid' => $uid]);
    $ads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($ads)) {
        echo json_encode(['message' => 'No ads found']);
    } else {
        echo json_encode($ads);  
    }

} else {
    echo json_encode(['error' => 'Не возможно']);
}
