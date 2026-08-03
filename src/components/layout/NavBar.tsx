import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image,
  Settings,
  Heart,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { G } from "../../constants/theme";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isLoggedIn = Boolean((user as any)?.user?.id);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      path: "/dashboard",
      label: "الرئيسية",
      Icon: LayoutDashboard,
    },
    {
      path: "/events",
      label: "الفعاليات",
      Icon: Calendar,
    },
    {
      path: "/guests",
      label: "الضيوف",
      Icon: Users,
    },
    {
      path: "/templates",
      label: "القوالب",
      Icon: Image,
    },
    {
      path: "/settings",
      label: "الإعدادات",
      Icon: Settings,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,253,247,0.92)"
          : "rgba(255,253,247,0.80)",
        backdropFilter: "blur(28px) saturate(1.5)",
        WebkitBackdropFilter: "blur(28px) saturate(1.5)",
        borderBottom: `1px solid ${
          scrolled ? G.border : "transparent"
        }`,
        boxShadow: scrolled
          ? "0 4px 24px rgba(201,162,39,0.08)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center gold-gradient shadow-gold-xs">
            <Heart
              className="w-4 h-4 text-white"
              strokeWidth={2.5}
            />
          </div>

          <span
            className="font-black text-xl"
            style={{
              color: G.charcoal,
              fontFamily: "Cairo",
              letterSpacing: "-0.5px",
            }}
          >
            دعـوة
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive(path)
                  ? `${G.gold}18`
                  : "transparent",
                color: isActive(path)
                  ? G.gold
                  : G.charcoalSoft,
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white gold-gradient shadow-gold-sm"
              >
                إنشاء حساب
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: G.beige,
                  color: G.muted,
                  border: `1px solid ${G.border}`,
                }}
              >
                تسجيل الدخول
              </button>
            </>
          ) : (
            <>
              <button
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-amber-50 transition"
                style={{
                  border: `1px solid ${G.border}`,
                }}
              >
                <Bell
                  className="w-4 h-4"
                  style={{ color: G.charcoalSoft }}
                />

                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white"
                  style={{
                    background: G.gold,
                  }}
                />
              </button>

              <div
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer hover:bg-amber-50 transition"
                style={{
                  border: `1px solid ${G.border}`,
                }}
              >
                {(user as any)?.user?.avatar && (
                  <img
                    src={(user as any).user.avatar}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                )}

                {(user as any)?.user?.name && (
                  <span
                    className="hidden sm:block text-sm font-semibold"
                    style={{ color: G.charcoal }}
                  >
                    {(user as any).user.name}
                  </span>
                )}

                <ChevronDown
                  className="w-4 h-4 hidden sm:block"
                  style={{ color: G.muted }}
                />
              </div>
            </>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl"
          >
            {open ? (
              <X
                className="w-5 h-5"
                style={{ color: G.charcoalSoft }}
              />
            ) : (
              <Menu
                className="w-5 h-5"
                style={{ color: G.charcoalSoft }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-3 space-y-1"
          style={{
            background: G.offWhite,
            borderColor: G.borderSoft,
          }}
        >
          {navItems.map(({ path, label, Icon }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive(path)
                  ? `${G.gold}18`
                  : "transparent",
                color: isActive(path)
                  ? G.gold
                  : G.charcoalSoft,
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}