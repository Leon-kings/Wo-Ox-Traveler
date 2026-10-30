// Footer.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FlightTakeoff,
  Email,
  Phone,
  LocationOn,
  CheckCircle,
  Cancel,
  Error as ErrorIcon,
  ArrowForward,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp,
  Send,
  Public,
  Hotel,
  TravelExplore,
  LocalOffer,
  Luggage,
  Shield,
  Speed,
  SupportAgent,
  AttachMoney,
  GppGood,
  Info,
  ContactSupport,
  KeyboardArrowUp,
  Language,
  Security,
} from "@mui/icons-material";

/* ================= INLINE SVG LOGO ================= */
const CompassLogoSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="drop-shadow-lg">
    <circle cx="20" cy="20" r="18" stroke="#FFF" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
    <circle cx="20" cy="20" r="13" stroke="#FFF" strokeWidth="1" opacity="0.3" />
    <path d="M20 6 L23 17 L20 20 L17 17 Z" fill="#FFF" />
    <path d="M20 34 L17 23 L20 20 L23 23 Z" fill="#FFF" opacity="0.6" />
    <circle cx="20" cy="20" r="3" fill="#000" stroke="#FFF" strokeWidth="1.5" />
  </svg>
);

/* ================= INLINE PLANE PATH SVG ================= */
const PlanePathSVG: React.FC = () => (
  <svg width="40" height="14" viewBox="0 0 60 20" fill="none" className="opacity-40">
    <path
      d="M2 10 Q 15 2, 30 10 T 58 10"
      stroke="url(#footerPath)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
    />
    <circle cx="58" cy="10" r="2" fill="#FFF" />
    <defs>
      <linearGradient id="footerPath" x1="0" y1="0" x2="60" y2="0">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFF" />
      </linearGradient>
    </defs>
  </svg>
);

/* ================= VALIDATORS ================= */
const vEmail = (v: string) => {
  if (!v.trim()) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email";
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
      <div
        className="relative w-full max-w-sm bg-black border border-white/15 rounded-2xl p-8 text-center
        shadow-[0_0_60px_rgba(255,255,255,0.12)] animate-[modalPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
      >
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5
          ${isSuccess ? "bg-white text-black" : "bg-white/10 text-white border-2 border-white"}`}
        >
          {isSuccess ? <CheckCircle sx={{ fontSize: 48 }} /> : <ErrorIcon sx={{ fontSize: 48 }} />}
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

/* ================= FOOTER ================= */
export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [resultOpen, setResultOpen] = useState(false);
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [resultTitle, setResultTitle] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const year = new Date().getFullYear();

  const emailError = vEmail(email);
  const emailValid = emailTouched && !emailError && email.length > 0;
  const emailInvalid = emailTouched && !!emailError;

  /* ---- Back-to-top visibility ---- */
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Scroll lock when modal open ---- */
  useEffect(() => {
    document.body.style.overflow = resultOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [resultOpen]);

  /* ---- Newsletter submit ---- */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (emailError) {
      setResultType("error");
      setResultTitle("Invalid Email");
      setResultMessage("Please enter a valid email address to subscribe.");
      setResultOpen(true);
      return;
    }
    setResultType("success");
    setResultTitle("You're subscribed! 🎉");
    setResultMessage(`Welcome aboard! Travel deals and inspiration will land in ${email} soon.`);
    setResultOpen(true);
    setEmail("");
    setEmailTouched(false);
  };

  /* ---- Link columns ---- */
  const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "Destinations", to: "/destinations" },
    { label: "Packages", to: "/packages" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const serviceLinks = [
    { label: "Flight Booking", to: "/destinations", icon: <FlightTakeoff fontSize="small" /> },
    { label: "Hotel Reservation", to: "/destinations", icon: <Hotel fontSize="small" /> },
    { label: "Tour Packages", to: "/packages", icon: <TravelExplore fontSize="small" /> },
    { label: "Visa Assistance", to: "/destinations", icon: <Public fontSize="small" /> },
    { label: "Travel Insurance", to: "/destinations", icon: <LocalOffer fontSize="small" /> },
    { label: "Luggage Transfer", to: "/destinations", icon: <Luggage fontSize="small" /> },
  ];

  const socials = [
    { icon: <Facebook fontSize="small" />, label: "Facebook", href: "https://facebook.com" },
    { icon: <Instagram fontSize="small" />, label: "Instagram", href: "https://instagram.com" },
    { icon: <Twitter fontSize="small" />, label: "Twitter", href: "https://twitter.com" },
    { icon: <LinkedIn fontSize="small" />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <YouTube fontSize="small" />, label: "YouTube", href: "https://youtube.com" },
  ];

  const highlights = [
    { icon: <Shield fontSize="small" />, label: "Fully Insured" },
    { icon: <Speed fontSize="small" />, label: "Fast Booking" },
    { icon: <SupportAgent fontSize="small" />, label: "24/7 Support" },
    { icon: <AttachMoney fontSize="small" />, label: "Best Price" },
  ];

  return (
    <>
      <style>{`
        @keyframes footerFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
        }
      `}</style>

      <footer className="relative w-full bg-black border-t border-white/10 overflow-hidden">
        {/* ============ DECORATIONS ============ */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[120px]" />
          <div className="absolute top-20 right-[8%] text-white/[0.04] hidden md:block animate-[floatSlow_8s_ease-in-out_infinite]">
            <FlightTakeoff sx={{ fontSize: 80 }} />
          </div>
          <div className="absolute bottom-20 left-[5%] text-white/[0.04] hidden lg:block animate-[floatSlow_10s_ease-in-out_infinite_1s]">
            <Public sx={{ fontSize: 70 }} />
          </div>
        </div>

        {/* ============ TOP WAVE ============ */}
        <div className="relative">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1600px] 2xl:max-w-[1800px]
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24
          pt-14 sm:pt-16 pb-8">

          {/* ============ NEWSLETTER BANNER ============ */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15
            bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:p-10 md:p-12 mb-12"
            style={{ animation: "footerFadeUp 0.6s ease-out both" }}>
            {/* Orbit decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
                border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px]
                border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </div>

            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-[3px] uppercase mb-3">
                  <Send fontSize="small" />
                  Join 50,000+ Travelers
                </div>
                <h3 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
                  Get travel deals in your inbox
                </h3>
                <p className="text-white/50 text-sm sm:text-base max-w-md">
                  Weekly inspiration, exclusive offers, and insider tips from our Wo Ox Travel team.
                </p>
              </div>

              <form onSubmit={handleSubscribe} noValidate
                className="w-full md:w-auto md:min-w-[380px]">
                <div className="relative group">
                  <span
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors
                      ${emailInvalid ? "text-red-400" : emailValid ? "text-green-400" : "text-white/40 group-focus-within:text-white"}`}
                  >
                    <Email fontSize="small" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Enter your email"
                    className={`w-full bg-white/5 border rounded-full pl-11 pr-32 py-3 text-white text-sm
                      placeholder-white/30 outline-none transition-all duration-300
                      ${emailInvalid
                        ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : emailValid
                        ? "border-green-500/70 focus:border-green-400 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"
                        : "border-white/15 focus:border-white/60 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"}`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {emailValid && <CheckCircle sx={{ fontSize: 16 }} className="text-green-400 mr-1" />}
                    {emailInvalid && <Cancel sx={{ fontSize: 16 }} className="text-red-400 mr-1" />}
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 text-black bg-white font-bold text-xs
                        px-4 py-2 rounded-full transition-all duration-300
                        hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105"
                    >
                      Subscribe
                      <ArrowForward sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                </div>
                {emailInvalid && (
                  <p className="text-red-400 text-[11px] mt-1.5 ml-3">{emailError}</p>
                )}
                {!emailInvalid && (
                  <p className="text-white/40 text-[10px] mt-1.5 ml-3">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* ============ MAIN GRID ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 mb-10">

            {/* ---- Brand ---- */}
            <div className="lg:col-span-4" style={{ animation: "footerFadeUp 0.6s ease-out 0.1s both" }}>
              <Link to="/" className="flex items-center gap-2 group mb-4 w-fit">
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <CompassLogoSVG />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-extrabold tracking-wide text-white text-lg sm:text-xl">
                    Wo Ox Travel
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-[10px] text-white/50 font-medium tracking-widest mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    EXPLORE THE WORLD
                    <PlanePathSVG />
                  </span>
                </div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-sm">
                Boutique travel crafted by explorers, for explorers. We've helped over 50,000 travelers discover
                the world's most extraordinary places since 2015.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-5">
                {highlights.map((h) => (
                  <div key={h.label}
                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1
                      text-white/60 text-[10px] font-semibold">
                    {h.icon}
                    {h.label}
                  </div>
                ))}
              </div>

              {/* Contact quick */}
              <div className="space-y-2">
                <a href="tel:+1234567890"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors group">
                  <Phone sx={{ fontSize: 14 }} className="text-white/40 group-hover:text-white" />
                  +250 (787) 944-577
                </a>
                <a href="mailto:hello@wooxtravel.com"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors group">
                  <Email sx={{ fontSize: 14 }} className="text-white/40 group-hover:text-white" />
                  hello@wooxtravel.com
                </a>
                <div className="flex items-start gap-2 text-white/50 text-xs">
                  <LocationOn sx={{ fontSize: 14 }} className="text-white/40 mt-0.5" />
                  <span>12 Wanderlust Ave, Suite 400<br />New York, NY 10001</span>
                </div>
              </div>
            </div>

            {/* ---- Explore ---- */}
            <div className="lg:col-span-2" style={{ animation: "footerFadeUp 0.6s ease-out 0.2s both" }}>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-1.5">
                <span className="w-1 h-4 bg-white rounded-full" />
                Explore
              </h4>
              <ul className="space-y-2">
                {exploreLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-all duration-300"
                    >
                      <span className="w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- Services ---- */}
            <div className="lg:col-span-3" style={{ animation: "footerFadeUp 0.6s ease-out 0.3s both" }}>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-1.5">
                <span className="w-1 h-4 bg-white rounded-full" />
                Services
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-all duration-300"
                    >
                      <span className="text-white/30 group-hover:text-white transition-colors">
                        {l.icon}
                      </span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- Support ---- */}
            <div className="lg:col-span-3" style={{ animation: "footerFadeUp 0.6s ease-out 0.4s both" }}>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-1.5">
                <span className="w-1 h-4 bg-white rounded-full" />
                Support
              </h4>
              <ul className="space-y-2 mb-5">
                {[
                  { label: "Help Center", to: "/contact", icon: <SupportAgent fontSize="small" /> },
                  { label: "Contact Us", to: "/contact", icon: <ContactSupport fontSize="small" /> },
                  { label: "Terms of Service", to: "/about", icon: <Info fontSize="small" /> },
                  { label: "Privacy Policy", to: "/about", icon: <Shield fontSize="small" /> },
                  { label: "Cookie Policy", to: "/about", icon: <GppGood fontSize="small" /> },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-all duration-300"
                    >
                      <span className="text-white/30 group-hover:text-white transition-colors">
                        {l.icon}
                      </span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Socials */}
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-[2px] mb-2">
                  Follow Us
                </div>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/15
                        flex items-center justify-center text-white/60
                        transition-all duration-300
                        hover:bg-white hover:text-black hover:scale-110 hover:border-white"
                    >
                      {s.icon}
                    </a>
                  ))}
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-full bg-white text-black
                      flex items-center justify-center transition-all duration-300
                      hover:scale-110 animate-[pulseGlow_2s_infinite]"
                  >
                    <WhatsApp fontSize="small" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ============ PAYMENT + LANGUAGE BAR ============ */}
          <div className="border-t border-white/10 pt-6 mb-6
            flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-[10px] uppercase tracking-wider">We accept</span>
              <div className="flex items-center gap-2">
                {["VISA", "MC", "AMEX", "PayPal"].map((brand) => (
                  <div
                    key={brand}
                    className="h-6 px-2 rounded bg-white/5 border border-white/10
                      flex items-center justify-center text-[9px] font-bold text-white/70 tracking-wider"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white/40 text-[10px]">
                <Security sx={{ fontSize: 12 }} />
                100% Secure Payments
              </div>
              <button
                className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold
                  px-2.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-all"
              >
                <Language fontSize="small" />
                EN / USD
              </button>
            </div>
          </div>

          {/* ============ COPYRIGHT BAR ============ */}
          <div className="border-t border-white/10 pt-6 pb-4
            flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white text-[11px] sm:text-xs text-center sm:text-left">
              © <span className="text-blue-600 font-bold">{year}</span> Leon. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-white/40 text-[11px] sm:text-xs">
              <Link to="/about" className="hover:text-white transition-colors">Terms</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <Link to="/about" className="hover:text-white transition-colors">Privacy</Link>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <Link to="/about" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>

        {/* ============ BACK TO TOP ============ */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white text-black
            flex items-center justify-center shadow-[0_8px_30px_rgba(255,255,255,0.2)]
            transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
            ${showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          <KeyboardArrowUp />
        </button>
      </footer>

      {/* ============ RESULT MODAL ============ */}
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

