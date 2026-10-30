// UserDashboard.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { SidebarToggle, Sidebar } from "../user/components/sidebar/Sidebar";
import {
  FlightTakeoff,
  CardTravel,
  Person,
  Email,
  Phone,
  CalendarToday,
  LocationOn,
  CheckCircle,
  Cancel,
  AttachMoney,
  ArrowForward,
  Search,
  Close as CloseIcon,
  Lock,
  Public,
  SupportAgent,
  Hotel,
  Explore,
  Download,
  Chat,
  Error as ErrorIcon,
  Notifications,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

/* ================= SESSION ================= */
const SESSION_KEY = "wox_user";

interface SessionUser {
  email: string;
  role: "user" | "admin";
  name: string;
}

interface Booking {
  id: string;
  type: "flight" | "hotel" | "tour" | "visa" | "insurance";
  title: string;
  destination: string;
  date: string;
  guests: number;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  image: string;
}

/* ================= MOCK DATA ================= */
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "WX-2025-001",
    type: "tour",
    title: "Switzerland Alpine Tour",
    destination: "Switzerland",
    date: "2025-03-15",
    guests: 2,
    price: 2200,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2025-002",
    type: "flight",
    title: "Paris Round Trip",
    destination: "France",
    date: "2025-04-22",
    guests: 1,
    price: 480,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2024-087",
    type: "hotel",
    title: "Caribbean Beach Resort",
    destination: "Caribbean",
    date: "2024-08-10",
    guests: 2,
    price: 946,
    status: "completed",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2024-045",
    type: "tour",
    title: "Thailand Island Hopper",
    destination: "Thailand",
    date: "2024-12-05",
    guests: 3,
    price: 495,
    status: "completed",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2024-012",
    type: "visa",
    title: "Japan Visa Assistance",
    destination: "Japan",
    date: "2024-10-12",
    guests: 1,
    price: 59,
    status: "completed",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
  },
];

/* ================= VALIDATED INPUT ================= */
interface ValidatedInputProps {
  label: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  validate?: (v: string) => string | null;
  showToggle?: boolean;
  touched?: boolean;
  onBlur?: () => void;
  disabled?: boolean;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label, type = "text", icon, value, onChange, placeholder,
  validate, showToggle, touched, onBlur, disabled,
}) => {
  const [visible, setVisible] = useState(false);
  const actualType = showToggle ? (visible ? "text" : "password") : type;
  const error = validate ? validate(value) : null;
  const isValid = touched && !error && value.length > 0;
  const isInvalid = touched && !!error;

  return (
    <div className="mb-4">
      <label className="block text-white/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative group">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300
          ${isInvalid ? "text-red-400" : isValid ? "text-green-400" : "text-white/40 group-focus-within:text-white"}`}>
          {icon}
        </span>
        <input
          type={actualType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-white/5 border rounded-xl pl-11 pr-11 py-3 text-white text-sm
            placeholder-white/30 outline-none transition-all duration-300
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${isInvalid
              ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
              : isValid
              ? "border-green-500/70 focus:border-green-400 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"
              : "border-white/15 focus:border-white/60 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
            }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {showToggle && (
            <button type="button" onClick={() => setVisible(!visible)}
              className="text-white/40 hover:text-white transition-colors duration-300">
              {visible ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          )}
          {isValid && <CheckCircle sx={{ fontSize: 18 }} className="text-green-400" />}
          {isInvalid && <Cancel sx={{ fontSize: 18 }} className="text-red-400" />}
        </div>
      </div>
      {isInvalid && <p className="text-red-400 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  );
};

/* ================= VALIDATORS ================= */
const vEmail = (v: string) => {
  if (!v.trim()) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email";
  return null;
};
const vPhone = (v: string) => {
  if (!v.trim()) return "Phone is required";
  if (!/^[+\d][\d\s\-()]{6,}$/.test(v)) return "Enter a valid phone";
  return null;
};
const vName = (v: string) => {
  if (!v.trim()) return "Name is required";
  if (v.trim().length < 2) return "Name too short";
  return null;
};
const vPassword = (v: string) => {
  if (!v) return "Password required";
  if (v.length < 4) return "At least 4 characters";
  return null;
};

/* ================= RESULT MODAL ================= */
const ResultModal: React.FC<{
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}> = ({ open, type, title, message, onClose }) => {
  if (!open) return null;
  const isSuccess = type === "success";
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div className="relative w-full max-w-sm bg-black border border-white/15 rounded-2xl p-8 text-center
        shadow-[0_0_60px_rgba(255,255,255,0.12)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5
          ${isSuccess ? "bg-white text-black" : "bg-white/10 text-white border-2 border-white"}`}>
          {isSuccess ? <CheckCircle sx={{ fontSize: 48 }} /> : <ErrorIcon sx={{ fontSize: 48 }} />}
        </div>
        <h3 className="text-white text-xl font-extrabold mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">{message}</p>
        <button onClick={onClose}
          className="w-full text-black bg-white font-bold text-sm py-3 rounded-full
            transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5">
          {isSuccess ? "Got it" : "Try Again"}
        </button>
      </div>
    </div>
  );
};

/* ================= STATUS BADGE ================= */
const StatusBadge: React.FC<{ status: Booking["status"] }> = ({ status }) => {
  const styles = {
    upcoming: "bg-white/10 text-white border-white/30",
    completed: "bg-green-500/10 text-green-400 border-green-500/30",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider
      px-2 py-0.5 rounded-full border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "upcoming" ? "bg-white animate-pulse" :
        status === "completed" ? "bg-green-400" : "bg-red-400"
      }`} />
      {status}
    </span>
  );
};

/* ================= BOOKING CARD ================= */
const BookingCard: React.FC<{
  booking: Booking;
  onCancel: (id: string) => void;
  onView: (b: Booking) => void;
}> = ({ booking, onCancel, onView }) => {
  const typeIcon = {
    flight: <FlightTakeoff fontSize="small" />,
    hotel: <Hotel fontSize="small" />,
    tour: <Explore fontSize="small" />,
    visa: <Public fontSize="small" />,
    insurance: <SupportAgent fontSize="small" />,
  }[booking.type];

  return (
    <div className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
      transition-all duration-500 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1
      hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)]">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-40 h-32 sm:h-auto overflow-hidden shrink-0">
          <img src={booking.image} alt={booking.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 sm:bg-gradient-to-r" />
          <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20
            flex items-center justify-center text-white">
            {typeIcon}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <div className="text-white/40 text-[10px] font-mono mb-0.5">{booking.id}</div>
              <h3 className="text-white font-bold text-sm sm:text-base truncate">{booking.title}</h3>
              <div className="flex items-center gap-1 text-white/50 text-[11px] mt-0.5">
                <LocationOn sx={{ fontSize: 12 }} />
                {booking.destination}
              </div>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">Date</div>
              <div className="text-white text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                <CalendarToday sx={{ fontSize: 10 }} />
                {new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">Guests</div>
              <div className="text-white text-[11px] font-semibold mt-0.5">{booking.guests} traveler{booking.guests > 1 ? "s" : ""}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">Total</div>
              <div className="text-white text-[11px] font-bold mt-0.5">${booking.price.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <button onClick={() => onView(booking)}
              className="flex-1 flex items-center justify-center gap-1.5 text-white bg-white/10 hover:bg-white/20
                font-semibold text-xs py-2 rounded-lg transition-all duration-300">
              <ArrowForward sx={{ fontSize: 14 }} /> View Details
            </button>
            {booking.status === "upcoming" && (
              <button onClick={() => onCancel(booking.id)}
                className="flex items-center justify-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10
                  font-semibold text-xs px-3 py-2 rounded-lg transition-all duration-300 border border-red-500/20">
                <CloseIcon sx={{ fontSize: 14 }} /> Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN DASHBOARD WRAPPER ================= */
export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<SessionUser | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  });

  // Auth guard
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    } else if (user.role === "admin") {
      navigate("/dashboard/admin", { replace: true });
    }
  }, [user, navigate]);

  // Scroll lock when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  if (!user) return null;

  return (
    <>
      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="min-h-screen bg-black">
        <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        <SidebarToggle onClick={() => setSidebarOpen(true)} />

        {/* ================= MAIN CONTENT ================= */}
        <main className="lg:pl-[260px] transition-all duration-300">
          {/* Single top padding — applies to ALL nested pages */}
          <div className="min-h-screen pt-20 sm:pt-24 pb-16
            px-4 xs:px-5 sm:px-8 md:px-10 lg:px-10 xl:px-14">
            <div className="mx-auto max-w-[1400px] 2xl:max-w-[1500px]">
              <Routes>
                <Route index element={<OverviewPage user={user} />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="trips" element={<TripsPage />} />
                <Route path="settings" element={<SettingsPage user={user} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

/* ================= SHARED: PAGE HEADER ================= */
const PageHeader: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}> = ({ eyebrow, title, subtitle, action }) => (
  <div className="mb-8 flex flex-wrap items-start justify-between gap-4" style={{ animation: "fadeUp 0.5s ease-out both" }}>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-white/50 text-[10px] font-bold tracking-[3px] uppercase">{eyebrow}</span>
      </div>
      <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight">{title}</h1>
      <p className="text-white/40 text-xs sm:text-sm mt-1">{subtitle}</p>
    </div>
    {action}
  </div>
);

/* ================= PAGE: OVERVIEW ================= */
const OverviewPage: React.FC<{ user: SessionUser }> = ({ user }) => {
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [resultData, setResultData] = useState<{ type: "success" | "error"; title: string; message: string }>({
    type: "success", title: "", message: "",
  });

  const stats = useMemo(() => {
    const upcoming = bookings.filter((b) => b.status === "upcoming").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const totalSpent = bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.price, 0);
    return { upcoming, completed, totalSpent, total: bookings.length };
  }, [bookings]);

  const nextTrip = bookings.find((b) => b.status === "upcoming");
  const daysLeft = nextTrip
    ? Math.max(0, Math.ceil((new Date(nextTrip.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleCancel = (id: string) => {
    setResultData({
      type: "success",
      title: "Booking Cancelled",
      message: `Booking ${id} has been cancelled. A refund will be processed within 5–7 business days.`,
    });
    setResultOpen(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Traveler Dashboard"
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        subtitle={
          stats.upcoming > 0
            ? `You have ${stats.upcoming} upcoming trip${stats.upcoming > 1 ? "s" : ""} — let's get ready.`
            : "No upcoming trips yet. Ready to plan your next adventure?"
        }
        action={
          <Link
            to="/destinations"
            className="flex items-center gap-1.5 text-black bg-white font-bold text-xs px-4 py-2.5 rounded-full
              transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
          >
            <Explore fontSize="small" /> Explore Trips
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { icon: <FlightTakeoff fontSize="small" />, value: stats.upcoming, label: "Upcoming Trips" },
          { icon: <CheckCircle fontSize="small" />, value: stats.completed, label: "Completed" },
          { icon: <CardTravel fontSize="small" />, value: stats.total, label: "Total Bookings" },
          { icon: <AttachMoney fontSize="small" />, value: `$${stats.totalSpent.toLocaleString()}`, label: "Total Spent" },
        ].map((s, i) => (
          <div key={s.label}
            className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-4
              transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-1 hover:border-white/30"
            style={{ animation: `fadeUp 0.5s ease-out ${i * 0.08}s both` }}>
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center
              text-white mb-2 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:rotate-6">
              {s.icon}
            </div>
            <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">{s.value}</div>
            <div className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 origin-left
              transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>

      {/* Next trip highlight */}
      {nextTrip && (
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] mb-6"
          style={{ animation: "fadeUp 0.5s ease-out 0.3s both" }}>
          <div className="grid md:grid-cols-[300px_1fr]">
            <div className="relative h-48 md:h-auto overflow-hidden">
              <img src={nextTrip.image} alt="Next trip" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:bg-gradient-to-r" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded-full">
                  Next Trip
                </span>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="text-white/50 text-[10px] font-bold tracking-[3px] uppercase mb-1">
                Upcoming · {nextTrip.id}
              </div>
              <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-1">{nextTrip.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-white/60 text-xs mb-4">
                <span className="flex items-center gap-1">
                  <LocationOn sx={{ fontSize: 12 }} /> {nextTrip.destination}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarToday sx={{ fontSize: 12 }} />
                  {new Date(nextTrip.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Person sx={{ fontSize: 12 }} /> {nextTrip.guests} guest{nextTrip.guests > 1 ? "s" : ""}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {daysLeft}
                <span className="text-sm text-white/50 font-medium ml-1">days to go</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setSelectedBooking(nextTrip)}
                  className="group flex items-center gap-1.5 text-black bg-white font-bold text-xs px-4 py-2 rounded-full
                    transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  View Details
                  <ArrowForward sx={{ fontSize: 14 }} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <Link to="/contact"
                  className="flex items-center gap-1.5 text-white font-semibold text-xs px-4 py-2 rounded-full
                    border border-white/30 hover:bg-white hover:text-black transition-all">
                  <Chat sx={{ fontSize: 14 }} /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-lg">Recent Bookings</h3>
          <Link to="/dashboard/bookings"
            className="text-white/60 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors">
            View all <ArrowForward sx={{ fontSize: 14 }} />
          </Link>
        </div>
        <div className="grid gap-3">
          {bookings.slice(0, 2).map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancel} onView={setSelectedBooking} />
          ))}
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={(id) => {
            handleCancel(id);
            setSelectedBooking(null);
          }}
        />
      )}

      <ResultModal
        open={resultOpen}
        type={resultData.type}
        title={resultData.title}
        message={resultData.message}
        onClose={() => setResultOpen(false)}
      />
    </>
  );
};

/* ================= PAGE: BOOKINGS ================= */
const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [resultData, setResultData] = useState<{ type: "success" | "error"; title: string; message: string }>({
    type: "success", title: "", message: "",
  });

  const filtered = useMemo(() => {
    let list = bookings;
    if (filter !== "all") list = list.filter((b) => b.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => b.title.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, filter, search]);

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)));
    setResultData({
      type: "success",
      title: "Booking Cancelled",
      message: `Booking ${id} has been cancelled. A refund will be processed within 5–7 business days.`,
    });
    setResultOpen(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="My Bookings"
        title="All Your Bookings"
        subtitle="Search, filter, and manage every trip you've booked with Wo Ox Travel"
      />

      {/* Filter bar */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 sm:p-4 mb-4"
        style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}>
        <div className="relative group mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
            <Search fontSize="small" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings by title, destination, or ID..."
            className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm
              placeholder-white/30 outline-none transition-all focus:border-white/60 focus:bg-white/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-300
                ${filter === f
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white hover:border-white/30"}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/40 mb-4">
            <CardTravel sx={{ fontSize: 32 }} />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">No bookings found</h3>
          <p className="text-white/50 text-sm mb-4">
            {search ? "Try a different search term." : "Start exploring to create your first booking."}
          </p>
          <Link to="/destinations"
            className="inline-flex items-center gap-2 text-black bg-white font-bold text-sm px-6 py-3 rounded-full
              transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            <Explore fontSize="small" /> Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={handleCancel} onView={setSelectedBooking} />
          ))}
        </div>
      )}

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={(id) => {
            handleCancel(id);
            setSelectedBooking(null);
          }}
        />
      )}

      <ResultModal
        open={resultOpen}
        type={resultData.type}
        title={resultData.title}
        message={resultData.message}
        onClose={() => setResultOpen(false)}
      />
    </>
  );
};

/* ================= PAGE: TRIPS ================= */
const TripsPage: React.FC = () => {
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const trips = bookings.filter((b) => b.status !== "cancelled");

  return (
    <>
      <PageHeader
        eyebrow="My Trips"
        title="Your Travel Timeline"
        subtitle="Every journey you've taken — past, present, and upcoming"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trips.map((b, i) => (
          <div key={b.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
              transition-all duration-500 hover:border-white/30 hover:-translate-y-1"
            style={{ animation: `fadeUp 0.5s ease-out ${i * 0.08}s both` }}>
            <div className="relative h-40 overflow-hidden">
              <img src={b.image} alt={b.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-3 right-3">
                <StatusBadge status={b.status} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-extrabold text-base">{b.title}</h3>
                <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
                  <LocationOn sx={{ fontSize: 12 }} /> {b.destination}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Date</div>
                  <div className="text-white text-[11px] font-semibold mt-0.5">
                    {new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Guests</div>
                  <div className="text-white text-[11px] font-semibold mt-0.5">{b.guests}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Total</div>
                  <div className="text-white text-[11px] font-bold mt-0.5">${b.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSelectedBooking(b)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-black bg-white font-bold text-xs py-2 rounded-lg
                    transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <ArrowForward sx={{ fontSize: 14 }} /> View
                </button>
                <button className="flex items-center justify-center gap-1 text-white bg-white/10 hover:bg-white/20
                  text-xs font-semibold px-3 py-2 rounded-lg transition-all">
                  <Download sx={{ fontSize: 14 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
};

/* ================= PAGE: SETTINGS ================= */
const SettingsPage: React.FC<{ user: SessionUser }> = ({ user }) => {
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profilePhone, setProfilePhone] = useState("+1 234 567 890");
  const [profileTouched, setProfileTouched] = useState({ name: false, email: false, phone: false });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwTouched, setPwTouched] = useState({ current: false, next: false, confirm: false });

  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyPromo, setNotifyPromo] = useState(true);

  const [resultOpen, setResultOpen] = useState(false);
  const [resultData, setResultData] = useState<{ type: "success" | "error"; title: string; message: string }>({
    type: "success", title: "", message: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileTouched({ name: true, email: true, phone: true });
    if (vName(profileName) || vEmail(profileEmail) || vPhone(profilePhone)) {
      setResultData({ type: "error", title: "Validation Failed", message: "Please correct the highlighted fields." });
      setResultOpen(true);
      return;
    }
    const updated = { ...user, name: profileName, email: profileEmail };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setResultData({ type: "success", title: "Profile Updated ✅", message: "Your profile details have been saved." });
    setResultOpen(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwTouched({ current: true, next: true, confirm: true });
    if (vPassword(currentPassword) || vPassword(newPassword)) return;
    if (newPassword !== confirmPassword) {
      setResultData({ type: "error", title: "Passwords Don't Match", message: "New password and confirmation must match." });
      setResultOpen(true);
      return;
    }
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setPwTouched({ current: false, next: false, confirm: false });
    setResultData({ type: "success", title: "Password Changed 🔐", message: "Your password has been updated." });
    setResultOpen(true);
  };

  const handleSaveNotifications = () => {
    setResultData({ type: "success", title: "Preferences Saved 🔔", message: "Your notification settings have been updated." });
    setResultOpen(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Account Settings"
        subtitle="Manage your profile, password, and notification preferences"
      />

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Profile */}
        <form onSubmit={handleSaveProfile} noValidate
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6"
          style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Person fontSize="small" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Profile Information</h3>
              <p className="text-white/40 text-[11px]">Update your personal details</p>
            </div>
          </div>
          <ValidatedInput
            label="Full Name" icon={<Person fontSize="small" />}
            value={profileName} onChange={setProfileName} placeholder="John Doe"
            validate={vName} touched={profileTouched.name}
            onBlur={() => setProfileTouched((t) => ({ ...t, name: true }))}
          />
          <ValidatedInput
            label="Email Address" type="email" icon={<Email fontSize="small" />}
            value={profileEmail} onChange={setProfileEmail} placeholder="you@example.com"
            validate={vEmail} touched={profileTouched.email}
            onBlur={() => setProfileTouched((t) => ({ ...t, email: true }))}
          />
          <ValidatedInput
            label="Phone Number" type="tel" icon={<Phone fontSize="small" />}
            value={profilePhone} onChange={setProfilePhone} placeholder="+1 234 567 890"
            validate={vPhone} touched={profileTouched.phone}
            onBlur={() => setProfileTouched((t) => ({ ...t, phone: true }))}
          />
          <button type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
              transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            <CheckCircle fontSize="small" /> Save Changes
          </button>
        </form>

        {/* Password */}
        <form onSubmit={handleChangePassword} noValidate
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6"
          style={{ animation: "fadeUp 0.5s ease-out 0.2s both" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Lock fontSize="small" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Change Password</h3>
              <p className="text-white/40 text-[11px]">Keep your account secure</p>
            </div>
          </div>
          <ValidatedInput
            label="Current Password" icon={<Lock fontSize="small" />}
            value={currentPassword} onChange={setCurrentPassword} placeholder="••••••••" showToggle
            validate={vPassword} touched={pwTouched.current}
            onBlur={() => setPwTouched((t) => ({ ...t, current: true }))}
          />
          <ValidatedInput
            label="New Password" icon={<Lock fontSize="small" />}
            value={newPassword} onChange={setNewPassword} placeholder="••••••••" showToggle
            validate={vPassword} touched={pwTouched.next}
            onBlur={() => setPwTouched((t) => ({ ...t, next: true }))}
          />
          <ValidatedInput
            label="Confirm New Password" icon={<Lock fontSize="small" />}
            value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" showToggle
            validate={(v) => {
              if (!v) return "Please confirm your password";
              if (v !== newPassword) return "Passwords don't match";
              return null;
            }}
            touched={pwTouched.confirm}
            onBlur={() => setPwTouched((t) => ({ ...t, confirm: true }))}
          />
          <button type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
              transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            <Lock fontSize="small" /> Update Password
          </button>
        </form>

        {/* Notifications */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6"
          style={{ animation: "fadeUp 0.5s ease-out 0.3s both" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Notifications fontSize="small" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Notifications</h3>
              <p className="text-white/40 text-[11px]">Choose how you want to hear from us</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Email Notifications", desc: "Booking confirmations and trip updates", value: notifyEmail, set: setNotifyEmail },
              { label: "SMS Alerts", desc: "Real-time alerts for flight changes", value: notifySms, set: setNotifySms },
              { label: "Promotional Emails", desc: "Deals, offers, and travel inspiration", value: notifyPromo, set: setNotifyPromo },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm">{n.label}</div>
                  <div className="text-white/40 text-[11px] mt-0.5">{n.desc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => n.set(!n.value)}
                  className={`relative shrink-0 w-11 h-6 rounded-full transition-all duration-300
                    ${n.value ? "bg-white" : "bg-white/20"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300
                    ${n.value ? "left-[22px] bg-black" : "left-0.5 bg-white"}`} />
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleSaveNotifications}
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full mt-4
              transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            <CheckCircle fontSize="small" /> Save Preferences
          </button>
        </div>
      </div>

      <ResultModal
        open={resultOpen}
        type={resultData.type}
        title={resultData.title}
        message={resultData.message}
        onClose={() => setResultOpen(false)}
      />
    </>
  );
};

/* ================= BOOKING DETAILS MODAL ================= */
const BookingDetailsModal: React.FC<{
  booking: Booking;
  onClose: () => void;
  onCancel?: (id: string) => void;
}> = ({ booking, onClose, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div className="relative w-full max-w-lg bg-black border border-white/15 rounded-2xl overflow-hidden
        shadow-[0_0_60px_rgba(255,255,255,0.1)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
        max-h-[92vh] overflow-y-auto">
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 text-black bg-white/90 hover:bg-white p-1.5 rounded-full
            transition-all hover:rotate-90">
          <CloseIcon fontSize="small" />
        </button>

        <div className="relative h-40">
          <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-white/50 text-[10px] font-mono mb-1">{booking.id}</div>
            <h2 className="text-white font-extrabold text-xl">{booking.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <LocationOn sx={{ fontSize: 12 }} className="text-white/60" />
              <span className="text-white/60 text-xs">{booking.destination}</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Travel Date", value: new Date(booking.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), icon: <CalendarToday sx={{ fontSize: 14 }} /> },
              { label: "Guests", value: `${booking.guests} traveler${booking.guests > 1 ? "s" : ""}`, icon: <Person sx={{ fontSize: 14 }} /> },
              { label: "Booking Type", value: booking.type.charAt(0).toUpperCase() + booking.type.slice(1), icon: <CardTravel sx={{ fontSize: 14 }} /> },
              { label: "Total Price", value: `$${booking.price.toLocaleString()}`, icon: <AttachMoney sx={{ fontSize: 14 }} /> },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1 text-white/40 text-[9px] uppercase tracking-wider mb-1">
                  {s.icon} {s.label}
                </div>
                <div className="text-white font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={onClose}
              className="flex-1 text-white font-semibold text-sm py-3 rounded-full border border-white/30
                transition-all hover:bg-white/10">
              Close
            </button>
            {booking.status === "upcoming" && onCancel && (
              <button onClick={() => onCancel(booking.id)}
                className="flex-1 flex items-center justify-center gap-1.5 text-red-400 font-semibold text-sm py-3 rounded-full
                  border border-red-500/30 hover:bg-red-500/10 transition-all">
                <CloseIcon fontSize="small" /> Cancel Trip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

