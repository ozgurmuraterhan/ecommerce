const path = require("path");
const router = require("express").Router();
const multer = require("multer");

const isAuth = require("../shared/middleware/check-auth");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/avatars/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
}).single("avatar");

router.get("/", [isAuth], userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", [isAuth, upload], userController.addUser);

router.put("/", [isAuth, upload], userController.editUser);

router.delete("/:id", [isAuth], userController.deleteUser);

module.exports = router;
