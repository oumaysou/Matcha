import { db } from '../../initDb.js';
import generalQuery from '../../models/generalQuery.js';
import multer from 'multer';
import path from 'path';
import Jimp from 'jimp';
import mmm from 'mmmagic';
import fs from 'fs';

const saveAvatar = (req, res) => {   
    const Magic = mmm.Magic;

    // Set Storage engine
    const storage = multer.diskStorage({
        destination: '../front-end/public/img',
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
    }).single('myAvatar')
    
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
                

                const userName = (req.file.path.split('/').pop()).split('.').shift();
                
                generalQuery.update({ 
                    table: 'users', 
                    field : 'avatar', 
                    value: req.file.path, 
                    where: 'username', 
                    whereValue: userName 
                }).then((success) => {
                    if (success) {
                        res.status(200).send({
                            success: true,
                            message: "Picture saved",
                        });
                    }
                    else {                     
                        return res.send({
                            success: false,
                            message: "Something went wrong with your picture",
                        });
                    }
                })
                })
            }
            })
        }
    })
}

const delAvatar = (req, res) => {
    fs.unlink(req.body.oldPath, (err) => {
        if (err) {
            return res.send({
            success: false,
            message: "Something went wrong with your picture",
        });}
        res.status(200).send({
            success: true,
            message: "Picture Deleted",
        });
      });
}
module.exports = { saveAvatar, delAvatar };