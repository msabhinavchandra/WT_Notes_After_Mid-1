/* 
Write a MongoDB query to find the total number of employees in each department.

Database: test
Collection: employees

Sample Document:
----------------
{
"empno":111,
"name": "Jiya Brein",
"age": 32, 
 "gender":"Female", 
 "department":"HR", 
 "year":2011, 
 "salary":25000.0
 }

Note: 
=====
To write the query, use printjson() method from 'mongosh' module
e.g., To display all the documents from 'employees' collection 
from 'test' database.
    
    => printjson( db.getSiblingDB('test').employees.find() )
    Where,
    db => databse connection object
    getSiblingDB('test') => "test" is database name
    employees => collections name
    find => method to retrieve all the matched docuemnts

*/
printjson(
    db.getSiblingDB('test').employees.
        aggregate([{ $group: { _id: "$department", count: { $count: {} } } }]));