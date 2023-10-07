-- Switch to the 'employee_tracker' database to add seed data
USE employee_tracker;

-- Insert seed data into the 'department' table
INSERT INTO department (name) 
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

-- Insert seed data into the 'role' table. The 'department_id' is retrieved by querying the 'department' table based on the department name
INSERT INTO role (title, salary, department_id) 
VALUES
('Sales Manager', 80000, (SELECT id FROM department WHERE name = 'Sales')),
('Sales Representative', 50000, (SELECT id FROM department WHERE name = 'Sales')),
('Software Engineer', 90000, (SELECT id FROM department WHERE name = 'Engineering')),
('Lead Engineer', 120000, (SELECT id FROM department WHERE name = 'Engineering')),
('Accountant', 70000, (SELECT id FROM department WHERE name = 'Finance')),
('HR Specialist', 60000, (SELECT id FROM department WHERE name = 'Human Resources'));

-- Inserting seed data into the 'employee' table. The 'role_id' is retrieved by querying the 'role' table based on the role title. 
-- 'manager_id' is NULL for top-level employees, and references the 'id' of other employees for those who have managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', (SELECT id FROM role WHERE title = 'Sales Manager'), NULL), 
('Alice', 'Johnson', (SELECT id FROM role WHERE title = 'Software Engineer'), NULL), 
('Charlie', 'Brown', (SELECT id FROM role WHERE title = 'Accountant'), NULL), 
('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Sales Representative'), 1), 
('Bob', 'Williams', (SELECT id FROM role WHERE title = 'Lead Engineer'), 3), 
('Eve', 'Davis', (SELECT id FROM role WHERE title = 'HR Specialist'), 5);
