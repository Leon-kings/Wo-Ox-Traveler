// App.tsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Hero } from "./components/hero/Hero";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Countries } from "./pages/countries/CountriesWeOfferVisit";
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { UserDashboard } from "./components/dashboard/user/UserDashboard";
import { Footer } from "./components/footer/Footer";

/* ================= PUBLIC LAYOUT ================= */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Countries />
      <Footer />
    </>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <div className="w-full">
      <Routes>
        {/* ---------- Public site ---------- */}
        <Route path="/" element={<PublicLayout />} />
        <Route
          path="/destinations"
          element={
            <>
              <Navbar />
              <Countries />
              <Footer />
            </>
          }
        />
        <Route
          path="/packages"
          element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* ---------- User dashboard ---------- */}
        <Route path="/dashboard/*" element={<UserDashboard />} />

        {/* ---------- Admin dashboard ---------- */}
        <Route path="/dashboard/admin/*" element={<Dashboard />} />

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
