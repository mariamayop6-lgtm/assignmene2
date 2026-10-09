const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// ==========================================
// Q2: Products CRUD
// ==========================================

// إضافة منتج
app.post('/products', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            [ProductName, Price, StockQuantity, SupplierID]
        );
        res.status(201).json({ message: 'Product created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  كل المنتجات
app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  منتج بـ ID
app.get('/products/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products WHERE ProductID = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// تعديل منتج
app.put('/products/:id', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;
        await pool.query(
            'UPDATE Products SET ProductName=?, Price=?, StockQuantity=?, SupplierID=? WHERE ProductID=?',
            [ProductName, Price, StockQuantity, SupplierID, req.params.id]
        );
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// حذف منتج
app.delete('/products/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM Products WHERE ProductID = ?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q3: Suppliers CRUD
// ==========================================

// إضافة 
app.post('/suppliers', async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)',
            [SupplierName, ContactNumber]
        );
        res.status(201).json({ message: 'Supplier created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// جلب الموردين
app.get('/suppliers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Suppliers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// تعديل 
app.put('/suppliers/:id', async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;
        await pool.query(
            'UPDATE Suppliers SET SupplierName=?, ContactNumber=? WHERE SupplierID=?',
            [SupplierName, ContactNumber, req.params.id]
        );
        res.json({ message: 'Supplier updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// حذف 
app.delete('/suppliers/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM Suppliers WHERE SupplierID = ?', [req.params.id]);
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q4: Sales Operations
// ==========================================

//  عملية بيع
app.post('/sales', async (req, res) => {
    try {
        const { ProductID, QuantitySold, SaleDate } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)',
            [ProductID, QuantitySold, SaleDate]
        );
        res.status(201).json({ message: 'Sale recorded', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  المبيعات
app.get('/sales', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Sales');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// جلب مبيعات منتج معين
app.get('/sales/product/:productId', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Sales WHERE ProductID = ?', [req.params.productId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q5: Schema Alterations
// ==========================================
app.post('/alter-schema', async (req, res) => {
    try {
        await pool.query('ALTER TABLE Products ADD COLUMN Category VARCHAR(255)');
        await pool.query('ALTER TABLE Products DROP COLUMN Category');
        await pool.query('ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)');
        await pool.query('ALTER TABLE Products MODIFY ProductName VARCHAR(255) NOT NULL');
        res.json({ message: 'Schema modified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q6: Seed Initial Data
// ==========================================
app.post('/seed', async (req, res) => {
    try {
        const [sup] = await pool.query(
            'INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)',
            ['FreshFoods', '01001234567']
        );
        const supplierId = sup.insertId;

        const [milk] = await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            ['Milk', 15.00, 50, supplierId]
        );
        await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            ['Bread', 10.00, 30, supplierId]
        );
        await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            ['Eggs', 20.00, 40, supplierId]
        );

        await pool.query(
            'INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)',
            [milk.insertId, 2, '2025-05-20']
        );

        res.json({ message: 'Data seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q7: Update Bread Price
// ==========================================
app.put('/products/bread/update-price', async (req, res) => {
    try {
        await pool.query("UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread'");
        res.json({ message: 'Bread price updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q8: Delete Eggs Product
// ==========================================
app.delete('/products/eggs/delete', async (req, res) => {
    try {
        await pool.query("DELETE FROM Products WHERE ProductName = 'Eggs'");
        res.json({ message: 'Eggs deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q9: Total Sold Report
// ==========================================
app.get('/reports/total-sold', async (req, res) => {
    try {
        const query = `
            SELECT p.ProductID, p.ProductName, IFNULL(SUM(s.QuantitySold), 0) AS TotalQuantitySold
            FROM Products p
            LEFT JOIN Sales s ON p.ProductID = s.ProductID
            GROUP BY p.ProductID, p.ProductName
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q10: Highest Stock Product
// ==========================================
app.get('/reports/highest-stock', async (req, res) => {
    try {
        const query = 'SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1';
        const [rows] = await pool.query(query);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q11: Suppliers Starting With 'F'
// ==========================================
app.get('/reports/suppliers-f', async (req, res) => {
    try {
        const query = "SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'";
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q12: Never Sold Products
// ==========================================
app.get('/reports/never-sold', async (req, res) => {
    try {
        const query = `
            SELECT p.* FROM Products p
            LEFT JOIN Sales s ON p.ProductID = s.ProductID
            WHERE s.SaleID IS NULL
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// Q13: All Sales With Details (JOIN)
// ==========================================
app.get('/reports/all-sales-details', async (req, res) => {
    try {
        const query = `
            SELECT p.ProductName, s.QuantitySold, s.SaleDate
            FROM Sales s
            JOIN Products p ON s.ProductID = p.ProductID
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});