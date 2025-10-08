import { useState } from "react";

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc2.png"
            alt=""
          />
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info : name, degree, experience ----- */}

          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            Dr. John Doe
            {/* <img className="w-5" src={assets.verified_icon} alt="" /> */}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>MBBS, FCPS - Neurologist</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              6 years
            </button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About {/*<img className="w-3" src={assets.info_icon} alt="" /> */}
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, nesciunt.
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: <span className="text-gray-800">$ 60</span>{" "}
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="my-7 bg-primary text-white px-4 py-2 rounded"
          >
            Book Appointment
          </button>

          {showForm && (
            <form className="flex flex-col gap-2">
              <div className="w-full">
                <label htmlFor="email" className="block">
                  Name
                </label>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div className="w-full">
                <select className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary">
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
                  type="datetime-local"
                  required
                />
              </div>
              <button className="my-7 bg-primary text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Booking slots */}
      {/* <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-[#DDDDDD]"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6">
          Book an appointment
        </button>
      </div> */}

      {/* Listing Releated Doctors */}
      {/* <RelatedDoctors speciality={docInfo.speciality} docId={docId} /> */}
    </div>
  );
};
export default Appointment;
