## Индивидуальня работа: Доска объявлений (fullstack)

```
Создал: Ковалюк Станислав
Группа: IA2303
Примененные технологии: PHP, REACT, REST api, JWT
```

# Реализация бэкенд
## 1. Запуск проекта
Для того чтоб запустить проект нужен PHP, для этого качаем его на оффициальном сайте и устанавливаем.
Для проверки, что PHP установлен.
В проекте применена база данных SQL (SQLITE) уставновить ее можно по [ссылке](https://www.sqlite.org/download.html)
из вкладки Precompiled Binaries for Windows файл под названием 
```
sqlite-tools-win
```

далее импортируем проект, и создаем SECRET_KEY (для этого есть generate secret key) запускаем файл и пишем в терминал
```
php index.php
```
Получаем SECRET_KEY который в дальнейшем должны использовать в .env файле (пример есть в .env_example)
![not_found](https://i.imgur.com/P5y01v4.png)
после того как сделали .env в терминале пишем команды
```
composer require Predis/Predis
composer require firebase/php-jwt
```
И только сейчас можем запустить проект PHP
```
php -S localhost:8080 -t api/routes.php
```

```
!ВАЖНО 
если вы используете другой адрес на фронте,  у вас может ругаться CORS, для этого в helpers/cors.php измените ссылку на ваш фронт
```

## 2. Реализация путей
Реализация routes.php

```php
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
```
Данный код проверяет ссылку которую мы использовали, и при помощи свича обращается к нужному файлу и получает нужные данные или передает туда, если он не понимает путь он выводит что такого маршута нет.

## 3. Реализация базыДанных

В проекте в базе данных использовано 2 таблицы users, ads

users:
```sql
CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)
```

ads:
```sql
CREATE TABLE IF NOT EXISTS ads (
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
)
```

# 4. Реализация всех путей
При переходе в разные пути открываются разные файлы, например getAllAds мы получаем все объявления, так же и работает с create_ads он просто создает объявление в базу, а логин и регистрация проверяет данные пользователя и создают данные в таблицу для дальнейшй работы

Пример как выглядит ответ одного из файлла (В виде API)

![image](https://i.imgur.com/Txepzde.png)

Тут использовано получение всех объявлений которые создал пользователь

такими сообщениями общается frontEnd с backEnd, токен так же создается в login.php при авторизации пользователя и хранится в дальнейшем в localstorage на frontEnd

фрагмент формирования JWT токена
```php
    $jwt = JWT::encode($payload, $['SECRET_KEY'], 'HS256');
    echo json_encode([
        "success" => true,
        "message" => "Логин успешен",
        "token" => $jwt
    ]);
```

# Реализация фронтенд
## 1. Запуск проекта
Запуск проекта происходит так после клонирования необходимо:
1. Установить зависимости
```
npm install
```
2. Запустить проект
```
npm run dev
```

## 2. Реализация общения с backend
```JS
const URL = "http://localhost:8080/api";

export async function loginUser(username, password) {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password})
      });
  
      return await res.json();
  }
```
тут мы обращаемся к логину и телом запроса мы отправляем данные.

В данном коде мы обращаемся к серверу, передаем ему необходимые данные и получаем ответ, который в дальнейшем используем в компонентах при помощи хуков (часто useEffect для получения данных при монтировании)

## 3. Реализация приватного пути

```js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const nav = useNavigate();
    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            nav('/login')
            return
        }

        setIsLogged(true)
    }, []);

    if (isLogged === null) {
        return <div>Загрузка...</div>;
    }

    if (!isLogged) {
        return null
    }

    return children
}
```

В данном случае мы проверяем токен, если он ужеж создался, мы показываем страницы обвернутые в приватный пть, иначе перекидываем человека на логин

## 4. Реализация всех компонентов
Все компоненты реализованы отдельно, но только page я их объединяю и вывожу в layout

## Вид приложения:

**1. Страница логина**<br>
![image](https://i.imgur.com/Hur3ajG.png)
**2. Страница регистрации**<br>
![image](https://i.imgur.com/b2mj3E9.png)
**3. форма добавления объявления**<br>
![image](https://i.imgur.com/Gy7cbfw.png)
**4. Страница вывода всех объявлений**<br>
![image](https://i.imgur.com/69K0FbG.png)
**5. Страница вывода только моих объявлений**<br>
![image](https://i.imgur.com/HGUuoTe.png)
**5.1 Если нет объявлений**<br>
![image](https://i.imgur.com/RX2yvXK.png)
**6. Страница редактирования объявления**<br>
![image](https://i.imgur.com/17zeNFn.png)

# Примененые источники
1. Что такое JWT - https://habr.com/ru/articles/340146/
2. REST api -  https://www.ibm.com/think/topics/rest-apis#:~:text=A%20REST%20API%20is%20an,APIs%20or%20RESTful%20web%20APIs.
3. Материалы с moodle Автор: Nichita Nartea, 2025 USM -
https://moodle.usm.md/course/view.php?id=7173 - React
https://moodle.usm.md/course/view.php?id=7161 - PHP


Спасибо ❤️