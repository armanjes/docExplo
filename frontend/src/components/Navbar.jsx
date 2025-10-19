import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/logout",{},
        { withCredentials: true }
      );

      if (data.ok) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      setUser(null);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/doctors">Doctors</NavLink>
      </li>
      <li>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
    </ul>
  );
};
export default Navbar;
