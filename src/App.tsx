import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";


export default function App() {
  const location = useLocation();

  const showNav = !["/login", "/register"].includes(location.pathname);

  return (
    <div
      dir="rtl"
      className="min-h-screen antialiased text-right"
      style={{ background: "#FFFDF7" }}
    >
      {showNav && <NavBar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}