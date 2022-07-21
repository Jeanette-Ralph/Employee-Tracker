DROP DATABASE IF EXSISTS department_db;
CREAT DATABASE department_db;

USE department_db;

-- department table
CREATE TABLE department (
    -- primary key
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

-- roles table 
CREATE TABLE role (
    role_id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    
    -- CREATE COLUMN FOR DEPARTMENT ID
    departmentId INT NOT NULL
    FOREIGN KEY (departmentId) REFERENCES department(department_id)
    ON DELETE SET NULL
);

-- employee table
CREATE TABLE employee (
    employee_id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    roleId INT NOT NULL
    FOREIGN KEY (roleId) REFERENCES role(role_id)
    ON DELETE SET NULL,

    managerId INT NOT NULL
    FOREIGN KEY (managerId) REFERENCES employee(employee_id)
    ON DELETE SET NULL
);


