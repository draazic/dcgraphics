var express = require('express');
var clientsCtrl = require('./routes/clientsCtrl');
var civilitesCtrl = require('./routes/civilitesCtrl');
var objetCtrl = require('./routes/objetCtrl');
var userCtrl = require('./routes/userCtrl');

exports.router=(function(){
    var apiRouter = express.Router();

    apiRouter.route('/client').post(clientsCtrl.create);
    apiRouter.route('/clients').get(clientsCtrl.findAll);
    apiRouter.route('/clients/:id').get(clientsCtrl.findOne);
    

    apiRouter.route('/civilite').post(civilitesCtrl.create);
    apiRouter.route('/civilites').get(civilitesCtrl.findAll);
    apiRouter.route('/civilites/:id').get(civilitesCtrl.findOne);
    
    apiRouter.route('/objet').post(objetCtrl.create);
    apiRouter.route('/objets').get(objetCtrl.findAll);
    apiRouter.route('/objets/:id').get(objetCtrl.findOne);

    apiRouter.route('/register/').post(userCtrl.register);
    apiRouter.route('/login/').post(userCtrl.login);

    apiRouter.route('/me/').get(userCtrl.getUserProfile);
    apiRouter.route('/me/').put(userCtrl.updateUserProfile);
    
    
    return apiRouter;

})();