//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const cors = require('cors');
//var sequelize = require('sequelize');

global.__basedir = __dirname;

//sequelize.sync({ force: true }) .then(function(err) { console.log('It worked!'); }, function (err) { console.log('An error occurred while creating the table:', err); }); 


//instanciate

var server = express();

//body parser config
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json({limit:'50mb'})); 

//upload params


//routes

server.get('/', function (req, res) {
    console.log("coucou")
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bonjour<h1/>');
});
server.use(cors());
server.use('/api/',apiRouter);
//server.use(express.static(path.join(__dirname, 'upload')));


//launch 
server.listen(3000, function(){
    console.log('Server en ecoute');
})