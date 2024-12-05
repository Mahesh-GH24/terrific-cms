//fetch the pool
import { pool } from "./connection.js";
import { QueryResult } from "pg";

export default class DB {
    //define constructor
    constructor() { }

    //method for connection
    async query(sql: string, args: any[] = []): Promise<QueryResult> {

        //make a connection from the pool
        const client = await pool.connect();
        try {
            return client.query(sql, args);
        } finally {
            //once completed release the connection. This executes no matter what - success / error
            client.release();
        }
    }

    //get all departments - called from index.ts
    getAllDepartments() {
        return this.query(
            "SELECT id,name FROM department ORDER BY name;"
        );
    }

    //get all roles
    getAllRoles() {
        return this.query(
            "SELECT role.id,role.title,role.salary,department.name as department_name \
                FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title;"
        );
    }

    //get all employees
    getAllEmployees() {
        return this.query(
            "SELECT emp.id,emp.first_name,emp.last_name,emp.role_id,emp.manager_id,\
            role.title,role.salary,role.department_id,department.name,\
            CONCAT(emp_manager.First_Name, ' ', emp_manager.Last_Name) as Manager \
            FROM \
            employee AS emp INNER JOIN role ON emp.role_id = role.id \
            INNER JOIN department ON role.department_id = department.id \
            LEFT JOIN employee AS emp_manager on emp.manager_id = emp_manager.id ORDER BY first_name,last_name;"
        );
    }

    //create department
    createDepartment(dept_name: string) {
        return this.query(
            "INSERT INTO department(name) VALUES ($1)",
            [dept_name]
        );
    }

    //create role
    createRole(title: string, salary: number, department_id: number) {
        return this.query(
            "INSERT INTO role(title,salary,department_id) VALUES ($1,$2,$3)",
            [title, salary, department_id]
        );
    }

    //create employee
    createEmployee(first_name: string, last_name: string, role_id: number, manager_id: (number | null)) {
        return this.query(
            "INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ($1,$2,$3,$4)",
            [first_name, last_name, role_id, manager_id]
        );
    }

    //Update employee Role
    UpdateEmployeeRole(id: number, new_role_id: number) {
        return this.query(
            "UPDATE employee SET role_id=$2 WHERE id=$1", // "UPDATE employee SET role_id=$2 WHERE id=$1 ($1,$2)",
            [id, new_role_id]
        );
    }

    //**************Bonus Section ********************

    //Update employee Managers
    UpdateEmployeeManager(emp_id: number, new_emp_mgr_id: number) {
        return this.query(
            "UPDATE employee SET manager_id=$2 WHERE id=$1",
            [emp_id, new_emp_mgr_id]
        );
    }

    //get only the Managers
    getAllManagers() {
        return this.query(
            "Select distinct emp_mgr.manager_id, CONCAT(employee.first_name ,' ', employee.last_name) as Manager\
            from employee emp_mgr\
            INNER JOIN \
            employee \
            ON \
            emp_mgr.manager_id = employee.id \
            ORDER BY \
            Manager;"
        );
    }


    //get employees by Manager
    getEmployeesByManager(emp_mgr_id: number) {
        return this.query(
            "SELECT emp.id,emp.first_name,emp.last_name,emp.role_id,emp.manager_id,\
            role.title,role.salary,role.department_id,department.name,\
            CONCAT(emp_manager.First_Name, ' ', emp_manager.Last_Name) as Manager \
            FROM \
            employee AS emp INNER JOIN role ON emp.role_id = role.id \
            INNER JOIN department ON role.department_id = department.id \
            LEFT JOIN employee AS emp_manager on emp.manager_id = emp_manager.id \
            WHERE \
            emp.manager_id=$1 ORDER BY emp.first_name,emp.last_name;",
            [emp_mgr_id]
        );
    }

    //get all employees by Department
    getEmployeesByDepartment(emp_dept_id: number) {
        return this.query(
            "SELECT emp.id,emp.first_name,emp.last_name,emp.role_id,emp.manager_id,\
            role.title,role.salary,role.department_id,department.name,\
            CONCAT(emp_manager.First_Name, ' ', emp_manager.Last_Name) as Manager \
            FROM \
            employee AS emp INNER JOIN role ON emp.role_id = role.id \
            INNER JOIN department ON role.department_id = department.id \
            LEFT JOIN employee AS emp_manager on emp.manager_id = emp_manager.id \
            WHERE \
            role.department_id=$1 ORDER BY emp.first_name,emp.last_name;",
            [emp_dept_id]
        );
    }

    //get all combined salaries of employees for a given department
    getCombineSalariesByDepartment(emp_dept_id: number) {
        return this.query(
            "SELECT department.name, SUM(role.salary) AS Combined_Salaries \
            FROM \
            employee AS emp INNER JOIN role ON emp.role_id = role.id \
            INNER JOIN department ON role.department_id = department.id \
            WHERE \
            role.department_id=$1 GROUP BY department.name;",
            [emp_dept_id]
        );
    }

    //delete department
    deleteDepartment(department_id: number) {
        return this.query(
            "DELETE FROM department where id=$1",
            [department_id]
        );
    }

    //delete role
    deleteRole(role_id: number) {
        return this.query(
            "DELETE FROM role where id=$1",
            [role_id]
        );
    }

    //delete employee
    deleteEmployee(employee_id: number) {
        return this.query(
            "DELETE FROM employee where id=$1",
            [employee_id]
        );
    }
}