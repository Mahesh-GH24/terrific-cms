-- insert rows into department Table
INSERT INTO department(name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Education'),
        ('Legal'),
        ('Sales'),
        ('HR'),
        ('Services');

-- insert rows into role Table
INSERT INTO role(title,salary,department_id)
VALUES  ('Software Engineer','120000',1),
        ('Accountant','80000',2),
        ('Tutoring Assistant','100000',3),
        ('Attorney','150000',4),
        ('Account Manager','160000',5),
        ('Recruiting Coordinator','60000',6),
        ('Project Manager','110000',7);

-- insert rows into employee Table
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES  ('John','Christopher',1,null),
        ('Mike','Fishmann',2,5),
        ('Ashley','Johnson',3,5),
        ('Kevin','Iverson',4,null),
        ('Krunal','Pandya',5,null),
        ('Malia','Burt',6,7),
        ('Sarah','Bryant',7,5);

