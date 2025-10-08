import {
  register,
  login,
  logout,
  updateAccount,
  deleteAccount,
  profile
} from "./auth.Controller.js";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctor,
} from "./doctor.Controller.js";

export {
  register,
  login,
  logout,
  profile,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctors,
  getDoctor,
  updateAccount,
  deleteAccount,
};
