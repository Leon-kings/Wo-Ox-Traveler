// About.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  FlightTakeoff,
  Public,
  Groups,
  Star,
  ArrowForward,
  CheckCircle,
  TravelExplore,
  SupportAgent,
  TrendingUp,
  AccessTime,
  Language,
  Diamond,
  VerifiedUser,
  Savings,
  Close as CloseIcon,
  Error as ErrorIcon,
  Person,
  Email,
  Phone,
  CalendarToday,
  Group,
  Hotel,
  Flight,
  Luggage,
  Explore,
  WhatsApp,
  Schedule,
  Chat,
} from "@mui/icons-material";

// ============ Animated Counter Hook ============
const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, start]);

  return count;
};

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

// ============ Data ============
const stats = [
  {
    icon: <Public fontSize="small" />,
    value: 120,
    suffix: "+",
    label: "Countries Covered",
  },
  {
    icon: <Groups fontSize="small" />,
    value: 50,
    suffix: "K+",
    label: "Happy Travelers",
  },
  {
    icon: <FlightTakeoff fontSize="small" />,
    value: 15,
    suffix: "K+",
    label: "Trips Booked",
  },
  {
    icon: <Star fontSize="small" />,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

const values = [
  {
    icon: <VerifiedUser fontSize="small" />,
    title: "Trust & Safety",
    desc: "Every Wo Ox trip is vetted and insured. Your safety is our first-class priority, always.",
  },
  {
    icon: <Diamond fontSize="small" />,
    title: "Curated Luxury",
    desc: "Handpicked stays and experiences — no generic itineraries, only the extraordinary.",
  },
  {
    icon: <SupportAgent fontSize="small" />,
    title: "24/7 Support",
    desc: "Real humans from Wo Ox Travel on call around the globe, in every timezone, whenever you need us.",
  },
  {
    icon: <Savings fontSize="small" />,
    title: "Best Value",
    desc: "Direct partnerships worldwide give you premium experiences at honest prices.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "The First Flight",
    desc: "Wo Ox Travel was born from a single backpacking trip across Southeast Asia.",
  },
  {
    year: "2018",
    title: "Going Global",
    desc: "Expanded to 40+ countries with dedicated local guides and partners.",
  },
  {
    year: "2021",
    title: "Digital Nomad Era",
    desc: "Launched smart trip planning tools used by 20K+ travelers monthly.",
  },
  {
    year: "2024",
    title: "World Class",
    desc: "Recognized as a top-tier boutique travel company across 120+ countries.",
  },
];

const tripPackages = [
  {
    id: "caribbean",
    country: "Caribbean",
    price: "$946",
    duration: "7 Days / 6 Nights",
    highlights: ["Crystal Beaches", "Coral Reefs", "Island Hopping"],
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "switzerland",
    country: "Switzerland",
    price: "$1,100",
    duration: "8 Days / 7 Nights",
    highlights: ["Alpine Peaks", "Lakes & Trails", "Snow Villages"],
    bg: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "france",
    country: "France",
    price: "$425",
    duration: "6 Days / 5 Nights",
    highlights: ["Paris Lights", "Wine Country", "Riviera Coast"],
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "thailand",
    country: "Thailand",
    price: "$165",
    duration: "5 Days / 4 Nights",
    highlights: ["Island Hopping", "Street Food", "Ancient Temples"],
    bg: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  },
];

// ============ Reusable Input Field ============
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
}> = ({ label, value, onChange, placeholder, rows = 4 }) => (
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

// ============ Modal Wrapper ============
interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  wide?: boolean;
}

const ModalShell: React.FC<ModalShellProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  icon,
  wide,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      />
      <div
        className={`relative w-full ${wide ? "max-w-full" : "max-w-full"} bg-black border border-white/15 rounded-2xl
          shadow-[0_0_60px_rgba(255,255,255,0.08)] p-6 sm:p-8
          animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
          max-h-[92vh] overflow-y-auto`}
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

// ============ Stat Card ============
const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}> = ({ icon, value, suffix, label, start, delay }) => {
  const count = useCountUp(value, 2000, start);
  return (
    <div
      className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
        p-4 sm:p-5 text-center transition-all duration-500
        hover:bg-white/[0.07] hover:-translate-y-1 hover:border-white/30"
      style={{
        animation: start ? `fadeUp 0.6s ease-out ${delay}s both` : "none",
      }}
    >
      <div
        className="w-10 h-10 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center
        text-white mb-2 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-white group-hover:text-black"
      >
        {icon}
      </div>
      <div className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">
        {count}
        <span className="text-white/60">{suffix}</span>
      </div>
      <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest mt-1">
        {label}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 origin-left
        transition-transform duration-500 group-hover:scale-x-100"
      />
    </div>
  );
};

// ============ About Component ============
export const About: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.15,
  });

  // Modal states
  const [tripsOpen, setTripsOpen] = useState(false);
  const [talkOpen, setTalkOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<
    (typeof tripPackages)[0] | null
  >(null);

  // Talk to Us form
  const [talkName, setTalkName] = useState("");
  const [talkEmail, setTalkEmail] = useState("");
  const [talkSubject, setTalkSubject] = useState("");
  const [talkMessage, setTalkMessage] = useState("");

  // Book a Call form
  const [callName, setCallName] = useState("");
  const [callEmail, setCallEmail] = useState("");
  const [callPhone, setCallPhone] = useState("");
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("");

  // Booking form (trip)
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookGuests, setBookGuests] = useState("2");
  const [bookPackage, setBookPackage] = useState("standard");

  // Result modal
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

  // Body scroll lock for all modals
  const anyModalOpen = tripsOpen || talkOpen || bookCallOpen || resultOpen;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [anyModalOpen]);

  // ---------- Handlers ----------
  const handleTalkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!talkName || !talkEmail || !talkSubject || !talkMessage) {
      showResult(
        "error",
        "Missing Fields",
        "Please fill in all the fields before sending your message.",
      );
      return;
    }
    if (!/\S+@\S+\.\S+/.test(talkEmail)) {
      showResult(
        "error",
        "Invalid Email",
        "Please enter a valid email address so we can reply.",
      );
      return;
    }
    setTalkOpen(false);
    showResult(
      "success",
      "Message Sent! 💬",
      `Thanks ${talkName}! Our Wo Ox Travel team will get back to you at ${talkEmail} within 24 hours.`,
    );
    setTalkName("");
    setTalkEmail("");
    setTalkSubject("");
    setTalkMessage("");
  };

  const handleBookCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callName || !callEmail || !callPhone || !callDate || !callTime) {
      showResult(
        "error",
        "Missing Fields",
        "Please complete all the fields to schedule your call.",
      );
      return;
    }
    if (!/\S+@\S+\.\S+/.test(callEmail)) {
      showResult(
        "error",
        "Invalid Email",
        "Please enter a valid email address.",
      );
      return;
    }
    setBookCallOpen(false);
    showResult(
      "success",
      "Call Scheduled! 📅",
      `Your call with Wo Ox Travel is booked for ${callDate} at ${callTime}. A calendar invite has been sent to ${callEmail}.`,
    );
    setCallName("");
    setCallEmail("");
    setCallPhone("");
    setCallDate("");
    setCallTime("");
  };

  const handleBookTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail || !bookPhone || !bookDate) {
      showResult(
        "error",
        "Missing Fields",
        "Please complete all required fields to book your trip.",
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
    const country = selectedTrip?.country;
    setTripsOpen(false);
    setSelectedTrip(null);
    showResult(
      "success",
      "Trip Booked! ✈️",
      `Your trip to ${country} is confirmed. A detailed itinerary and confirmation has been sent to ${bookEmail}.`,
    );
    setBookName("");
    setBookEmail("");
    setBookPhone("");
    setBookDate("");
    setBookGuests("2");
    setBookPackage("standard");
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
      `}</style>

      <section id="about" className="relative w-full bg-black overflow-hidden">
        {/* ============ Background Decorations ============ */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute top-20 right-[10%] text-white/[0.06] hidden md:block animate-[floatY_7s_ease-in-out_infinite]">
            <Public sx={{ fontSize: 90 }} />
          </div>
          <div className="absolute bottom-24 left-[6%] text-white/[0.06] hidden md:block animate-[floatY_9s_ease-in-out_infinite_1s]">
            <FlightTakeoff sx={{ fontSize: 70 }} />
          </div>
        </div>

        {/* ================= HERO INTRO ================= */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto max-w-full 2xl:max-w-full
            px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24
            pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-14"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div
              className={
                contentInView
                  ? "animate-[fadeLeft_0.8s_ease-out_both]"
                  : "opacity-0"
              }
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-8 bg-white/50" />
                <span className="text-white/60 text-xs sm:text-sm font-bold tracking-[4px] uppercase">
                  Who We Are
                </span>
              </div>

              <h1 className="text-white font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-5">
                We don't sell trips.
                <br />
                <span className="text-white/40">We craft journeys.</span>
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4 max-w-full">
                Wo Ox Travel is a boutique travel company built by explorers,
                for explorers. Since 2015, we've helped over{" "}
                <span className="text-white font-semibold">
                  50,000 travelers
                </span>{" "}
                discover the world's most extraordinary places — from hidden
                Caribbean coves to Swiss alpine peaks — with seamless planning,
                local expertise, and genuine care.
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-full mb-8">
                No generic itineraries. No hidden fees. Just unforgettable
                journeys designed around{" "}
                <span className="text-white/70 font-medium">you</span>.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* Explore Our Trips → opens modal */}
                <button
                  onClick={() => setTripsOpen(true)}
                  className="group flex items-center gap-2 text-black bg-white font-bold text-sm px-6 py-3 rounded-full
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <TravelExplore fontSize="small" />
                  Explore Our Trips
                  <ArrowForward
                    fontSize="small"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Talk to Us → opens modal */}
                <button
                  onClick={() => setTalkOpen(true)}
                  className="flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full
                    border border-white/30 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <SupportAgent fontSize="small" />
                  Talk to Us
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-white/50 text-xs">
                <span className="flex items-center gap-1.5">
                  <CheckCircle sx={{ fontSize: 16 }} /> IATA Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle sx={{ fontSize: 16 }} /> Fully Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle sx={{ fontSize: 16 }} /> 100% Secure Payments
                </span>
              </div>
            </div>

            {/* Right: Visual collage */}
            <div
              className={`relative ${contentInView ? "animate-[fadeRight_0.8s_ease-out_both]" : "opacity-0"}`}
            >
              <div className="relative aspect-[4/5] max-w-full mx-auto lg:mx-0 lg:ml-auto">
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/15
                  shadow-[0_30px_80px_rgba(255,255,255,0.06)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
                    alt="Traveler exploring"
                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            sx={{ fontSize: 14 }}
                            className="text-white"
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs font-bold">
                        4.9 / 5
                      </span>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      “The most unforgettable journey of our lives.”
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-black border border-white/20 rounded-2xl p-3 sm:p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-[floatY_5s_ease-in-out_infinite]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                      <TrendingUp fontSize="small" />
                    </div>
                    <div>
                      <div className="text-white font-extrabold text-sm">
                        +38%
                      </div>
                      <div className="text-white/50 text-[9px] uppercase tracking-wider">
                        Growth YoY
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-black border border-white/20 rounded-2xl p-3 sm:p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-[floatY_6s_ease-in-out_infinite_1s]"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white">
                      <Language fontSize="small" />
                      <span className="absolute inset-0 rounded-full border border-white/40 animate-[pulseRing_2s_ease-out_infinite]" />
                    </div>
                    <div>
                      <div className="text-white font-extrabold text-sm">
                        120+
                      </div>
                      <div className="text-white/50 text-[9px] uppercase tracking-wider">
                        Countries
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-8 pointer-events-none hidden sm:block">
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spinOrbit_30s_linear_infinite]" />
                  <div className="absolute inset-4 border border-dashed border-white/5 rounded-full animate-[spinOrbit_45s_linear_infinite_reverse]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS BAR ================= */}
        <div
          ref={statsRef}
          className="relative z-10 mx-auto max-w-full 2xl:max-w-full
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-16 md:pb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                icon={s.icon}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                start={statsInView}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* ================= VALUES ================= */}
        <div
          className="relative z-10 mx-auto max-w-full 2xl:max-w-full
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-16 md:pb-20"
        >
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-[4px] uppercase">
                Our Values
              </span>
              <span className="h-[1px] w-6 bg-white/40" />
            </div>
            <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight">
              What makes us <span className="text-white/40">different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
                  p-5 sm:p-6 transition-all duration-500
                  hover:bg-white/[0.07] hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)]"
                style={{
                  animation: statsInView
                    ? `fadeUp 0.6s ease-out ${0.2 + i * 0.1}s both`
                    : "none",
                }}
              >
                <span className="absolute top-3 right-4 text-white/[0.04] font-extrabold text-6xl leading-none select-none">
                  0{i + 1}
                </span>
                <div
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center
                  text-white mb-4 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:rotate-6 group-hover:scale-110"
                >
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                  {v.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                  {v.desc}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 origin-left
                  transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= TIMELINE ================= */}
        <div
          className="relative z-10 mx-auto max-w-full 2xl:max-w-full
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-16 md:pb-20"
        >
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-white/40" />
              <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-[4px] uppercase">
                Our Journey
              </span>
              <span className="h-[1px] w-6 bg-white/40" />
            </div>
            <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight">
              A decade of <span className="text-white/40">exploration</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-[44px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className="relative group"
                  style={{
                    animation: statsInView
                      ? `fadeUp 0.6s ease-out ${0.1 + i * 0.15}s both`
                      : "none",
                  }}
                >
                  <div className="hidden md:flex justify-center mb-6">
                    <div className="relative">
                      <div
                        className="w-4 h-4 rounded-full bg-black border-2 border-white transition-all duration-500
                        group-hover:scale-150 group-hover:bg-white"
                      />
                      <span className="absolute inset-0 rounded-full border border-white/40 animate-[pulseRing_2.5s_ease-out_infinite]" />
                    </div>
                  </div>
                  <div
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 transition-all duration-500
                    hover:bg-white/[0.07] hover:border-white/30 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AccessTime
                        sx={{ fontSize: 16 }}
                        className="text-white/60"
                      />
                      <span className="text-white font-extrabold text-lg">
                        {t.year}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1.5">
                      {t.title}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FINAL CTA ================= */}
        <div
          className="relative z-10 mx-auto max-w-full 2xl:max-w-full
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
                Ready when you are
              </div>
              <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5">
                Your next story
                <br />
                <span className="text-white/40">starts here.</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-full mx-auto mb-8">
                Let's turn your wanderlust into a journey you'll never forget.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Start Exploring → opens trips modal */}
                <button
                  onClick={() => setTripsOpen(true)}
                  className="group flex items-center gap-2 text-black bg-white font-bold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-full
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                >
                  <Explore fontSize="small" />
                  Start Exploring
                  <ArrowForward
                    fontSize="small"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Book a Call → opens modal */}
                <button
                  onClick={() => setBookCallOpen(true)}
                  className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-3.5 rounded-full
                    border border-white/30 transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <SupportAgent fontSize="small" />
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE TRIPS MODAL ================= */}
      <ModalShell
        open={tripsOpen}
        onClose={() => {
          setTripsOpen(false);
          setSelectedTrip(null);
        }}
        title={
          selectedTrip ? `Book: ${selectedTrip.country}` : "Explore Our Trips"
        }
        subtitle={
          selectedTrip
            ? "Fill in your details to reserve your journey with Wo Ox Travel"
            : "Choose your next destination — curated by Wo Ox Travel"
        }
        icon={<TravelExplore fontSize="small" />}
        wide
      >
        {!selectedTrip ? (
          /* Destination Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tripPackages.map((trip) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className="group relative overflow-hidden rounded-xl border border-white/10 text-left
                  transition-all duration-300 hover:border-white/40 hover:-translate-y-1"
              >
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <img
                    src={trip.bg}
                    alt={trip.country}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {trip.country}
                      </h4>
                      <p className="text-white/60 text-[10px]">
                        {trip.duration}
                      </p>
                    </div>
                    <div className="text-white font-extrabold text-sm sm:text-base">
                      {trip.price}
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
        ) : (
          /* Booking Form */
          <form onSubmit={handleBookTripSubmit}>
            {/* Quick info */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: "Duration", value: selectedTrip.duration },
                { label: "From", value: selectedTrip.price },
                { label: "Type", value: "Guided" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center"
                >
                  <div className="text-[9px] uppercase tracking-wide text-white/40">
                    {s.label}
                  </div>
                  <div className="text-white text-xs font-bold mt-0.5">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

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
                label="Travel Date *"
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

            <div className="mb-4">
              <label className="block text-white/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
                Package Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "basic",
                    label: "Basic",
                    icon: <Luggage fontSize="small" />,
                  },
                  {
                    id: "standard",
                    label: "Standard",
                    icon: <Hotel fontSize="small" />,
                  },
                  {
                    id: "premium",
                    label: "Premium",
                    icon: <Flight fontSize="small" />,
                  },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setBookPackage(p.id)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold
                      border transition-all duration-300
                      ${
                        bookPackage === p.id
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setSelectedTrip(null)}
                className="flex-1 text-white font-semibold text-sm py-3 rounded-full border border-white/30
                  transition-all duration-300 hover:bg-white/10"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-[2] flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3 rounded-full
                  transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
              >
                <FlightTakeoff fontSize="small" />
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </ModalShell>

      {/* ================= TALK TO US MODAL ================= */}
      <ModalShell
        open={talkOpen}
        onClose={() => setTalkOpen(false)}
        title="Talk to Us"
        subtitle="Send us a message — our Wo Ox Travel team replies within 24 hours"
        icon={<SupportAgent fontSize="small" />}
      >
        <form onSubmit={handleTalkSubmit}>
          <InputField
            label="Full Name *"
            icon={<Person fontSize="small" />}
            value={talkName}
            onChange={setTalkName}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email *"
            type="email"
            icon={<Email fontSize="small" />}
            value={talkEmail}
            onChange={setTalkEmail}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Subject *"
            icon={<Chat fontSize="small" />}
            value={talkSubject}
            onChange={setTalkSubject}
            placeholder="Trip inquiry, custom itinerary, etc."
            required
          />
          <TextAreaField
            label="Message *"
            value={talkMessage}
            onChange={setTalkMessage}
            placeholder="Tell us about your dream trip..."
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-2
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
          >
            <WhatsApp fontSize="small" />
            Send Message
          </button>
        </form>
      </ModalShell>

      {/* ================= BOOK A CALL MODAL ================= */}
      <ModalShell
        open={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
        title="Book a Call"
        subtitle="Schedule a free 30-minute consultation with a Wo Ox Travel expert"
        icon={<Schedule fontSize="small" />}
      >
        <form onSubmit={handleBookCallSubmit}>
          <InputField
            label="Full Name *"
            icon={<Person fontSize="small" />}
            value={callName}
            onChange={setCallName}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email *"
            type="email"
            icon={<Email fontSize="small" />}
            value={callEmail}
            onChange={setCallEmail}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Phone *"
            type="tel"
            icon={<Phone fontSize="small" />}
            value={callPhone}
            onChange={setCallPhone}
            placeholder="+1 234 567 890"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Preferred Date *"
              type="date"
              icon={<CalendarToday fontSize="small" />}
              value={callDate}
              onChange={setCallDate}
              required
            />
            <InputField
              label="Preferred Time *"
              type="time"
              icon={<AccessTime fontSize="small" />}
              value={callTime}
              onChange={setCallTime}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-2
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
          >
            <Schedule fontSize="small" />
            Schedule My Call
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
