// Import database connection configuration
const connection = require('../config/connection');

// Create a class to handle database operations
class Database {
  // Constructor receives the connection object and initializes it
  constructor(connection) {
    this.connection = connection;
  }

  // Method to fetch all departments from the database
  viewAllDepartments() {
    // Executes a SQL query to select all records from the 'department' table
    return this.connection.promise().query("SELECT * FROM department");
  }

  // Method to fetch all roles with department names
  viewAllRoles() {
    // Executes a SQL query to join 'role' and 'department' tables and select necessary fields
    return this.connection.promise().query(`
      SELECT role.id, role.title, role.salary, department.name AS department 
      FROM role 
      LEFT JOIN department ON role.department_id = department.id
    `);
  }

  // Method to fetch all employees with their roles, departments, and managers
  viewAllEmployees() {
    // Executes a SQL query to join multiple tables and select necessary fields
    return this.connection.promise().query(`
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager 
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
  }

  // Method to add a new department to the database
  addDepartment(departmentName) {
    // Executes a SQL query to insert a new department with the provided name
    return this.connection.promise().query("INSERT INTO department SET ?", { name: departmentName });
  }

  // Method to add a new role to the database
  addRole(roleData) {
    // Executes a SQL query to insert a new role with the provided data
    return this.connection.promise().query("INSERT INTO role SET ?", roleData);
  }

  // Method to add a new employee to the database
  addEmployee(employeeData) {
    // Executes a SQL query to insert a new employee with the provided data
    return this.connection.promise().query("INSERT INTO employee SET ?", employeeData);
  }

  // Method to update an existing employee's role in the database
  updateEmployeeRole(employeeId, roleId) {
    // Executes a SQL query to update the role of a specific employee's ID.
    return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
  }

  // Method to fetch all roles from the database
  getAllRoles() {
    // Executes a SQL query to select all roles from the 'role' table
    return this.connection.promise().query("SELECT id, title FROM role");
  }

  // Method to fetch all employees from the database
  getAllEmployees() {
    // Executes a SQL query to select all employees
    return this.connection.promise().query("SELECT id, CONCAT(first_name, ' ', last_name) AS fullName FROM employee");
  }

}

// Exporting an instance of the Database class with the connection passed to it
module.exports = new Database(connection);
