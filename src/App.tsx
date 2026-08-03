import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { GuestsPage } from "./pages/GuestsPage";
import { EventsPage } from "./pages/EventsPage";
import { SettingsPage } from "./pages/SettingsPage";


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
        <Route path="/events-control" element={<CreateEventPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}