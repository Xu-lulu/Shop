const HomeController = require("../app/Controllers/HomeController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();
router.post("/Register", HomeController.Register);
router.post("/Login", HomeController.Login);
router.get(
  "/oneuser",
  verifyTokenAndUserAuthorization,
  HomeController.OneUsers
);
router.get("/alluser", verifyTokenAndAdmin, HomeController.allUser);
router.post("/Logout", HomeController.logOut);
module.exports = router;
