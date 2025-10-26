import { Doctor, Appointment } from "../models/index.js";

// ================================
// @desc    Book new appointment
// @route   POST /api/appointments
// @access  Public (guest) or Authenticated User
// ================================
export const bookAppointment = async (req, res) => {
  const { doctorId, appointmentDate, timeSlot, guestInfo } = req.body;
  const userId = req.user?.id;

  try {
     // check if doctor exists
     const doctor = await Doctor.findById(doctorId);
     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

     const existing = await Appointment.findOne({
       doctor: doctorId,
       appointmentDate,
       timeSlot,
       status: { $ne: "cancelled" },
     });

     if (existing)
       return res
         .status(400)
         .json({ message: "This time slot is already booked" });

     const appointment = new Appointment({
       doctor: doctorId,
       appointmentDate,
       timeSlot,
       reason,
       ...(userId ? { patient: userId } : { guestInfo }),
     });

      await appointment.save();
      res.status(201).json({
        ok: true,
        message: "Appointment booked successfully",
        appointment,
      });
 } catch (error) {
    res.status(500).json({ message: err.message });
 }
};


// rest of the code here

// ================================
// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
// @access  Admin
// ================================
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialization")
      .populate("patient", "name email role");

    res.status(200).json({ ok: true, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// @desc    Get appointments for logged-in patient
// @route   GET /api/appointments/my
// @access  Patient
// ================================
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor", "name specialization")
      .sort({ appointmentDate: -1 });

    res.status(200).json({ ok: true, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// @desc    Get appointments for a doctor
// @route   GET /api/appointments/doctor/:id
// @access  Doctor
// ================================
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email")
      .sort({ appointmentDate: -1 });

    res.status(200).json({ ok: true, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Admin or Doctor
// ================================
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    res
      .status(200)
      .json({ ok: true, message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// @desc    Delete (cancel) appointment
// @route   DELETE /api/appointments/:id
// @access  Patient / Admin
// ================================
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    await appointment.deleteOne();

    res.status(200).json({ ok: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};