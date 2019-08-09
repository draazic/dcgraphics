var models = require('../models');
const fs = require('fs');


// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => { 
    console.log(req);

    //console.log(req.body);
    //console.log(req.body); 

models.portfolio.create({
    //idUser: req.body.idUser,
    titre: req.file.originalname, 
    content: req.body.content,
    likes: req.body.likes,  
    //url: req.file.destination + req.file.filename,
    url: 'http://localhost:3000/uploads/'+ req.file.filename,

    userId:  req.body.userId,
    //name: req.file.originalname,
    data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    
  }).then(image => {
    try{
      fs.writeFileSync(__basedir + '/tmp/' + image.titre, image.url);    
      
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
      console.log(portfolio);

      fs.unlink(portfolio.url, (err) => {
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
  
  

 








