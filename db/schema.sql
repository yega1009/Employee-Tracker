-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_tracker;

-- Creat a new database
CREATE DATABASE employee_tracker;

-- Select the database to execute queries
USE employee_tracker;

-- Create a 'department' table with 'id' and 'name'
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Creating a 'role' table with 'id', 'title', 'salary', and 'department_id' as a foreign key that references the 'id' of the 'department' table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

-- Creating an 'employee' table with 'id', 'first_name', 'last_name', 'role_id' as a foreign key that references the 'id' of the 'role' table,
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
