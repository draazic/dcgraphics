//const Client = require('./models/client.js');
var models = require('../models');

//Routes
module.exports= {
    create: function (req, res) {
        console.log(req);
       // params
       var choix=req.body.choix;
       console.log(choix);

       if(choix==null ){
           
           return res.status(400).json({'errors': 'missing parameters'})
       }

       var newObjet = models.Objet.create({
        choix:choix
          
       })
       .then(function(newObjet){
           return res.status(201).send('ok')
       })
  
       
        
    },
    //recupere les clients
    findAll: function (req, res) {
        models.Objet.findAll()
        .then(objets => {
            //console.log(objets);
            res.send(objets);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

    },
    findOne: function (req, res) {
        models.Objet.findById(req.params.id)
        .then(objet => {
            if(!objet){
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                }); 

            }
            res.send(objet);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
        
    }


}