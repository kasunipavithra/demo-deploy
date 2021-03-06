
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





/************wamp connection*/
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
    
    
  
                var sql = "INSERT INTO customers (firstname,lastname,age) VALUES ('"+postData.firstname+"','"+postData.lastname+"',"+postData.age+")";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                });
            
    
});



app.post('/api/saveuser', function(req, res){
    var postData = req.body;
    
    console.log("POST Collaborator: "+ postData.picture+"");
    var mystr = postData.picture+"";
  
                var sql = "INSERT IGNORE INTO user (name,email,picture) VALUES ('"+postData.name+"','"+postData.email+"','"+mystr+"')";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                });
            
    
});

//read all tags

app.get('/api/alltags', function(req, res) {
    connection.query("SELECT * from tag", function(error, rows, fields){
        if(!!error){
            console.log(error);
        } else {
            console.log('Successful query');
            res.json(rows);
        }
    });
})



app.post('/api/addpost', function(req, res){
    var postData = req.body;

    console.log(postData.tag);
    
    var sql = "INSERT INTO post (title,description,address,lat,lng,email,certified ) VALUES ('"+postData.title+"','"+postData.description+"','"+postData.address+"',"+postData.lat+","+postData.lng+",'"+postData.email+"',"+postData.certified+")";
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
        res.json(results);
        console.log(results.insertId);
     });

    })             


app.post('/api/addtags', function(req, res){
            var postData = req.body;
            console.log("from add tags");         
                var sqle = "INSERT INTO post_tag (post_id,tag ) VALUES ("+postData.post_id+",'"+postData.tag+"')";
                    connection.query(sqle, function (error, results, fields) {
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
    console.log("from drop pin ts lat"+lat+"lon"+lng);
    const reverse = new Geo.ReverseGeocoder()

    reverse.getReverse(lat, lng)
        .then((location)=>{console.log(location)
            res.json(location)
        })
        .catch(err=>{console.error(err)})

})





//SEARCH QUERIES

//RADIUS LAT LNG
app.get('/api/pointsradius/:lat/:lng/:radius/:startDate/:endDate', function(req, res) {

    var lat = +req.params['lat'];
    var lng = +req.params['lng'];
    var radius = +req.params['radius'];
    var startDate = req.params['startDate'];
    var endDate = req.params['endDate'];

    console.log("Radius is*********"+radius);

    var sql = " SELECT *, ( 6371 * ACOS( COS( RADIANS( lat ) ) * COS( RADIANS( "+lat+" ) ) * COS( RADIANS( "+lng+" ) - RADIANS( lng ) ) + SIN( RADIANS( lat ) ) * SIN( RADIANS( "+lat+") ) ) ) AS distance FROM post HAVING distance <= "+radius+" AND timestamp >'"+startDate+"' AND timestamp <= '"+endDate+"' ORDER BY distance ASC";

    console.log(sql);
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    console.log(results);
                });
})



 //get tags of post
 app.get('/api/user/:email', function(req, res) {
    
    var postid = req.params['email'];
    console.log("email"+postid);
 
    var sql = "SELECT * FROM  WHERE post_id="+postid+"";

   
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//get user details

app.get('/api/posttag/:postid', function(req, res) {
    
    var postid = req.params['postid'];
    console.log("postid"+postid);
 
    var sql = "SELECT * FROM post_tag WHERE post_id="+postid+"";

   
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})

//read all post details
 //get tags of post
 app.get('/api/readposts/:id', function(req, res) {
    
    var postid = req.params['id'];

    var sql = "SELECT * FROM post INNER JOIN user ON user.email = post.email WHERE post.id = "+postid+"";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})

//read all posts of given user

 app.get('/api/userposts/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "SELECT id FROM post WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })


//read organization token

app.get('/api/readtoken', function(req, res) {
    
  

    var sql = "SELECT token from organization WHERE name='rotaract'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//set organization token

app.get('/api/settoken/:token', function(req, res) {
    
    var token = req.params['token'];

    var sql = "UPDATE organization SET token='"+token+"' WHERE name='rotaract'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })




//read user verified

app.get('/api/userverified/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "SELECT verified from user WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//set user verified

app.get('/api/setuserverified/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "UPDATE user SET verified=1 WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })


         
app.get('/api/readVote/:id/:email', function(req, res) {

    var id = req.params['id'];
    var email = req.params['email'];

    var sql = "SELECT * FROM post_user WHERE post_id="+id+" and user_email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })

//insert a row in post_user when vote is recieved 
app.get('/api/insertVote/:id/:email/:vote', function(req, res) {

    var id = req.params['id'];
    var email = req.params['email'];
    var vote = req.params['vote'];
    var sql;
    if(vote=="up"){
        sql = "INSERT IGNORE INTO post_user (post_id,user_email, upvote, downvote) VALUES ("+id+",'"+email+"',1,0)";
    }else if(vote == "down"){
        sql = "INSERT IGNORE INTO post_user (post_id,user_email, upvote, downvote) VALUES ("+id+",'"+email+"',0,1)";
    }

                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);    
                });


            })


//increase vote count




























//######################################################################################################################
//############################################################################################################################
app.post('/api/saveuserBS', function(req, res){
    var postData = req.body;
    
    console.log("POST Collaborator: "+ postData.picture+"");
    var mystr = postData.picture+"";
  
                var sql = "INSERT IGNORE INTO user (name,email,picture) VALUES ('"+postData.name+"','"+postData.email+"','"+mystr+"')";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                });
            
    
});

//read all tags

app.get('/api/alltagsBS', function(req, res) {
    connection.query("SELECT * from category", function(error, rows, fields){
        if(!!error){
            console.log(error);
        } else {
            console.log('Successful query');
            res.json(rows);
        }
    });
})



app.post('/api/addpostBS', function(req, res){
    var postData = req.body;

    console.log(postData.tag);
    
    var sql = "INSERT INTO business (title,description,address,lat,lng,email,certified ) VALUES ('"+postData.title+"','"+postData.description+"','"+postData.address+"',"+postData.lat+","+postData.lng+",'"+postData.email+"',"+postData.certified+")";
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
        res.json(results);
        console.log(results.insertId);
     });

    })             


app.post('/api/addtagsBS', function(req, res){
            var postData = req.body;
            console.log("from add tags");         
                var sqle = "INSERT INTO business_category (post_id,tag ) VALUES ("+postData.post_id+",'"+postData.tag+"')";
                    connection.query(sqle, function (error, results, fields) {
                    if (error) throw error;
                        res.json(results);
                        
            });
                                    
});
             

        






  //converting address to coordinates
  app.get('/api/coordinate_suggestionBS/:searchString', function(req, res) {
    
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
 app.get('/api/location_suggestionBS/:lat/:lng', function(req, res) {

    var lat = req.params['lat'];
    var lng = req.params['lng'];
    console.log("from drop pin ts lat"+lat+"lon"+lng);
    const reverse = new Geo.ReverseGeocoder()

    reverse.getReverse(lat, lng)
        .then((location)=>{console.log(location)
            res.json(location)
        })
        .catch(err=>{console.error(err)})

})





//SEARCH QUERIES

//RADIUS LAT LNG
app.get('/api/pointsradiusBS/:lat/:lng/:radius/:startDate/:endDate', function(req, res) {

    var lat = +req.params['lat'];
    var lng = +req.params['lng'];
    var radius = +req.params['radius'];
    var startDate = req.params['startDate'];
    var endDate = req.params['endDate'];

    console.log("Radius is*********"+radius);

    var sql = " SELECT *, ( 6371 * ACOS( COS( RADIANS( lat ) ) * COS( RADIANS( "+lat+" ) ) * COS( RADIANS( "+lng+" ) - RADIANS( lng ) ) + SIN( RADIANS( lat ) ) * SIN( RADIANS( "+lat+") ) ) ) AS distance FROM business HAVING distance <= "+radius+" AND timestamp >'"+startDate+"' AND timestamp <= '"+endDate+"' ORDER BY distance ASC";

    console.log(sql);
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    console.log(results);
                });
})



 //get tags of post
 app.get('/api/userBS/:email', function(req, res) {
    
    var postid = req.params['email'];
    console.log("email"+postid);
 
    var sql = "SELECT * FROM  WHERE post_id="+postid+"";

   
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//get user details

app.get('/api/posttagBS/:postid', function(req, res) {
    
    var postid = req.params['postid'];
    console.log("postid"+postid);
 
    var sql = "SELECT * FROM business_category WHERE post_id="+postid+"";

   
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})

//read all post details
 //get tags of post
 app.get('/api/readpostsBS/:id', function(req, res) {
    
    var postid = req.params['id'];

    var sql = "SELECT * FROM business INNER JOIN user ON user.email = business.email WHERE id = "+postid+"";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})

//read all posts of given user

 app.get('/api/userpostsBS/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "SELECT id FROM business WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })


//read organization token

app.get('/api/readtokenBS', function(req, res) {
    
  

    var sql = "SELECT token from organization WHERE name='rotaract'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//set organization token

app.get('/api/settokenBS/:token', function(req, res) {
    
    var token = req.params['token'];

    var sql = "UPDATE organization SET token='"+token+"' WHERE name='rotaract'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })




//read user verified

app.get('/api/userverifiedBS/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "SELECT verified from user WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//set user verified

app.get('/api/setuserverifiedBS/:email', function(req, res) {
    
    var email = req.params['email'];

    var sql = "UPDATE user SET verified=1 WHERE email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })


         
app.get('/api/readVoteBS/:id/:email', function(req, res) {

    var id = req.params['id'];
    var email = req.params['email'];

    var sql = "SELECT * FROM post_user WHERE post_id="+id+" and user_email='"+email+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });


            })

//insert a row in post_user when vote is recieved 
app.get('/api/insertVoteBS/:id/:email/:vote', function(req, res) {

    var id = req.params['id'];
    var email = req.params['email'];
    var vote = req.params['vote'];
    var sql;
    if(vote=="up"){
        sql = "INSERT IGNORE INTO business_user (post_id,user_email, upvote, downvote) VALUES ("+id+",'"+email+"',1,0)";
    }else if(vote == "down"){
        sql = "INSERT IGNORE INTO business_user (post_id,user_email, upvote, downvote) VALUES ("+id+",'"+email+"',0,1)";
    }

                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);    
                });


            })












  app.post('/api/addpostBSR', function(req, res){
    var postData = req.body;

    console.log(postData.tag);
    
    var sql = "INSERT INTO request (title,description,address,lat,lng,email,certified ) VALUES ('"+postData.title+"','"+postData.description+"','"+postData.address+"',"+postData.lat+","+postData.lng+",'"+postData.email+"',"+postData.certified+")";
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
        res.json(results);
        console.log(results.insertId);
     });

    })             


app.post('/api/addtagsBSR', function(req, res){
            var postData = req.body;
            console.log("from add tags");         
                var sqle = "INSERT INTO request_category (post_id,tag ) VALUES ("+postData.post_id+",'"+postData.tag+"')";
                    connection.query(sqle, function (error, results, fields) {
                    if (error) throw error;
                        res.json(results);
                        
            });
                                    
});



app.get('/api/taggedRequests/:tag', function(req, res) {
    
    var tags = req.params['tag'];

    var sql = "SELECT post_id from request_category WHERE tag='"+tags+"'";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


//read all post details
 //get tags of post
 app.get('/api/readpostRX/:id', function(req, res) {
    
    var postid = req.params['id'];

    var sql = "SELECT * FROM request INNER JOIN user ON user.email = request.email WHERE id = "+postid+"";
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})


app.get('/api/posttagRX/:postid', function(req, res) {
    
    var postid = req.params['postid'];
    console.log("postid"+postid);
 
    var sql = "SELECT * FROM request_category WHERE post_id="+postid+"";

   
                connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                    res.json(results);
                    
                });

})
//######################################################################################################################
//################################################################################################################################












app.listen(3000);