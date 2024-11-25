--\c postgres;

-- DROP & CREATE DATABASE
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

--connect to employee_db
\c employee_db;

--CREATE department Table

CREATE TABLE department(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
)

--CREATE role Table

CREATE TABLE role(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE RESTRICT
)

--CREATE employee Table

CREATE TABLE employee(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE RESTRICT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE RESTRICT
)