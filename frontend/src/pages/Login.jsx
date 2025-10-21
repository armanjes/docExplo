import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { URL } from "../config";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const [login, setLogin] = useState({
    name: "",
    email: "@gmail.com",
    password: "password",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state) {
        const { data } = await axios.post(
          `${URL}auth/login`,
          {
            email: login.email,
            password: login.password,
          },
          { withCredentials: true }
        );
        if (data.ok) {
          setUser(data.user);
          data.user.role === "Admin"
            ? navigate("/admin")
            : navigate("/profile");
        }
      } else {
        const { data } = await axios.post(
          `${URL}auth/register`,
          {
            name: login.name,
            email: login.email,
            password: login.password,
          },
          { withCredentials: true }
        );
        if (data.ok) {
          setUser(data?.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-600">
          {state ? "Welcome Back 👋" : "Create an Account"}
        </h2>
        <p className="text-center text-gray-500 mb-4">
          {state ? "Login to continue your journey" : "Register to get started"}
        </p>

        {/* Name field (only for register) */}
        {!state && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setLogin({ ...login, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Switch between login/register */}
        <p className="text-center text-gray-600 text-sm">
          {state ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setState(false)}
                className="text-indigo-600 hover:underline font-medium"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState(true)}
                className="text-indigo-600 hover:underline font-medium"
              >
                Login here
              </button>
            </>
          )}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
        >
          {state ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};
export default Login;
