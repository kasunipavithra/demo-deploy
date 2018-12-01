
var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyParser = require('body-parser');
var Nominatim = require('nominatim-geocoder');
const Geo = require('open-street-map-reverse-geo-node-client')

//var geocoder = new Nominatim();

const geocoder = new Nominatim({}, {
    format: 'json',
    limit: 5,
  })





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
    password: 'root',
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
    
  
                var sql = "INSERT INTO customers (firstname,lastname,age) VALUES ('"+postData.firstname+"','"+postData.lastname+"',"+postData.age+")";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                });
            
    
});





  //converting address to coordinates
  app.get('/api/coordinate_suggestion/:searchString', function(req, res) {
    
    var searchString = req.params['searchString'];
    console.log("searchString"+searchString);
    geocoder.search( { q: searchString } )
    .then((response) => {
        console.log('Successful retrived suggestions');
        console.log(response)
        res.json(response)
    })
    .catch((error) => {
        console.log(error)
    });

})


//converting coordinates to address



var geocoding =  require('reverse-geocoding');

 //converting address to coordinates
 app.get('/api/location_suggestion/:lat/:lng', function(req, res) {

    var lat = req.params['lat'];
    var lng = req.params['lng'];
    const reverse = new Geo.ReverseGeocoder()

    reverse.getReverse(lat, lng)
        .then((location)=>{console.log(location)
            res.json(location)
        })
        .catch(err=>{console.error(err)})

})







    
app.listen(3000);