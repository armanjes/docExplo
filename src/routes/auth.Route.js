import express from "express";
import { register, login, logout } from "../controllers/index.js";
// import { loginValidator, registerValidator } from "./../validators/index.js";
import { isAuthenticated, authorizedRoles } from "../middlewares/index.js";

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  login
);
router.post("/logout", logout);

export default router;
