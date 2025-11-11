import Dashboard from "@/pages/dashboard/Dashboard";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { Routes, Route } from "react-router-dom";
import UserSignIn from "../pages/userSignIn/UserSignIn";
import UserCreateProfile from "../pages/userCreateProfile/UserCreateProfile";
import UserSignUp from "../pages/userSignUp/UserSignUp";
import VehicleList from "../components/organisms/vehicleList/VehicleList";
import HistoryLog from "../components/organisms/historyLog/HistoryLog";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signIn" element={<UserSignIn />} />
      {/* <Route path="/signUp" element={<UserSignUp />} />
      <Route path="/createProfile" element={<UserCreateProfile />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list" element={<VehicleList />} />
      <Route path="/history" element={<HistoryLog />} />
    </Routes>
  );
};

export default AppRouter;
