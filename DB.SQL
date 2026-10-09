
CREATE DATABASE DB;
DROP DATABASE DB;
DROP TABLE USER;
CREATE TABLE USER
(
    email    varchar(150)        NOT NULL UNIQUE,
    id int AUTO_INCREMENT primary key,
    firstname  varchar(150),
    lastname  varchar (150),
    phone    varchar(150)             not null unique,
    role     varchar(150),
    password varchar(150) not null);

CREATE TABLE product(
    id int AUTO_INCREMENT PRIMARY KEY ,
    name varchar(150) not null ,
    stock int not null check ( stock>0 ),
    isDelete varchar(150),
    price int
);
CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(255) NOT NULL,
     ContactNumber VARCHAR(255)
);
CREATE TABLE  Products (
 ProductID INT AUTO_INCREMENT PRIMARY KEY,
 ProductName VARCHAR(255) NOT NULL,
 Price DECIMAL(10, 2) NOT NULL,
 StockQuantity INT NOT NULL,
 SupplierID INT,
 FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID) ON DELETE SET NULL
);
CREATE TABLE  Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
     ProductID INT,
     QuantitySold INT NOT NULL,
     SaleDate DATE NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);



