const multer = require("multer");

const uploader = (fileNamePrefix) => {
    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            let originalFileName = file.originalname;
            let originalExtension = originalFileName.split(".");
            let createFileName =
                fileNamePrefix +
                Date.now() +
                "." +
                originalExtension[originalExtension.length - 1];
            cb(null, createFileName);
        },
    });
    const imageFilter = (req, file, cb) => {
        const extension = /\.(jpg|jpeg|png|gif|pdf)$/;
        if (!file.originalname.match(extension)) {
            return cb(
                new Error("Only JPG,JPEG,PNG,GIF,PDF type allowed"),
                false
            );
        } else {
            cb(null, true);
        }
    };

    return multer({
        storage: storage,
        fileFilter: imageFilter,
        limits: {
            fileSize: 2 * 1024 * 1024, // limit file size to 5MB
        },
    });
};

module.exports = uploader;
