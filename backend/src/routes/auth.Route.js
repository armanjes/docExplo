import express from "express";
import { validate, upload } from "../middlewares/index.js";
import { register, login, logout } from "../controllers/index.js";
import { registerValidator, loginValidator } from "./../validators/index.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  register
);
router.post("/login", validate(loginValidator), login);
router.post("/logout", logout);


// router.post("/test-upload", upload.single("image"), (req, res) => {
//   console.log("Request reached test-upload route!");
//   console.log("req.file:", req.file);
//   console.log("req.body:", req.body);
//   res.status(200).json({
//     ok: true,
//     message: "File upload successful!",
//     file: req.file,
//   });
// });

export default router;
