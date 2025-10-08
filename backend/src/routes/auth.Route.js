import express from "express";
import { upload, isAuthenticated } from "../middlewares/index.js";
import {
  register,
  login,
  logout,
  profile,
  updateAccount,
  deleteAccount,
} from "../controllers/index.js";

const router = express.Router();

router.post(
  "/register",
  register
);
router.post("/login", login);
router.post("/logout", logout);

router.patch(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  updateAccount
);
router.delete("/:id", isAuthenticated, deleteAccount);
router.get("/profile", isAuthenticated, profile)

export default router;
