# node-mysql-crud-app
A basic CRUD application built using Node.js, Express, and MySQL.
# User Management Application (Node.js + MySQL)

A simple **User Management CRUD application** built using **Node.js, Express, MySQL, and EJS**.  
This project demonstrates how to connect a SQL database with a REST-style backend and perform basic CRUD operations.

---

## ✨ Features
- View all users
- View total number of users
- Add a new user
- Edit user details
- Delete a user
- Server-side rendering using EJS
- MySQL database integration

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- Method-Override
- SQL

---

## 📁 Project Structure
SQL&NODE/ ├─ views/ │ 
├─ add.ejs │  
├─ del.ejs │  
├─ edit.ejs │  
├─ home.ejs │  
└─ showuser.ejs
├─ index.js
├─ package.json
├─ schema.sql
└─ README.md

---

## 🗄 Database Schema
The database table structure is provided in the `schema.sql` file.

```sql
CREATE TABLE user (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);
```
🚀 How to Run the Project
1. Clone the repository
   git clone https://github.com/SANSKRITI01717/node-mysql-crud-app
   
2. Install dependencies
   npm install
   
3.Create a MySQL database
 CREATE DATABASE app;
 
4. Update database credentials in index.js
 ```
 host: 'localhost',
   user: 'your_db_user',
   password: 'your_db_password',
   database: 'app'
```

5. Run the application
   node index.js
   
6.Open in browser
   http://localhost:3000

   
###   👩‍💻 Author
Sanskriti Shrivastava

