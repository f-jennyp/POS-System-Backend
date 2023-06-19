const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/csv/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('text/csv')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. CSV files only.'), false);
    }
};

const uploadCSV = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = { uploadCSV }