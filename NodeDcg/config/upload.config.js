const multer = require('multer');
 
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});
//console.log(storage); 
var upload = multer({storage: storage});
//console.log(upload); 
 
module.exports = upload;