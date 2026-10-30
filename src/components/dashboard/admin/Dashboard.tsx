// Dashboard.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  FlightTakeoff,
  CardTravel,
  Settings,
  Logout,
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
  Visibility,
  VisibilityOff,
  Lock,
  Public,
  SupportAgent,
  Hotel,
  Explore,
  Download,
  Chat,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { SidebarToggle, Sidebar } from "../admin/components/sidebar/Sidebar";

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

/* ================= MOCK BOOKINGS ================= */
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "WX-2024-001",
    type: "tour",
    title: "Switzerland Alpine Tour",
    destination: "Switzerland",
    date: "2025-03-15",
    guests: 2,
    price: 2200,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2024-002",
    type: "flight",
    title: "Paris Round Trip",
    destination: "France",
    date: "2025-04-22",
    guests: 1,
    price: 480,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2023-087",
    type: "hotel",
    title: "Caribbean Beach Resort",
    destination: "Caribbean",
    date: "2024-08-10",
    guests: 2,
    price: 946,
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "WX-2023-045",
    type: "tour",
    title: "Thailand Island Hopper",
    destination: "Thailand",
    date: "2023-12-05",
    guests: 3,
    price: 495,
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
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
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  validate,
  showToggle,
  touched,
  onBlur,
  disabled,
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
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300
          ${isInvalid ? "text-red-400" : isValid ? "text-green-400" : "text-white/40 group-focus-within:text-white"}`}
        >
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
            ${
              isInvalid
                ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                : isValid
                  ? "border-green-500/70 focus:border-green-400 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"
                  : "border-white/15 focus:border-white/60 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
            }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {showToggle && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-white/40 hover:text-white transition-colors duration-300"
            >
              {visible ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </button>
          )}
          {isValid && (
            <CheckCircle sx={{ fontSize: 18 }} className="text-green-400" />
          )}
          {isInvalid && (
            <Cancel sx={{ fontSize: 18 }} className="text-red-400" />
          )}
        </div>
      </div>
      {isInvalid && (
        <p className="text-red-400 text-[11px] mt-1 ml-1">{error}</p>
      )}
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
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />
      <div
        className="relative w-full max-w-sm bg-black border border-white/15 rounded-2xl p-8 text-center
        shadow-[0_0_60px_rgba(255,255,255,0.12)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
      >
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5
          ${isSuccess ? "bg-white text-black" : "bg-white/10 text-white border-2 border-white"}`}
        >
          {isSuccess ? (
            <CheckCircle sx={{ fontSize: 48 }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 48 }} />
          )}
        </div>
        <h3 className="text-white text-xl font-extrabold mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="w-full text-black bg-white font-bold text-sm py-3 rounded-full
            transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
        >
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
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider
      px-2 py-0.5 rounded-full border ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "upcoming"
            ? "bg-white animate-pulse"
            : status === "completed"
              ? "bg-green-400"
              : "bg-red-400"
        }`}
      />
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
    <div
      className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
      transition-all duration-500 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1
      hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)]"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-40 h-32 sm:h-auto overflow-hidden shrink-0">
          <img
            src={booking.image}
            alt={booking.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 sm:bg-gradient-to-r" />
          <div
            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20
            flex items-center justify-center text-white"
          >
            {typeIcon}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <div className="text-white/40 text-[10px] font-mono mb-0.5">
                {booking.id}
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base truncate">
                {booking.title}
              </h3>
              <div className="flex items-center gap-1 text-white/50 text-[11px] mt-0.5">
                <LocationOn sx={{ fontSize: 12 }} />
                {booking.destination}
              </div>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">
                Date
              </div>
              <div className="text-white text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                <CalendarToday sx={{ fontSize: 10 }} />
                {new Date(booking.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "2-digit",
                })}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">
                Guests
              </div>
              <div className="text-white text-[11px] font-semibold mt-0.5">
                {booking.guests} traveler{booking.guests > 1 ? "s" : ""}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">
                Total
              </div>
              <div className="text-white text-[11px] font-bold mt-0.5">
                ${booking.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => onView(booking)}
              className="flex-1 flex items-center justify-center gap-1.5 text-white bg-white/10 hover:bg-white/20
                font-semibold text-xs py-2 rounded-lg transition-all duration-300"
            >
              <ArrowForward sx={{ fontSize: 14 }} /> View Details
            </button>
            {booking.status === "upcoming" && (
              <button
                onClick={() => onCancel(booking.id)}
                className="flex items-center justify-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10
                  font-semibold text-xs px-3 py-2 rounded-lg transition-all duration-300 border border-red-500/20"
              >
                <CloseIcon sx={{ fontSize: 14 }} /> Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= DASHBOARD ================= */
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ---- Session ---- */
  const [user, setUser] = useState<SessionUser | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  /* ---- Tab state ---- */
  type Tab = "overview" | "bookings" | "trips" | "settings";
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  /* ---- Bookings ---- */
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    let list = bookings;
    if (filter !== "all") list = list.filter((b) => b.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q),
      );
    }
    return list;
  }, [bookings, filter, search]);

  /* ---- Settings form ---- */
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [profilePhone, setProfilePhone] = useState("+1 234 567 890");
  const [profileTouched, setProfileTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwTouched, setPwTouched] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  /* ---- Result ---- */
  const [resultOpen, setResultOpen] = useState(false);
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [resultTitle, setResultTitle] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const showResult = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setResultType(type);
    setResultTitle(title);
    setResultMessage(message);
    setResultOpen(true);
  };

  /* ---- Scroll lock ---- */
  const anyModalOpen = !!selectedBooking || resultOpen || sidebarOpen;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [anyModalOpen]);

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    const upcoming = bookings.filter((b) => b.status === "upcoming").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const totalSpent = bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((s, b) => s + b.price, 0);
    return { upcoming, completed, totalSpent, total: bookings.length };
  }, [bookings]);

  /* ---- Handlers ---- */
  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b,
      ),
    );
    showResult(
      "success",
      "Booking Cancelled",
      `Booking ${id} has been cancelled. A refund will be processed within 5–7 business days.`,
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileTouched({ name: true, email: true, phone: true });
    if (vName(profileName) || vEmail(profileEmail) || vPhone(profilePhone)) {
      showResult(
        "error",
        "Validation Failed",
        "Please correct the highlighted fields.",
      );
      return;
    }
    const updated = { ...user!, name: profileName, email: profileEmail };
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    showResult(
      "success",
      "Profile Updated ✅",
      "Your profile details have been saved.",
    );
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwTouched({ current: true, next: true, confirm: true });
    if (vPassword(currentPassword) || vPassword(newPassword)) return;
    if (newPassword !== confirmPassword) {
      showResult(
        "error",
        "Passwords Don't Match",
        "New password and confirmation must match.",
      );
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPwTouched({ current: false, next: false, confirm: false });
    showResult(
      "success",
      "Password Changed 🔐",
      "Your password has been updated successfully.",
    );
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  if (!user) return null;

  /* ---- Tabs ---- */
  const tabs = [
    {
      id: "overview" as Tab,
      label: "Overview",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      id: "bookings" as Tab,
      label: "My Bookings",
      icon: <CardTravel fontSize="small" />,
    },
    {
      id: "trips" as Tab,
      label: "My Trips",
      icon: <FlightTakeoff fontSize="small" />,
    },
    {
      id: "settings" as Tab,
      label: "Settings",
      icon: <Settings fontSize="small" />,
    },
  ];

  return (
    <>
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
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* ============ LAYOUT SHELL ============ */}
      <div className="min-h-screen bg-black">
        {/* Sidebar (fixed on desktop, drawer on mobile) */}
        <Sidebar
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />
        <SidebarToggle onClick={() => setSidebarOpen(true)} />

        {/* ============ MAIN CONTENT — OFFSET BY SIDEBAR WIDTH ============ */}
        <main className="lg:pl-[260px] transition-all duration-300">
          <div className="relative min-h-screen pt-20 sm:pt-24 pb-16">
            {/* Background */}
            <div className="fixed inset-0 lg:left-[260px] pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
              <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1400px] 2xl:max-w-[1500px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-10 xl:px-14">
              {/* ================= HEADER ================= */}
              <div
                className="mb-8"
                style={{ animation: "fadeUp 0.6s ease-out both" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-white/50 text-[10px] font-bold tracking-[3px] uppercase">
                        {user.role === "admin"
                          ? "Admin Portal"
                          : "Traveler Dashboard"}
                      </span>
                    </div>
                    <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight">
                      Welcome back,{" "}
                      <span className="text-white/50">
                        {user.name.split(" ")[0]}
                      </span>
                    </h1>
                    <p className="text-white/40 text-xs sm:text-sm mt-1">
                      {stats.upcoming > 0
                        ? `You have ${stats.upcoming} upcoming trip${stats.upcoming > 1 ? "s" : ""} — let's get ready.`
                        : "No upcoming trips yet. Ready to plan your next adventure?"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/"
                      className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold
                        px-3 py-2 rounded-lg border border-white/15 hover:border-white/30 transition-all"
                    >
                      <Explore fontSize="small" /> Explore
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-white bg-white/10 hover:bg-white/20 text-xs font-semibold
                        px-3 py-2 rounded-lg transition-all"
                    >
                      <Logout fontSize="small" /> Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= TABS ================= */}
              <div
                className="mb-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"
                style={{ animation: "fadeUp 0.6s ease-out 0.1s both" }}
              >
                <div className="flex gap-1 min-w-max bg-white/[0.03] border border-white/10 rounded-xl p-1">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold
                        transition-all duration-300 whitespace-nowrap
                        ${
                          activeTab === t.id
                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= OVERVIEW TAB ================= */}
              {activeTab === "overview" && (
                <div
                  className="space-y-6"
                  style={{ animation: "fadeUp 0.5s ease-out both" }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      {
                        icon: <FlightTakeoff fontSize="small" />,
                        value: stats.upcoming,
                        label: "Upcoming Trips",
                      },
                      {
                        icon: <CheckCircle fontSize="small" />,
                        value: stats.completed,
                        label: "Completed",
                      },
                      {
                        icon: <CardTravel fontSize="small" />,
                        value: stats.total,
                        label: "Total Bookings",
                      },
                      {
                        icon: <AttachMoney fontSize="small" />,
                        value: `$${stats.totalSpent.toLocaleString()}`,
                        label: "Total Spent",
                      },
                    ].map((s, i) => (
                      <div
                        key={s.label}
                        className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-4
                          transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-1 hover:border-white/30"
                        style={{
                          animation: `fadeUp 0.5s ease-out ${i * 0.08}s both`,
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center
                          text-white mb-2 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:rotate-6"
                        >
                          {s.icon}
                        </div>
                        <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">
                          {s.value}
                        </div>
                        <div className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">
                          {s.label}
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 origin-left
                          transition-transform duration-500 group-hover:scale-x-100"
                        />
                      </div>
                    ))}
                  </div>

                  {bookings.find((b) => b.status === "upcoming") && (
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                      <div className="grid md:grid-cols-[300px_1fr]">
                        <div className="relative h-48 md:h-auto overflow-hidden">
                          <img
                            src={
                              bookings.find((b) => b.status === "upcoming")!
                                .image
                            }
                            alt="Next trip"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:bg-gradient-to-r" />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded-full">
                              Next Trip
                            </span>
                          </div>
                        </div>
                        <div className="p-5 sm:p-6">
                          {(() => {
                            const next = bookings.find(
                              (b) => b.status === "upcoming",
                            )!;
                            const daysLeft = Math.ceil(
                              (new Date(next.date).getTime() - Date.now()) /
                                (1000 * 60 * 60 * 24),
                            );
                            return (
                              <>
                                <div className="text-white/50 text-[10px] font-bold tracking-[3px] uppercase mb-1">
                                  Upcoming · {next.id}
                                </div>
                                <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-1">
                                  {next.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-3 text-white/60 text-xs mb-4">
                                  <span className="flex items-center gap-1">
                                    <LocationOn sx={{ fontSize: 12 }} />{" "}
                                    {next.destination}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <CalendarToday sx={{ fontSize: 12 }} />
                                    {new Date(next.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      },
                                    )}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Person sx={{ fontSize: 12 }} />{" "}
                                    {next.guests} guest
                                    {next.guests > 1 ? "s" : ""}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                                    {daysLeft > 0 ? daysLeft : 0}
                                    <span className="text-sm text-white/50 font-medium ml-1">
                                      days to go
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    onClick={() => setSelectedBooking(next)}
                                    className="group flex items-center gap-1.5 text-black bg-white font-bold text-xs px-4 py-2 rounded-full
                                      transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                                  >
                                    View Details
                                    <ArrowForward
                                      sx={{ fontSize: 14 }}
                                      className="transition-transform group-hover:translate-x-0.5"
                                    />
                                  </button>
                                  <Link
                                    to="/contact"
                                    className="flex items-center gap-1.5 text-white font-semibold text-xs px-4 py-2 rounded-full
                                      border border-white/30 hover:bg-white hover:text-black transition-all"
                                  >
                                    <Chat sx={{ fontSize: 14 }} /> Contact
                                    Support
                                  </Link>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-bold text-lg">
                        Recent Bookings
                      </h3>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className="text-white/60 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        View all <ArrowForward sx={{ fontSize: 14 }} />
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {bookings.slice(0, 2).map((b) => (
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onCancel={handleCancelBooking}
                          onView={setSelectedBooking}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= BOOKINGS TAB ================= */}
              {activeTab === "bookings" && (
                <div style={{ animation: "fadeUp 0.5s ease-out both" }}>
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 sm:p-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 group">
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
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(
                        ["all", "upcoming", "completed", "cancelled"] as const
                      ).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-300
                          ${
                            filter === f
                              ? "bg-white text-black border-white"
                              : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white hover:border-white/30"
                          }`}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/40 mb-4">
                        <CardTravel sx={{ fontSize: 32 }} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        No bookings found
                      </h3>
                      <p className="text-white/50 text-sm mb-4">
                        {search
                          ? "Try a different search term."
                          : "Start exploring to create your first booking."}
                      </p>
                      <Link
                        to="/destinations"
                        className="inline-flex items-center gap-2 text-black bg-white font-bold text-sm px-6 py-3 rounded-full
                          transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                      >
                        <Explore fontSize="small" /> Explore Destinations
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredBookings.map((b) => (
                        <BookingCard
                          key={b.id}
                          booking={b}
                          onCancel={handleCancelBooking}
                          onView={setSelectedBooking}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TRIPS TAB ================= */}
              {activeTab === "trips" && (
                <div style={{ animation: "fadeUp 0.5s ease-out both" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bookings
                      .filter((b) => b.status !== "cancelled")
                      .map((b) => (
                        <div
                          key={b.id}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
                          transition-all duration-500 hover:border-white/30 hover:-translate-y-1"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div className="absolute top-3 right-3">
                              <StatusBadge status={b.status} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-extrabold text-base">
                                {b.title}
                              </h3>
                              <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
                                <LocationOn sx={{ fontSize: 12 }} />{" "}
                                {b.destination}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-3 gap-2 text-center mb-3">
                              <div>
                                <div className="text-[9px] uppercase tracking-wider text-white/40">
                                  Date
                                </div>
                                <div className="text-white text-[11px] font-semibold mt-0.5">
                                  {new Date(b.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="text-[9px] uppercase tracking-wider text-white/40">
                                  Guests
                                </div>
                                <div className="text-white text-[11px] font-semibold mt-0.5">
                                  {b.guests}
                                </div>
                              </div>
                              <div>
                                <div className="text-[9px] uppercase tracking-wider text-white/40">
                                  Total
                                </div>
                                <div className="text-white text-[11px] font-bold mt-0.5">
                                  ${b.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedBooking(b)}
                                className="flex-1 flex items-center justify-center gap-1.5 text-black bg-white font-bold text-xs py-2 rounded-lg
                                transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                              >
                                <ArrowForward sx={{ fontSize: 14 }} /> View
                              </button>
                              <button
                                className="flex items-center justify-center gap-1 text-white bg-white/10 hover:bg-white/20
                              text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                              >
                                <Download sx={{ fontSize: 14 }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ================= SETTINGS TAB ================= */}
              {activeTab === "settings" && (
                <div
                  className="grid lg:grid-cols-2 gap-4 sm:gap-6"
                  style={{ animation: "fadeUp 0.5s ease-out both" }}
                >
                  <form
                    onSubmit={handleSaveProfile}
                    noValidate
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <Person fontSize="small" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">
                          Profile Information
                        </h3>
                        <p className="text-white/40 text-[11px]">
                          Update your personal details
                        </p>
                      </div>
                    </div>

                    <ValidatedInput
                      label="Full Name"
                      icon={<Person fontSize="small" />}
                      value={profileName}
                      onChange={setProfileName}
                      placeholder="John Doe"
                      validate={vName}
                      touched={profileTouched.name}
                      onBlur={() =>
                        setProfileTouched((t) => ({ ...t, name: true }))
                      }
                    />
                    <ValidatedInput
                      label="Email Address"
                      type="email"
                      icon={<Email fontSize="small" />}
                      value={profileEmail}
                      onChange={setProfileEmail}
                      placeholder="you@example.com"
                      validate={vEmail}
                      touched={profileTouched.email}
                      onBlur={() =>
                        setProfileTouched((t) => ({ ...t, email: true }))
                      }
                    />
                    <ValidatedInput
                      label="Phone Number"
                      type="tel"
                      icon={<Phone fontSize="small" />}
                      value={profilePhone}
                      onChange={setProfilePhone}
                      placeholder="+1 234 567 890"
                      validate={vPhone}
                      touched={profileTouched.phone}
                      onBlur={() =>
                        setProfileTouched((t) => ({ ...t, phone: true }))
                      }
                    />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                        transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
                    >
                      <CheckCircle fontSize="small" /> Save Changes
                    </button>
                  </form>

                  <form
                    onSubmit={handleChangePassword}
                    noValidate
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <Lock fontSize="small" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">
                          Change Password
                        </h3>
                        <p className="text-white/40 text-[11px]">
                          Keep your account secure
                        </p>
                      </div>
                    </div>

                    <ValidatedInput
                      label="Current Password"
                      icon={<Lock fontSize="small" />}
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      placeholder="••••••••"
                      showToggle
                      validate={vPassword}
                      touched={pwTouched.current}
                      onBlur={() =>
                        setPwTouched((t) => ({ ...t, current: true }))
                      }
                    />
                    <ValidatedInput
                      label="New Password"
                      icon={<Lock fontSize="small" />}
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="••••••••"
                      showToggle
                      validate={vPassword}
                      touched={pwTouched.next}
                      onBlur={() => setPwTouched((t) => ({ ...t, next: true }))}
                    />
                    <ValidatedInput
                      label="Confirm New Password"
                      icon={<Lock fontSize="small" />}
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="••••••••"
                      showToggle
                      validate={(v) => {
                        if (!v) return "Please confirm your password";
                        if (v !== newPassword) return "Passwords don't match";
                        return null;
                      }}
                      touched={pwTouched.confirm}
                      onBlur={() =>
                        setPwTouched((t) => ({ ...t, confirm: true }))
                      }
                    />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                        transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
                    >
                      <Lock fontSize="small" /> Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ================= BOOKING DETAILS MODAL ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedBooking(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <div
            className="relative w-full max-w-lg bg-black border border-white/15 rounded-2xl overflow-hidden
            shadow-[0_0_60px_rgba(255,255,255,0.1)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
            max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 z-20 text-black bg-white/90 hover:bg-white p-1.5 rounded-full
                transition-all hover:rotate-90"
            >
              <CloseIcon fontSize="small" />
            </button>

            <div className="relative h-40">
              <img
                src={selectedBooking.image}
                alt={selectedBooking.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white/50 text-[10px] font-mono mb-1">
                  {selectedBooking.id}
                </div>
                <h2 className="text-white font-extrabold text-xl">
                  {selectedBooking.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <LocationOn sx={{ fontSize: 12 }} className="text-white/60" />
                  <span className="text-white/60 text-xs">
                    {selectedBooking.destination}
                  </span>
                  <StatusBadge status={selectedBooking.status} />
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  {
                    label: "Travel Date",
                    value: new Date(selectedBooking.date).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    ),
                    icon: <CalendarToday sx={{ fontSize: 14 }} />,
                  },
                  {
                    label: "Guests",
                    value: `${selectedBooking.guests} traveler${selectedBooking.guests > 1 ? "s" : ""}`,
                    icon: <Person sx={{ fontSize: 14 }} />,
                  },
                  {
                    label: "Booking Type",
                    value:
                      selectedBooking.type.charAt(0).toUpperCase() +
                      selectedBooking.type.slice(1),
                    icon: <CardTravel sx={{ fontSize: 14 }} />,
                  },
                  {
                    label: "Total Price",
                    value: `$${selectedBooking.price.toLocaleString()}`,
                    icon: <AttachMoney sx={{ fontSize: 14 }} />,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-1 text-white/40 text-[9px] uppercase tracking-wider mb-1">
                      {s.icon} {s.label}
                    </div>
                    <div className="text-white font-bold text-sm">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 text-white font-semibold text-sm py-3 rounded-full border border-white/30
                    transition-all hover:bg-white/10"
                >
                  Close
                </button>
                {selectedBooking.status === "upcoming" && (
                  <button
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setSelectedBooking(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 text-red-400 font-semibold text-sm py-3 rounded-full
                      border border-red-500/30 hover:bg-red-500/10 transition-all"
                  >
                    <CloseIcon fontSize="small" /> Cancel Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ResultModal
        open={resultOpen}
        type={resultType}
        title={resultTitle}
        message={resultMessage}
        onClose={() => setResultOpen(false)}
      />
    </>
  );
};
