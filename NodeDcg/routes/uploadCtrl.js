var models = require('../models');
const fs = require('fs');
var path = require("path");
var jwtUtils = require('../utils/jwt.utils');



// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => { 
    //console.log(req);
    //var headerAuth = req.headers['authorization'];
    // var userId = jwtUtils.getUserId(headerAuth);

    // console.log("l'id: "+userId);
    // console.log("req: "+req.file); 
    //console.log(req);

models.portfolio.create({
    //titre: req.file.originalname, 
    titre: req.body.name, 
    content: req.body.content,
    likes: req.body.likes,  
    url: 'http://localhost:3000/uploads/'+ req.file.filename,

    userId:1,
    data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    
  }).then(image => {
    try{
      fs.writeFileSync(image.url);         
      // exit node.js app
      res.json({'msg': 'File uploaded successfully!', 'file': req.file});
    }catch(e){
      console.log(e);
      res.json({'err': e});
    }
  })
};

exports.find = (req, res) => { 
    //console.log(models.portfolio.findAll())
    models.portfolio.findAll()
    .then(portfolios => {
        res.send(portfolios);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.deleteById = (req, res) =>{

  models.portfolio.findOne({
    where: {id: req.params.id}
    }).then(function(portfolio) {
      //console.log(portfolio.url);
      let urlStr=portfolio.url;
      
      console.log(urlStr)
      var url=urlStr.substr(22);
      console.log(url)
      //fs.unlink(path.join("http://localhost:3000/uploads/uploadfile-1580570421763-elephant-1822636_1920.jpg" ), (err) => {
      fs.unlink(path.join(url), (err) => {
      if (err) throw err;
      res.status(200).send({msg:"deleted"})

      console.log('file was deleted');
      return portfolio.destroy()

      })
              
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  // expected output: "Success!"
}
  
  

 








