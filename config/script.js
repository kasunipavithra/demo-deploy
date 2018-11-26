var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyParser = require('body-parser');

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
    
app.listen(3000);