const inquirer = require('inquirer');
const mysql2 = require('mysql2')

// connecting to the database
const db = mysql.createConnection(
    {
        host: 'localhost',

        // MySQL username,
        user: 'root',

        // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the department_db database.`)
);

// connecting the mysql server and the database
db.connect((err) => {
    if (err) throw err;

    console.log('Connected!')

    promptMenu();
});

const promptMenu = () => {
    inquirer.prompt([
        {
            type: list,
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
            name: optionsMenu
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

const viewDepartments = () => {
    console.log('Viewing all departments.');

    db.query('SELECT * FROM department', function (err, results) {
        console.log('Results recieved from db.');
        console.log(results);
    });

};

const viewRoles = () => {
    console.log('Viewing all roles.');

    db.query('SELECT * FROM role', function (err, results) {
        console.log('Results recieved from db.');
        console.log(results);
    });

};

const viewEmployees = () => {
    console.log('Viewing all employees.');

    db.query('SELECT * FROM employee', function (err, results) {
        console.log('Results recieved from db.');
        console.log(results);
    });
};

const addDepartment = () => {
    console.log('Add a department.');
    inquirer.prompt([
        {
            type: input,
            message: 'What is the name of the department?',
            name: deptName
        }
    ])
};

const addRole = () => {
    console.log('Add a role.');
    inquirer.prompt([
        {
            type: input,
            message: 'What is the name of the role?',
            name: role
        },

        {
            type: input,
            message: 'What is the salary of the role?',
            name: salary
        },

        {
            type: list,
            message: 'Which deparment does the role belong to?',
            choices: [
                'Engineering',
                'Finance',
                'Legal',
                'Sales',
                'Service'
            ],
            name: deptRole
        },
    ])
};

const addEmployee = () => {
    console.log('Add an employee.');
    inquirer.prompt([
        {
            type: input,
            message: "What is the employee's first name?",
            name: firstName
        },

        {
            type: input,
            message: "What is the employee's last name?",
            name: lastName
        },

        {
            type: list,
            message: "What is the employee's role?",
            choices: [
                'Sales Lead',
                'Salesperson',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer',
                'Customer Service',
                'Lead Engineer'
            ],
            name: employeeRole
        },

        {
            type: list,
            message: "Who is the employee's manager?",
            choices: [
                'Nisha Singh',
                'Harpreet Kaur',
                'James Ralph',
                'Frank Ralph',
                'Jasbir Kaur'
            ],
            name: employeeManager
        }
    ])
};

const updateEmployee = () => {
    console.log('Update an employee.');
    inquirer.prompt
}

