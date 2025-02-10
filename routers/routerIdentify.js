const express = require("express")
const router = express.Router();
const detectObjects = require("../utils/analyzingFunctions");
const path = require("path");
// initializing multer to handle file uploading 
const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

});

const uploads = multer({storage: storage});


// main endpoint to identify
router.post('/api/identify', uploads.single('file'), (request, response) => {
    if (!request.file) return response.sendStatus(400);
    const imagePath = path.join(__dirname, "../", "uploads", request.file.originalname);
    detectObjects(imagePath);
    return response.sendStatus(200);
})


module.exports = router;