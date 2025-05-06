<?php 


require_once __DIR__ . '/../config/db.php';
$uid = getToken();


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare('
        SELECT ads.*, users.username 
        FROM ads
        LEFT JOIN users ON ads.user_id = users.id
    ');
    $stmt->execute();
    $allAds = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($allAds)) {
        echo json_encode(['error' => 'No ads found']);
    } else {
        echo json_encode($allAds);  
    }

} else {
    echo json_encode(['error' => 'Не возможно']);
}
