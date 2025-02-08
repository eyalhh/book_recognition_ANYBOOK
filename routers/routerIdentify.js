const express = require("express")
const router = express.Router();

// initializing multer to handle file uploading 
const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, 'uploads');
    }

});

const uploads = multer({storage: storage});

// endpoint to split image into seperate recognizable images
router.post('/api/split', uploads.single('file'), (request, response) => {
    if (!request.file) return response.statusCode(400);
    
})

// main endpoint to identify
router.post('/api/identify', uploads.single('file'), (request, response) => {
    if (!request.file) return response.sendStatus(400);
    return response.send({message: "You uploaded a file ! thanks for cooperating !"});
})


module.exports = router;