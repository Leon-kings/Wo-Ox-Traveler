// Countries.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Public,
  FlightTakeoff,
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
  Language,
  Explore,
  LocationOn,
  AttachMoney,
  Hotel,
  Flight,
  Luggage,
  Search,
  FilterList,
  WbSunny,
  AcUnit,
  CloudQueue,
  TrendingUp,
} from "@mui/icons-material";

// ============ InView Hook ============
const useInView = (options: IntersectionObserverInit = { threshold: 0.15 }) => {
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
    obs.observe(ref.current!);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

// ============ Types ============
interface Country {
  id: string;
  name: string;
  continent:
    | "Caribbean"
    | "Europe"
    | "Asia"
    | "Africa"
    | "Americas"
    | "Oceania";
  tagline: string;
  description: string;
  price: number;
  oldPrice?: number;
  duration: string;
  rating: number;
  reviews: number;
  bestSeason: string;
  climate: "tropical" | "cold" | "temperate";
  highlights: string[];
  bg: string;
  badge?: string;
}

// ============ Data ============
const countries: Country[] = [
  {
    id: "caribbean",
    name: "Caribbean",
    continent: "Caribbean",
    tagline: "Crystal waters & coral reefs",
    description:
      "White-sand beaches, turquoise lagoons, and island-hopping adventures across the most beautiful archipelago on Earth.",
    price: 946,
    oldPrice: 1240,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 1240,
    bestSeason: "Dec – Apr",
    climate: "tropical",
    highlights: [
      "Crystal Beaches",
      "Coral Reefs",
      "Island Hopping",
      "Sunset Cruises",
    ],
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    badge: "Best Seller",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    continent: "Europe",
    tagline: "Alpine peaks & snowy villages",
    description:
      "Ride scenic trains through the Alps, explore charming lakeside towns, and breathe the cleanest air in Europe.",
    price: 1100,
    oldPrice: 1450,
    duration: "8 Days / 7 Nights",
    rating: 4.9,
    reviews: 2100,
    bestSeason: "Jun – Sep",
    climate: "cold",
    highlights: [
      "Alpine Peaks",
      "Lakes & Trails",
      "Snow Villages",
      "Scenic Trains",
    ],
    bg: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    badge: "Top Rated",
  },
  {
    id: "france",
    name: "France",
    continent: "Europe",
    tagline: "Lights, wine & the Riviera",
    description:
      "From the Eiffel Tower to Bordeaux vineyards and the sun-soaked Côte d'Azur — France is a feast for every sense.",
    price: 425,
    oldPrice: 590,
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    reviews: 3400,
    bestSeason: "Apr – Jun",
    climate: "temperate",
    highlights: [
      "Paris Lights",
      "Wine Country",
      "Riviera Coast",
      "Michelin Dining",
    ],
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "thailand",
    name: "Thailand",
    continent: "Asia",
    tagline: "Islands, food & ancient temples",
    description:
      "Emerald waters of the Andaman, Bangkok street food, and thousand-year-old temples in the Land of Smiles.",
    price: 165,
    oldPrice: 240,
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    reviews: 2700,
    bestSeason: "Nov – Feb",
    climate: "tropical",
    highlights: [
      "Island Hopping",
      "Street Food",
      "Ancient Temples",
      "Night Markets",
    ],
    bg: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    badge: "Best Value",
  },
  {
    id: "japan",
    name: "Japan",
    continent: "Asia",
    tagline: "Cherry blossoms & neon nights",
    description:
      "Ancient shrines beside neon skylines — Japan blends zen gardens, bullet trains, and world-class cuisine.",
    price: 890,
    duration: "10 Days / 9 Nights",
    rating: 4.9,
    reviews: 1800,
    bestSeason: "Mar – May",
    climate: "temperate",
    highlights: [
      "Mt. Fuji Views",
      "Kyoto Shrines",
      "Tokyo Nights",
      "Bullet Trains",
    ],
    bg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    badge: "Trending",
  },
  {
    id: "italy",
    name: "Italy",
    continent: "Europe",
    tagline: "Roman ruins & Tuscan sun",
    description:
      "Pasta in Trastevere, gondolas in Venice, and golden vineyards of Tuscany — la dolce vita awaits.",
    price: 620,
    oldPrice: 780,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 2900,
    bestSeason: "Apr – Oct",
    climate: "temperate",
    highlights: [
      "Rome Colosseum",
      "Venice Canals",
      "Tuscany Wines",
      "Amalfi Coast",
    ],
    bg: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "maldives",
    name: "Maldives",
    continent: "Asia",
    tagline: "Overwater villas & turquoise",
    description:
      "Barefoot luxury in the world's most iconic overwater villas. Wake up above coral lagoons and swim with rays.",
    price: 1580,
    duration: "6 Days / 5 Nights",
    rating: 5.0,
    reviews: 960,
    bestSeason: "Nov – Apr",
    climate: "tropical",
    highlights: [
      "Overwater Villas",
      "Coral Reefs",
      "Snorkeling",
      "Private Dinners",
    ],
    bg: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    badge: "Luxury",
  },
  {
    id: "morocco",
    name: "Morocco",
    continent: "Africa",
    tagline: "Souks, dunes & desert nights",
    description:
      "Lose yourself in Marrakech medinas, ride camels over Sahara dunes, and sleep under the clearest stars.",
    price: 380,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    reviews: 1300,
    bestSeason: "Mar – May",
    climate: "temperate",
    highlights: [
      "Marrakech Souks",
      "Sahara Desert",
      "Blue City",
      "Atlas Mountains",
    ],
    bg: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "greece",
    name: "Greece",
    continent: "Europe",
    tagline: "White villages & Aegean blue",
    description:
      "Santorini sunsets, ancient Athens, and island-hopping across the Cyclades — Greece is timeless beauty.",
    price: 480,
    oldPrice: 620,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 2200,
    bestSeason: "May – Sep",
    climate: "temperate",
    highlights: [
      "Santorini Sunsets",
      "Acropolis",
      "Cyclades Islands",
      "Mediterranean Food",
    ],
    bg: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80",
  },
];

const continents = [
  "All",
  "Caribbean",
  "Europe",
  "Asia",
  "Africa",
  "Americas",
  "Oceania",
] as const;

// ============ Reusable Input ============
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

// ============ Climate Icon ============
const ClimateIcon: React.FC<{ climate: Country["climate"] }> = ({
  climate,
}) => {
  if (climate === "tropical") return <WbSunny sx={{ fontSize: 12 }} />;
  if (climate === "cold") return <AcUnit sx={{ fontSize: 12 }} />;
  return <CloudQueue sx={{ fontSize: 12 }} />;
};

// ============ Countries Component ============
export const Countries: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "popular" | "price-asc" | "price-desc" | "rating"
  >("popular");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Booking modal
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Booking form
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookGuests, setBookGuests] = useState("2");
  const [bookPackage, setBookPackage] = useState("standard");
  const [bookNotes, setBookNotes] = useState("");

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

  const anyModalOpen = bookingOpen || resultOpen;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [anyModalOpen]);

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let list = countries;
    if (activeFilter !== "All")
      list = list.filter((c) => c.continent === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.highlights.some((h) => h.toLowerCase().includes(q)),
      );
    }
    switch (sortBy) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [activeFilter, searchQuery, sortBy]);

  const openBooking = (country: Country) => {
    setSelectedCountry(country);
    setBookingOpen(true);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ---------- Handlers ----------
  const handleBookSubmit = (e: React.FormEvent) => {
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
    const countryName = selectedCountry?.name;
    const finalPrice = selectedCountry
      ? bookPackage === "basic"
        ? Math.round(selectedCountry.price * 0.85)
        : bookPackage === "premium"
          ? Math.round(selectedCountry.price * 1.4)
          : selectedCountry.price
      : 0;

    setBookingOpen(false);
    showResult(
      "success",
      "Trip Booked! ✈️",
      `Your ${bookPackage} trip to ${countryName} is confirmed for $${finalPrice.toLocaleString()}. A detailed itinerary has been sent to ${bookEmail}.`,
    );
    setBookName("");
    setBookEmail("");
    setBookPhone("");
    setBookDate("");
    setBookGuests("2");
    setBookPackage("standard");
    setBookNotes("");
    setSelectedCountry(null);
  };

  return (
    <>
      {/* ============ Animations ============ */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>

      <section
        id="countries"
        ref={sectionRef}
        className="relative w-full bg-black overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute top-24 right-[8%] text-white/[0.05] hidden md:block animate-[floatY_8s_ease-in-out_infinite]">
            <Public sx={{ fontSize: 120 }} />
          </div>
          <div className="absolute bottom-32 left-[5%] text-white/[0.05] hidden lg:block animate-[floatY_10s_ease-in-out_infinite_1s]">
            <FlightTakeoff sx={{ fontSize: 90 }} />
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
                  Countries We Offer
                </span>
                <span className="h-[1px] w-8 bg-white/50" />
              </div>

              <h1
                className="text-white font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                leading-[1.05] tracking-tight mb-5"
              >
                Where do you want
                <br />
                <span className="text-white/40">to wake up next?</span>
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
                {countries.length}+ handpicked destinations across 6 continents
                — with all-inclusive packages, transparent pricing, and instant
                booking.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1.5">
                  <Star sx={{ fontSize: 14 }} className="text-white" /> 4.9 avg
                  rating
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp sx={{ fontSize: 14 }} className="text-white" />{" "}
                  50K+ travelers
                </span>
                <span className="flex items-center gap-1.5">
                  <AttachMoney sx={{ fontSize: 14 }} className="text-white" />{" "}
                  Best price guarantee
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH / FILTER BAR ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-8"
        >
          <div
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-md"
            style={{
              animation: inView ? `fadeUp 0.6s ease-out 0.2s both` : "none",
            }}
          >
            {/* Top row: search + sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="relative flex-1 group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                  <Search fontSize="small" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search a country, vibe, or experience..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm
                    placeholder-white/30 outline-none transition-all duration-300
                    focus:border-white/60 focus:bg-white/10"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <FilterList fontSize="small" />
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto bg-white/5 border border-white/15 rounded-xl pl-10 pr-8 py-2.5 text-white text-sm
                    outline-none transition-all duration-300 focus:border-white/60 focus:bg-white/10
                    appearance-none cursor-pointer"
                >
                  <option value="popular" className="bg-black">
                    Popular
                  </option>
                  <option value="price-asc" className="bg-black">
                    Price: Low → High
                  </option>
                  <option value="price-desc" className="bg-black">
                    Price: High → Low
                  </option>
                  <option value="rating" className="bg-black">
                    Top Rated
                  </option>
                </select>
              </div>
            </div>

            {/* Continent filter chips */}
            <div className="flex flex-wrap gap-2">
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-300
                    ${
                      activeFilter === c
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white hover:border-white/30"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= COUNTRY CARDS ================= */}
        <div
          className="relative z-10 mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-14 md:pb-20"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/40 mb-4">
                <Search sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                No countries found
              </h3>
              <p className="text-white/50 text-sm">
                Try a different search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((country, i) => (
                <div
                  key={country.id}
                  className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl
                    transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-2 hover:border-white/30
                    hover:shadow-[0_25px_60px_rgba(255,255,255,0.08)]"
                  style={{
                    animation: inView
                      ? `fadeUp 0.6s ease-out ${0.1 + i * 0.07}s both`
                      : "none",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={country.bg}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Badge */}
                    {country.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className="text-[9px] font-bold uppercase tracking-widest
                          text-black bg-white px-2 py-0.5 rounded-full"
                        >
                          {country.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(country.id);
                      }}
                      aria-label="Save to wishlist"
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
                        backdrop-blur-md border transition-all duration-300
                        ${
                          wishlist.has(country.id)
                            ? "bg-white text-black border-white"
                            : "bg-black/40 text-white border-white/30 hover:bg-white/20"
                        }`}
                    >
                      <Star
                        sx={{ fontSize: 16 }}
                        className={wishlist.has(country.id) ? "" : "opacity-70"}
                      />
                    </button>

                    {/* Country name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <LocationOn
                          sx={{ fontSize: 12 }}
                          className="text-white/60"
                        />
                        <span className="text-white/60 text-[10px] uppercase tracking-widest">
                          {country.continent}
                        </span>
                      </div>
                      <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-0.5">
                        {country.name}
                      </h3>
                      <p className="text-white/70 text-xs leading-snug">
                        {country.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    {/* Rating + season */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star sx={{ fontSize: 14 }} className="text-white" />
                        <span className="text-white font-bold text-xs">
                          {country.rating}
                        </span>
                        <span className="text-white/40 text-[10px]">
                          ({country.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/50 text-[10px]">
                        <ClimateIcon climate={country.climate} />
                        {country.bestSeason}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {country.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="text-[9px] font-medium text-white/60 bg-white/5 border border-white/10
                            px-2 py-0.5 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Price + duration */}
                    <div className="flex items-end justify-between pt-3 border-t border-white/10">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-white font-extrabold text-lg">
                            ${country.price}
                          </span>
                          {country.oldPrice && (
                            <span className="text-white/30 text-xs line-through">
                              ${country.oldPrice}
                            </span>
                          )}
                        </div>
                        <div className="text-white/40 text-[10px] flex items-center gap-1 mt-0.5">
                          <AccessTime sx={{ fontSize: 10 }} />
                          {country.duration}
                        </div>
                      </div>

                      <button
                        onClick={() => openBooking(country)}
                        className="group/btn flex items-center gap-1.5 text-black bg-white font-bold
                          text-xs px-4 py-2 rounded-full transition-all duration-300
                          hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105"
                      >
                        Book
                        <ArrowForward
                          sx={{ fontSize: 12 }}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                        />
                      </button>
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
          )}
        </div>

        {/* ================= CTA ================= */}
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
                <Public fontSize="small" />
                Custom destination?
              </div>
              <h2 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5">
                Don't see your dream
                <br />
                <span className="text-white/40">country here?</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Tell us where you want to go — we'll craft a custom itinerary
                anywhere in the world.
              </p>
              <button
                onClick={() => openBooking(countries[0])}
                className="group inline-flex items-center gap-2 text-black bg-white font-bold text-sm sm:text-base
                  px-7 sm:px-9 py-3.5 rounded-full transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
              >
                <FlightTakeoff fontSize="small" />
                Start Planning
                <ArrowForward
                  fontSize="small"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING MODAL ================= */}
      <ModalShell
        open={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setSelectedCountry(null);
        }}
        title={
          selectedCountry ? `Book: ${selectedCountry.name}` : "Book a Trip"
        }
        subtitle={
          selectedCountry
            ? selectedCountry.tagline
            : "Tell us where you want to go"
        }
        icon={<FlightTakeoff fontSize="small" />}
      >
        {selectedCountry && (
          <>
            {/* Preview image */}
            <div className="relative h-32 rounded-xl overflow-hidden mb-4 border border-white/10">
              <img
                src={selectedCountry.bg}
                alt={selectedCountry.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center gap-1 mb-0.5">
                  <Star sx={{ fontSize: 12 }} className="text-white" />
                  <span className="text-white text-[11px] font-bold">
                    {selectedCountry.rating}
                  </span>
                  <span className="text-white/60 text-[10px]">
                    · {selectedCountry.bestSeason}
                  </span>
                </div>
                <div className="text-white font-extrabold text-base">
                  {selectedCountry.name}
                </div>
              </div>
            </div>

            {/* Price strip */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                <div className="text-[9px] uppercase tracking-wide text-white/40">
                  Duration
                </div>
                <div className="text-white text-xs font-bold mt-0.5">
                  {selectedCountry.duration.split(" / ")[0]}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                <div className="text-[9px] uppercase tracking-wide text-white/40">
                  Base
                </div>
                <div className="text-white text-xs font-bold mt-0.5">
                  ${selectedCountry.price}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                <div className="text-[9px] uppercase tracking-wide text-white/40">
                  Per Person
                </div>
                <div className="text-white text-xs font-bold mt-0.5">
                  ${Math.round(selectedCountry.price / 2)}
                </div>
              </div>
            </div>

            <form onSubmit={handleBookSubmit}>
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

              {/* Package */}
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
                      mult: 0.85,
                    },
                    {
                      id: "standard",
                      label: "Standard",
                      icon: <Hotel fontSize="small" />,
                      mult: 1,
                    },
                    {
                      id: "premium",
                      label: "Premium",
                      icon: <Flight fontSize="small" />,
                      mult: 1.4,
                    },
                  ].map((p) => {
                    const final = Math.round(selectedCountry.price * p.mult);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setBookPackage(p.id)}
                        className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold
                          border transition-all duration-300
                          ${
                            bookPackage === p.id
                              ? "bg-white text-black border-white"
                              : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        {p.icon}
                        <span>{p.label}</span>
                        <span
                          className={`text-[9px] font-bold ${bookPackage === p.id ? "text-black/60" : "text-white/40"}`}
                        >
                          ${final}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-sm py-3.5 rounded-full mt-1
                  transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
              >
                <FlightTakeoff fontSize="small" />
                Confirm Booking
              </button>
            </form>
          </>
        )}
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
