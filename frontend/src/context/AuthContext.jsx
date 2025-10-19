import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${URL}auth/profile`,
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        setUser(null);
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${URL}doctors/`);

        if (data.ok) setDoctors(data.doctors);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchDoctors();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, doctors, setDoctors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
