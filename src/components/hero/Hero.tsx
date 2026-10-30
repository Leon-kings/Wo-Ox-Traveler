// Hero.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FlightTakeoff,
  People,
  Public,
  AttachMoney,
  Explore,
  ArrowForward,
  ArrowBack,
  Close as CloseIcon,
  CheckCircle,
  Error as ErrorIcon,
  CalendarToday,
  Person,
  Email,
  Phone,
  Group,
  LocationOn,
  Flight,
  Hotel,
  Luggage,
  Star,
  AccessTime,
} from "@mui/icons-material";

// ============ Types ============
interface Destination {
  id: number;
  country: string;
  tagline: string;
  population: string;
  territory: string;
  avgPrice: string;
  rating: number;
  bestTime: string;
  highlights: string[];
  bgImage: string;
}

// ============ Data ============
const destinations: Destination[] = [
  {
    id: 1,
    country: "Caribbean",
    tagline: "Take a Glimpse Into The Beautiful Country Of",
    population: "44.48 M",
    territory: "275,400 KM²",
    avgPrice: "$946.000",
    rating: 4.8,
    bestTime: "Dec – Apr",
    highlights: ["Crystal Beaches", "Coral Reefs", "Tropical Vibes"],
    bgImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    country: "Switzerland",
    tagline: "Take a Glimpse Into The Beautiful Country Of",
    population: "8.66 M",
    territory: "41,290 KM²",
    avgPrice: "$1.100.200",
    rating: 4.9,
    bestTime: "Jun – Sep",
    highlights: ["Alpine Peaks", "Lakes & Trails", "Snow Villages"],
    bgImage:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    country: "France",
    tagline: "Take a Glimpse Into The Beautiful Country Of",
    population: "67.41 M",
    territory: "551,500 KM²",
    avgPrice: "$425.600",
    rating: 4.7,
    bestTime: "Apr – Jun",
    highlights: ["Paris Lights", "Wine Country", "Riviera Coast"],
    bgImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    country: "Thailand",
    tagline: "Take a Glimpse Into The Beautiful Country Of",
    population: "69.86 M",
    territory: "513,120 KM²",
    avgPrice: "$165.450",
    rating: 4.6,
    bestTime: "Nov – Feb",
    highlights: ["Island Hopping", "Street Food", "Temples"],
    bgImage:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
  },
];

// ============ Input Field ============
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

// ============ Booking Modal ============
interface BookingModalProps {
  open: boolean;
  destination: Destination | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  destination,
  onClose,
  onSuccess,
  onError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [packageType, setPackageType] = useState("standard");

  if (!open || !destination) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) {
      onError("Please fill in all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      onError("Please enter a valid email address.");
      return;
    }
    // Success
    onSuccess();
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setGuests("2");
    setPackageType("standard");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
      />
      <div
        className="relative w-full max-w-lg bg-black border border-white/15 rounded-2xl
          shadow-[0_0_60px_rgba(255,255,255,0.08)] p-6 sm:p-8
          animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]
          max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 rounded-full
            hover:bg-white/10 transition-all duration-300 hover:rotate-90"
        >
          <CloseIcon fontSize="small" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-white/50 text-xs font-semibold tracking-widest mb-2">
            <FlightTakeoff fontSize="small" />
            BOOK YOUR TRIP
          </div>
          <h2 className="text-white text-2xl font-extrabold">
            Trip to {destination.country}
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {destination.tagline}{" "}
            <span className="text-white font-semibold">
              {destination.country}
            </span>
          </p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            {
              icon: <People fontSize="small" />,
              label: "Population",
              value: destination.population,
            },
            {
              icon: <Public fontSize="small" />,
              label: "Territory",
              value: destination.territory,
            },
            {
              icon: <AttachMoney fontSize="small" />,
              label: "Avg Price",
              value: destination.avgPrice,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center"
            >
              <div className="text-white/60 flex justify-center mb-1">
                {s.icon}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-white/40">
                {s.label}
              </div>
              <div className="text-white text-xs font-bold mt-0.5">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name *"
            icon={<Person fontSize="small" />}
            value={name}
            onChange={setName}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email *"
            type="email"
            icon={<Email fontSize="small" />}
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Phone *"
            type="tel"
            icon={<Phone fontSize="small" />}
            value={phone}
            onChange={setPhone}
            placeholder="+1 234 567 890"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Travel Date *"
              type="date"
              icon={<CalendarToday fontSize="small" />}
              value={date}
              onChange={setDate}
              required
            />
            <InputField
              label="Guests"
              type="number"
              icon={<Group fontSize="small" />}
              value={guests}
              onChange={setGuests}
            />
          </div>

          {/* Package Type */}
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
                  onClick={() => setPackageType(p.id)}
                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold
                    border transition-all duration-300
                    ${
                      packageType === p.id
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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-2
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
          >
            <FlightTakeoff fontSize="small" />
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

// ============ Result Modal (Success / Error) ============
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

// ============ Hero Component ============
export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  // Result modal state
  const [resultOpen, setResultOpen] = useState(false);
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [resultTitle, setResultTitle] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const total = destinations.length;
  const slideDuration = 6000;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent((idx + total) % total);
    },
    [total],
  );

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );

  // Auto-slide
  useEffect(() => {
    if (paused || hovered || bookingOpen || resultOpen) return;
    intervalRef.current = setInterval(next, slideDuration);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, hovered, bookingOpen, resultOpen, next]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow =
      bookingOpen || resultOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bookingOpen, resultOpen]);

  const openBooking = (dest: Destination) => {
    setSelectedDestination(dest);
    setBookingOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingOpen(false);
    setResultType("success");
    setResultTitle("Booking Confirmed! ✈️");
    setResultMessage(
      `Your trip to ${selectedDestination?.country} has been successfully booked. A confirmation email is on its way.`,
    );
    setResultOpen(true);
  };

  const handleBookingError = (msg: string) => {
    setResultType("error");
    setResultTitle("Booking Failed");
    setResultMessage(msg);
    setResultOpen(true);
  };

  const handleResultClose = () => {
    setResultOpen(false);
    setSelectedDestination(null);
  };

  const active = destinations[current];

  return (
    <>
      {/* ============ Global Animations ============ */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.12) translate(-1%, -1%); }
        }
        @keyframes slideUpText {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .hero-slide-bg {
          animation: kenBurns 12s ease-out both;
        }
        .hero-text-anim > * {
          animation: slideUpText 0.7s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .hero-text-anim > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-text-anim > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-text-anim > *:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <section
        id="hero"
        className="relative w-full min-h-[88vh] md:min-h-screen overflow-hidden bg-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ============ Background Slides ============ */}
        {destinations.map((d, i) => (
          <div
            key={d.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out
              ${i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center ${i === current ? "hero-slide-bg" : ""}`}
              style={{ backgroundImage: `url(${d.bgImage})` }}
            />
            {/* Dark overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        ))}

        {/* Floating plane decoration */}
        <div className="absolute top-24 right-[8%] text-white/15 z-20 hidden md:block animate-[floatSlow_6s_ease-in-out_infinite]">
          <FlightTakeoff sx={{ fontSize: 56 }} />
        </div>

        {/* ============ Content ============ */}
        <div
          className="relative z-20 mx-auto max-w-full 2xl:max-w-full
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24
          pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-24 md:pb-32"
        >
          <div key={active.id} className="hero-text-anim max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/70 text-xs sm:text-sm font-semibold tracking-[3px] uppercase">
                Wo Ox Travel · Destination{" "}
                {String(current + 1).padStart(2, "0")} / 0{total}
              </span>
            </div>

            <h2 className="text-white/80 text-lg sm:text-2xl md:text-3xl font-light mb-2">
              {active.tagline}
            </h2>
            <h1
              className="text-white font-extrabold text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl
              leading-[0.95] tracking-tight mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            >
              {active.country}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => openBooking(active)}
                className="group flex items-center gap-2 text-black bg-white font-bold
                  text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full
                  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
              >
                <FlightTakeoff fontSize="small" />
                Book This Trip
                <ArrowForward
                  fontSize="small"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button
                className="flex items-center gap-2 text-white font-semibold
                text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full
                border border-white/40 backdrop-blur-sm
                transition-all duration-300 hover:bg-white hover:text-black"
              >
                <Explore fontSize="small" />
                Explore More
              </button>
            </div>
          </div>

          {/* ============ Info Stats Bar ============ */}
          <div className="mt-10 sm:mt-14 lg:mt-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl">
              {[
                {
                  icon: <People fontSize="small" />,
                  label: "Population",
                  value: active.population,
                },
                {
                  icon: <Public fontSize="small" />,
                  label: "Territory",
                  value: active.territory,
                },
                {
                  icon: <AttachMoney fontSize="small" />,
                  label: "AVG Price",
                  value: active.avgPrice,
                },
                {
                  icon: <Star fontSize="small" />,
                  label: "Rating",
                  value: `${active.rating} / 5`,
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-md
                    border border-white/15 rounded-2xl p-3 sm:p-4
                    transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:border-white/40"
                  style={{
                    animation: `slideUpText 0.6s ease-out ${0.5 + i * 0.1}s both`,
                  }}
                >
                  <div className="text-white/60 mb-1.5 transition-colors duration-300 group-hover:text-white">
                    {s.icon}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                  <div className="text-white font-bold text-sm sm:text-lg mt-0.5">
                    {s.value}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0
                    origin-left transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ Hover Info Card (right side) ============ */}
        <div
          className={`hidden lg:block absolute right-10 xl:right-16 2xl:right-24 top-1/2 -translate-y-1/2 z-30
            w-[300px] xl:w-[340px]
            transition-all duration-500
            ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}
        >
          <div
            className="bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/50 text-[10px] font-bold tracking-[2px] uppercase">
                Quick Glance
              </span>
              <div className="flex items-center gap-1 text-white">
                <Star sx={{ fontSize: 14 }} />
                <span className="text-xs font-bold">{active.rating}</span>
              </div>
            </div>

            <h3 className="text-white text-2xl font-extrabold mb-1">
              {active.country}
            </h3>
            <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
              <LocationOn sx={{ fontSize: 14 }} />
              <span>
                {active.territory} · Best: {active.bestTime}
              </span>
            </div>

            <div className="space-y-2 mb-5">
              {active.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {h}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-white/60 text-xs mb-4">
              <span className="flex items-center gap-1">
                <AccessTime sx={{ fontSize: 14 }} /> {active.bestTime}
              </span>
              <span className="flex items-center gap-1">
                <People sx={{ fontSize: 14 }} /> {active.population}
              </span>
            </div>

            <button
              onClick={() => openBooking(active)}
              className="w-full flex items-center justify-center gap-2 text-black bg-white
                font-bold text-sm py-2.5 rounded-full transition-all duration-300
                hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              <FlightTakeoff fontSize="small" />
              Book Now · {active.avgPrice}
            </button>
          </div>
        </div>

        {/* ============ Arrows ============ */}
        <div className="absolute z-30 left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
              bg-black/40 backdrop-blur-md border border-white/20 text-white
              transition-all duration-300 hover:bg-white hover:text-black hover:scale-110"
          >
            <ArrowBack fontSize="small" />
          </button>
        </div>
        <div className="absolute z-30 right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 lg:hidden">
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
              bg-black/40 backdrop-blur-md border border-white/20 text-white
              transition-all duration-300 hover:bg-white hover:text-black hover:scale-110"
          >
            <ArrowForward fontSize="small" />
          </button>
        </div>

        {/* ============ Bottom Controls ============ */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div
            className="mx-auto max-w-[1600px] 2xl:max-w-[1800px]
            px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-6 sm:pb-8"
          >
            <div className="flex items-end justify-between gap-4">
              {/* Dots + progress */}
              <div className="flex items-center gap-3 sm:gap-5">
                {destinations.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${d.country}`}
                    className="group flex flex-col items-start gap-1.5"
                  >
                    <span
                      className={`relative block w-10 sm:w-16 h-[3px] rounded-full overflow-hidden
                        bg-white/20 transition-all duration-300`}
                    >
                      {i === current && (
                        <span
                          key={`${current}-${paused}-${hovered}`}
                          className="absolute inset-y-0 left-0 bg-white rounded-full"
                          style={{
                            animation:
                              i === current && !paused && !hovered
                                ? `progressBar ${slideDuration}ms linear forwards`
                                : "none",
                            width:
                              i === current && (paused || hovered)
                                ? "100%"
                                : undefined,
                          }}
                        />
                      )}
                      {i < current && (
                        <span className="absolute inset-0 bg-white/60 rounded-full" />
                      )}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-bold tracking-widest transition-colors duration-300
                        ${i === current ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                    >
                      0{i + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Pause / Play */}
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="hidden sm:flex items-center gap-2 text-white/60 text-xs font-semibold
                  px-3 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md
                  transition-all duration-300 hover:text-white hover:border-white/50"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${paused ? "bg-white/40" : "bg-white animate-pulse"}`}
                />
                {paused ? "Paused" : "Auto-play"}
              </button>
            </div>

            {/* Scroll cue */}
            <div className="mt-4 flex items-center gap-2 text-white/40 text-[10px] tracking-[3px] uppercase">
              <span className="block w-6 h-[1px] bg-white/40" />
              Scroll to explore
            </div>
          </div>
        </div>
      </section>

      {/* ============ Modals ============ */}
      <BookingModal
        open={bookingOpen}
        destination={selectedDestination}
        onClose={() => setBookingOpen(false)}
        onSuccess={handleBookingSuccess}
        onError={handleBookingError}
      />

      <ResultModal
        open={resultOpen}
        type={resultType}
        title={resultTitle}
        message={resultMessage}
        onClose={handleResultClose}
      />
    </>
  );
};
