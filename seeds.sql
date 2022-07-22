INSERT INTO department(department_name) 
VALUES 
('Engineering'), 
('Finance'),
('Legal'),
('Sales');

INSERT INTO role(title,salary,department_id)
VALUES 
('Sales Person', 85000, 4),
('Software Engineer', 150000, 1),
('Lawyer', 170000, 3),
('Accountant', 170000,2),
('Account Manger', 170000,4),
('Project Manager', 170000,1);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('James', 'Ralph', 1, 5),
('Jeanette', 'Ralph', 2, 6),
('Frank', 'Ralph', 3, null),
('Jasbir', 'Ralph', 4, 5);
('Nisha', 'Singh', 5, 5),
('Harpreet', 'Kaur', 6, 6);


