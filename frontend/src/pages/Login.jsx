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
    <form onSubmit={onSubmitHandler}>
      {!state && (
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setLogin({ ...login, name: e.target.value })}
        />
      )}
      <input
        type="email"
        placeholder="Enter email"
        value={login.email}
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={login.password}
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
      />
      <p>
        Don't have a account?{" "}
        <span onClick={() => setState(!state)}>Resgister here</span>
      </p>
      <button type="submit">{state ? "Login" : "Register"}</button>
    </form>
  );
};
export default Login;
