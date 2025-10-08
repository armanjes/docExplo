import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { authRoute, doctorRoute } from "./src/routes/index.js";
// import patientRoutes from "./routes/patient.js";
// import appointmentRoutes from "./routes/appointment.js";
// import paymentRoutes from "./routes/payment.js";
app.use("/api/auth", authRoute);
app.use("/api/doctors", doctorRoute);
// app.use("/api/patients", patientRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
