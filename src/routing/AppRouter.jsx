import Dashboard from "@/pages/dashboard/Dashboard";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserSignIn from "../pages/userSignIn/UserSignIn";
import UserCreateProfile from "../pages/userCreateProfile/UserCreateProfile";
import UserSignUp from "../pages/userSignUp/UserSignUp";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

const AppRouter = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // evitar que se renderice antes de saber a dónde ir

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        setChecked(true);
        return;
      }

      const userId = session.user.id;

      // Revisa si el usuario ya creó perfil (está en la tabla admins)
      const { data: admin } = await supabase
        .from("admins")
        .select("id")
        .eq("id", userId)
        .single();

      if (admin) {
        navigate("/home");
      } else {
        navigate("/createProfile");
      }

      setChecked(true);
    };

    // Llamar al inicio
    checkSession();

    // Escuchar cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!checked) return null; // evitar que se renderice mientras se decide

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signIn" element={<UserSignIn />} />
      <Route path="/signUp" element={<UserSignUp />} />
      <Route path="/createProfile" element={<UserCreateProfile />} />
      <Route path="/home" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
