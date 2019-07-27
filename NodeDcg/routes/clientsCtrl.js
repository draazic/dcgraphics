//const Client = require('./models/client.js');
var models = require('../models');

//Routes
module.exports= {
    create: function (req, res) {

       // params
       var civiliteId=req.body.civiliteId;
       var objetId=req.body.objetId;
       var forname=req.body.forname;
       var mail=req.body.mail;
       var name=req.body.name;
       var phone=req.body.phone;
       var text=req.body.text;
       var enterprise=req.body.enterprise;

       if(civiliteId==null || objetId==null || forname==null || mail==null || name==null || phone==null || text==null || enterprise==null ){
           return res.status(400).json({'errors': 'missing parameters'})
       }

       var newClient = models.Client.create({
           civiliteId:civiliteId,
           objetId:objetId,
           forname:forname,
           mail:mail,
           name:name,
           phone:phone,
           text:text,
           enterprise:enterprise
       })
       .then(function(newClient){
        return res.status(201).send('ok')
    })
        
    },
    //recupere les clients
    findAll: function (req, res) {
        models.Client.findAll()
        .then(clients => {
            res.send(clients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

    },
    findOne: function (req, res) {
        models.Client.findByPk(req.params.id)
        .then(client => {
            if(!client){
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
        
    },
    deleteById: function(req, res, next) {
        console.log(req.params.id)

        models.Client.destroy({
            where: {
              id: req.params.id
            }
          }).then(function(client) {
            res.json(client);
          });
       }


}