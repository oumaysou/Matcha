import { db } from '../../initDb.js';
import multer from 'multer';
import path from 'path';
import Jimp from 'jimp';
import mmm from 'mmmagic';
import fs from 'fs';

const savePictures = (req, res) => {   
    const Magic = mmm.Magic;
    
    // const pics = await generalQuery.get({table: 'photos', field: 'photoBy', value: oldusername})

    // Set Storage engine
    const storage = multer.diskStorage({
        destination: 'public/img',
        filename: function (req, file, cb){
            cb(null,file.originalname + "-" + Date.now() + path.extname(file.originalname))
        }
    })

    // Init upload 
    const upload = multer ({
        storage : storage,
        limits:{fileSize: 10000000},
        fileFilter: function(req, file, cb){
            checkFileType(file,cb);
        }
    }).single('myImage')
    
    function checkFileType(file, cb){
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype =filetypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null,true)
        }
        else{
           cb(console.log("IMAGE ONLY"));
        }
    }

    upload(req, res, (err) =>{
        const message = "Something went wrong with your picture"
        if(err){
            console.log('ERROR UPLOAD', err);
        }
        else{
            console.log(req.file);
            var magic = new Magic(mmm.MAGIC_MIME_TYPE);
            magic.detectFile(req.file.path, function(err, result) {
            if (result !== "image/jpeg" && result !== "image/png") {
                fs.unlink(req.file.path, function(err) {});
                return res.send({
                    success: false,
                    message: "Sorry but this file is not an Image"
                });
            } 
            else {
                Jimp.read(req.file.path, (err, img) => {
                if (err)
                    return error(
                    res,
                    message
                    );
                img.resize(300, Jimp.AUTO).write(req.file.path);

                // fs.unlinkSync(req.file.path);
                // const avatar = `${
                //     process.env.APIURL
                // }/uploads/avatar/${newFileName}`;
                // return res.send({
                //     success: true,
                //     avatar,
                //     error: []
                // });
                })
            }
            })
        }
    })
}

module.exports = savePictures;