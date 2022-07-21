INSERT INTO department(department_name) 
VALUES 
('Engineering'), 
('Finance'),
('Legal'),
('Sales')

INSERT INTO role(role_id,title,salary,departmentId)
VALUES 
(1, 'Sales Person', 85000, 4),
(2, 'Software Engineer', 150000, 1),
(3, 'Lawyer', 170000, 3),
(4, 'Accountant', 170000,2),
(5, 'Account Manger', 170000,4),
(6, 'Project Manager', 170000,1)


INSERT INTO employee(employee_id,first_name, last_name, roleId, managerId)
VALUES
(1, 'James', 'Ralph', 1, 5),
(2, 'Jeanette', 'Ralph', 2, 6),
(3, 'Frank', 'Ralph', 3, null),
(4, 'Jasbir', 'Ralph', 4, 5),
(5, 'Nisha', 'Singh', 5, null),
(6, 'Harpreet', 'Kaur', 6, null)

