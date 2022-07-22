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
        password: 'JeanKR3435',
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
                console.log('All done!')
                break;
        }
    })
};

// functions just for displaying info

const viewDepartments = (response) => {
    console.log('Viewing all departments.');

    return this.db.promise().query(
        'SELECT * FROM department'
    )
};

const viewRoles = () => {
    console.log('Viewing all roles.');

    db.promise().query(
        'SELECT * FROM role'
    )
};

const viewEmployees = () => {
    console.log('Viewing all employees.');

    db.promise().query(
        'SELECT * FROM employee'
    )
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
        db.query(`INSERT INTO department (department_name) VALUES ?`, [response.deptName], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
    )
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
        db.query(`INSERT INTO role ( title, salary,) VALUES ?`, [response.role, response.salary], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
    )
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
    ])
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
                    'James Ralph',
                    'Jeanette Ralph',
                    'Frank Ralph',
                    'Jasbir Ralph',
                    'Nisha Singh',
                    'Harpreet Kaur'
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
    )
};

