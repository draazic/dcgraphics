var bcrypt   = require('bcrypt');
var jwt      = require('jsonwebtoken');
var models   = require('../models');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib =  require('async');
const fs = require('fs');

const EMAIL_REGEX=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX=/^(?=.*\d).{4,9}$/;

module.exports = {
    register: function(req, res){
        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.password;
        var bio = req.body.bio;
        var isAdmin = req.body.isAdmin;

        
        
        

    if (email == "" || name == "" || password == ""){
        return res.status(400).json({'error':'missing parameter'});
        }

    if(name.length>=13 || name.length<=4){
        return res.status(400).json({'error':'wrong name must be length 5 - 12'});
        }
    if(!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error':'email is invalid'});
    }

    if(!PASSWORD_REGEX.test(password)){
        return res.status(400).json({'error':'password is invalid must be length 4 - 9'});
    }

   


       models.user.findOne({
           attributes:['email'],
           where:{email: email}
       })
        .then(function(userFound){
           
            if (!userFound){
                            
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    var newUser = models.user.create({
                                   
                                   email:email,
                                   name:name,
                                   password:bcryptedPassword,
                                   bio:bio,
                                   isAdmin:isAdmin
                                   //urlAvatar default string link of database
                                   
                    })
                                
                    .then(function(newUser){
                            return res.status(201).json({
                                'id': newUser.id,
                                        
                                    })
                                })
                    .catch(function(err){
                            return res.status(500).json({'error':'cannot add user'})
                                })
                            });
                            
            }else{
                            
                return res.status(409).json({'error':'user already existe'});
            }

        })
        .catch(function(err){
            return res.status(500).json({ 'error':'unable to verify user'});
            })

    },
    login: function(req, res){
            //console.log(req.body)
            var email = req.body.email;
            var password =req.body.password;
            //console.log(password);
            if (email=='' || password == '' ){
                return res.status(400).json({'error':'missing paramater'});
            }
            models.user.findOne({
                //attributes:['email'],
                where:{email: email}})

            .then(function(userFound)
            {
                if(userFound){
                    //console.log(userFound.password);
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                        if(resBycrypt){
                            return res.status(200).json({
                                'userId': userFound.id,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            })
                        }else{
                            return res.status(403).json({'error':'invalid password'})
                        }
                    })

                }
                else{
                    return res.status(404).json({'error':'user not exist'})
                }
            })
            .catch(function(err){
                return res.status(500).json({'error':'unable to verify user'});
            });
            

    },
    getUserProfile: function(req, res){

        var headerAuth = req.headers['authorization'];
        var id = jwtUtils.getUserId(headerAuth);
        //console.log(id);

        if(id < 0)
        return res.status(400).json({'error':'wrong token'});

        models.user.findOne({
            attributes:['id','email','name','bio','avatarUrl'],
            where:{id:id}
        }).then(function(user){
            if (user){
                res.status(201).json(user);
            }else{
                res.status(404).json({'error':'user not found test'});
            }
        }).catch(function(err){
            res.status(500).json({'error':'cannot fetch user'});
        });

    },
    updateUserProfile: function(req,res){
     
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        

        if(userId < 0)
        return res.status(400).json({'error':'wrong token'});

       
        let avatar = req.file ? req.file.filename : undefined;
       


        //params
        var name = req.body.name;
        var bio = req.body.bio;
        var avatarUrl = 'http://localhost:3000/avatars/'+ avatar;
        
               

        asyncLib.waterfall([

            function(done){
                models.user.findOne({                    
                    //attributes: ['id','bio'],//modif 
                    attributes:['id','email','name','bio','avatarUrl'],
                    where: {id:userId}

            }).then(function(userFound){
                console.log("userFound");

                    done(null, userFound);
                })
               
            },
            function(userFound, done){
                

                if(userFound){

                    if(avatar!=null || avatar!=undefined){
                     
                      
                      let urlStr = userFound.avatarUrl;
                      var fileToDelete=urlStr.substr(22);
                      console.log(fileToDelete);

                      fs.unlink(fileToDelete, (err) => {
                         if (err) throw err;
                         res.status(200).send({msg:"deleted"})                  
                         console.log('file was deleted');
                                          
                         })

                        userFound.update({
                           avatarUrl: null,
                           })
                           userFound.update({
                        
                            name: (name == "undefined" || name == "" ? userFound.name : name),                            
                            bio: (bio = undefined ? userFound.bio : bio),
                            avatarUrl: (avatarUrl ? avatarUrl: userFound.avatarUrl),
                            
                            data: fs.readFileSync(__basedir + '/avatars/' + req.file.filename)
    
                        })
                        .then(image => {
                            try{
                              var test=image.url;
                              var text = new String(test);
                              fs.writeFileSync(text);         
                              // exit node.js app
                              res.json({'msg': 'File uploaded successfully!', 'file': req.file});
                            }catch(e){
                              console.log(e);
                              res.json({'err': e});
                            }
                          })
                        .then(function(){
                            done(userFound);
                        }).catch(function(err){
                            res.status(500).json({'error':'cannot update user'});
                        });
                    }else{
                      
                        userFound.update({
                         
                            name: (name == "undefined" || name == "" ? userFound.name : name),                            
                            bio: (bio = undefined ? userFound.bio : bio),                            
                        })                       
                        .then(function(){
                            console.log("reponce : " + name);
                            done(userFound);
                        }).catch(function(err){
                            res.status(500).json({'error':'cannot update user'});
                        });
                    }
                
                }else{
                    res.status(404).json({'error':'user not found for update'});

                }
            }
        ],function(userFound){
            if(userFound){
                return res.status(201).json(userFound);
            }else{
                return res.status(500).json({'error':'cannot update user profil'});

            }
        });

    }

}
