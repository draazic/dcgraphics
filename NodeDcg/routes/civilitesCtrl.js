//const Client = require('./models/client.js');
var models = require('../models');

//Routes
module.exports= {
    create: function (req, res) {

       // params
       var type=req.body.type;
       

       if(type==null ){
           return res.status(400).json({'errors': 'missing parameters'})
       }

       var newCivilite = models.Civilite.create({
           type:type
          
       })
       .then(function(newCivilite){
        return res.status(201).send('ok')
    })
        
    },
    //recupere les clients
    findAll: function (req, res) {
        models.Civilite.findAll()
        .then(civilites => {
            res.send(civilites);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

    },
    findOne: function (req, res) {
        models.Civilite.findById(req.params.id)
        .then(civilite => {
            if(!civilite){
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                }); 

            }
            res.send(client);
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