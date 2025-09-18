import express from "express";

import { isAuthenticated, authorizedRoles } from "../middlewares/index.js";

// // import {
// //   doctorRegisterValidator,
// //   doctorUpdateValidator,
// // } from "../validators/index.js";

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

router.post("/", isAuthenticated, authorizedRoles("admin"), createDoctor);
router.patch("/:id", isAuthenticated, authorizedRoles("admin"), updateDoctor);
router.delete("/:id", isAuthenticated, authorizedRoles("admin"), deleteDoctor);

export default router;
