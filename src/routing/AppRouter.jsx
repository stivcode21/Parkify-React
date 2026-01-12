import Dashboard from "@/pages/dashboard/Dashboard";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import UserSignIn from "../pages/userSignIn/UserSignIn";
import VehicleList from "../components/organisms/vehicleList/VehicleList";
import HistoryLog from "../components/organisms/historyLog/HistoryLog";
import { useEffect } from "react";
import { checkAuth } from "@/utils/auth";
import ModalOverlay from "@/components/templates/modalOverlay/ModalOverlay";

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const verifySession = async () => {
      const loggedIn = await checkAuth();
      const isPublic = location.pathname === "/" || location.pathname === "/signIn";

      if (!loggedIn) {
        if (!isPublic) {
          navigate("/signIn", { replace: true });
        }
        return;
      }

      if (isPublic) {
        navigate("/dashboard", { replace: true });
      }
    };
    verifySession();
  }, [location.pathname, navigate]);

  return (
    <>
      <ModalOverlay />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signIn" element={<UserSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<VehicleList />} />
        <Route path="/history" element={<HistoryLog />} />
      </Routes>
    </>
  );
};

export default AppRouter;
