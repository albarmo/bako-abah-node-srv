const multer = require('multer');
const fs = require('fs');

const uploader = (fileNamePrefix) => {
  let defaultPath = './public/uploads';
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (fs.existsSync(defaultPath)) {
        cb(null, defaultPath);
      } else {
        fs.mkdir(defaultPath, { recursive: true }, (err) => {
          cb(err, defaultPath);
        });
      }
    },
    filename: (req, file, cb) => {
      let originalFileName = file.originalname;
      let originalExtension = originalFileName.split('.');
      let createFileName = fileNamePrefix + Date.now() + '.' + originalExtension[originalExtension.length - 1];
      cb(null, createFileName);
    },
  });

  const imageFilter = (req, file, cb) => {
    const extension = /\.(jpg|jpeg|png|gif|pdf)$/;
    if (!file.originalname.match(extension)) {
      return cb(new Error('Only JPG,JPEG,PNG,GIF,PDF type allowed'), false);
    } else {
      cb(null, true);
    }
  };

  return multer({
    storage: storage,
    fileFilter: imageFilter,
  });
};

module.exports = uploader;
