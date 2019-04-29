//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const cors = require('cors');
//instanciate

var server = express();

//body parser config
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


//routes

server.get('/', function (req, res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bonjour</>');
});
server.use(cors());
server.use('/contact/',apiRouter);
//launch 
server.listen(3000, function(){
    console.log('Server en ecoute');
})