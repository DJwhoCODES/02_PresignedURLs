# FOLDERS

1. Middlewares
2. Routes
3. Controllers
4. Services
5. Repositories
6. Helpers
7. Configs
8. Models

---

# DEPENDENCIES

1. express
2. dotenv
3. http-status-codes
4. winston

---

# API DRIVEN ROUTES VS SSR

1. app.get("/api/v1/users") // Routes
2. app.get("/home") // SSR

---

# ROUTING

1. Routing refers to how an application's endpoint reponds to client requests.

---

# app.use()

1. To register middlewares as a callback function.
2. Mounts the specified "middleware function" at the specified path. The middleware function is executed when the base of the request matches the path.
3. We can also mount/register the "router" object.
4.

---

# WINSTON

1. Used for logging

---

# ORM

1. Object Relational Mapping (ORM) - It is for SQL Databases
2. It is a technique used in creating a "bridge" between object-oriented programs and relational-databases
3. sequelize orm
4. "mysql2": It is a driver that helps connection between the application and the database. It supports both callbacks and Promises

🔹 What is mysql2 driver?

- A low-level Node.js library used to connect to a MySQL database and run SQL queries directly.
- It acts as a driver between your Node.js app and MySQL.
- You write SQL manually

🔹 What is Sequelize ORM?

- A high-level ORM (Object Relational Mapper) for Node.js that abstracts away SQL.
- Works on top of drivers like mysql2, pg, etc.
- No need to write raw SQL — Sequelize converts JavaScript operations into SQL automatically.

🎯 Summary:

- Use mysql2 if you want full control, performance, and don’t mind writing SQL manually.
- Use Sequelize if you prefer a model-based, SQL-free development experience with added features like migrations and associations.

---
