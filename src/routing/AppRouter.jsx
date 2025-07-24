import Dashboard from "@/pages/dashboard/Dashboard";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserSignIn from "../pages/userSignIn/UserSignIn";
import UserCreateProfile from "../pages/userCreateProfile/UserCreateProfile";
import UserSignUp from "../pages/userSignUp/UserSignUp";
import { useEffect } from "react";
import { supabase } from "../supabase/supabase";

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      } else {
        navigate("/createProfile");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signIn" element={<UserSignIn />} />
      <Route path="/signUp" element={<UserSignUp />} />
      <Route path="/createProfile" element={<UserCreateProfile />} />
      <Route path="/hero" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
