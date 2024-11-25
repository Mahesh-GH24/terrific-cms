import inquirer from "inquirer";
import logo from "asciiart-logo";
import Db from "./src/server.js";

//declare a const to get DB instance
const db = new Db();

init();

function init(){
    const logoText = logo({name: "Employee Manager"});
    console.log(logoText);
}

loadCMSPrompts();

function loadCMSPrompts(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like yo do? (use arrow keys)",
            choices:[
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "View_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                }
            ]
        }
    ])
    .then(res => {
        const choice = res.choice;

        switch(choice) {
            case 'VIEW_EMPLOYEES':
                viewAllEmployees();
                break;
            case 'ADD_EMPLOYEE':
                AddEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                UpdateEmployeeRole();
                break;
            case 'VIEW_ROLES':
                viewAllRoles();
                break;
            case 'ADD_ROLE':
                AddRole();
                break;
            case 'View_DEPARTMENTS':
                viewAllDepartments();
                break;
            case 'ADD_DEPARTMENT':
                AddDepartment();
                break;
            default:
                quit();
        }
    })
}

function viewAllEmployees(){
    
}







// //call method from server.ts to fetch the rows from pg
// db.getAllDepartments()
//     .then(({rows}) => {
//         console.table(rows)
//     });