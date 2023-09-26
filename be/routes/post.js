import express from 'express';
import multer from "multer";
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uploadSingleFile } from '../utils/aws-s3.js';
import aws from 'aws-sdk';

// Configure AWS SDK with your credentials
aws.config.update({
  accessKeyId: process.env.S3_API_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

import multerS3 from 'multer-s3'

import { post, deletePost, postLiked, addLike, removeLike, addComment,deleteComment } from '../controllers/postC.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const absolutePath = path.resolve(__dirname, "..", "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, absolutePath);
      // cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new Error("only images is allowed"));
};
  
// const upload = multer({ storage, fileFilter });
// Configure Multer to upload files to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'YOUR_S3_BUCKET_NAME',
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
    key: function (req, file, cb) {
      cb(null, 'uploads/' + file.originalname); // Set the object key in S3
    },
  }),
});


// Configure multer for handling file uploads
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
// });

const router = express.Router()

// router.post("/addPost", upload.single("image"),post);
router.post("/addPost", post);
router.post("/delete-post",deletePost);
router.post("/post-liked",postLiked);
router.post("/add-comment",addComment);
router.post("/delete-comment",deleteComment)
router.post("/add-like",addLike);
router.post("/remove-like",removeLike)

export default router;