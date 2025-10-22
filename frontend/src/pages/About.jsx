import { Users, Heart, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-16 lg:px-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About DocExplo</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          We are committed to making healthcare accessible, reliable, and simple
          for everyone. Our mission is to connect patients with trusted doctors
          seamlessly.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-20 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3370/3370436.png"
            alt="Healthcare Illustration"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To simplify healthcare for everyone by providing a reliable platform
            to find and book appointments with trusted doctors anytime,
            anywhere.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700">
            To become the most trusted digital healthcare platform connecting
            patients with professionals efficiently and conveniently.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="w-10 h-10 text-blue-600" />,
              title: "Patient First",
              desc: "We prioritize patient comfort, safety, and satisfaction at every step.",
            },
            {
              icon: <Heart className="w-10 h-10 text-blue-600" />,
              title: "Compassionate Care",
              desc: "We foster empathy and understanding in all interactions.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
              title: "Trusted Professionals",
              desc: "We connect patients with verified and highly qualified doctors.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Join Medify Today</h2>
        <p className="mt-3 text-blue-100 max-w-xl mx-auto">
          Experience hassle-free appointment booking and connect with trusted
          healthcare providers.
        </p>
        <button className="mt-6 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
