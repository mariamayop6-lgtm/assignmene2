const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',     
    password: '',      
    database: 'store_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initDB() {
    try {
        await pool.query(`CREATE DATABASE IF NOT EXISTS store_db;`);
        
        await pool.query(`
            CREATE TABLE  Suppliers (
                SupplierID INT AUTO_INCREMENT PRIMARY KEY,
                SupplierName VARCHAR(255) NOT NULL,
                ContactNumber VARCHAR(255)
            );
        `);

        await pool.query(`
            CREATE TABLE  Products (
                ProductID INT AUTO_INCREMENT PRIMARY KEY,
                ProductName VARCHAR(255) NOT NULL,
                Price DECIMAL(10, 2) NOT NULL,
                StockQuantity INT NOT NULL,
                SupplierID INT,
                FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID) ON DELETE SET NULL
            );
        `);

        await pool.query(`
            CREATE TABLE  Sales (
                SaleID INT AUTO_INCREMENT PRIMARY KEY,
                ProductID INT,
                QuantitySold INT NOT NULL,
                SaleDate DATE NOT NULL,
                FOREIGN KEY (ProductID) REFERENCES Suppliers(SupplierID) ON DELETE CASCADE
            );
        `);

        console.log("Database and tables initialized successfully.");
    } catch (err) {
        console.error("Database error:", err.message);
    }
}

initDB();

module.exports = pool;