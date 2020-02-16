const multer = require('multer');


var storage = multer.diskStorage({
    
  destination: (req, file, cb) => {
    
    cb(null, __basedir + '/avatars/')
  },
  filename: (req, file, cb) => {
    console.log("file:" + file);
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});

console.log("Storage: " + storage); 
var uploadAvatar = multer({storage: storage});
//console.log(uploadAvatar); 
 
module.exports = uploadAvatar;