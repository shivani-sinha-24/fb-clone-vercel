import User from '../models/User.js';
import Post from '../models/Post.js';

const setUserCoverPic = (req, res) => {
    let imgFile;
    if (req.file) {
        imgFile = req.file.filename;
    }
    const { userId } = req.body;

      if (imgFile !== undefined) {
        //image
        User.findOneAndUpdate(
            ({_id:userId}),
            {coverPhoto:imgFile},
            {new: true},
            (err, user) => {
                if (err) {
                  console.log("Something wrong when updating data!");
                } else {
                  res.status(200).send({ status: 200, user: user });
                }
              }
        )
    }
}

export default setUserCoverPic;