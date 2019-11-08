var jwt = require('jsonwebtoken');

const  JWT_SIGN_SECRET = 'hkhs34vsvsd5fgs8hrthtrh45fgguip0sdzdf1';

module.exports = {
    generateTokenForUser: function(userData){
      return jwt.sign({
          id: userData.id,
          isAdmin:userData.isAdmin
      },
    JWT_SIGN_SECRET, {
        
        expiresIn: '1h'
      }) 

    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ',''):null;

    },
    getUserId: function(authorization){
        var id = -1;
        var token = module.exports.parseAuthorization(authorization);
        console.log(token)
        if(token != null){
            
            try{                
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                //console.log(JWT_SIGN_SECRET)
                
                if(jwtToken != null)
                    id=jwtToken.id
                    console.log(jwtToken.id)
            } catch(err){
                
                console.log('error')}
        
          
        }
        return id
    }
}