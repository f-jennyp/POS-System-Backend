const express = require("express");
const app = express();
const multer = require("multer");


const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/images/")
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid. JPEG/PNG ONLY'), false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB max file size
    },
    fileFilter: fileFilter
});


module.exports = { upload }
