import express from "express";
import { isAuthenticated } from "../middlewares/index.js";
import { authorizedRoles } from "../middlewares/index.js";
import { doctorValidator } from "../validators/index.js";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctor,
} from "../controllers/index.js";

const router = express.Router();

// Anyone can read doctors
router.get("/", getDoctors);
router.get("/:id", getDoctor);

router.post(
  "/",
  isAuthenticated,
  authorizedRoles("admin"),
  createDoctor
);
router.put(
  "/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateDoctor
);
router.delete("/:id", isAuthenticated, authorizedRoles("admin"), deleteDoctor);

export default router;
