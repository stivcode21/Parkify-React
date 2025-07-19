import Dashboard from "@/pages/dashboard/Dashboard";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignIn from "../pages/userSignIn/UserSignIn";
import UserCreateProfile from "../pages/userCreateProfile/UserCreateProfile";
import UserSignUp from "../pages/userSignUp/UserSignUp";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signIn" element={<UserSignIn />} />
        <Route path="/signUp" element={<UserSignUp />} />
        <Route path="/createProfile" element={<UserCreateProfile />} />
        <Route path="/hero" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
