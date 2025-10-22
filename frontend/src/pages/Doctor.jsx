import { useAuth } from "../context/AuthContext";
import { capitalize } from "../utils/helpers"
import { CalendarDays } from "lucide-react";

const Doctor = () => {
  const { doctors, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  const formatTime = (time24) => {
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${min} ${ampm}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Our Doctors
      </h2>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors available.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              {/* Doctor Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Dr. {capitalize(doc.name)}
                </h3>
                <p className="text-gray-500">{doc.email}</p>
                <p className="mt-2 text-indigo-600 font-medium">
                  {doc.specialization || "Specialization not listed"}
                </p>
                <p className="mt-1 text-gray-700">
                  Fee:{" "}
                  <span className="font-semibold text-gray-900">
                    ৳{doc.consultationFee}
                  </span>
                </p>

                {/* Schedule */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Schedule:
                  </h4>
                  {doc.schedule && doc.schedule.length > 0 ? (
                    <div className="space-y-1">
                      {doc.schedule.map((dayObj, i) => (
                        <div key={i} className="text-gray-700">
                          <strong>{dayObj.day}:</strong>{" "}
                          {dayObj.slots.map((slot, j) => (
                            <span
                              key={j}
                              className="inline-block text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md mr-1 mt-1"
                            >
                              {formatTime(slot.start)} - {formatTime(slot.end)}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No schedule added</p>
                  )}
                </div>
              </div>

              {/* Button */}
              <button
                type="button"
                className="flex items-center justify-center gap-4 mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                <CalendarDays />
                View Schedule
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctor;
