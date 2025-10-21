import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { URL } from "../config";

export const useDoctors = () => {
  const { doctors, setDoctors } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [addDoctor, setAddDoctor] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
    consultationFee: 0,
    schedule: [
      { day: "Saturday", slots: [] },
      { day: "Sunday", slots: [] },
      { day: "Monday", slots: [] },
      { day: "Tuesday", slots: [] },
      { day: "Wednesday", slots: [] },
      { day: "Thursday", slots: [] },
      { day: "Friday", slots: [] },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `${URL}doctors/${editingId}` : `${URL}doctors/`;

    const method = editingId ? "patch" : "post";

    try {
      const { data } = await axios({
        method,
        url,
        data: {
          name: addDoctor.name,
          email: addDoctor.email,
          password: addDoctor.password,
          role: addDoctor.role,
          specialization: addDoctor.specialization,
          consultationFee: addDoctor.consultationFee,
          schedule: addDoctor.schedule.filter((d) => d.slots.length > 0),
        },
        withCredentials: true,
      });

      if (data.ok) {
        if (editingId) {
          setDoctors((prev) => {
            return prev.map((doc) =>
              doc._id === editingId ? data.doctor : doc
            );
          });
          setEditingId(null);
        } else {
          setDoctors((prev) => [...prev, data.account]);
        }

        setAddDoctor({
          name: "",
          email: "",
          password: "",
          role: "",
          specialization: "",
          consultationFee: 0,
          schedule: [
            { day: "Saturday", slots: [] },
            { day: "Sunday", slots: [] },
            { day: "Monday", slots: [] },
            { day: "Tuesday", slots: [] },
            { day: "Wednesday", slots: [] },
            { day: "Thursday", slots: [] },
            { day: "Friday", slots: [] },
          ],
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(`${URL}doctors/${_id}`, {
        withCredentials: true,
      });
      if (data.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== _id));
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleUpdate = (doc) => {
    const weekdays = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    const fullSchedule = weekdays.map((day) => {
      const existingDay = doc.schedule.find((d) => d.day === day);
      return existingDay ? existingDay : { day, slots: [] };
    });
    setAddDoctor({
      name: doc.name,
      email: doc.email,
      password: "",
      role: doc.role,
      specialization: doc.specialization,
      consultationFee: doc.consultationFee,
      schedule: fullSchedule,
    });
    setEditingId(doc._id);
  };

  // Add a new time slot for a day
  const handleAddSlot = (day) => {
    setAddDoctor((prev) => ({
      ...prev,
      schedule: prev.schedule.map((d) =>
        d.day === day
          ? { ...d, slots: [...d.slots, { start: "", end: "" }] }
          : d
      ),
    }));
  };

  // Change slot time
  const handleSlotChange = (day, index, field, value) => {
    setAddDoctor((prev) => ({
      ...prev,
      schedule: prev.schedule.map((d) =>
        d.day === day
          ? {
              ...d,
              slots: d.slots.map((slot, i) =>
                i === index ? { ...slot, [field]: value } : slot
              ),
            }
          : d
      ),
    }));
  };

  // Remove slot
  const handleRemoveSlot = (day, index) => {
    setAddDoctor((prev) => ({
      ...prev,
      schedule: prev.schedule.map((d) =>
        d.day === day
          ? { ...d, slots: d.slots.filter((_, i) => i !== index) }
          : d
      ),
    }));
  };

  // reset form
  const resetForm = () => {
    setEditingId(null);
    setAddDoctor({
      name: "",
      email: "",
      password: "",
      role: "",
      specialization: "",
      consultationFee: "",
      schedule: [
        { day: "Saturday", slots: [] },
        { day: "Sunday", slots: [] },
        { day: "Monday", slots: [] },
        { day: "Tuesday", slots: [] },
        { day: "Wednesday", slots: [] },
        { day: "Thursday", slots: [] },
        { day: "Friday", slots: [] },
      ],
    });
  };

  return {
    doctors,
    addDoctor,
    editingId,
    setAddDoctor,
    handleSubmit,
    handleDelete,
    handleUpdate,
    handleAddSlot,
    handleSlotChange,
    handleRemoveSlot,
    resetForm,
  };
};
