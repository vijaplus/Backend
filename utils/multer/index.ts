import multer from "multer";

export const storageStartupsPostsImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/posts/startups");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").at(-1);
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "_" + uniqueSuffix + "." + ext);
  }
});

export const uploadStartupsPostsImage = multer({storage: storageStartupsPostsImage}).single("posts");
