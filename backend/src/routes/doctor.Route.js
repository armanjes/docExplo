import express from "express";

import {
  isAuthenticated,
  authorizedRoles,
  upload,
} from "../middlewares/index.js";

import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctor,
} from "../controllers/index.js";

const router = express.Router();

// // Anyone can read doctors
router.get("/", getDoctors);
router.get("/:id", getDoctor);

router.post(
  "/",
  isAuthenticated,
  authorizedRoles("Admin"),
  upload.single("image"),
  createDoctor
);
router.patch(
  "/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  upload.single("image"),
  updateDoctor
);
router.delete("/:id", isAuthenticated, authorizedRoles("Admin"), deleteDoctor);

export default router;
