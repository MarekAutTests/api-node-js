# Description

This project User Management API is a simple Node.js API built with Express and TypeScript.
This API provides basic user management functionality using Express, supporting operations to create, retrieve, and delete users. User details are generated using Faker.js, and each user includes an ID, name, email, and phone number.
It includes a Docker setup for easy development and deployment.

## Prerequisites
- Docker
- Docker Compose
- Node.js
- npm

## How to run
```npm run dev```
or run with docker-compose file: 
```docker-compose up -d```

## API Endpoints

Below are the available API endpoints with example `curl` commands:

### 1. Get All Users
Retrieve a list of all users as array. Initially, this will return an empty array until users are added.

```curl -X GET http://localhost:3000/users```

### 2. Create User
Create a new user with a random name, email, and phone number.

```curl -X POST http://localhost:3000/users```

If the user is successfully created:

HTTP/1.1 201 Created

### 3. Get User by ID
Retrieve a user by their ID.

```curl -X GET http://localhost:3000/users/:id```

If the user is found:
HTTP/1.1 200 OK

If the user is not found:
HTTP/1.1 404 Not Found

### 4. Delete User by ID
Delete a user by their ID.

```curl -X DELETE http://localhost:3000/users/:id```

If the user is successfully deleted:

HTTP/1.1 200 OK
{
"id": "unique-uuid",
"name": "John",
"email": "john@example.com",
"phone": "123-456-7890"
}

### Checklist
1. GET: Запрос всех пользователей.
2. GET: Пользователи отсутствуют. Запрос всех пользователей.
3. POST: Создание пользователей.
4. GET: Получить существующего пользователя по ID.
5. GET: Получить несуществующего пользователя по ID.
6. GET: Неверный формат ID. Например alphanumeric формат, 'abc123'.
7. DELETE: Удаление существующего пользователя по ID.
8. DELETE: Удаление несуществующего пользователя.