const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const User = require("../models/User");

const BUCKET_NAME = process.env.S3NAME;
const IAM_USER_KEY = process.env.IAMUSER;
const IAM_USER_SECRET = process.env.IAMSECRET;

/*
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `profileimage/${file.name}`,
      Body: file.data
    };
    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  });
}
*/
const uploadToS3 = file => {
  return new Promise((resolve, reject) => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
      var params = {
        Bucket: BUCKET_NAME,
        Key: `profileimage/${file.name}`,
        Body: file.data
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  });
};
/*
{ ETag: '"8c6495ad632576918894c65cdf083dd7"',
   Location:
    'https://appointmentbooker.s3.amazonaws.com/profileimage/jayShong.png',
   key: 'profileimage/jayShong.png',
   Key: 'profileimage/jayShong.png',
   Bucket: 'appointmentbooker' }
*/

// The following is an example of making file upload with
// additional body parameters.
// To make a call with PostMan
// Don't put any headers (content-type)
// Under body:
// check form-data
// Put the body with "element1": "test", "element2": image file

//post /test/upload
router.post("/upload", (req, res) => {
  const mimes = ["image/png", "image/jpeg", "image/jpg"];
  // This grabs the additional parameters so in this case passing
  // in "element1" with a value.
  const fileName = req.body.fileName;
  var busboy = new Busboy({
    headers: req.headers,
    limits: { files: 1, fileSize: 40000 }
  });
  // The file upload has completed
  busboy.on("finish", function() {
    const image = req.files.image;
    if (image.size > 3000000) {
      return res
        .status(413)
        .json({ filesize: "The Image file size can not exceed 3mbs" });
    }
    if (!mimes.includes(image.mimetype)) {
      return res.status(422).json({
        format: "This image format is not supported"
      });
    }
    let aws = uploadToS3(image);

    aws
      .then(dataAWS => {
        User.findOneAndUpdate(
          { _id: "5cddeb33dc4f9b03c93ab424" },
          { image_url: dataAWS.Location }
        ).then(user => {
          user.save();
          res.status(200).json({ message: "Save successful" });
        });
      })
      .catch(err => res.status(400).json({ errors: "Something went wrong" }));
  });
  req.pipe(busboy);
});

module.exports = router;
