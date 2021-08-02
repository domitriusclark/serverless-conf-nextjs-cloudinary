const cloudinary = require('cloudinary').v2;
import multer from 'multer';
import streamifier from 'streamifier';

// initialize multer for buffer or in memory storage
let storage = multer.memoryStorage();
let upload = multer({
  storage: storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  upload.single('image')(req, {}, async (err) => {
    // do error handling here
    streamifier.createReadStream(req.file.buffer).pipe(
      cloudinary.uploader.upload_stream(
        {
          folder: req.body.folder,
          resource_type: req.body.type || 'auto',
          public_id: req.body.public_id,
        },
        function (error, result) {
          if (error) res.status(500).send(error);
          res.status(200).send(result);
          res.end();
        },
      ),
    );
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
