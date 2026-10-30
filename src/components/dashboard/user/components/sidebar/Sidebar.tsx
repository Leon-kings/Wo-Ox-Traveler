// Sidebar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  FlightTakeoff,
  CardTravel,
  Settings,
  Logout,
  Close as CloseIcon,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Explore,
  Public,
  Hotel,
  SupportAgent,
  LocalOffer,
  TravelExplore,
  AdminPanelSettings,
  Add,
  Help,
  Notifications,
  People,
  BarChart,
  AssignmentTurnedIn,
  ContactSupport,
} from "@mui/icons-material";

/* ================= SESSION ================= */
const SESSION_KEY = "wox_user";

interface SessionUser {
  email: string;
  role: "user" | "admin";
  name: string;
}

/* ================= LOGO ================= */
const CompassLogoSVG: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="drop-shadow-lg">
    <circle cx="20" cy="20" r="18" stroke="#FFF" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
    <circle cx="20" cy="20" r="13" stroke="#FFF" strokeWidth="1" opacity="0.3" />
    <path d="M20 6 L23 17 L20 20 L17 17 Z" fill="#FFF" />
    <path d="M20 34 L17 23 L20 20 L23 23 Z" fill="#FFF" opacity="0.6" />
    <circle cx="20" cy="20" r="3" fill="#000" stroke="#FFF" strokeWidth="1.5" />
  </svg>
);

/* ================= NAV ITEM ================= */
interface NavItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  onClick?: () => void;
  badge?: string | number;
  badgeColor?: "white" | "green" | "red";
  divider?: boolean;
  section?: string;
}

/* ================= SIDEBAR PROPS ================= */
interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

/* ================= SIDEBAR COMPONENT ================= */
export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState<SessionUser | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  });

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("wox_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const sidebarRef = useRef<HTMLElement>(null);

  /* ---- Persist collapsed state ---- */
  useEffect(() => {
    try {
      localStorage.setItem("wox_sidebar_collapsed", String(collapsed));
    } catch {}
  }, [collapsed]);

  /* ---- Close on route change (mobile) ---- */
  useEffect(() => {
    if (mobileOpen && onMobileClose) onMobileClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* ---- Logout ---- */
  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  /* ---- Nav items (role-aware) ---- */
  const userNav: NavItem[] = [
    { label: "Overview", icon: <DashboardIcon fontSize="small" />, to: "/dashboard", section: "Main" },
    { label: "My Bookings", icon: <CardTravel fontSize="small" />, to: "/dashboard/bookings", badge: 3 },
    { label: "My Trips", icon: <FlightTakeoff fontSize="small" />, to: "/dashboard/trips" },

    { label: "Flights", icon: <FlightTakeoff fontSize="small" />, to: "/destinations", section: "Explore" },
    { label: "Hotels", icon: <Hotel fontSize="small" />, to: "/destinations" },
    { label: "Tour Packages", icon: <TravelExplore fontSize="small" />, to: "/packages" },
    { label: "Visa", icon: <Public fontSize="small" />, to: "/destinations" },
    { label: "Insurance", icon: <LocalOffer fontSize="small" />, to: "/destinations" },

    { label: "Notifications", icon: <Notifications fontSize="small" />, to: "/dashboard", badge: 2, badgeColor: "red", section: "Account" },
    { label: "Settings", icon: <Settings fontSize="small" />, to: "/dashboard/settings" },
    { label: "Help & Support", icon: <Help fontSize="small" />, to: "/contact" },
  ];

  const adminNav: NavItem[] = [
    { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, to: "/dashboard/admin", section: "Admin" },
    { label: "Bookings", icon: <CardTravel fontSize="small" />, to: "/dashboard/admin/bookings", badge: 12, badgeColor: "white" },
    { label: "Users", icon: <People fontSize="small" />, to: "/dashboard/admin/users" },
    { label: "Analytics", icon: <BarChart fontSize="small" />, to: "/dashboard/admin/analytics" },
    { label: "Approve Requests", icon: <AssignmentTurnedIn fontSize="small" />, to: "/dashboard/admin/approvals", badge: 4, badgeColor: "red" },

    { label: "Manage Services", icon: <TravelExplore fontSize="small" />, to: "/dashboard/admin/services", section: "Manage" },
    { label: "Destinations", icon: <Explore fontSize="small" />, to: "/dashboard/admin/destinations" },
    { label: "Settings", icon: <Settings fontSize="small" />, to: "/dashboard/admin/settings" },
  ];

  const navItems = user?.role === "admin" ? adminNav : userNav;

  /* ---- Group by section ---- */
  const grouped = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const sec = item.section || "General";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  /* ---- Active check ---- */
  const isActive = (to?: string) => {
    if (!to) return false;
    if (to === "/dashboard" || to === "/dashboard/admin") return location.pathname === to;
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  /* ---- Badge colors ---- */
  const badgeClass = (color?: NavItem["badgeColor"]) => {
    if (color === "green") return "bg-green-500 text-white";
    if (color === "red") return "bg-red-500 text-white";
    return "bg-white text-black";
  };

  /* ================= SIDEBAR CONTENT ================= */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ================= LOGO HEADER ================= */}
      <div className={`flex items-center border-b border-white/10 transition-all duration-300
        ${collapsed ? "px-3 py-4 justify-center" : "px-4 py-4 justify-between"}`}>
        <Link
          to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard"}
          className="flex items-center gap-2 group min-w-0"
        >
          <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <CompassLogoSVG size={collapsed ? 30 : 32} />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-extrabold tracking-wide text-white text-base truncate">
                Wo Ox Travel
              </span>
              <span className="text-[9px] text-white/40 font-bold tracking-[2px] mt-0.5">
                {user?.role === "admin" ? "ADMIN PANEL" : "DASHBOARD"}
              </span>
            </div>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="hidden lg:flex shrink-0 items-center justify-center w-7 h-7 rounded-md
              text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft fontSize="small" />
          </button>
        )}
      </div>

      {/* ================= USER CARD ================= */}
      {!collapsed && user && (
        <div className="px-3 pt-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                {user.role === "admin" ? <AdminPanelSettings fontSize="small" /> : <SupportAgent fontSize="small" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white font-bold text-sm truncate">{user.name}</div>
                <div className="text-white/40 text-[10px] truncate">{user.email}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-black bg-white px-1.5 py-0.5 rounded-full">
                {user.role}
              </span>
              <span className="flex items-center gap-1 text-[9px] text-green-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/[0.05] blur-md" />
          </div>
        </div>
      )}

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 sidebar-scroll">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="mb-3">
            {!collapsed && (
              <div className="px-3 mb-1.5 flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/30">
                  {section}
                </span>
                <span className="flex-1 h-[1px] bg-white/5" />
              </div>
            )}
            {collapsed && <div className="my-2 mx-3 h-[1px] bg-white/5" />}

            <div className="space-y-0.5">
              {items.map((item) => {
                const active = isActive(item.to);
                const content = (
                  <>
                    <span
                      className={`shrink-0 transition-all duration-300
                        ${active ? "text-black" : "text-white/60 group-hover:text-white group-hover:scale-110"}`}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span
                            className={`shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-bold
                              flex items-center justify-center ${badgeClass(item.badgeColor)}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge !== undefined && (
                      <span
                        className={`absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[8px] font-bold
                          flex items-center justify-center ${badgeClass(item.badgeColor)}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                );

                const cls = `group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold
                  transition-all duration-300
                  ${active
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "text-white/70 hover:bg-white/[0.07] hover:text-white hover:translate-x-0.5"
                  }
                  ${collapsed ? "justify-center" : ""}`;

                if (item.onClick) {
                  return (
                    <button key={item.label} onClick={item.onClick} className={cls} title={collapsed ? item.label : undefined}>
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.to || "#"}
                    className={cls}
                    title={collapsed ? item.label : undefined}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ================= QUICK ACTION (non-collapsed) ================= */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <Link
            to="/destinations"
            className="w-full flex items-center justify-center gap-2 text-black bg-white font-bold text-xs py-2.5 rounded-full
              transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
          >
            <Add fontSize="small" />
            Book a Trip
          </Link>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="border-t border-white/10 p-3">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60
                hover:text-white hover:bg-white/10 transition-all duration-300"
              title="Logout"
            >
              <Logout fontSize="small" />
            </button>
            <button
              onClick={() => setCollapsed(false)}
              className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg text-white/60
                hover:text-white hover:bg-white/10 transition-all duration-300"
              title="Expand sidebar"
            >
              <ChevronRight fontSize="small" />
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <Link
              to="/contact"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white
                hover:bg-white/[0.07] text-xs font-semibold transition-all duration-300"
            >
              <ContactSupport fontSize="small" />
              Contact Support
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:text-red-300
                hover:bg-red-500/10 text-xs font-semibold transition-all duration-300"
            >
              <Logout fontSize="small" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        ref={sidebarRef}
        className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-black
          border-r border-white/10 transition-all duration-300 ease-out
          ${collapsed ? "w-[72px]" : "w-[260px]"}`}
        style={{ boxShadow: "4px 0 32px rgba(255,255,255,0.03)" }}
      >
        {sidebarContent}
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <>
          <div
            onClick={onMobileClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden animate-[fadeIn_0.2s_ease-out]"
          />
          <aside
            className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-black border-r border-white/10
              lg:hidden flex flex-col animate-[slideInLeft_0.3s_ease-out]
              shadow-[8px_0_40px_rgba(0,0,0,0.6)]"
          >
            {/* Close button overlay for mobile */}
            <button
              onClick={onMobileClose}
              aria-label="Close menu"
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90"
            >
              <CloseIcon fontSize="small" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

/* ================= MOBILE SIDEBAR TOGGLE BUTTON ================= */
export const SidebarToggle: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Open sidebar"
    className="lg:hidden fixed top-20 left-4 z-40 w-10 h-10 rounded-full bg-black border border-white/20
      flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]
      transition-all duration-300 hover:bg-white hover:text-black"
  >
    <MenuIcon fontSize="small" />
  </button>
);

