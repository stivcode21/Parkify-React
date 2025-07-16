import Dashboard from "@/pages/dashboard/Dashboard";
import UserLogin from "@/pages/userLogin/UserLogin";
import WelcomePage from "@/pages/welcomePage/WelcomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/hero" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
