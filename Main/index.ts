import inquirer from "inquirer";
import logo from "asciiart-logo";
import Db from "./server.js";

//declare a const to get DB instance
const db = new Db();

//Test function to see if we are able to read from the database

// //call method from server.ts to fetch the rows from pg
// async function main() {
//     console.log("In!");
//     const ret = await db.getAllDepartments();
//     console.table(ret.rows);
//     console.log("Done");
// }
// await main();

init();

function init(){
    const logoText = logo({name: "Employee Manager"}).render();
    console.log(logoText);
    //console.log("Employee Manager");
    loadCMSPrompts();
}



function loadCMSPrompts(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do? (use arrow keys)",
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
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
    .then(res => {
        const choice = res.choice;

        switch(choice) {
            case 'VIEW_EMPLOYEES': // DONE
                viewAllEmployees(); 
                break;
            case 'ADD_EMPLOYEE': // DONE
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE': // DONE
                updateEmployeeRole();
                break;
            case 'VIEW_ROLES': // DONE
                viewAllRoles();
                break;
            case 'ADD_ROLE': // DONE 
                addRole();
                break;
            case 'View_DEPARTMENTS': // DONE
                viewAllDepartments();
                break;
            case 'ADD_DEPARTMENT': // DONE
                addDepartment();
                break;
            default:
                quit();
                break;
        }
    })
}

//View All Employees
function viewAllEmployees(){
    db.getAllEmployees()
        .then(({rows})=>{
          const employees = rows;
          console.log('\n');
          console.table(employees);
        })
        .then(()=> loadCMSPrompts());
}    

//View All Roles
function viewAllRoles(){
    db.getAllRoles()
        .then(({rows})=>{
          const roles = rows;
          console.log('\n');
          console.table(roles);
        })
        .then(()=> loadCMSPrompts());
}    

//View All Departments
function viewAllDepartments(){
    db.getAllDepartments()
        .then(({rows})=>{
          const departments = rows;
          console.log('\n');
          console.table(departments);
        })
        .then(()=> loadCMSPrompts());
}    

// Add Department
async function addDepartment(){
    inquirer.prompt([
        {
            name: 'deptName',
            message: "What is the name of the department?",
            type: 'input'
        }
    ])
    .then(resp => {
        db.createDepartment(resp.deptName)
        .then(() => {
            console.log("Department has been added");
            loadCMSPrompts();
        })
    })
}

// Add Role
async function addRole(){
    //fetch department
    const queryResp = await db.getAllDepartments();

    const choicesArray = queryResp.rows.map(dept => {
        return {
            name: dept.name,
            value: dept.id
        }
    })

    inquirer.prompt([
        {
            name: 'title',
            message: "What is the name of the role?",
            type: 'input'
        },
        {
            name: 'salary',
            message: "What is the salary of the role?",
            type: 'input'
        },
        {
            name: 'dept',
            message: "Which department does the role belong to?",
            type: 'list',
            choices: choicesArray
        },

    ])
    .then(resp => {
        db.createRole(resp.title,resp.salary,resp.dept)
        .then(() => {
            console.log("Role has been added");
            loadCMSPrompts();
        })
    })
}

async function addEmployee(){

    //fetch role
    const queryRoleResp = await db.getAllRoles();

    const rolesArray = queryRoleResp.rows.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    //fetch employees
    const queryEmpResp = await db.getAllEmployees();

    


    const employeesArray = queryEmpResp.rows.map(emp => {
        return {
            name: emp.first_name,
            value: emp.id
        }
    });

    employeesArray.unshift({ name: "No Manager", value: null});

    inquirer.prompt([
        {
            name: 'employeefName',
            message: "What is the employee's first name?",
            type: 'input'
        },
        {
            name: 'employeelName',
            message: "What is the employee's last name?",
            type: 'input'
        },
        {
            name: 'employeeRole',
            message: "What is the employee's role?",
            type: 'list',
            choices: rolesArray
        },
        {
            name: 'employeeManager',
            message: "Who is the employee's manager?",
            type: 'list',
            choices: employeesArray
        }
    ])
    .then(resp => {
        db.createEmployee(resp.employeefName,resp.employeelName,resp.employeeRole,resp.employeeManager)
        .then(() => {
            console.log("Employee has been added");
            loadCMSPrompts();
        })
    })
}

async function updateEmployeeRole(){

    //fetch role
    const queryRoleResp = await db.getAllRoles();

    const rolesArray = queryRoleResp.rows.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    //fetch employees
    const queryEmpResp = await db.getAllEmployees();

    const employeesArray = queryEmpResp.rows.map(emp => {
        return {
            name: emp.first_name,
            value: emp.id
        }
    })

    inquirer.prompt([
        {
            name: 'employee',
            message: "Which employee's role do you want to update?",
            type: 'list',
            choices: employeesArray
        },
        {
            name: 'newRole',
            message: "Which role do you want to assign the selected employee?",
            type: 'list',
            choices: rolesArray
        }
    ])
    .then(resp => {
        db.UpdateEmployeeRole(resp.employee,resp.newRole)
        .then(() => {
            console.log("Employee's Role has been updated");
            loadCMSPrompts();
        })
    })
}

function quit(){
    console.log("Thank you for using the CMS System!");
    process.exit();
}