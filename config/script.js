
var express = require('express');
//var mysql = require('mysql');
var app = express();
const bodyParser = require('body-parser');






/************wamp connection
var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'db_vis',

    host: '127.0.0.1',
   user: 'root',
   password: '',
   database: 'watercrowddb',
   multipleStatements: true
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});

/************wamp connection ends */


/*****************mamp connection 
var connection = mysql.createConnection({
    user : 'root',
    password: '',
    database: 'test',
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    
   //for non MAMP, might be
    
   //socketPath : '/tmp/mysql.sock',
   });
    
   connection.connect(function(err) {
    if (err) {
    console.log('db_connection_err', err);
    return;
    }
   });
    
   connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
   console.log('The solution is: ', rows[0].solution);
    
   });
/*****************mamp connectiion ends */










// Get our API routes
//const api = require('../server/routes/api');

// Set our api routes
//app.use('/api', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

//Get candidate name and position
/*
app.get('/api/candidates', function(req, res) {
    connection.query("SELECT * FROM markers", function(error, rows, fields){
        if(!!error){
            console.log(error);
        } else {
            console.log('Successful query');
            res.json(rows);
        }
    });
})
*/

app.post('/api/customers', function(req, res){
    var postData = req.body;
    console.log("POST Collaborator: "+ postData);
    /*
    var sql1 = "SELECT count(*) AS solution from collaborator where employee_id='"+postData.employee_id+"'";
    connection.query(sql1, function(error, results, fields){
        if(error){
            console.log(error);
        } else {
            if(results[0].solution<1){
                var sql = "INSERT INTO collaborator (employee_id) VALUES ('"+postData.employee_id+"')";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                });
            }else{
                console.log("Duplicate entry");
            }
        }
    });
    */
});


    
app.listen(3000);