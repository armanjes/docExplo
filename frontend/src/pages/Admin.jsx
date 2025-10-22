import { useDoctors } from "../hooks/useDoctors";
import { capitalize, formatTime } from "../utils/helpers";

const Admin = () => {
  const {
    handleSubmit,
    addDoctor,
    setAddDoctor,
    editingId,
    handleAddSlot,
    handleRemoveSlot,
    handleSlotChange,
    handleUpdate,
    handleDelete,
    doctors,
    resetForm,
  } = useDoctors();

  

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addDoctor.name}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, name: e.target.value })
            }
            type="text"
            placeholder="Enter name"
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addDoctor.email}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, email: e.target.value })
            }
            type="email"
            placeholder="Enter email"
          />
          {!editingId && (
            <input
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addDoctor.password}
              onChange={(e) =>
                setAddDoctor({ ...addDoctor, password: e.target.value })
              }
              type="password"
              placeholder="Enter password"
            />
          )}

          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addDoctor.specialization}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, specialization: e.target.value })
            }
          >
            <option value="">Select specialization</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Obstetrics & Gynecology">
              Obstetrics & Gynecology
            </option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addDoctor.role}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addDoctor.consultationFee}
            onChange={(e) =>
              setAddDoctor({ ...addDoctor, consultationFee: e.target.value })
            }
            type="text"
            placeholder="Enter fee"
          />
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addDoctor.schedule.map((dayObj) => (
            <div key={dayObj.day} className="border p-3 rounded-md bg-gray-50">
              <h4 className="font-semibold mb-2">{dayObj.day}</h4>

              {dayObj.slots.map((slot, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      handleSlotChange(
                        dayObj.day,
                        index,
                        "start",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-semibold">to</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      handleSlotChange(dayObj.day, index, "end", e.target.value)
                    }
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(dayObj.day, index)}
                    className="text-red-500 hover:text-red-700 font-semibold border border-red-200 rounded-full px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddSlot(dayObj.day)}
                className="text-blue-600 hover:text-blue-800 font-semibold border border-blue-200 rounded-full px-2"
              >
                + Add Slot
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Save changes" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="my-6 border-gray-300" />

      {/* Doctor List */}
      {!doctors.length ? (
        <p className="text-center text-gray-500">No doctor found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white gap-4"
            >
              <p className="text-xl font-bold">Dr. {capitalize(doc.name)}</p>
              <small className="text-gray-500">{doc.specialization}</small>
              <p className="text-gray-600">{doc.email}</p>
              <p className="font-semibold">Fee: {doc.consultationFee}</p>

              <div className="mt-2 space-y-1">
                {doc.schedule && doc.schedule.length > 0 ? (
                  doc.schedule.map((dayObj, i) => (
                    <div key={i}>
                      <strong>{dayObj.day}:</strong>{" "}
                      {dayObj.slots.map((slot, j) => (
                        <span key={j} className="ml-1">
                          {formatTime(slot.start)} - {formatTime(slot.end)}
                          {j !== dayObj.slots.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No schedule added</p>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleUpdate(doc)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Admin;
