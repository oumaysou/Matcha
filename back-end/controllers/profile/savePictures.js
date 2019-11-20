import { db } from '../../initDb.js';
import multer from 'multer';
import path from 'path';

const savePictures = (req, res) => {

    // Set Storage engine
    const storage = multer.diskStorage({
        destination: 'public/img',
        filename: function (req, file, cb){
            cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    })

    // Init upload 
    const upload = multer ({
        storage : storage
    }).single('myImage')
    
    upload(req, res, (err) =>{
        if(err){
            console.log('ERROR UPLOAD', err);
        }
        else{
            console.log(req.file);
        }
    })

    return false;
};

module.exports = savePictures;