// Import required modules
const inquirer = require("inquirer");
const db = require("./lib/queries");

// Main function that executes the application
const mainPrompt = async () => {
  // Promp the user with a list to choose from
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  // Execute code based on the user's choice
  switch (answer.action) {
    case "View all departments":
      // Fetch all departments from the database
      const [departments] = await db.viewAllDepartments();
      // Display all departments in a table in the console
      console.table(departments);
      break;

    case "View all roles":
      // Fetch all roles from the database
      const [roles] = await db.viewAllRoles();
      console.table(roles);
      break;

    case "View all employees":
      // Fetch all employees from the database
      const [employees] = await db.viewAllEmployees();
      console.table(employees);
      break;

    case "Add a department":
      // Prompt the user to enter the department name
      const departmentName = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the department name:",
        },
      ]);
      // Add the new department to the database
      await db.addDepartment(departmentName.name);
      console.log("Department added!");
      break;

    case "Add a role":
      // Fetch all departments for the user to choose when adding a role
      const [departmentsOptions] = await db.viewAllDepartments();
      // Prompt the user to enter the details of the role
      const roleInfo = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role title:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter role salary:",
        },
        {
          type: "list",
          name: "department_id",
          message: "Choose a department for the role:",
          choices: departmentsOptions.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ]);
      // Add the new role to the database
      await db.addRole(roleInfo);
      console.log("Role added!");
      break;

    case "Add an employee":
      // Fetch all roles and employees for the user to choose when adding an employee
      const [rolesOptions] = await db.getAllRoles();
      const [employeesOptions] = await db.getAllEmployees();
      // Prompt the user to enter the employee details
      const employeeInfo = await inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee's first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter employee's last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "Choose a role for the employee:",
          choices: rolesOptions.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Choose a manager for the employee:",
          choices: [
            ...employeesOptions.map((employee) => ({
              name: employee.fullName,
              value: employee.id,
            })),
            { name: "None", value: null },
          ],
        },
      ]);
      // Add the new employee to the database
      await db.addEmployee(employeeInfo);
      console.log("Employee added!");
      break;

    case "Update an employee role":
      // Fetch all employees and roles for the user to choose when updating an employee role
      const [employeeOptions] = await db.getAllEmployees();
      const [roleOptions] = await db.getAllRoles();
      // Prompt the user to select an employee and their new role
      const updateInfo = await inquirer.prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which employee's role do you want to update?",
          choices: employeeOptions.map((employee) => ({
            name: employee.fullName,
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "role_id",
          message: "Which role do you want to assign to the selected employee?",
          choices: roleOptions.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ]);
      // Update the selected employee's role in the database
      await db.updateEmployeeRole(updateInfo.employee_id, updateInfo.role_id);
      console.log("Employee's role updated!");
      break;

    case "Exit":
      // Exit the process
      process.exit();
  }

  // Recall the main prompt function, creating a loop until the user decides to exit
  mainPrompt();
};

// Execute the main function
mainPrompt();
