import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Doctor from './pages/Doctor';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={["Patient", "Doctor"]}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};
export default App;
