const inquirer = require("inquirer");
const db = require("./lib/queries");

const mainPrompt = async () => {
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

  switch (answer.action) {
    case "View all departments":
      const [ departments ] = await db.viewAllDepartments();
      console.table(departments);
      break;

    case "View all roles":
      const [ roles ] = await db.viewAllRoles();
      console.table(roles);
      break;

    case "View all employees":
      const [ employees ] = await db.viewAllEmployees();
      console.table(employees);
      break;

    case "Add a department":
      const departmentName = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the department name:",
        },
      ]);
      await db.addDepartment(departmentName.name);
      console.log("Department added!");
      break;

    case "Add a role":
      const [ departmentsOptions ] = await db.viewAllDepartments();
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
      await db.addRole(roleInfo);
      console.log("Role added!");
      break;

    case "Add an employee":
      const [ rolesOptions ] = await db.getAllRoles();
      const [ employeesOptions ] = await db.getAllEmployees();
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
      await db.addEmployee(employeeInfo);
      console.log("Employee added!");
      break;

    case "Update an employee role":
      const [ employeeOptions ] = await db.getAllEmployees();
      const [ roleOptions ] = await db.getAllRoles();
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
      await db.updateEmployeeRole(updateInfo.employee_id, updateInfo.role_id);
      console.log("Employee's role updated!");
      break;

    case "Exit":
      process.exit();
  }

  mainPrompt();
};

mainPrompt();
