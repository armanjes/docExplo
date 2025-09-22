import express from "express";
import { validate, upload, isAuthenticated } from "../middlewares/index.js";
import {
  register,
  login,
  logout,
  updateAccount,
  deleteAccount,
} from "../controllers/index.js";
import { registerValidator, loginValidator } from "./../validators/index.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validate(registerValidator),
  register
);
router.post("/login", validate(loginValidator), login);
router.post("/logout", logout);

router.patch(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  updateAccount
);
router.delete("/:id", isAuthenticated, deleteAccount);

export default router;
