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
        password: '',
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
const addDepartment = () => {
    // console.log('Add a department.');
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'deptName'
        }
    ]).then(res => {
        const { deptName } = res;
        db.promise()
            .query('INSERT INTO department (department_name) VALUES (?)', deptName)
            .then(() => console.log(`Added ${deptName} to db`))
    }).then(() => promptMenu())

};

const addRole = () => {
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
        }]
    ).then(res => {
        // get the role and the salary the user has defined
        const { role, salary } = res;

        // fetch all the departments from the db to assign the role to a department
        db.promise().query('SELECT * FROM department')
            .then(([rows]) => {
                const allDepartments = rows;

                // create the choices from the departments
                const departmentChoices = allDepartments.map(({ department_id, department_name }) => ({
                    name: department_name,
                    value: department_id
                }));

                // prompt the user to select a department and then create the role
                inquirer.prompt({
                    type: 'list',
                    name: 'departmentId',
                    message: 'What department does the role belong to?',
                    choices: departmentChoices
                }).then(response => {
                    // create the new role with the role, salary, and departmentId
                    console.log('response', response);
                    db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [role, salary, response.departmentId])
                        .then(() => console.log('Role added successfully.'))
                        .then(() => promptMenu());
                })
            })
    })
};

const addEmployee = () => {
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
        }]).then(res => {
            // get the first name and the last name the user has defined
            const { firstName, lastName } = res;

            // fetch all the roles from the db to assign the new employee to a role
            db.promise().query('SELECT * FROM role')
                .then(([rows]) => {
                    const allRoles = rows;

                    // create the choices from the roles
                    const roleChoices = allRoles.map(({ role_id, title }) => ({
                        name: title,
                        value: role_id
                    }));

                    // prompt the user to select a role the employee belongs to
                    inquirer.prompt({
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: roleChoices
                    }).then(response => {
                        // create the new role with the role, salary, and departmentId
                        console.log('response', response);
                        db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [role, salary, response.departmentId])
                            .then(() => console.log('Role added successfully.'))
                            .then(() => promptMenu());
                    })
                })
        }


            // create this dynamically
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: allRoles,
                // choices: [
                //     'Sales Person',
                //     'Software Engineer',
                //     'Account Manager',
                //     'Accountant',
                //     'Project Manager',
                //     'Lawyer'
                // ],
                name: 'employeeRole'
            },

        // create this dynamically
        // {
        //     type: 'list',
        //     message: "Who is the employee's manager?",
        //     choices: [
        //         'Nisha Singh',
        //         'Harpreet Kaur'
        //     ],
        //     name: 'employeeManager'
        // }
    ]).then(res => {
                console.log('RES: ', res);
                db.query(
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)', [res.firstName, res.lastName, res.employeeRole, res.employeeManager],
                )
            }
            ).then(() => promptMenu())
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
    ).then(res => {
        db.query(
            'UPDATE employee SET first_name = ? WHERE employee_id = ? ', [res.employeeUpdate, res.newEmployeeRole],

        )
    }
    ).then(() => promptMenu())
};

