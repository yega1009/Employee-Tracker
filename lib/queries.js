const connection = require('../config/connection');

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  viewAllRoles() {
    return this.connection.promise().query(`
      SELECT role.id, role.title, role.salary, department.name AS department 
      FROM role 
      LEFT JOIN department ON role.department_id = department.id
    `);
  }

  viewAllEmployees() {
    return this.connection.promise().query(`
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager 
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
  }

  addDepartment(departmentName) {
    return this.connection.promise().query("INSERT INTO department SET ?", { name: departmentName });
  }

  addRole(roleData) {
    return this.connection.promise().query("INSERT INTO role SET ?", roleData);
  }

  addEmployee(employeeData) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employeeData);
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
  }

  getAllRoles() {
    return this.connection.promise().query("SELECT id, title FROM role");
  }

  getAllEmployees() {
    return this.connection.promise().query("SELECT id, CONCAT(first_name, ' ', last_name) AS fullName FROM employee");
  }

}

module.exports = new Database(connection);
