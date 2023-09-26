import express from 'express';
import multer from "multer";

// import setUserProfilePic from '../controllers/setUserProfilePic.js';
// import setUserCoverPic from '../controllers/setUserCoverPic.js';
// import allUsersPosts from '../controllers/allUsersPosts.js';
// import getUserProfilePic from '../controllers/userProfilePic.js';
// import sendFriendRequest from '../controllers/sendFriendRequest.js';
// import acceptFriendRequest from '../controllers/acceptFriendRequest.js';
// import removeFriend from '../controllers/removeFriend.js';
// import deleteFriendRequest from '../controllers/deleteFriendRequest.js';
// import isAnyRequest from '../controllers/isAnyRequest.js';

import { login, register, getUser, searchUser, allUsersPosts, setUserProfilePic, setUserCoverPic, getUserProfilePic, sendFriendRequest, acceptFriendRequest, removeFriend, deleteFriendRequest, isAnyRequest } from '../controllers/user.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
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
  
const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/login',login);
router.post('/register',register);
router.post("/get-user",getUser);
// router.post("/change-cover-photo",upload.single("coverPhoto"),setUserCoverPic);
// router.post("/change-profile-photo",upload.single("profilePhoto"),setUserProfilePic);
router.post("/change-cover-photo",setUserCoverPic);
router.post("/change-profile-photo",setUserProfilePic);
router.post("/search-user",searchUser);
router.get("/users-posts/:id",allUsersPosts);
router.get("/user-pic/:userId",getUserProfilePic);
router.post("/send-friend-request",sendFriendRequest);
router.post("/accept-friend-request",acceptFriendRequest);
router.post("/remove-friend",removeFriend);
router.post("/delete-friend-request",deleteFriendRequest);
router.post("/profile/is-any-request",isAnyRequest);


export default router