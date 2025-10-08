import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState(true);
  const [login, setLogin] = useState({ name: "", email: "", password: "" });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(login);

    try {
      if (state) {
        const {data} = await axios.post("http://localhost:3000/api/auth/login", {
          email: login.email,
          password: login.password,
        });
      } else {
        const {data} = await axios.post(
          "http://localhost:3000/api/auth/register",
          { name: login.email, email: login.email, password: login.password }
        );
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px]
        sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg"
      >
        <p className="text-2xl font-semibold">
          {state ? "Login" : "Create Account"}
        </p>

        {!state && (
          <div className="w-full">
            <label htmlFor="name" className="block">
              Full Name
            </label>
            <input
              onChange={(e) => setLogin({ ...login, name: e.target.value })}
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
              type="text"
              id="name"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:border-primary"
            type="password"
            id="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state ? "Login" : "Create Account"}
        </button>
        <p>
          {state ? "Create a new account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setState(!state)}
            className="text-primary underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};
export default Login;
