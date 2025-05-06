<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/cors.php';
handleCors();
require_once __DIR__ . '/../helpers/getToken.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = str_replace('/api/', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case 'login':
        require_once __DIR__ . '/login.php';
        handleLogin($db);
        break;
    case 'register':
        require_once __DIR__ . '/register.php';
        handleRegister($db);
        break;
    case 'createAd':
        require_once __DIR__ . '/create_ads.php';
        break;
    case 'getAd':
        require_once __DIR__ . '/get_ads.php';
        break;
    case 'deleteAd':
        require_once __DIR__ . '/delete_ads.php';
        break;
    case 'ad':
        require_once __DIR__ . '/ads.php';
        break;
    case 'ads':
        require_once __DIR__ . '/getAllAds.php';
        break;
    case 'editAd':
        require_once __DIR__ . '/edit_ads.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['message' => 'Маршрут не найден.']);
        break;
}

