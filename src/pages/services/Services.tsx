// Services.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  FlightTakeoff,
  Hotel,
  TravelExplore,
  Public,
  LocalOffer,
  Luggage,
  Close as CloseIcon,
  CheckCircle,
  Error as ErrorIcon,
  ArrowForward,
  Person,
  Email,
  Phone,
  CalendarToday,
  Group,
  Star,
  AccessTime,
  VerifiedUser,
  SupportAgent,
  Savings,
  Shield,
  Speed,
  Language,
  Explore,
  Map as MapIcon,
  AttachMoney,
  Diamond,
  WhatsApp,
  Schedule,
  Chat,
  AssignmentTurnedIn,
  GppGood,
} from "@mui/icons-material";

// ============ InView Hook ============
const useInView = (options: IntersectionObserverInit = { threshold: 0.2 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

// ============ Types ============
interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  price: string;
  duration: string;
  badge?: string;
}

// ============ Data ============
const services: Service[] = [
  {
    id: "flight",
    icon: <FlightTakeoff fontSize="small" />,
    title: "Flight Booking",
    shortDesc:
      "Best fares on 500+ airlines worldwide, with flexible rebooking and priority support.",
    longDesc:
      "Wo Ox Travel partners with 500+ airlines to secure the best fares for your journey. From economy to first class, we handle everything — seat selection, baggage, upgrades, and 24/7 rebooking support.",
    features: [
      "500+ airlines worldwide",
      "Price match guarantee",
      "Free date change (once)",
      "24/7 rebooking support",
      "Priority boarding assistance",
    ],
    price: "From $129",
    duration: "Instant confirmation",
    badge: "Most Popular",
  },
  {
    id: "hotel",
    icon: <Hotel fontSize="small" />,
    title: "Hotel Reservation",
    shortDesc:
      "Handpicked luxury stays, boutique hotels, and hidden gems in 120+ countries.",
    longDesc:
      "We curate stays that match your style — from overwater villas and alpine chalets to boutique city hotels. Every property is personally vetted by our Wo Ox Travel team.",
    features: [
      "Handpicked properties only",
      "Best rate guarantee",
      "Free cancellation options",
      "Loyalty perks & upgrades",
      "Local concierge support",
    ],
    price: "From $89/night",
    duration: "Instant booking",
  },
  {
    id: "tour",
    icon: <TravelExplore fontSize="small" />,
    title: "Tour Packages",
    shortDesc:
      "Curated multi-day journeys with local guides, hidden gems, and authentic experiences.",
    longDesc:
      "Our tour packages are designed by explorers, for explorers. Every itinerary blends iconic landmarks with off-the-beaten-path experiences you won't find in guidebooks.",
    features: [
      "Expert local guides",
      "Small group sizes (max 12)",
      "All-inclusive pricing",
      "Hidden gem experiences",
      "Flexible customization",
    ],
    price: "From $449",
    duration: "5–14 days",
    badge: "Best Value",
  },
  {
    id: "visa",
    icon: <Public fontSize="small" />,
    title: "Visa Assistance",
    shortDesc:
      "Hassle-free visa processing for 90+ countries with document review and tracking.",
    longDesc:
      "Navigate visa requirements with confidence. Our team reviews your documents, submits applications, and tracks every step — so you never miss a deadline.",
    features: [
      "90+ countries covered",
      "Document review included",
      "Real-time status tracking",
      "Express processing available",
      "100% approval guidance",
    ],
    price: "From $59",
    duration: "3–10 business days",
  },
  {
    id: "insurance",
    icon: <LocalOffer fontSize="small" />,
    title: "Travel Insurance",
    shortDesc:
      "Comprehensive coverage for medical, trip cancellation, luggage, and delays.",
    longDesc:
      "Travel with peace of mind. Our insurance plans cover medical emergencies, trip cancellations, lost luggage, flight delays, and more — with 24/7 global assistance.",
    features: [
      "Medical coverage up to $500K",
      "Trip cancellation protection",
      "Lost luggage compensation",
      "Flight delay coverage",
      "24/7 global assistance",
    ],
    price: "From $19",
    duration: "Instant activation",
  },
  {
    id: "luggage",
    icon: <Luggage fontSize="small" />,
    title: "Luggage & Transfers",
    shortDesc:
      "Door-to-door luggage delivery and private airport transfers in 80+ cities.",
    longDesc:
      "Skip the hassle of carrying bags. We deliver your luggage directly to your hotel and arrange private transfers so you arrive relaxed and on time.",
    features: [
      "Door-to-door delivery",
      "Private airport transfers",
      "Real-time tracking",
      "Insured up to $5K",
      "80+ cities covered",
    ],
    price: "From $39",
    duration: "Same-day service",
  },
];

const highlights = [
  {
    icon: <Shield fontSize="small" />,
    title: "Fully Insured",
    desc: "Every service backed by global insurance",
  },
  {
    icon: <Speed fontSize="small" />,
    title: "Fast Turnaround",
    desc: "Most bookings confirmed in minutes",
  },
  {
    icon: <SupportAgent fontSize="small" />,
    title: "24/7 Support",
    desc: "Real humans across every timezone",
  },
  {
    icon: <Savings fontSize="small" />,
    title: "Best Price Promise",
    desc: "Find it cheaper? We'll match it",
  },
];

// ============ Reusable Inputs ============
interface InputFieldProps {
  label: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="mb-4">
    <label className="block text-white/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
      {label}
    </label>
    <div className="relative group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors duration-300">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white text-sm
          placeholder-white/30 outline-none transition-all duration-300
          focus:border-white/60 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
      />
    </div>
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="mb-4">
    <label className="block text-white/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm
        placeholder-white/30 outline-none transition-all duration-300 resize-none
        focus:border-white/60 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
    />
  </div>
);

// ============ Modal Shell ============
interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const ModalShell: React.FC<ModalShellProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  icon,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      />
      <div
        className="relative w-full max-w-md bg-black border border-white/15 rounded-2xl
          shadow-[0_0_60px_rgba(255,255,255,0.08)] p-6 sm:p-8
          animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
          max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 rounded-full
            hover:bg-white/10 transition-all duration-300 hover:rotate-90 z-10"
        >
          <CloseIcon fontSize="small" />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 text-white/50 text-xs font-semibold tracking-widest mb-2">
            {icon}
            WO OX TRAVEL
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-extrabold">
            {title}
          </h2>
          <p className="text-white/50 text-sm mt-1">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

// ============ Result Modal ============
interface ResultModalProps {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  open,
  type,
  title,
  message,
  onClose,
}) => {
  if (!open) return null;
  const isSuccess = type === "success";
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />
      <div
        className="relative w-full max-w-sm bg-black border border-white/15 rounded-2xl p-8 text-center
          shadow-[0_0_60px_rgba(255,255,255,0.12)]
          animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
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
          {isSuccess ? "Great, thanks!" : "Try Again"}
        </button>
      </div>
    </div>
  );
};

// ============ Services Component ============
export const Services: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });

  // Service booking modal
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Consultation modal
  const [consultOpen, setConsultOpen] = useState(false);

  // Booking form
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookGuests, setBookGuests] = useState("2");
  const [bookNotes, setBookNotes] = useState("");

  // Consultation form
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultTopic, setConsultTopic] = useState("");
  const [consultMsg, setConsultMsg] = useState("");

  // Result
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

  const anyModalOpen = bookingOpen || consultOpen || resultOpen;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [anyModalOpen]);

  const openBooking = (service: Service) => {
    setActiveService(service);
    setBookingOpen(true);
  };

  // ---------- Handlers ----------
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail || !bookPhone || !bookDate) {
      showResult(
        "error",
        "Missing Fields",
        "Please fill in all required fields to continue.",
      );
      return;
    }
    if (!/\S+@\S+\.\S+/.test(bookEmail)) {
      showResult(
        "error",
        "Invalid Email",
        "Please enter a valid email address.",
      );
      return;
    }
    const serviceTitle = activeService?.title;
    setBookingOpen(false);
    showResult(
      "success",
      "Service Booked! ✅",
      `Your ${serviceTitle} request has been received. A Wo Ox Travel specialist will confirm at ${bookEmail} within 1 hour.`,
    );
    setBookName("");
    setBookEmail("");
    setBookPhone("");
    setBookDate("");
    setBookGuests("2");
    setBookNotes("");
    setActiveService(null);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail || !consultTopic || !consultMsg) {
      showResult(
        "error",
        "Missing Fields",
        "Please complete all fields before sending.",
      );
      return;
    }
    if (!/\S+@\S+\.\S+/.test(consultEmail)) {
      showResult(
        "error",
        "Invalid Email",
        "Please enter a valid email address.",
      );
      return;
    }
    setConsultOpen(false);
    showResult(
      "success",
      "Request Sent! 💬",
      `Thanks ${consultName}! Our Wo Ox Travel team will reach out at ${consultEmail} within 24 hours.`,
    );
    setConsultName("");
    setConsultEmail("");
    setConsultTopic("");
    setConsultMsg("");
  };

  return (
    <>
      {/* ============ Animations ============ */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        className="relative w-full bg-black overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute top-32 right-[8%] text-white/[0.05] hidden md:block animate-[floatY_8s_ease-in-out_infinite]">
            <FlightTakeoff sx={{ fontSize: 100 }} />
          </div>
          <div className="absolute bottom-40 left-[5%] text-white/[0.05] hidden lg:block animate-[floatY_10s_ease-in-out_infinite_1s]">
            <MapIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24
          pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-14"
        >
          <div className="text-center max-w-3xl mx-auto">
            <div
              className={
                inView ? "animate-[fadeUp_0.6s_ease-out_both]" : "opacity-0"
              }
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-[1px] w-8 bg-white/50" />
                <span className="text-white/60 text-xs sm:text-sm font-bold tracking-[4px] uppercase">
                  What We Do
                </span>
                <span className="h-[1px] w-8 bg-white/50" />
              </div>

              <h1
                className="text-white font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                leading-[1.05] tracking-tight mb-5"
              >
                Services built for
                <br />
                <span className="text-white/40">every journey.</span>
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
                From booking your first flight to arriving at a hidden Caribbean
                cove — Wo Ox Travel handles every detail of your trip, so all
                you have to do is explore.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => openBooking(services[0])}
                  className="group flex items-center gap-2 text-black bg-white font-bold text-sm px-6 py-3 rounded-full
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <FlightTakeoff fontSize="small" />
                  Book a Service
                  <ArrowForward
                    fontSize="small"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => setConsultOpen(true)}
                  className="flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full
                    border border-white/30 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <SupportAgent fontSize="small" />
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SERVICE CARDS ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-14 md:pb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
                  p-5 sm:p-6 transition-all duration-500
                  hover:bg-white/[0.07] hover:-translate-y-2 hover:border-white/30
                  hover:shadow-[0_25px_60px_rgba(255,255,255,0.08)] cursor-pointer"
                style={{
                  animation: inView
                    ? `fadeUp 0.6s ease-out ${0.1 + i * 0.08}s both`
                    : "none",
                }}
                onClick={() => openBooking(service)}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div
                    className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent
                    transition-all duration-700 group-hover:left-full"
                  />
                </div>

                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest
                      text-black bg-white px-2 py-0.5 rounded-full"
                    >
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="relative w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center
                  text-white mb-4 transition-all duration-500
                  group-hover:bg-white group-hover:text-black group-hover:rotate-6 group-hover:scale-110"
                >
                  {service.icon}
                </div>

                <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 min-h-[48px]">
                  {service.shortDesc}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-white font-extrabold text-sm sm:text-base">
                      {service.price}
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      <AccessTime sx={{ fontSize: 10 }} />
                      {service.duration}
                    </div>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center
                    text-white transition-all duration-300
                    group-hover:bg-white group-hover:text-black group-hover:scale-110"
                  >
                    <ArrowForward fontSize="small" />
                  </div>
                </div>

                {/* Underline sweep */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 origin-left
                  transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= HIGHLIGHTS STRIP ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-14 md:pb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
                  p-4 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/30 hover:-translate-y-1"
                style={{
                  animation: inView
                    ? `fadeUp 0.6s ease-out ${0.4 + i * 0.1}s both`
                    : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center
                  text-white mb-2 transition-all duration-500
                  group-hover:bg-white group-hover:text-black group-hover:rotate-12"
                >
                  {h.icon}
                </div>
                <h4 className="text-white font-bold text-xs sm:text-sm">
                  {h.title}
                </h4>
                <p className="text-white/50 text-[10px] sm:text-xs mt-1 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-16 md:pb-20"
        >
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-[4px] uppercase">
                How It Works
              </span>
              <span className="h-[1px] w-6 bg-white/40" />
            </div>
            <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight">
              Book in <span className="text-white/40">3 simple steps</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-[1px]
              bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
              {[
                {
                  step: "01",
                  icon: <Explore fontSize="small" />,
                  title: "Choose Your Service",
                  desc: "Pick from flights, hotels, tours, visas, insurance, or luggage transfer.",
                },
                {
                  step: "02",
                  icon: <AssignmentTurnedIn fontSize="small" />,
                  title: "Share Your Details",
                  desc: "Tell us your dates, destination, and preferences — takes under 2 minutes.",
                },
                {
                  step: "03",
                  icon: <GppGood fontSize="small" />,
                  title: "Travel with Confidence",
                  desc: "We confirm, book, and support you 24/7 from departure to return.",
                },
              ].map((s, i) => (
                <div
                  key={s.step}
                  className="relative group"
                  style={{
                    animation: inView
                      ? `fadeUp 0.6s ease-out ${0.2 + i * 0.15}s both`
                      : "none",
                  }}
                >
                  <div className="hidden md:flex justify-center mb-6">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full bg-black border-2 border-white flex items-center justify-center
                        text-white font-extrabold text-sm transition-all duration-500
                        group-hover:scale-110 group-hover:bg-white group-hover:text-black"
                      >
                        {s.step}
                      </div>
                      <span className="absolute inset-0 rounded-full border border-white/40 animate-[pulseRing_2.5s_ease-out_infinite]" />
                    </div>
                  </div>

                  <div
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center
                    transition-all duration-500 hover:bg-white/[0.07] hover:border-white/30 hover:-translate-y-1"
                  >
                    <div className="md:hidden text-white/40 font-extrabold text-xs tracking-widest mb-2">
                      STEP {s.step}
                    </div>
                    <div
                      className="w-10 h-10 mx-auto rounded-xl bg-white/10 border border-white/20 flex items-center justify-center
                      text-white mb-3 transition-all duration-500 group-hover:bg-white group-hover:text-black"
                    >
                      {s.icon}
                    </div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1.5">
                      {s.title}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FINAL CTA ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-20"
        >
          <div
            className="relative overflow-hidden rounded-3xl border border-white/15
            bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                border border-white/10 rounded-full animate-[spinOrbit_60s_linear_infinite]"
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
                border border-dashed border-white/10 rounded-full animate-[spinOrbit_40s_linear_infinite_reverse]"
              />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 text-white/60 text-[10px] sm:text-xs font-bold tracking-[4px] uppercase mb-4">
                <FlightTakeoff fontSize="small" />
                Let's get you moving
              </div>
              <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5">
                Not sure where to start?
                <br />
                <span className="text-white/40">We'll guide you.</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Book a free 15-minute consultation with a Wo Ox Travel
                specialist and get a custom plan for your trip.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setConsultOpen(true)}
                  className="group flex items-center gap-2 text-black bg-white font-bold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-full
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                >
                  <SupportAgent fontSize="small" />
                  Get Free Consultation
                  <ArrowForward
                    fontSize="small"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => openBooking(services[0])}
                  className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-full
                    border border-white/30 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <FlightTakeoff fontSize="small" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE BOOKING MODAL ================= */}
      <ModalShell
        open={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setActiveService(null);
        }}
        title={
          activeService ? `Book: ${activeService.title}` : "Book a Service"
        }
        subtitle={
          activeService
            ? `${activeService.longDesc}`
            : "Tell us your needs and we'll handle the rest."
        }
        icon={activeService?.icon}
      >
        {activeService && (
          <>
            {/* Quick info strip */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                <div className="text-[9px] uppercase tracking-wide text-white/40">
                  Starting From
                </div>
                <div className="text-white text-sm font-bold mt-0.5">
                  {activeService.price}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                <div className="text-[9px] uppercase tracking-wide text-white/40">
                  Delivery
                </div>
                <div className="text-white text-sm font-bold mt-0.5">
                  {activeService.duration}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-5">
              <div className="text-white/60 text-[10px] uppercase tracking-widest mb-2">
                What's included
              </div>
              <ul className="space-y-1.5">
                {activeService.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-white/70 text-xs"
                  >
                    <CheckCircle
                      sx={{ fontSize: 14 }}
                      className="text-white mt-0.5 shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleBookingSubmit}>
              <InputField
                label="Full Name *"
                icon={<Person fontSize="small" />}
                value={bookName}
                onChange={setBookName}
                placeholder="John Doe"
                required
              />
              <InputField
                label="Email *"
                type="email"
                icon={<Email fontSize="small" />}
                value={bookEmail}
                onChange={setBookEmail}
                placeholder="you@example.com"
                required
              />
              <InputField
                label="Phone *"
                type="tel"
                icon={<Phone fontSize="small" />}
                value={bookPhone}
                onChange={setBookPhone}
                placeholder="+1 234 567 890"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Preferred Date *"
                  type="date"
                  icon={<CalendarToday fontSize="small" />}
                  value={bookDate}
                  onChange={setBookDate}
                  required
                />
                <InputField
                  label="Guests"
                  type="number"
                  icon={<Group fontSize="small" />}
                  value={bookGuests}
                  onChange={setBookGuests}
                />
              </div>

              <TextAreaField
                label="Notes (optional)"
                value={bookNotes}
                onChange={setBookNotes}
                placeholder="Any special requirements..."
                rows={2}
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-1
                  transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
              >
                <FlightTakeoff fontSize="small" />
                Request Booking
              </button>
            </form>
          </>
        )}
      </ModalShell>

      {/* ================= CONSULTATION MODAL ================= */}
      <ModalShell
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        title="Free Consultation"
        subtitle="Book a 15-minute call with a Wo Ox Travel specialist — no commitment"
        icon={<SupportAgent fontSize="small" />}
      >
        <form onSubmit={handleConsultSubmit}>
          <InputField
            label="Full Name *"
            icon={<Person fontSize="small" />}
            value={consultName}
            onChange={setConsultName}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email *"
            type="email"
            icon={<Email fontSize="small" />}
            value={consultEmail}
            onChange={setConsultEmail}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Topic *"
            icon={<Chat fontSize="small" />}
            value={consultTopic}
            onChange={setConsultTopic}
            placeholder="Flights, tour package, custom itinerary..."
            required
          />
          <TextAreaField
            label="Message *"
            value={consultMsg}
            onChange={setConsultMsg}
            placeholder="Tell us about your trip plans..."
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-1
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
          >
            <Schedule fontSize="small" />
            Request Consultation
          </button>
        </form>
      </ModalShell>

      {/* ================= RESULT MODAL ================= */}
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
