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
    role_id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    
    -- CREATE COLUMN FOR DEPARTMENT ID
    FOREIGN KEY (department_id)
    REFERENCES department(department_id)
    ON DELETE SET NULL
);

-- employee table
CREATE TABLE employee (
    employee_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
    ON DELETE SET NULL,

    FOREIGN KEY (employee_id)
    REFERENCES employee(employee_id)
    ON DELETE SET NULL
);


