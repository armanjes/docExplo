import { CalendarDays, Stethoscope, Clock, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 md:py-20">
        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Book Your Doctor Appointments <br />
            <span className="text-blue-600">Easily & Quickly</span>
          </h1>
          <p className="text-gray-600 mt-4 md:text-lg">
            Find trusted doctors, schedule appointments, and get care when you
            need it — all in one place.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md">
              Book Appointment
            </button>
            <button variant="outline" className="px-6 py-3 rounded-xl">
              Find Doctors
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Doctor Illustration"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
              title: "Qualified Doctors",
              desc: "Connect with verified and experienced medical professionals.",
            },
            {
              icon: <CalendarDays className="w-8 h-8 text-blue-600" />,
              title: "Easy Scheduling",
              desc: "Book or reschedule your appointment in just a few clicks.",
            },
            {
              icon: <Clock className="w-8 h-8 text-blue-600" />,
              title: "24/7 Availability",
              desc: "Access healthcare services anytime, anywhere.",
            },
            {
              icon: <Users className="w-8 h-8 text-blue-600" />,
              title: "Patient-Centered Care",
              desc: "We focus on your comfort and convenience at every step.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-2xl text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to book your appointment?
        </h2>
        <p className="mt-3 text-blue-100">
          Join thousands of patients who trust our platform for quick and
          reliable bookings.
        </p>
        <button className="mt-6 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
