const multer = require('multer');
const path = require('path');

const maxSize = 50 * 1000 * 1000;

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { cb(null, 'images')}, 
    filename: (req, file, cb) => { cb(null, file.fieldname + path.extname(file.originalname))} 
});

const upload = multer({
    storage: storage,
    limits: {fileSize:maxSize},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype); 
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 
        
        if (mimetype && extname) {return cb(null, true);} 
      
        cb(`Error: File upload only supports: ${filetypes}`); 
    }
}).any();

module.exports = {
    upload
}