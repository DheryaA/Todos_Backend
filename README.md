# 📝 Todos Backend API

A secure and feature-rich backend for a Todo App built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication (JWT-based), and CRUD operations on todos.

---

## 🌐 Live API Base URL
https://todos-backend-c2lz.onrender.com/

---

## 🚀 API Endpoints

### 👤 Auth Routes

| Method | Endpoint                          | Description             |
|--------|-----------------------------------|-------------------------|
| POST   | `/api/users/signup`               | Register a new user     |
| POST   | `/api/users/login`                | Login existing user     |
| POST   | `/api/users/refresh-token`        | Get new access token    |
| POST   | `/api/users/logout`               | Logout user             |

### 📝 Todo Routes (Require Authorization)

Include header:


| Method | Endpoint                         | Description                 |
|--------|----------------------------------|-----------------------------|
| POST   | `/api/todos/create`              | Create a new todo           |
| GET    | `/api/todos/get`                 | Get all todos for user      |
| GET    | `/api/todos/get/:id`             | Get single todo by ID       |
| PUT    | `/api/todos/update/:id`          | Update a todo by ID         |
| DELETE | `/api/todos/delete/:id`          | Delete a todo by ID         |
| DELETE | `/api/todos/delete-all`          | Delete all todos for user   |

---

## 📦 Installation (For Local Development)

```bash
git clone https://github.com/yourusername/todos-backend.git
cd todos-backend
npm install
