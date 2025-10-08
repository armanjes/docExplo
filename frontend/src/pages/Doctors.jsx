import { Link, useNavigate} from "react-router-dom";

const AllDoctors = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">Doctors</h2>
      <p className="text-gray-600 mb-6">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-primary"
        />
        <select className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-primary">
          <option value="">Category</option>
          <option value="">sdlkfjlk</option>
          <option value="">fsdlkjfl</option>
        </select>
        <input
          type="button"
          value="Clear All"
          className="bg-red-200 rounded px-2 cursor-pointer hover:bg-red-300 transition-colors"
        />
      </div>

      <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate(`/appointment/${1}`)}
          className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          key={1}
        >
          <img
            className="bg-blue-50"
            src="http://localhost:5173/src/assets/header_image.png"
            alt=""
          />
          <div className="p-4">
            <div className={`flex items-center gap-2 text-sm text-center`}>
              <p className={`w-2 h-2`}></p>
              <p>Available</p>
            </div>
            <p className="text-gray-900 text-lg font-medium">Dr. John Doe</p>
            <p className="text-gray-600 text-sm ">Neurologist</p>
          </div>
        </div>
      </ul>
    </div>
  );
};
export default AllDoctors;
