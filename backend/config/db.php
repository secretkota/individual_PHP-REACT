<?php

try {
    $db = new PDO('sqlite:' . __DIR__ . '/../database/database.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Произошла ошибка! свяжитесь с администратором сайта. ");
}