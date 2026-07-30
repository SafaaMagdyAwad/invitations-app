import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Calendar, Users, Image, Settings, Heart, Bell, ChevronDown, Menu, X } from 'lucide-react'
import { G } from '../../constants/theme'
import { Page } from '../../types'
import { useNavigate } from 'react-router-dom';

export function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
const navigate=useNavigate();
  // Parse user safely
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}")
    } catch {
      return {}
    }
  }, [])

  const isLoggedIn = Boolean(user?._id)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems: { p: Page; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { p: 'dashboard', label: 'الرئيسية', Icon: LayoutDashboard },
    { p: 'events', label: 'الفعاليات', Icon: Calendar },
    { p: 'guests', label: 'الضيوف', Icon: Users },
    { p: 'templates', label: 'القوالب', Icon: Image },
    { p: 'settings', label: 'الإعدادات', Icon: Settings },
  ]

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,253,247,0.92)' : 'rgba(255,253,247,0.80)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
        borderBottom: `1px solid ${scrolled ? G.border : 'transparent'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(201,162,39,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => setPage('landing')} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center gold-gradient shadow-gold-xs">
            <Heart className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl" style={{ color: G.charcoal, fontFamily: 'Cairo', letterSpacing: '-0.5px' }}>
            دعـوة
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ p, label, Icon }) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: page === p ? `${G.gold}18` : 'transparent',
                color: page === p ? G.gold : G.charcoalSoft,
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Auth Section / User Controls */}
        <div className="flex items-center gap-2.5">
          {!isLoggedIn ? (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white gold-gradient shadow-gold-sm"
              >
                إنشاء حساب
              </button>
              <button
                onClick={() => navigate('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: G.beige, color: G.muted, border: `1px solid ${G.border}` }}
              >
                تسجيل الدخول
              </button>
            </div>
          ) : (
            <>
              {/* Notifications */}
              <button
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-amber-50"
                style={{ border: `1px solid ${G.border}` }}
              >
                <Bell className="w-4 h-4" style={{ color: G.charcoalSoft }} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: G.gold }} />
              </button>

              {/* User Profile Capsule */}
              <div
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer transition-all hover:bg-amber-50"
                style={{ border: `1px solid ${G.border}` }}
              >
                {user.avatar && (
                  <img
                    src={user.avatar}
                    className="w-7 h-7 rounded-lg object-cover"
                    alt={user.name || 'avatar'}
                  />
                )}
                {user.name && (
                  <span className="hidden sm:block text-sm font-semibold" style={{ color: G.charcoal }}>
                    {user.name}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 hidden sm:block" style={{ color: G.muted }} />
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-xl" onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-5 h-5" style={{ color: G.charcoalSoft }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: G.charcoalSoft }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: G.borderSoft, background: G.offWhite }}>
          {navItems.map(({ p, label, Icon }) => (
            <button
              key={p}
              onClick={() => {
                setPage(p)
                setOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: page === p ? `${G.gold}15` : 'transparent',
                color: page === p ? G.gold : G.charcoalSoft,
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}