const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tinh123',
  database: 'reactjs'
});

connection.connect(function(err){
  if (err) throw err;
console.log("Connected!!!")
});

app.get('/api/task', (req, res) => {
  var sql = "SELECT * FROM task";
  connection.query(sql,function(err,results){
      if (err) throw err;
      res.json({task: results});
  });
});

app.post('/api/insert', function(req,res){
  var sql = "INSERT INTO task(ID,Name,Status) VALUES('"
              + req.body.ID + "','"
              + req.body.Name + "','"
              + req.body.Status + "')";
  connection.query(sql,function (err,results) {
    if(err) throw err;
    res.json({task: results});
  });
});

app.post('/api/edit', (req, res) => {
  var sql = "UPDATE task SET "
          +   "Name='"+req.body.Name+"',"
          +   "Status='"+req.body.Status+"'"
          + "WHERE ID='"+req.body.ID+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});

app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM task "
          + "WHERE ID='"+req.body.ID+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});