// Navbar.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  FlightTakeoff,
  TravelExplore,
  Public,
  Luggage,
  SupportAgent,
  Login,
  PersonAdd,
  Home,
  Info,
  ContactSupport,
  LocalOffer,
  Explore,
  CardTravel,
  KeyboardArrowDown,
  WhatsApp,
  Logout,
  Settings,
  Flight,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  CheckCircle,
  Cancel,
  Dashboard,
  AdminPanelSettings,
  ArrowForward,
  Shield,
  Speed,
  AttachMoney,
  CalendarToday,
  Group,
  Error as ErrorIcon,
  Hotel,
  GppGood,
  Description,
  Language,
  AccessTime,
  Star,
} from "@mui/icons-material";

/* ================= HIDDEN CREDENTIALS ================= */
const AUTH_USERS = [
  {
    email: "admin@gmail.com",
    password: "admin",
    role: "admin" as const,
    name: "Admin",
  },
  {
    email: "user@gmail.com",
    password: "user",
    role: "user" as const,
    name: "Traveler",
  },
];
const SESSION_KEY = "wox_user";

type UserRole = "user" | "admin";
interface SessionUser {
  email: string;
  role: UserRole;
  name: string;
}

/* ================= SVGs ================= */
const CompassLogoSVG: React.FC = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 40 40"
    fill="none"
    className="drop-shadow-lg"
  >
    <circle
      cx="20"
      cy="20"
      r="18"
      stroke="#FFF"
      strokeWidth="2"
      fill="rgba(255,255,255,0.03)"
    />
    <circle
      cx="20"
      cy="20"
      r="13"
      stroke="#FFF"
      strokeWidth="1"
      opacity="0.3"
    />
    <path d="M20 6 L23 17 L20 20 L17 17 Z" fill="#FFF" />
    <path d="M20 34 L17 23 L20 20 L23 23 Z" fill="#FFF" opacity="0.6" />
    <circle cx="20" cy="20" r="3" fill="#000" stroke="#FFF" strokeWidth="1.5" />
  </svg>
);

const PlanePathSVG: React.FC = () => (
  <svg
    width="60"
    height="20"
    viewBox="0 0 60 20"
    fill="none"
    className="opacity-40"
  >
    <path
      d="M2 10 Q 15 2, 30 10 T 58 10"
      stroke="url(#pg)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
    />
    <circle cx="58" cy="10" r="2" fill="#FFF" />
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="60" y2="0">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFF" />
      </linearGradient>
    </defs>
  </svg>
);

const StarSVG: React.FC<{ delay?: string }> = ({ delay = "0s" }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 8 8"
    fill="#FFF"
    className="absolute animate-pulse"
    style={{ animationDelay: delay }}
  >
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TravelingPlaneSVG: React.FC = () => (
  <svg
    className="absolute top-2 right-10 opacity-10 animate-[float_4s_ease-in-out_infinite]"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="#FFF"
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

/* ================= VALIDATED INPUT FIELD ================= */
interface ValidatedInputProps {
  label: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  validate?: (v: string) => string | null; // returns error or null
  showToggle?: boolean;
  touched?: boolean;
  onBlur?: () => void;
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
          placeholder={placeholder}
          className={`w-full bg-white/5 border rounded-xl pl-11 pr-11 py-3 text-white text-sm
            placeholder-white/30 outline-none transition-all duration-300
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

/* ================= MODAL SHELL ================= */
const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}> = ({ open, onClose, title, subtitle, children, footer, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      />
      <div
        className={`relative w-full ${wide ? "max-w-3xl" : "max-w-md"} bg-black border border-white/15 rounded-2xl
        shadow-[0_0_60px_rgba(255,255,255,0.08)] p-6 sm:p-8
        animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)] max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 rounded-full
          hover:bg-white/10 transition-all duration-300 hover:rotate-90 z-10"
        >
          <CloseIcon fontSize="small" />
        </button>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
              <CompassLogoSVG />
            </div>
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-wide">
            {title}
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-1">{subtitle}</p>
        </div>
        {children}
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </div>
  );
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

/* ================= SERVICE DEFS ================= */
interface ServiceInfo {
  id: string;
  title: string;
  subtitle: string;
  hero: string;
  description: string;
  price: string;
  duration: string;
  sidebar: { icon: React.ReactNode; label: string; value: string }[];
  features: string[];
  formType: "flight" | "hotel" | "visa" | "insurance";
}

const SERVICE_DEFS: Record<string, ServiceInfo> = {
  flight: {
    id: "flight",
    title: "Flight Booking",
    subtitle: "500+ airlines · Best fares guaranteed",
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    description:
      "We secure the best fares across 500+ airlines — seat selection, baggage, upgrades, and 24/7 rebooking.",
    price: "From $129",
    duration: "Instant confirmation",
    sidebar: [
      {
        icon: <Flight fontSize="small" />,
        label: "Airlines",
        value: "500+ worldwide",
      },
      {
        icon: <AttachMoney fontSize="small" />,
        label: "Best Fare",
        value: "Price match",
      },
      {
        icon: <AccessTime fontSize="small" />,
        label: "Confirm",
        value: "Instant",
      },
      {
        icon: <Shield fontSize="small" />,
        label: "Protection",
        value: "24/7 support",
      },
    ],
    features: [
      "500+ airlines worldwide",
      "Price match guarantee",
      "Free date change (once)",
      "24/7 rebooking support",
      "Priority boarding",
    ],
    formType: "flight",
  },
  hotel: {
    id: "hotel",
    title: "Hotel Reservation",
    subtitle: "Handpicked stays in 120+ countries",
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description:
      "Curated stays that match your style — from overwater villas to alpine chalets. Personally vetted by our team.",
    price: "From $89/night",
    duration: "Instant booking",
    sidebar: [
      {
        icon: <Hotel fontSize="small" />,
        label: "Properties",
        value: "5,000+ vetted",
      },
      {
        icon: <Star fontSize="small" />,
        label: "Avg Rating",
        value: "4.8 / 5",
      },
      {
        icon: <AttachMoney fontSize="small" />,
        label: "Best Rate",
        value: "Guaranteed",
      },
      {
        icon: <Language fontSize="small" />,
        label: "Countries",
        value: "120+",
      },
    ],
    features: [
      "Handpicked only",
      "Best rate guarantee",
      "Free cancellation",
      "Loyalty perks",
      "Local concierge",
    ],
    formType: "hotel",
  },
  visa: {
    id: "visa",
    title: "Visa Assistance",
    subtitle: "90+ countries · Document review included",
    hero: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    description:
      "Document review, submission, and tracking — so you never miss a deadline.",
    price: "From $59",
    duration: "3–10 business days",
    sidebar: [
      { icon: <Public fontSize="small" />, label: "Countries", value: "90+" },
      {
        icon: <Description fontSize="small" />,
        label: "Documents",
        value: "Reviewed",
      },
      {
        icon: <Speed fontSize="small" />,
        label: "Express",
        value: "Available",
      },
      {
        icon: <GppGood fontSize="small" />,
        label: "Approval",
        value: "100% guided",
      },
    ],
    features: [
      "90+ countries",
      "Document review",
      "Real-time tracking",
      "Express processing",
      "Approval guidance",
    ],
    formType: "visa",
  },
  insurance: {
    id: "insurance",
    title: "Travel Insurance",
    subtitle: "Medical · Cancellation · Luggage",
    hero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description:
      "Peace of mind coverage — medical, cancellations, lost luggage, and delays, with 24/7 global support.",
    price: "From $19",
    duration: "Instant activation",
    sidebar: [
      {
        icon: <Shield fontSize="small" />,
        label: "Medical",
        value: "Up to $500K",
      },
      { icon: <Flight fontSize="small" />, label: "Delays", value: "Covered" },
      {
        icon: <Luggage fontSize="small" />,
        label: "Luggage",
        value: "Up to $5K",
      },
      {
        icon: <SupportAgent fontSize="small" />,
        label: "Support",
        value: "24/7 global",
      },
    ],
    features: [
      "Medical up to $500K",
      "Cancellation protection",
      "Lost luggage cover",
      "Flight delays",
      "24/7 global assistance",
    ],
    formType: "insurance",
  },
};

const TOUR_PACKAGES = [
  {
    id: "caribbean",
    country: "Caribbean",
    price: "$946",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    highlights: ["Crystal Beaches", "Coral Reefs", "Island Hopping"],
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "switzerland",
    country: "Switzerland",
    price: "$1,100",
    duration: "8 Days / 7 Nights",
    rating: 4.9,
    highlights: ["Alpine Peaks", "Lakes & Trails", "Snow Villages"],
    bg: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "france",
    country: "France",
    price: "$425",
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    highlights: ["Paris Lights", "Wine Country", "Riviera Coast"],
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "thailand",
    country: "Thailand",
    price: "$165",
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    highlights: ["Island Hopping", "Street Food", "Ancient Temples"],
    bg: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  },
];

/* ================= VALIDATORS ================= */
const vRequired =
  (msg = "This field is required") =>
  (v: string) =>
    !v.trim() ? msg : null;
const vEmail = (v: string) => {
  if (!v.trim()) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email address";
  return null;
};
const vPhone = (v: string) => {
  if (!v.trim()) return "Phone is required";
  if (!/^[+\d][\d\s\-()]{6,}$/.test(v)) return "Enter a valid phone number";
  return null;
};
const vPassword = (v: string) => {
  if (!v) return "Password is required";
  if (v.length < 4) return "At least 4 characters";
  return null;
};
const vName = (v: string) => {
  if (!v.trim()) return "Name is required";
  if (v.trim().length < 2) return "Name too short";
  return null;
};

/* ================= NAVBAR ================= */
export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Persistent user
  const [user, setUser] = useState<SessionUser | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  // Auth modals
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  // Sign in
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siTouched, setSiTouched] = useState({ email: false, password: false });

  // Sign up
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suTouched, setSuTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  // Service modal
  const [activeService, setActiveService] = useState<ServiceInfo | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<
    (typeof TOUR_PACKAGES)[0] | null
  >(null);

  // Service form
  const [svcName, setSvcName] = useState("");
  const [svcEmail, setSvcEmail] = useState("");
  const [svcPhone, setSvcPhone] = useState("");
  const [svcDate, setSvcDate] = useState("");
  const [svcDetail1, setSvcDetail1] = useState("");
  const [svcDetail2, setSvcDetail2] = useState("");
  const [svcNotes, setSvcNotes] = useState("");
  const [svcTouched, setSvcTouched] = useState({
    name: false,
    email: false,
    phone: false,
    date: false,
  });

  // Result
  const [resultOpen, setResultOpen] = useState(false);
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [resultTitle, setResultTitle] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const servicesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      )
        setServicesOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const anyModalOpen =
    mobileOpen ||
    signInOpen ||
    signUpOpen ||
    !!activeService ||
    tourOpen ||
    resultOpen;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [anyModalOpen]);

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

  // Navigation items (real routes)
  const navLinks = [
    { label: "Home", icon: <Home fontSize="small" />, to: "/" },
    {
      label: "Destinations",
      icon: <Explore fontSize="small" />,
      to: "/destinations",
    },
    { label: "Packages", icon: <CardTravel fontSize="small" />, hasMenu: true },
    { label: "About Us", icon: <Info fontSize="small" />, to: "/about" },
    {
      label: "Contact",
      icon: <ContactSupport fontSize="small" />,
      to: "/contact",
    },
  ];

  const serviceMenuItems = [
    {
      id: "flight",
      label: "Flight Booking",
      icon: <FlightTakeoff fontSize="small" />,
    },
    {
      id: "hotel",
      label: "Hotel Reservation",
      icon: <Luggage fontSize="small" />,
    },
    {
      id: "tour",
      label: "Tour Packages",
      icon: <TravelExplore fontSize="small" />,
    },
    { id: "visa", label: "Visa Assistance", icon: <Public fontSize="small" /> },
    {
      id: "insurance",
      label: "Travel Insurance",
      icon: <LocalOffer fontSize="small" />,
    },
  ];

  const dashboardPath = useMemo(
    () =>
      user ? (user.role === "admin" ? "/dashboard/admin" : "/dashboard") : "/",
    [user],
  );

  /* ---------- AUTH ---------- */
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSiTouched({ email: true, password: true });
    const eErr = vEmail(siEmail);
    const pErr = vPassword(siPassword);
    if (eErr || pErr) return;

    const found = AUTH_USERS.find(
      (u) =>
        u.email.toLowerCase() === siEmail.toLowerCase() &&
        u.password === siPassword,
    );
    if (!found) {
      showResult(
        "error",
        "Invalid Credentials",
        "Email or password is incorrect.",
      );
      return;
    }
    setUser({ email: found.email, role: found.role, name: found.name });
    setSignInOpen(false);
    setSiEmail("");
    setSiPassword("");
    setSiTouched({ email: false, password: false });
    showResult(
      "success",
      `Welcome back, ${found.name}!`,
      `You're signed in as ${found.role === "admin" ? "an administrator" : "a traveler"}.`,
    );
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSuTouched({ name: true, email: true, phone: true, password: true });
    if (
      vName(suName) ||
      vEmail(suEmail) ||
      vPhone(suPhone) ||
      vPassword(suPassword)
    )
      return;

    setUser({ email: suEmail, role: "user", name: suName });
    setSignUpOpen(false);
    setSuName("");
    setSuEmail("");
    setSuPhone("");
    setSuPassword("");
    setSuTouched({ name: false, email: false, phone: false, password: false });
    showResult(
      "success",
      "Account Created 🎉",
      `Welcome to Wo Ox Travel, ${suName.split(" ")[0]}!`,
    );
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  /* ---------- SERVICES ---------- */
  const openService = (id: string) => {
    if (id === "tour") {
      setTourOpen(true);
      setServicesOpen(false);
      return;
    }
    const svc = SERVICE_DEFS[id];
    if (svc) {
      setActiveService(svc);
      setSvcName("");
      setSvcEmail("");
      setSvcPhone("");
      setSvcDate("");
      setSvcDetail1("");
      setSvcDetail2("");
      setSvcNotes("");
      setSvcTouched({ name: false, email: false, phone: false, date: false });
    }
    setServicesOpen(false);
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSvcTouched({ name: true, email: true, phone: true, date: true });
    const eErr = vEmail(svcEmail);
    const nErr = vName(svcName);
    const pErr = vPhone(svcPhone);
    if (nErr || eErr || pErr || !svcDate) {
      if (!svcDate)
        showResult("error", "Missing Date", "Please choose your date.");
      return;
    }
    const title = activeService?.title || "Service";
    setActiveService(null);
    showResult(
      "success",
      `${title} Requested ✅`,
      `Thanks ${svcName.split(" ")[0]}! We'll confirm at ${svcEmail} within 1 hour.`,
    );
  };

  const handleTourBook = (e: React.FormEvent) => {
    e.preventDefault();
    setSvcTouched({ name: true, email: true, phone: true, date: true });
    if (vName(svcName) || vEmail(svcEmail) || vPhone(svcPhone) || !svcDate)
      return;
    const country = selectedTour?.country;
    setTourOpen(false);
    setSelectedTour(null);
    showResult(
      "success",
      "Tour Booked ✈️",
      `Your ${country} tour is confirmed. Itinerary sent to ${svcEmail}.`,
    );
  };

  return (
    <>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-8px) rotate(5deg)} }
        @keyframes pulseGlow { 0%{box-shadow:0 0 0 0 rgba(255,255,255,.4)} 70%{box-shadow:0 0 0 15px rgba(255,255,255,0)} 100%{box-shadow:0 0 0 0 rgba(255,255,255,0)} }
        @keyframes slideInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalPop { from{opacity:0;transform:scale(.9) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-[slideInDown_0.6s_ease-out] bg-black
          ${scrolled ? "py-1" : "py-2 sm:py-3"}`}
        style={{
          boxShadow: scrolled
            ? "0 8px 32px rgba(255,255,255,0.06)"
            : "0 4px 20px rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <TravelingPlaneSVG />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <StarSVG delay="0s" />
          <div className="absolute top-3 left-1/4">
            <StarSVG delay="0.5s" />
          </div>
          <div className="absolute bottom-3 right-1/3">
            <StarSVG delay="1s" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-full 2xl:max-w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-[72px]">
            {/* LEFT */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden text-white p-1.5 rounded-lg transition-all duration-300 hover:bg-white/10 hover:rotate-90"
              >
                <MenuIcon className="text-2xl sm:text-[28px]" />
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="relative transition-transform duration-300 group-hover:scale-110">
                  <CompassLogoSVG />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-extrabold tracking-wide text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px]">
                    Wo Ox Travel
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-[10px] md:text-[11px] text-white/50 font-medium tracking-widest">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    EXPLORE THE WORLD
                    <PlanePathSVG />
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  ref={link.hasMenu ? servicesRef : undefined}
                >
                  {link.hasMenu ? (
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="relative overflow-hidden text-white font-semibold text-sm px-3 xl:px-4 py-2 rounded-xl
                        transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 flex items-center gap-1"
                    >
                      <span className="relative flex items-center gap-1">
                        {link.label}
                        <KeyboardArrowDown
                          fontSize="small"
                          className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={link.to!}
                      className="relative overflow-hidden text-white font-semibold text-sm px-3 xl:px-4 py-2 rounded-xl
                        transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.hasMenu && (
                    <div
                      className={`absolute top-full left-0 mt-3 w-64 rounded-2xl overflow-hidden
                      transition-all duration-300 origin-top bg-black border border-white/15
                      shadow-[0_8px_32px_rgba(255,255,255,0.08)]
                      ${servicesOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                    >
                      <div className="p-2">
                        {serviceMenuItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => openService(item.id)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white text-sm font-medium
                              transition-all duration-300 hover:bg-white/10 hover:pl-4 group"
                          >
                            <span className="text-white/70 transition-all duration-300 group-hover:text-white">
                              {item.icon}
                            </span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-1 sm:gap-2">
              {!user ? (
                <>
                  <button
                    onClick={() => setSignInOpen(true)}
                    className="hidden md:flex items-center gap-1 text-white text-sm font-semibold px-3 py-2 rounded-lg
                      border border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    <Login fontSize="small" /> Sign In
                  </button>
                  <button
                    onClick={() => setSignUpOpen(true)}
                    className="hidden sm:flex items-center gap-1.5 text-black bg-white font-bold text-xs lg:text-sm
                      px-3 lg:px-5 py-2 lg:py-2.5 rounded-full transition-all duration-300
                      hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                  >
                    <PersonAdd fontSize="small" />
                    <span className="hidden lg:inline">Sign Up</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={dashboardPath}
                    className="hidden md:flex items-center gap-1 text-white text-sm font-semibold px-3 py-2 rounded-lg
                      border border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    {user.role === "admin" ? (
                      <AdminPanelSettings fontSize="small" />
                    ) : (
                      <Dashboard fontSize="small" />
                    )}
                    Dashboard
                  </Link>
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="ml-1 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center
                        text-black bg-white transition-all duration-300 hover:scale-110 border-2 border-white/40"
                    >
                      {user.role === "admin" ? (
                        <AdminPanelSettings fontSize="small" />
                      ) : (
                        <SupportAgent fontSize="small" />
                      )}
                    </button>
                    <div
                      className={`absolute right-0 top-full mt-3 w-56 rounded-2xl overflow-hidden
                      transition-all duration-300 origin-top-right bg-black border border-white/15
                      shadow-[0_8px_32px_rgba(255,255,255,0.08)]
                      ${profileOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <div className="text-white font-bold text-sm truncate">
                            {user.name}
                          </div>
                          <div className="text-white/50 text-[10px] truncate">
                            {user.email}
                          </div>
                          <div
                            className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider
                            text-black bg-white px-1.5 py-0.5 rounded-full"
                          >
                            {user.role}
                          </div>
                        </div>
                        <Link
                          to={dashboardPath}
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white text-sm
                            transition-all duration-300 hover:bg-white/10 hover:pl-4"
                        >
                          {user.role === "admin" ? (
                            <AdminPanelSettings fontSize="small" />
                          ) : (
                            <Dashboard fontSize="small" />
                          )}
                          {user.role === "admin"
                            ? "Admin Dashboard"
                            : "My Dashboard"}
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white text-sm
                            transition-all duration-300 hover:bg-white/10 hover:pl-4"
                        >
                          <CardTravel fontSize="small" /> My Trips
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white text-sm
                            transition-all duration-300 hover:bg-white/10 hover:pl-4"
                        >
                          <Settings fontSize="small" /> Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white text-sm
                            transition-all duration-300 hover:bg-white/10 hover:pl-4"
                        >
                          <Logout fontSize="small" /> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <button
                aria-label="WhatsApp"
                className="sm:hidden text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ animation: "pulseGlow 2s infinite" }}
                onClick={() =>
                  window.open("https://wa.me/1234567890", "_blank")
                }
              >
                <WhatsApp fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[85%] xs:w-[80%] sm:w-[360px] max-w-[400px]
        bg-black transition-transform duration-500 ease-out lg:hidden overflow-y-auto flex flex-col border-r border-white/10
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CompassLogoSVG />
            <span className="font-extrabold text-white text-lg sm:text-xl">
              Wo Ox Travel
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-white p-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:rotate-90"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navLinks.map((link, i) =>
            link.hasMenu ? (
              <button
                key={link.label}
                onClick={() => {
                  setMobileOpen(false);
                  setServicesOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white font-semibold text-sm sm:text-base
                  transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
                style={{
                  animation: mobileOpen
                    ? `slideInLeft 0.4s ease-out ${i * 0.08}s both`
                    : "none",
                }}
              >
                <span className="text-white/70">{link.icon}</span>
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white font-semibold text-sm sm:text-base
                  transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
                style={{
                  animation: mobileOpen
                    ? `slideInLeft 0.4s ease-out ${i * 0.08}s both`
                    : "none",
                }}
              >
                <span className="text-white/70">{link.icon}</span>
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2 px-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/50 to-transparent" />
            <span className="text-white/60 text-xs font-bold tracking-[2px]">
              SERVICES
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-white/50 to-transparent" />
          </div>
          <div className="space-y-1">
            {serviceMenuItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileOpen(false);
                  openService(item.id);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/90 text-sm
                  transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
                style={{
                  animation: mobileOpen
                    ? `slideInLeft 0.4s ease-out ${0.3 + i * 0.08}s both`
                    : "none",
                }}
              >
                <span className="text-white/60">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto p-4 space-y-2 border-t border-white/10 bg-black">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                  transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                {user.role === "admin" ? (
                  <AdminPanelSettings fontSize="small" />
                ) : (
                  <Dashboard fontSize="small" />
                )}
                {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 text-white font-semibold text-sm py-2.5 rounded-full
                  border border-white/30 transition-all duration-300 hover:bg-white/10"
              >
                <Logout fontSize="small" /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  window.open("https://wa.me/1234567890", "_blank");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                  transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                <WhatsApp fontSize="small" /> Chat with Us
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSignInOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 text-white font-semibold text-sm py-2.5 rounded-full
                    border border-white/30 transition-all duration-300 hover:bg-white/10"
                >
                  <Login fontSize="small" /> Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSignUpOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 text-white font-semibold text-sm py-2.5 rounded-full
                    bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20"
                >
                  <PersonAdd fontSize="small" /> Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ================= SIGN IN ================= */}
      <Modal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        title="Welcome Back"
        subtitle="Sign in to continue your journey with Wo Ox Travel"
        footer={
          <>
            <button
              type="submit"
              form="signInForm"
              className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              <Login fontSize="small" /> Sign In
            </button>
            <p className="text-center text-white/50 text-xs mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setSignInOpen(false);
                  setSignUpOpen(true);
                }}
                className="text-white font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </>
        }
      >
        <form id="signInForm" onSubmit={handleSignIn} noValidate>
          <ValidatedInput
            label="Email Address"
            type="email"
            icon={<Email fontSize="small" />}
            value={siEmail}
            onChange={setSiEmail}
            placeholder="you@example.com"
            validate={vEmail}
            touched={siTouched.email}
            onBlur={() => setSiTouched((t) => ({ ...t, email: true }))}
          />
          <ValidatedInput
            label="Password"
            icon={<Lock fontSize="small" />}
            value={siPassword}
            onChange={setSiPassword}
            placeholder="••••••••"
            showToggle
            validate={vPassword}
            touched={siTouched.password}
            onBlur={() => setSiTouched((t) => ({ ...t, password: true }))}
          />
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-white/60 text-xs cursor-pointer">
              <input type="checkbox" className="accent-white" /> Remember me
            </label>
            <button
              type="button"
              className="text-white/60 text-xs hover:text-white transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= SIGN UP ================= */}
      <Modal
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        title="Create Account"
        subtitle="Join Wo Ox Travel and explore the world"
        footer={
          <>
            <button
              type="submit"
              form="signUpForm"
              className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              <CheckCircle fontSize="small" /> Create Account
            </button>
            <p className="text-center text-white/50 text-xs mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setSignUpOpen(false);
                  setSignInOpen(true);
                }}
                className="text-white font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </>
        }
      >
        <form id="signUpForm" onSubmit={handleSignUp} noValidate>
          <ValidatedInput
            label="Full Name"
            icon={<Person fontSize="small" />}
            value={suName}
            onChange={setSuName}
            placeholder="John Doe"
            validate={vName}
            touched={suTouched.name}
            onBlur={() => setSuTouched((t) => ({ ...t, name: true }))}
          />
          <ValidatedInput
            label="Email Address"
            type="email"
            icon={<Email fontSize="small" />}
            value={suEmail}
            onChange={setSuEmail}
            placeholder="you@example.com"
            validate={vEmail}
            touched={suTouched.email}
            onBlur={() => setSuTouched((t) => ({ ...t, email: true }))}
          />
          <ValidatedInput
            label="Phone Number"
            type="tel"
            icon={<Phone fontSize="small" />}
            value={suPhone}
            onChange={setSuPhone}
            placeholder="+1 234 567 890"
            validate={vPhone}
            touched={suTouched.phone}
            onBlur={() => setSuTouched((t) => ({ ...t, phone: true }))}
          />
          <ValidatedInput
            label="Password"
            icon={<Lock fontSize="small" />}
            value={suPassword}
            onChange={setSuPassword}
            placeholder="••••••••"
            showToggle
            validate={vPassword}
            touched={suTouched.password}
            onBlur={() => setSuTouched((t) => ({ ...t, password: true }))}
          />
          <label className="flex items-start gap-2 text-white/60 text-xs cursor-pointer mt-2">
            <input type="checkbox" className="accent-white mt-0.5" required />
            <span>
              I agree to the{" "}
              <span className="text-white font-semibold hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-white font-semibold hover:underline">
                Privacy Policy
              </span>
            </span>
          </label>
        </form>
      </Modal>

      {/* ================= SERVICE MODAL ================= */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setActiveService(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <div
            className="relative w-full max-w-3xl bg-black border border-white/15 rounded-2xl overflow-hidden
            shadow-[0_0_60px_rgba(255,255,255,0.1)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
            max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 z-20 text-black bg-white/90 hover:bg-white p-1.5 rounded-full
                transition-all duration-300 hover:rotate-90"
            >
              <CloseIcon fontSize="small" />
            </button>
            <div className="grid md:grid-cols-[240px_1fr]">
              <aside className="relative bg-white/[0.03] border-b md:border-b-0 md:border-r border-white/10 p-5">
                <div className="relative rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={activeService.hero}
                    alt={activeService.title}
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="text-white font-extrabold text-sm">
                      {activeService.price}
                    </div>
                    <div className="text-white/60 text-[10px]">
                      {activeService.duration}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {activeService.sidebar.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-2"
                    >
                      <div className="text-white/70 mt-0.5">{s.icon}</div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase tracking-wider text-white/40">
                          {s.label}
                        </div>
                        <div className="text-white text-[11px] font-bold truncate">
                          {s.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1.5">
                    Included
                  </div>
                  <ul className="space-y-1">
                    {activeService.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-1.5 text-white/60 text-[10px]"
                      >
                        <CheckCircle
                          sx={{ fontSize: 10 }}
                          className="text-white mt-0.5 shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">
                  <FlightTakeoff fontSize="small" /> WO OX TRAVEL
                </div>
                <h2 className="text-white text-xl sm:text-2xl font-extrabold mb-1">
                  {activeService.title}
                </h2>
                <p className="text-white/50 text-xs sm:text-sm mb-4">
                  {activeService.subtitle}
                </p>
                <p className="text-white/60 text-xs leading-relaxed mb-4">
                  {activeService.description}
                </p>
                <form onSubmit={handleServiceSubmit} noValidate>
                  <ValidatedInput
                    label="Full Name *"
                    icon={<Person fontSize="small" />}
                    value={svcName}
                    onChange={setSvcName}
                    placeholder="John Doe"
                    validate={vName}
                    touched={svcTouched.name}
                    onBlur={() => setSvcTouched((t) => ({ ...t, name: true }))}
                  />
                  <ValidatedInput
                    label="Email *"
                    type="email"
                    icon={<Email fontSize="small" />}
                    value={svcEmail}
                    onChange={setSvcEmail}
                    placeholder="you@example.com"
                    validate={vEmail}
                    touched={svcTouched.email}
                    onBlur={() => setSvcTouched((t) => ({ ...t, email: true }))}
                  />
                  <ValidatedInput
                    label="Phone *"
                    type="tel"
                    icon={<Phone fontSize="small" />}
                    value={svcPhone}
                    onChange={setSvcPhone}
                    placeholder="+1 234 567 890"
                    validate={vPhone}
                    touched={svcTouched.phone}
                    onBlur={() => setSvcTouched((t) => ({ ...t, phone: true }))}
                  />
                  <ValidatedInput
                    label={
                      activeService.formType === "flight"
                        ? "Departure Date *"
                        : activeService.formType === "hotel"
                          ? "Check-in Date *"
                          : activeService.formType === "visa"
                            ? "Travel Date *"
                            : "Trip Start Date *"
                    }
                    type="date"
                    icon={<CalendarToday fontSize="small" />}
                    value={svcDate}
                    onChange={setSvcDate}
                    validate={vRequired("Date is required")}
                    touched={svcTouched.date}
                    onBlur={() => setSvcTouched((t) => ({ ...t, date: true }))}
                  />

                  {activeService.formType === "flight" && (
                    <div className="grid grid-cols-2 gap-3">
                      <ValidatedInput
                        label="From"
                        icon={<FlightTakeoff fontSize="small" />}
                        value={svcDetail1}
                        onChange={setSvcDetail1}
                        placeholder="City / Airport"
                      />
                      <ValidatedInput
                        label="To"
                        icon={<Flight fontSize="small" />}
                        value={svcDetail2}
                        onChange={setSvcDetail2}
                        placeholder="City / Airport"
                      />
                    </div>
                  )}
                  {activeService.formType === "hotel" && (
                    <div className="grid grid-cols-2 gap-3">
                      <ValidatedInput
                        label="City / Country"
                        icon={<Public fontSize="small" />}
                        value={svcDetail1}
                        onChange={setSvcDetail1}
                        placeholder="Destination"
                      />
                      <ValidatedInput
                        label="Guests"
                        type="number"
                        icon={<Group fontSize="small" />}
                        value={svcDetail2}
                        onChange={setSvcDetail2}
                        placeholder="2"
                      />
                    </div>
                  )}
                  {activeService.formType === "visa" && (
                    <div className="grid grid-cols-2 gap-3">
                      <ValidatedInput
                        label="Destination Country"
                        icon={<Public fontSize="small" />}
                        value={svcDetail1}
                        onChange={setSvcDetail1}
                        placeholder="Country"
                      />
                      <ValidatedInput
                        label="Passport No."
                        icon={<Description fontSize="small" />}
                        value={svcDetail2}
                        onChange={setSvcDetail2}
                        placeholder="A1234567"
                      />
                    </div>
                  )}
                  {activeService.formType === "insurance" && (
                    <div className="grid grid-cols-2 gap-3">
                      <ValidatedInput
                        label="Destination"
                        icon={<Public fontSize="small" />}
                        value={svcDetail1}
                        onChange={setSvcDetail1}
                        placeholder="Country"
                      />
                      <ValidatedInput
                        label="Trip Duration"
                        icon={<AccessTime fontSize="small" />}
                        value={svcDetail2}
                        onChange={setSvcDetail2}
                        placeholder="7 days"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
                      Notes (optional)
                    </label>
                    <textarea
                      value={svcNotes}
                      onChange={(e) => setSvcNotes(e.target.value)}
                      rows={2}
                      placeholder="Any preferences..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm
                        placeholder-white/30 outline-none transition-all duration-300 resize-none
                        focus:border-white/60 focus:bg-white/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full
                      transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
                  >
                    <FlightTakeoff fontSize="small" /> Request{" "}
                    {activeService.title}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOUR PACKAGES ================= */}
      {tourOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => {
              setTourOpen(false);
              setSelectedTour(null);
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <div
            className="relative w-full max-w-2xl bg-black border border-white/15 rounded-2xl p-5 sm:p-7
            shadow-[0_0_60px_rgba(255,255,255,0.1)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
            max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setTourOpen(false);
                setSelectedTour(null);
              }}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 rounded-full
                hover:bg-white/10 transition-all duration-300 hover:rotate-90 z-10"
            >
              <CloseIcon fontSize="small" />
            </button>
            {!selectedTour ? (
              <>
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">
                  <TravelExplore fontSize="small" /> WO OX TRAVEL · TOUR
                  PACKAGES
                </div>
                <h2 className="text-white text-xl sm:text-2xl font-extrabold mb-1">
                  Our Tour Packages
                </h2>
                <p className="text-white/50 text-xs sm:text-sm mb-5">
                  Pick a destination to see full details.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOUR_PACKAGES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTour(t)}
                      className="group relative overflow-hidden rounded-xl border border-white/10 text-left
                        transition-all duration-300 hover:border-white/40 hover:-translate-y-1"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={t.bg}
                          alt={t.country}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center gap-1 mb-0.5">
                          <Star sx={{ fontSize: 12 }} className="text-white" />
                          <span className="text-white text-[10px] font-bold">
                            {t.rating}
                          </span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <h4 className="text-white font-bold text-sm">
                              {t.country}
                            </h4>
                            <p className="text-white/60 text-[10px]">
                              {t.duration}
                            </p>
                          </div>
                          <div className="text-white font-extrabold text-sm">
                            {t.price}
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/30
                        flex items-center justify-center text-white opacity-0 transition-all duration-300
                        group-hover:opacity-100 group-hover:bg-white group-hover:text-black"
                      >
                        <ArrowForward fontSize="small" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="flex items-center gap-1 text-white/60 hover:text-white text-xs mb-3 transition-colors"
                >
                  <KeyboardArrowDown fontSize="small" className="rotate-90" />{" "}
                  Back to packages
                </button>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 mb-4">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 h-32 md:h-full">
                    <img
                      src={selectedTour.bg}
                      alt={selectedTour.country}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center gap-1">
                        <Star sx={{ fontSize: 12 }} className="text-white" />
                        <span className="text-white text-xs font-bold">
                          {selectedTour.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-lg mb-1">
                      {selectedTour.country} Tour
                    </h3>
                    <p className="text-white/60 text-xs mb-2">
                      {selectedTour.duration} · {selectedTour.price}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {selectedTour.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleTourBook} noValidate>
                  <ValidatedInput
                    label="Full Name *"
                    icon={<Person fontSize="small" />}
                    value={svcName}
                    onChange={setSvcName}
                    placeholder="John Doe"
                    validate={vName}
                    touched={svcTouched.name}
                    onBlur={() => setSvcTouched((t) => ({ ...t, name: true }))}
                  />
                  <ValidatedInput
                    label="Email *"
                    type="email"
                    icon={<Email fontSize="small" />}
                    value={svcEmail}
                    onChange={setSvcEmail}
                    placeholder="you@example.com"
                    validate={vEmail}
                    touched={svcTouched.email}
                    onBlur={() => setSvcTouched((t) => ({ ...t, email: true }))}
                  />
                  <ValidatedInput
                    label="Phone *"
                    type="tel"
                    icon={<Phone fontSize="small" />}
                    value={svcPhone}
                    onChange={setSvcPhone}
                    placeholder="+1 234 567 890"
                    validate={vPhone}
                    touched={svcTouched.phone}
                    onBlur={() => setSvcTouched((t) => ({ ...t, phone: true }))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <ValidatedInput
                      label="Travel Date *"
                      type="date"
                      icon={<CalendarToday fontSize="small" />}
                      value={svcDate}
                      onChange={setSvcDate}
                      validate={vRequired("Date is required")}
                      touched={svcTouched.date}
                      onBlur={() =>
                        setSvcTouched((t) => ({ ...t, date: true }))
                      }
                    />
                    <ValidatedInput
                      label="Guests"
                      type="number"
                      icon={<Group fontSize="small" />}
                      value={svcDetail1}
                      onChange={setSvcDetail1}
                      placeholder="2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-1
                      transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
                  >
                    <FlightTakeoff fontSize="small" /> Book{" "}
                    {selectedTour.country} Tour
                  </button>
                </form>
              </>
            )}
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


