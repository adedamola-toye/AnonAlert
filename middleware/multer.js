import multer from 'multer';
// Add these imports to the top of your Multer file
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination:function(req, file,cb){
        const uploadPath = join(__dirname, '..', 'uploads');
         if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb){
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/') ||file.mimetype.startsWith('video/')){
        cb(null, true)
    }
    else{
        cb({message: 'Unsupported file format detected'}, false)
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
})

export default upload;
