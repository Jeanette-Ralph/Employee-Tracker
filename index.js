const { response } = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// connecting to the database
const db = mysql.createConnection(
    {
        host: 'localhost',

        // MySQL username,
        user: 'root',

        // MySQL password
        password: 'password',
        database: 'department_db'
    },
    console.log(`Connected to the department_db database.`)
);

// connecting the mysql server and the database
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected!');
    }

    promptMenu();
});

const promptMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select what you would like to do.',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                'Add a department.',
                'Add a role.',
                'Add an employee.',
                'Update an employee role.',
                'All done!'
            ],
            name: 'optionsMenu'
        }
    ]).then(options => {
        switch (options.optionsMenu) {
            case 'View all departments.':
                viewDepartments();
                break;
            case 'View all roles.':
                viewRoles();
                break;
            case 'View all employees.':
                viewEmployees();
                break;
            case 'Add a department.':
                addDepartment();
                break;
            case 'Add a role.':
                addRole();
                break;
            case 'Add an employee.':
                addEmployee();
                break;
            case 'Update an employee role.':
                updateEmployee();
                break;
            default:
                promptMenu();
                break;
        };
    });
};

// functions just for displaying info
const viewDepartments = (response) => {
    console.log('Viewing all departments.');

    db.query(
        'SELECT * FROM department ',
        function (err, results) {
            console.table(results);
        }
    );
    promptMenu();
};

const viewRoles = () => {
    console.log('Viewing all roles.');

    db.query(
        'SELECT * FROM role ',
        function (err, results) {
            console.table(results);
        }
    );

    promptMenu();
};

const viewEmployees = () => {
    console.log('Viewing all employees.');

    db.query(
        'SELECT * FROM employee ',
        function (err, results) {
            console.table(results);
        }
    );

    promptMenu();
};


// functions for inserting values into the table
const addDepartment = (response) => {
    console.log('Add a department.');
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'deptName'
        }
    ]).then(
        db.query(
            'INSERT INTO department (department_name) VALUES (?)', [response.deptName],
            function (err, results) {
                console.table(results);
            }
        )
    );

    promptMenu();
};

const addRole = (response) => {
    console.log('Add a role.');
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role'
        },

        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },

        {
            type: 'list',
            message: 'Which deparment does the role belong to?',
            choices: [
                'Engineering',
                'Finance',
                'Legal',
                'Sales',
                'Service'
            ],
            name: 'deptRole'
        },
    ]).then(
        db.query(
            'INSERT INTO role (title, salary,department_id ) VALUES (?,?,?)', [response.role, response.salary, response.deptRole],
            function (err, results) {
                console.table(results);
            }
        )
    );

    promptMenu();
};

const addEmployee = (response) => {
    console.log('Add an employee.');
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName'
        },

        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        },

        {
            type: 'list',
            message: "What is the employee's role?",
            choices: [
                'Sales Person',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Project Manager',
                'Lawyer'
            ],
            name: 'employeeRole'
        },

        {
            type: 'list',
            message: "Who is the employee's manager?",
            choices: [
                'Nisha Singh',
                'Harpreet Kaur'
            ],
            name: 'employeeManager'
        }
    ]).then(
        db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)', [response.firstName, response.lastName, response.employeeRole, employeeManager],
            function (err, results) {
                console.table(results);
            }
        )
    );

    promptMenu();
};

// for updating values

const updateEmployee = () => {
    console.log('Update an employee.');
    inquirer.prompt(
        [
            {
                type: 'list',
                message: "Which employee's information would you like to update?",
                choices: [
                    'James',
                    'Jeanette',
                    'Frank',
                    'Jasbir',
                    'Nisha',
                    'Harpreet'
                ],
                name: 'employeeUpdate'
            },

            {
                type: 'list',
                message: 'Which role would you like to assign the employee?',
                choices: [
                    'Sales Person',
                    'Software Engineer',
                    'Account Manager',
                    'Accountant',
                    'Project Manager',
                    'Lawyer'
                ],
                name: 'newEmployeeRole'
            }
        ]
    ).then(
        db.query(
            'UPDATE employee SET first_name = ? WHERE employee_id = ? ', [response.employeeUpdate, response.newEmployeeRole],
            function (err, results) {
                console.table(results);
            }
        )
    )

    promptMenu();
};

