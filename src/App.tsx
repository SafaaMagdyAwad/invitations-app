import { useState, useEffect, useRef } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts'
import {
  Users, CheckCircle, XCircle, Clock, QrCode, MapPin, Calendar,
  ChevronLeft, ChevronRight, Search, Filter, Upload, Download,
  MessageCircle, Pencil, Trash2, Plus, Settings, LogOut, Bell,
  Eye, Star, Crown, Flower2, Moon, Cake, GraduationCap, Briefcase,
  Check, X, Home, FileText, Mail, Lock, Heart, Menu, LayoutDashboard,
  ScanLine, Phone, ChevronDown, Share2, Bookmark, Camera,
  TrendingUp, ArrowUpRight, MoreHorizontal, Sparkles, Globe, Image,
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────────
type Page =
  | 'landing' | 'login' | 'register' | 'dashboard' | 'events'
  | 'create-event' | 'guests' | 'invitation' | 'confirm-success'
  | 'decline' | 'qr-scanner' | 'templates' | 'settings'

// ─── Palette tokens ──────────────────────────────────────────────────────────
const G = {
  gold: '#C9A227', goldLight: '#E8C84A', goldDark: '#A8841A', goldPale: '#F5EAC0',
  charcoal: '#1F2937', charcoalMid: '#374151', charcoalSoft: '#4B5563',
  beige: '#F8F5F0', beigeDeep: '#F0EAE0', offWhite: '#FFFDF7',
  muted: '#9CA3AF', border: '#E8DFC8', borderSoft: '#F0EAE0',
  success: '#10B981', successLight: '#ECFDF5',
  danger: '#EF4444', dangerLight: '#FEF2F2',
  info: '#3B82F6', infoLight: '#EFF6FF',
  warning: '#F59E0B', warningLight: '#FFFBEB',
  purple: '#8B5CF6', purpleLight: '#F5F3FF',
}

// ─── Data ────────────────────────────────────────────────────────────────────
const chartMonths = [
  { month: 'يناير', confirmed: 45, declined: 8, pending: 20 },
  { month: 'فبراير', confirmed: 88, declined: 12, pending: 32 },
  { month: 'مارس', confirmed: 130, declined: 25, pending: 48 },
  { month: 'أبريل', confirmed: 105, declined: 18, pending: 38 },
  { month: 'مايو', confirmed: 168, declined: 32, pending: 55 },
  { month: 'يونيو', confirmed: 215, declined: 44, pending: 70 },
]

const pieSlices = [
  { name: 'تأكيد', value: 65, color: G.gold },
  { name: 'رفض', value: 15, color: G.danger },
  { name: 'معلق', value: 20, color: G.muted },
]

const guestList = [
  { id: 1, name: 'أحمد محمد العمري', phone: '0501234567', status: 'confirmed', qr: 'used', checked: true },
  { id: 2, name: 'سارة عبدالله الخالدي', phone: '0559876543', status: 'confirmed', qr: 'sent', checked: false },
  { id: 3, name: 'محمد يوسف الشمري', phone: '0531112233', status: 'pending', qr: 'pending', checked: false },
  { id: 4, name: 'نورة سعد القحطاني', phone: '0567890123', status: 'declined', qr: 'none', checked: false },
  { id: 5, name: 'عبدالرحمن فهد الدوسري', phone: '0543219876', status: 'confirmed', qr: 'sent', checked: false },
  { id: 6, name: 'ريم خالد المطيري', phone: '0512345678', status: 'pending', qr: 'pending', checked: false },
  { id: 7, name: 'فيصل عمر الغامدي', phone: '0556789012', status: 'confirmed', qr: 'used', checked: true },
  { id: 8, name: 'منى ناصر الزهراني', phone: '0534567890', status: 'pending', qr: 'pending', checked: false },
  { id: 9, name: 'خالد سليمان البقمي', phone: '0548765432', status: 'confirmed', qr: 'sent', checked: false },
  { id: 10, name: 'لمياء حسن العتيبي', phone: '0522334455', status: 'declined', qr: 'none', checked: false },
]

const eventList = [
  { id: 1, name: 'حفل زفاف أحمد وسارة', date: '١٥ مارس ٢٠٢٥', time: '٧:٠٠ م', location: 'قاعة الفردوس، الرياض', guests: 250, confirmed: 180, img: 'photo-1519741497674-611481863552', tag: 'زفاف' },
  { id: 2, name: 'حفل تخرج محمد العمري', date: '٢٢ أبريل ٢٠٢٥', time: '٤:٠٠ م', location: 'فندق هيلتون، جدة', guests: 100, confirmed: 75, img: 'photo-1523050854058-8df90110c9f1', tag: 'تخرج' },
  { id: 3, name: 'عيد ميلاد نورة', date: '١٠ مايو ٢٠٢٥', time: '٦:٠٠ م', location: 'فيلا الورود، الدمام', guests: 50, confirmed: 42, img: 'photo-1464349095431-e9a21285b5f3', tag: 'عيد ميلاد' },
  { id: 4, name: 'مؤتمر شركة الابتكار', date: '٥ يونيو ٢٠٢٥', time: '٩:٠٠ ص', location: 'مركز الملك عبدالله، الرياض', guests: 500, confirmed: 320, img: 'photo-1558618666-fcd25c85cd64', tag: 'أعمال' },
]

const templateList = [
  { id: 'luxury',     name: 'زفاف فاخر',   icon: Crown,         color: G.gold,     img: 'photo-1519741497674-611481863552', h: 260 },
  { id: 'classic',   name: 'كلاسيكي',      icon: Star,          color: '#6B7280',  img: 'photo-1464366400600-7168b8af9bc3', h: 200 },
  { id: 'floral',    name: 'زهري',          icon: Flower2,       color: '#EC4899',  img: 'photo-1490750967868-88df5691a85e', h: 280 },
  { id: 'islamic',   name: 'إسلامي',        icon: Moon,          color: G.success,  img: 'photo-1580418827493-f2b22c0a76cb', h: 220 },
  { id: 'modern',    name: 'عصري',          icon: Sparkles,      color: G.info,     img: 'photo-1550305080-4e029753abcf', h: 240 },
  { id: 'birthday',  name: 'عيد ميلاد',    icon: Cake,          color: G.warning,  img: 'photo-1464349095431-e9a21285b5f3', h: 210 },
  { id: 'graduation',name: 'تخرج',          icon: GraduationCap, color: G.purple,   img: 'photo-1523050854058-8df90110c9f1', h: 250 },
  { id: 'business',  name: 'أعمال',         icon: Briefcase,     color: G.charcoal, img: 'photo-1558618666-fcd25c85cd64', h: 230 },
]

// ─── Micro-components ────────────────────────────────────────────────────────
function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, ${G.gold}80, transparent)` }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: G.gold }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${G.gold}80, transparent)` }} />
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; bg: string; color: string; dot: string }> = {
    confirmed: { label: 'مؤكد',    bg: G.successLight, color: '#065F46', dot: G.success },
    declined:  { label: 'مرفوض',   bg: G.dangerLight,  color: '#991B1B', dot: G.danger },
    pending:   { label: 'معلق',    bg: G.warningLight, color: '#92400E', dot: G.warning },
    used:      { label: 'مستخدم',  bg: G.infoLight,    color: '#1E40AF', dot: G.info },
    sent:      { label: 'مرسل',    bg: G.purpleLight,  color: '#5B21B6', dot: G.purple },
    none:      { label: 'لا يوجد', bg: '#F9FAFB',      color: '#6B7280', dot: '#D1D5DB' },
  }
  const { label, bg, color, dot } = cfg[status] ?? cfg.none
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: bg, color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  )
}

function GoldBtn({ children, onClick, className = '', small = false }: {
  children: React.ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.97] hover:scale-[1.02] shadow-gold-sm hover:shadow-gold-md ${className}`}
      style={{
        background: 'linear-gradient(135deg, #C9A227 0%, #E8C84A 45%, #B8911E 100%)',
        color: '#FFFFFF',
        borderRadius: '14px',
        padding: small ? '8px 20px' : '12px 28px',
        fontSize: small ? '13px' : '15px',
      }}
    >
      {children}
    </button>
  )
}

function OutlineBtn({ children, onClick, className = '' }: {
  children: React.ReactNode; onClick?: () => void; className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.97] hover:bg-amber-50 ${className}`}
      style={{ border: `1.5px solid ${G.gold}`, color: G.gold, borderRadius: '14px', padding: '11px 24px', fontSize: '14px', background: 'transparent' }}
    >
      {children}
    </button>
  )
}

function Card({ children, className = '', onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-gold-md' : ''} ${className}`}
      style={{ background: G.white, border: `1px solid ${G.border}` }}
    >
      {children}
    </div>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems: { p: Page; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { p: 'dashboard',    label: 'الرئيسية',  Icon: LayoutDashboard },
    { p: 'events',       label: 'الفعاليات', Icon: Calendar },
    { p: 'guests',       label: 'الضيوف',    Icon: Users },
    { p: 'templates',   label: 'القوالب',    Icon: Image },
    { p: 'settings',    label: 'الإعدادات', Icon: Settings },
  ]

  return (
    <>
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
            <span className="font-black text-xl" style={{ color: G.charcoal, fontFamily: 'Cairo', letterSpacing: '-0.5px' }}>دعـوة</span>
          </button>

          {/* Desktop nav */}
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

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-amber-50"
              style={{ border: `1px solid ${G.border}` }}
            >
              <Bell className="w-4 h-4" style={{ color: G.charcoalSoft }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: G.gold }} />
            </button>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer transition-all hover:bg-amber-50" style={{ border: `1px solid ${G.border}` }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format"
                className="w-7 h-7 rounded-lg object-cover"
                alt="avatar"
              />
              <span className="hidden sm:block text-sm font-semibold" style={{ color: G.charcoal }}>محمد</span>
              <ChevronDown className="w-3.5 h-3.5 hidden sm:block" style={{ color: G.muted }} />
            </div>
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              <Menu className="w-5 h-5" style={{ color: G.charcoalSoft }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: G.borderSoft, background: G.offWhite }}>
            {navItems.map(({ p, label, Icon }) => (
              <button
                key={p}
                onClick={() => { setPage(p); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ background: page === p ? `${G.gold}15` : 'transparent', color: page === p ? G.gold : G.charcoalSoft }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 1 — LANDING
// ──────────────────────────────────────────────────────────────────────────────
function LandingPage({ setPage }: { setPage: (p: Page) => void }) {
  const features = [
    { icon: QrCode,       title: 'رموز QR ذكية',     desc: 'رمز فريد لكل ضيف — مسح فوري عند الدخول مع تأكيد تلقائي.' },
    { icon: MessageCircle,title: 'واتساب تلقائي',    desc: 'إرسال الدعوات للجميع بنقرة واحدة مع تتبع حالة التسليم.' },
    { icon: TrendingUp,   title: 'تحليلات لحظية',   desc: 'لوحة تحكم غنية تُظهر نسب التأكيد والاعتذار والدخول.' },
    { icon: Sparkles,     title: 'قوالب فاخرة',      desc: 'أكثر من ٨ قوالب مصممة باحترافية — جاهزة للتخصيص الكامل.' },
  ]

  const steps = [
    { n: '١', title: 'أنشئ فعاليتك', desc: 'أضف التفاصيل واختر القالب المناسب في دقائق' },
    { n: '٢', title: 'أضف ضيوفك',   desc: 'استورد من Excel أو أضفهم يدوياً بسهولة' },
    { n: '٣', title: 'أرسل واستقبل', desc: 'أرسل عبر واتساب وتابع الردود فورياً' },
  ]

  const plans = [
    {
      name: 'أساسي', price: '٤٩', guests: '٥٠',  events: '١',
      features: ['قالب واحد', 'رموز QR', 'تقارير بسيطة'],
      popular: false,
    },
    {
      name: 'احترافي', price: '١٤٩', guests: '٥٠٠', events: '١٠',
      features: ['جميع القوالب', 'إرسال واتساب', 'تحليلات متقدمة', 'محفظة رقمية'],
      popular: true,
    },
    {
      name: 'مؤسسي', price: '٣٩٩', guests: 'غير محدود', events: 'غير محدود',
      features: ['شعار مخصص', 'API كامل', 'دعم أولوية', 'تقارير مفصلة'],
      popular: false,
    },
  ]

  const faqs = [
    { q: 'هل يمكنني تخصيص تصميم الدعوة بالكامل؟',   a: 'نعم، كل عنصر قابل للتعديل — الألوان والخطوط والصور والنصوص.' },
    { q: 'كيف يعمل نظام QR عند الدخول؟',             a: 'كل ضيف يتلقى رمزاً فريداً. عند المسح يتأكد الحضور تلقائياً ويُحدَّث السجل.' },
    { q: 'هل يدعم النظام اللغة العربية والـ RTL؟',   a: 'بالكامل — النظام مبني من الأساس للعربية مع تخطيط RTL أصيل.' },
    { q: 'هل يمكن إرسال الدعوات عبر واتساب؟',       a: 'نعم، بنقرة واحدة لجميع الضيوف أو لكل ضيف على حدة مع رسالة مخصصة.' },
  ]

  return (
    <div style={{ fontFamily: 'Cairo' }}>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
        style={{ background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, #E8C84A55 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A22733 0%, transparent 70%)' }} />

        {/* Floating ornament lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute pointer-events-none"
            style={{
              top: `${20 + i * 14}%`, right: `${3 + i * 6}%`,
              width: '1.5px', height: `${40 + i * 10}px`,
              background: `linear-gradient(to bottom, transparent, ${G.gold}55, transparent)`,
              transform: `rotate(${-12 + i * 4}deg)`,
            }} />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-7 anim-fade-up"
              style={{ background: `${G.gold}15`, color: G.goldDark, border: `1px solid ${G.gold}40` }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              منصة الدعوات الأولى عربياً
            </div>

            <h1 className="anim-fade-up anim-delay-1 text-5xl lg:text-6xl font-black leading-tight mb-6"
              style={{ color: G.charcoal, lineHeight: 1.18 }}>
              دعوات رقمية<br />
              <span className="gold-text">تستحق الذكرى</span>
            </h1>

            <p className="anim-fade-up anim-delay-2 text-[17px] leading-8 mb-9 max-w-[480px]" style={{ color: G.charcoalSoft }}>
              أنشئ دعواتك الإلكترونية الفاخرة، أرسلها عبر واتساب، وتابع ردود ضيوفك لحظة بلحظة مع رموز QR فريدة.
            </p>

            <div className="anim-fade-up anim-delay-3 flex flex-wrap gap-4 mb-12">
              <GoldBtn onClick={() => setPage('register')}>
                <Sparkles className="w-4 h-4" />
                ابدأ إنشاء دعوتك
              </GoldBtn>
              <OutlineBtn onClick={() => setPage('invitation')}>
                <Eye className="w-4 h-4" />
                شاهد مثالاً
              </OutlineBtn>
            </div>

            <div className="anim-fade-up anim-delay-4 flex items-center gap-8">
              {[['٥٠٠٠+', 'دعوة مرسلة'], ['٩٨٪', 'رضا العملاء'], ['٨+', 'قوالب فاخرة']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black" style={{ color: G.gold }}>{n}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: G.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: invitation mockup */}
          <div className="hidden lg:flex justify-center anim-float">
            <div className="relative w-[300px]">
              {/* Main card */}
              <div
                className="rounded-[28px] overflow-hidden shadow-gold-lg"
                style={{ border: `2px solid ${G.gold}55`, background: G.offWhite }}
              >
                {/* Card header */}
                <div className="h-14 flex items-center justify-center relative gold-gradient">
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <span className="relative font-bold text-white text-sm tracking-wide">دعوة زواج مبارك</span>
                </div>

                {/* Photo */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=280&fit=crop&auto=format"
                    alt="wedding"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.5) 0%, transparent 55%)' }} />
                </div>

                {/* Card body */}
                <div className="px-6 py-5 text-center">
                  <p className="text-xs mb-2" style={{ color: G.muted }}>يتشرف بدعوتكم الكريمة</p>
                  <h3 className="text-2xl font-black mb-0.5" style={{ color: G.charcoal }}>أحمد وسارة</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: G.gold }}>لحضور حفل زفافهم المبارك</p>

                  <Divider className="mb-4" />

                  <div className="space-y-2 text-sm text-right mb-5">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: G.beige }}>
                      <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: G.gold }} />
                      <span style={{ color: G.charcoal }}>السبت ١٥ مارس ٢٠٢٥ — ٧:٠٠ م</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: G.beige }}>
                      <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: G.gold }} />
                      <span style={{ color: G.charcoal }}>قاعة الفردوس، الرياض</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button className="flex-1 py-3 rounded-2xl text-sm font-bold text-white gold-gradient shadow-gold-sm">
                      ✓ تأكيد الحضور
                    </button>
                    <button className="flex-1 py-3 rounded-2xl text-sm font-semibold" style={{ background: G.beige, color: G.muted, border: `1px solid ${G.border}` }}>
                      اعتذار
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -top-5 -right-6 px-3.5 py-2.5 rounded-2xl glass shadow-gold-md flex items-center gap-2"
                style={{ border: `1px solid ${G.gold}40` }}>
                <QrCode className="w-5 h-5" style={{ color: G.gold }} />
                <span className="text-xs font-bold" style={{ color: G.charcoal }}>QR جاهز</span>
              </div>

              <div className="absolute -bottom-5 -left-6 px-3.5 py-2.5 rounded-2xl glass shadow-gold-md"
                style={{ border: `1px solid ${G.gold}40` }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: G.success }}>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: G.charcoal }}>١٨٠ تأكيد</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: `${G.gold}50` }}>
            <div className="w-1 h-2 rounded-full" style={{ background: G.gold, animation: 'float 1.4s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 px-6" style={{ background: G.white }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>المميزات</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: G.charcoal }}>كل ما تحتاجه في مكان واحد</h2>
            <p style={{ color: G.charcoalSoft }}>منصة متكاملة لإدارة مناسباتك بأعلى مستوى من الاحتراف</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="p-6 rounded-2xl group transition-all hover:-translate-y-1.5 hover:shadow-gold-md"
                style={{ background: G.beige, border: `1px solid ${G.border}` }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{ background: `${G.gold}18` }}>
                  <Icon className="w-6 h-6" style={{ color: G.gold }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: G.charcoal }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: G.charcoalSoft }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates preview ── */}
      <section className="py-28 px-6" style={{ background: G.beige }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>القوالب</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: G.charcoal }}>قوالب فاخرة لكل مناسبة</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateList.slice(0, 4).map(({ id, name, icon: Icon, color, img }) => (
              <div
                key={id}
                onClick={() => setPage('templates')}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-gold-md"
                style={{ border: `1.5px solid ${G.border}` }}
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={`https://images.unsplash.com/${img}?w=400&h=200&fit=crop&auto=format`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${color}30` }} />
                </div>
                <div className="p-4 flex items-center gap-3" style={{ background: G.white }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span className="font-bold text-sm" style={{ color: G.charcoal }}>{name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <OutlineBtn onClick={() => setPage('templates')}>
              <Eye className="w-4 h-4" />
              عرض جميع القوالب
            </OutlineBtn>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 px-6" style={{ background: G.white }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>الخطوات</p>
            <h2 className="text-4xl font-black" style={{ color: G.charcoal }}>ثلاث خطوات فقط</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-10 right-[16.5%] left-[16.5%] h-0.5"
              style={{ background: `linear-gradient(to left, transparent, ${G.gold}55, transparent)` }} />
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 gold-gradient shadow-gold-md"
                >
                  {n}
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: G.charcoal }}>{title}</h3>
                <p className="text-sm leading-7" style={{ color: G.charcoalSoft }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-28 px-6" style={{ background: G.beige }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>الأسعار</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: G.charcoal }}>خطط تناسب كل احتياج</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="p-8 rounded-2xl relative transition-all hover:-translate-y-1 hover:shadow-gold-lg"
                style={{
                  background: plan.popular ? G.charcoal : G.white,
                  border: plan.popular ? `2px solid ${G.gold}` : `1px solid ${G.border}`,
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-charcoal shadow-gold-sm gold-gradient whitespace-nowrap"
                    style={{ color: G.charcoal }}>
                    ⭐ الأكثر شيوعاً
                  </div>
                )}
                <h3 className="font-black text-xl mb-1" style={{ color: plan.popular ? G.gold : G.charcoal }}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-5xl font-black" style={{ color: plan.popular ? G.white : G.charcoal }}>{plan.price}</span>
                  <span className="text-sm pb-1.5" style={{ color: plan.popular ? `${G.white}80` : G.muted }}>ر.س/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm" style={{ color: plan.popular ? '#D1D5DB' : G.charcoalSoft }}>
                    <Users className="w-3.5 h-3.5" style={{ color: G.gold }} />
                    حتى {plan.guests} ضيف
                  </li>
                  <li className="flex items-center gap-2 text-sm" style={{ color: plan.popular ? '#D1D5DB' : G.charcoalSoft }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color: G.gold }} />
                    {plan.events} فعالية
                  </li>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: plan.popular ? '#D1D5DB' : G.charcoalSoft }}>
                      <Check className="w-3.5 h-3.5" style={{ color: G.gold }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPage('register')}
                  className="w-full py-3.5 rounded-2xl font-bold transition-all hover:scale-[1.02]"
                  style={{
                    background: plan.popular ? 'linear-gradient(135deg, #C9A227, #E8C84A)' : 'transparent',
                    color: plan.popular ? G.charcoal : G.gold,
                    border: plan.popular ? 'none' : `2px solid ${G.gold}`,
                  }}
                >
                  ابدأ الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-6" style={{ background: G.white }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>الأسئلة الشائعة</p>
            <h2 className="text-4xl font-black" style={{ color: G.charcoal }}>لديك سؤال؟</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6" style={{ background: G.charcoal }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">جاهز لإنشاء دعوتك الأولى؟</h2>
          <p className="mb-8 text-lg" style={{ color: `${G.white}70` }}>انضم لآلاف العملاء الذين يثقون في دعوة لأفضل مناسباتهم</p>
          <GoldBtn onClick={() => setPage('register')} className="text-lg px-10 py-4">
            <Sparkles className="w-5 h-5" />
            ابدأ مجاناً الآن
          </GoldBtn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6" style={{ background: '#111827', borderTop: `1px solid ${G.charcoal}` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gold-gradient flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl text-white">دعـوة</span>
          </div>
          <p className="text-sm" style={{ color: '#6B7280' }}>© ٢٠٢٥ دعوة — جميع الحقوق محفوظة</p>
          <div className="flex gap-6 text-sm" style={{ color: '#6B7280' }}>
            {['الخصوصية', 'الشروط', 'تواصل معنا'].map((l) => (
              <a key={l} href="#" className="hover:text-amber-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{ border: `1px solid ${open ? G.gold + '60' : G.border}`, background: open ? `${G.gold}08` : G.white }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-right"
      >
        <span className="font-semibold text-sm" style={{ color: G.charcoal }}>{q}</span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{ color: G.gold, transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 anim-fade-in">
          <p className="text-sm leading-7" style={{ color: G.charcoalSoft }}>{a}</p>
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 2 — AUTH
// ──────────────────────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage }: { mode: 'login' | 'register'; setPage: (p: Page) => void }) {
  const [tab, setTab] = useState<'login' | 'register'>(mode)

  const fields =
    tab === 'register'
      ? [
          { label: 'الاسم الكامل', type: 'text', ph: 'محمد أحمد العمري', icon: Users },
          { label: 'البريد الإلكتروني', type: 'email', ph: 'example@email.com', icon: Mail },
          { label: 'رقم الهاتف', type: 'tel', ph: '05xxxxxxxx', icon: Phone },
          { label: 'كلمة المرور', type: 'password', ph: '••••••••', icon: Lock },
        ]
      : [
          { label: 'البريد الإلكتروني', type: 'email', ph: 'example@email.com', icon: Mail },
          { label: 'كلمة المرور', type: 'password', ph: '••••••••', icon: Lock },
        ]

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Cairo' }}>
      {/* Left: photo */}
      <div className="hidden lg:block w-[42%] relative overflow-hidden" style={{ background: G.charcoal }}>
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=1200&fit=crop&auto=format"
          alt="wedding"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.3) 100%)' }} />
        <div className="relative h-full flex flex-col justify-between p-14">
          <button onClick={() => setPage('landing')} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl text-white">دعـوة</span>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white mb-5 leading-tight">
              اجعل مناسباتك<br /><span className="gold-text">لا تُنسى أبداً</span>
            </h2>
            <p className="text-lg leading-8" style={{ color: `${G.white}65` }}>
              دعوات رقمية فاخرة، رموز QR ذكية،<br />وإرسال واتساب تلقائي في منصة واحدة.
            </p>
          </div>
          <div className="flex -space-x-3 rtl:space-x-reverse">
            {['photo-1507003211169-0a1dd7228f2d', 'photo-1494790108377-be9c29b29330', 'photo-1500648767791-00dcc994a43e', 'photo-1438761681033-6461ffad8d80'].map((id) => (
              <img key={id} src={`https://images.unsplash.com/${id}?w=48&h=48&fit=crop&auto=format`}
                className="w-10 h-10 rounded-full border-2" style={{ borderColor: G.charcoal }} alt="" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: G.charcoal, background: G.gold, color: G.charcoal }}>+٤٩</div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto" style={{ background: G.offWhite }}>
        <div className="w-full max-w-[420px] anim-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2" style={{ color: G.charcoal }}>
              {tab === 'login' ? 'أهلاً بعودتك 👋' : 'انضم إلينا ✨'}
            </h1>
            <p style={{ color: G.muted }}>{tab === 'login' ? 'سجل دخولك للمتابعة' : 'أنشئ حسابك مجاناً في دقيقة'}</p>
          </div>

          {/* Tab toggle */}
          <div className="flex p-1 rounded-2xl mb-8" style={{ background: G.beigeDeep }}>
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: tab === t ? G.white : 'transparent',
                  color: tab === t ? G.gold : G.muted,
                  boxShadow: tab === t ? '0 2px 10px rgba(0,0,0,0.07)' : 'none',
                }}
              >
                {t === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
              </button>
            ))}
          </div>

          {/* Social */}
          <button className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm mb-6 transition-all hover:shadow-gold-xs"
            style={{ background: G.white, border: `1.5px solid ${G.border}`, color: G.charcoal }}>
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
            المتابعة مع Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: G.border }} />
            <span className="text-xs" style={{ color: G.muted }}>أو بالبريد الإلكتروني</span>
            <div className="flex-1 h-px" style={{ background: G.border }} />
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-6">
            {fields.map(({ label, type, ph, icon: Icon }) => (
              <div key={label}>
                <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>{label}</label>
                <div className="relative">
                  <Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
                  <input
                    type={type}
                    placeholder={ph}
                    className="w-full px-4 py-3.5 pe-11 rounded-2xl text-sm transition-all"
                    style={{ background: G.white, border: `1.5px solid ${G.border}`, color: G.charcoal }}
                  />
                </div>
              </div>
            ))}
          </div>

          {tab === 'login' && (
            <div className="text-left mb-6">
              <a href="#" className="text-sm font-semibold" style={{ color: G.gold }}>نسيت كلمة المرور؟</a>
            </div>
          )}

          <GoldBtn onClick={() => setPage('dashboard')} className="w-full py-4 text-base rounded-2xl">
            {tab === 'login' ? 'دخول' : 'إنشاء الحساب'}
          </GoldBtn>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 3 — DASHBOARD
// ──────────────────────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { label: 'إجمالي الضيوف', value: '٢٥٠', icon: Users,       color: G.info,    bg: G.infoLight,    change: '+١٢', up: true },
    { label: 'تأكيد الحضور', value: '١٨٠', icon: CheckCircle, color: G.success,  bg: G.successLight, change: '+٨',  up: true },
    { label: 'الاعتذار',     value: '٢٨',  icon: XCircle,    color: G.danger,   bg: G.dangerLight,  change: '+٢',  up: false },
    { label: 'معلق',         value: '٤٢',  icon: Clock,      color: G.warning,  bg: G.warningLight, change: '-٥',  up: true },
    { label: 'تم تسجيل الدخول', value: '١٢٠', icon: ScanLine, color: G.purple,  bg: G.purpleLight,  change: '+٢٤', up: true },
  ]

  const quickActions = [
    { label: 'فعالية جديدة', icon: Plus,         page: 'create-event' as Page, gold: true },
    { label: 'مسح QR',       icon: QrCode,       page: 'qr-scanner'   as Page, gold: false },
    { label: 'القوالب',      icon: Image,        page: 'templates'    as Page, gold: false },
    { label: 'الضيوف',       icon: Users,        page: 'guests'       as Page, gold: false },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="px-4 py-3 rounded-2xl shadow-gold-md" style={{ background: G.charcoal, border: `1px solid ${G.gold}40` }}>
        <p className="text-xs font-bold mb-2" style={{ color: G.gold }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: `${G.white}80` }}>{p.name}:</span>
            <span className="font-bold text-white">{p.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ color: G.charcoal }}>مرحباً، محمد 👋</h1>
            <p className="text-sm" style={{ color: G.muted }}>إليك ملخص أحدث فعاليتك — حفل زفاف أحمد وسارة</p>
          </div>
          <div className="hidden sm:flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-amber-50"
              style={{ border: `1.5px solid ${G.border}`, color: G.charcoalSoft, background: G.white }}>
              <Download className="w-4 h-4" />
              تصدير
            </button>
            <GoldBtn onClick={() => setPage('create-event')} small>
              <Plus className="w-4 h-4" />
              فعالية جديدة
            </GoldBtn>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, change, up }) => (
            <Card key={label} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: up ? G.successLight : G.dangerLight, color: up ? '#065F46' : '#991B1B' }}
                >
                  {up ? <ArrowUpRight className="w-3 h-3" /> : null}
                  {change}
                </span>
              </div>
              <div className="text-2xl font-black mb-0.5" style={{ color: G.charcoal }}>{value}</div>
              <div className="text-xs font-medium" style={{ color: G.muted }}>{label}</div>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Area chart */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg" style={{ color: G.charcoal }}>إحصائيات الردود</h3>
              <div className="flex gap-4 text-xs">
                {[['مؤكد', G.gold], ['معلق', G.success]].map(([n, c]) => (
                  <div key={n} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    <span style={{ color: G.muted }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartMonths} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={G.gold}    stopOpacity={0.28} />
                    <stop offset="95%" stopColor={G.gold}    stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={G.success} stopOpacity={0.22} />
                    <stop offset="95%" stopColor={G.success} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo', fill: G.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo', fill: G.muted }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="confirmed" name="مؤكد"  stroke={G.gold}    strokeWidth={2.5} fill="url(#areaGold)" />
                <Area type="monotone" dataKey="pending"   name="معلق"  stroke={G.success} strokeWidth={2.5} fill="url(#areaGreen)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-5" style={{ color: G.charcoal }}>توزيع الردود</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieSlices} cx="50%" cy="50%" innerRadius={52} outerRadius={75} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieSlices.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: '12px', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-2">
              {pieSlices.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-sm" style={{ color: G.charcoalSoft }}>{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full" style={{ background: G.beigeDeep }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${value}%`, background: color }} />
                    </div>
                    <span className="text-sm font-bold w-8 text-left" style={{ color: G.charcoal }}>{value}٪</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-5" style={{ color: G.charcoal }}>إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ label, icon: Icon, page: p, gold }) => (
                <button
                  key={label}
                  onClick={() => setPage(p)}
                  className="p-4 rounded-2xl flex flex-col items-center gap-2.5 text-center transition-all hover:-translate-y-0.5 hover:shadow-gold-sm"
                  style={{ background: gold ? `${G.gold}12` : G.beige, border: `1px solid ${gold ? G.gold + '40' : G.borderSoft}` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}20` }}>
                    <Icon className="w-5 h-5" style={{ color: G.gold }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: G.charcoalMid }}>{label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Recent events */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg" style={{ color: G.charcoal }}>الفعاليات الأخيرة</h3>
              <button onClick={() => setPage('events')} className="text-sm font-semibold" style={{ color: G.gold }}>عرض الكل</button>
            </div>
            <div className="space-y-3">
              {eventList.slice(0, 3).map((ev) => {
                const pct = Math.round((ev.confirmed / ev.guests) * 100)
                return (
                  <div
                    key={ev.id}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-gold-xs cursor-pointer"
                    style={{ background: G.beige, border: `1px solid ${G.borderSoft}` }}
                    onClick={() => setPage('events')}
                  >
                    <img
                      src={`https://images.unsplash.com/${ev.img}?w=100&h=100&fit=crop&auto=format`}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      alt={ev.name}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: G.charcoal }}>{ev.name}</div>
                      <div className="text-xs mt-0.5 mb-2" style={{ color: G.muted }}>{ev.date} • {ev.location}</div>
                      <div className="h-1.5 rounded-full" style={{ background: G.beigeDeep }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(to left, #C9A227, #E8C84A)' }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-sm" style={{ color: G.gold }}>{pct}٪</div>
                      <div className="text-xs" style={{ color: G.muted }}>تأكيد</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 4 — EVENTS LIST
// ──────────────────────────────────────────────────────────────────────────────
function EventsList({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState('')
  const filtered = eventList.filter(e => e.name.includes(search) || e.location.includes(search))

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>فعالياتي</h1>
            <p className="text-sm mt-1" style={{ color: G.muted }}>{eventList.length} فعاليات مسجلة</p>
          </div>
          <GoldBtn onClick={() => setPage('create-event')} small>
            <Plus className="w-4 h-4" />
            فعالية جديدة
          </GoldBtn>
        </div>

        <div className="flex flex-wrap gap-3 mb-7">
          <div className="flex-1 min-w-60 relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو الموقع..."
              className="w-full px-4 py-3 pe-11 rounded-2xl text-sm"
              style={{ background: G.white, border: `1.5px solid ${G.border}` }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: G.white, border: `1.5px solid ${G.border}`, color: G.charcoalSoft }}>
            <Filter className="w-4 h-4" />
            تصفية
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((ev) => {
            const pct = Math.round((ev.confirmed / ev.guests) * 100)
            return (
              <Card key={ev.id} className="overflow-hidden" onClick={() => setPage('guests')}>
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${ev.img}?w=800&h=320&fit=crop&auto=format`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    alt={ev.name}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.7) 0%, transparent 55%)' }} />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: `${G.gold}ee`, color: G.charcoal }}>{ev.tag}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="font-black text-lg text-white">{ev.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: G.muted }}>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span style={{ color: G.charcoalSoft }}>نسبة التأكيد</span>
                      <span className="font-bold" style={{ color: G.gold }}>{pct}٪ ({ev.confirmed}/{ev.guests})</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: G.beigeDeep }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(to left, #C9A227, #E8C84A)' }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setPage('guests') }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-amber-50"
                      style={{ border: `1.5px solid ${G.border}`, color: G.charcoalSoft }}>
                      الضيوف
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setPage('invitation') }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #C9A227, #E8C84A)' }}>
                      الدعوة
                    </button>
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ border: `1.5px solid ${G.border}` }}>
                      <MoreHorizontal className="w-4 h-4" style={{ color: G.muted }} />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 5 — CREATE EVENT (WIZARD)
// ──────────────────────────────────────────────────────────────────────────────
function CreateEvent({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1)
  const [selectedTpl, setSelectedTpl] = useState<string | null>(null)
  const TOTAL = 4
  const stepLabels = ['تفاصيل الفعالية', 'قالب الدعوة', 'التصميم المخصص', 'مراجعة وحفظ']

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => setPage('events')} className="flex items-center gap-2 text-sm font-semibold mb-8 transition-all hover:gap-3"
          style={{ color: G.muted }}>
          <ChevronRight className="w-4 h-4" />
          العودة للفعاليات
        </button>

        <h1 className="text-3xl font-black mb-8" style={{ color: G.charcoal }}>إنشاء فعالية جديدة</h1>

        {/* Stepper */}
        <div className="flex items-start mb-10">
          {stepLabels.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-2 relative">
                {/* line */}
                {i < TOTAL - 1 && (
                  <div className="absolute top-4 right-[50%] left-[-50%] h-0.5 -translate-y-0" style={{ background: done ? G.gold : G.border }} />
                )}
                {/* circle */}
                <div
                  className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all"
                  style={{
                    background: done ? G.gold : active ? G.charcoal : G.white,
                    color: done || active ? G.white : G.muted,
                    border: `2px solid ${done ? G.gold : active ? G.charcoal : G.border}`,
                  }}
                >
                  {done ? <Check className="w-4 h-4" strokeWidth={3} /> : n}
                </div>
                <span className="text-xs text-center leading-tight hidden sm:block"
                  style={{ color: active ? G.gold : done ? G.charcoalSoft : G.muted, fontWeight: active ? 700 : 400 }}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <Card className="p-8">
          {step === 1 && (
            <div className="anim-fade-up">
              <h2 className="text-xl font-bold mb-6" style={{ color: G.charcoal }}>تفاصيل الفعالية</h2>
              <div className="space-y-5">
                {[
                  { label: 'اسم الفعالية', type: 'text', ph: 'مثال: حفل زفاف أحمد وسارة', span: 2 },
                  { label: 'التاريخ', type: 'date', ph: '', span: 1 },
                  { label: 'الوقت', type: 'time', ph: '', span: 1 },
                  { label: 'الموقع', type: 'text', ph: 'اسم القاعة والمدينة', span: 2 },
                  { label: 'رابط خرائط Google', type: 'url', ph: 'https://maps.google.com/...', span: 2 },
                ].map(({ label, type, ph }) => (
                  <div key={label}>
                    <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>{label}</label>
                    <input type={type} placeholder={ph} className="w-full px-4 py-3.5 rounded-2xl text-sm"
                      style={{ background: G.beige, border: `1.5px solid ${G.border}` }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="anim-fade-up">
              <h2 className="text-xl font-bold mb-6" style={{ color: G.charcoal }}>اختر قالب الدعوة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {templateList.map(({ id, name, icon: Icon, color, img }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTpl(id)}
                    className="rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
                    style={{
                      border: selectedTpl === id ? `2px solid ${color}` : `1.5px solid ${G.border}`,
                      boxShadow: selectedTpl === id ? `0 0 0 4px ${color}20` : 'none',
                    }}
                  >
                    <div className="h-24 overflow-hidden relative">
                      <img src={`https://images.unsplash.com/${img}?w=300&h=150&fit=crop&auto=format`} alt={name} className="w-full h-full object-cover" />
                      {selectedTpl === id && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${color}55` }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: color }}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex items-center gap-2" style={{ background: G.white }}>
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                      <span className="text-xs font-semibold" style={{ color: G.charcoal }}>{name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="anim-fade-up">
              <h2 className="text-xl font-bold mb-2" style={{ color: G.charcoal }}>رفع تصميم مخصص</h2>
              <p className="text-sm mb-6" style={{ color: G.muted }}>اختياري — يمكنك تخطي هذه الخطوة واستخدام القالب المحدد</p>
              <div
                className="border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all hover:border-amber-400 hover:bg-amber-50"
                style={{ borderColor: G.border }}
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${G.gold}15` }}>
                  <Upload className="w-8 h-8" style={{ color: G.gold }} />
                </div>
                <p className="font-bold mb-1" style={{ color: G.charcoal }}>اسحب وأفلت الملف هنا</p>
                <p className="text-sm mb-4" style={{ color: G.muted }}>PNG, JPG, PDF — حتى ١٠ ميجابايت</p>
                <button className="px-6 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ background: `${G.gold}15`, color: G.gold, border: `1px solid ${G.gold}40` }}>
                  اختر ملفاً
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 anim-scale-in">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 gold-gradient shadow-gold-lg anim-success">
                <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black mb-3" style={{ color: G.charcoal }}>الفعالية جاهزة! 🎉</h2>
              <p className="mb-8 leading-7" style={{ color: G.muted }}>
                تم إنشاء فعاليتك بنجاح.<br />يمكنك الآن إضافة الضيوف وإرسال الدعوات.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <GoldBtn onClick={() => setPage('guests')}>
                  <Users className="w-4 h-4" />
                  إضافة الضيوف
                </GoldBtn>
                <OutlineBtn onClick={() => setPage('invitation')}>
                  <Eye className="w-4 h-4" />
                  معاينة الدعوة
                </OutlineBtn>
              </div>
            </div>
          )}
        </Card>

        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white"
              style={{ color: G.muted, visibility: step === 1 ? 'hidden' : 'visible' }}
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>
            <GoldBtn onClick={() => setStep(Math.min(step + 1, TOTAL))} small>
              {step === 3 ? 'حفظ الفعالية' : 'التالي'}
              <ChevronLeft className="w-4 h-4" />
            </GoldBtn>
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 6 — GUESTS MANAGEMENT
// ──────────────────────────────────────────────────────────────────────────────
function GuestsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = guestList.filter(g =>
    (filter === 'all' || g.status === filter) &&
    (g.name.includes(search) || g.phone.includes(search))
  )

  const filterBtns = [
    { key: 'all', label: 'الكل', count: guestList.length },
    { key: 'confirmed', label: 'مؤكد', count: guestList.filter(g => g.status === 'confirmed').length },
    { key: 'pending',   label: 'معلق', count: guestList.filter(g => g.status === 'pending').length },
    { key: 'declined',  label: 'مرفوض', count: guestList.filter(g => g.status === 'declined').length },
  ]

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>إدارة الضيوف</h1>
            <p className="text-sm mt-1" style={{ color: G.muted }}>حفل زفاف أحمد وسارة — {guestList.length} ضيف</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ border: `1.5px solid ${G.border}`, color: G.charcoalSoft, background: G.white }}>
              <Upload className="w-4 h-4" />رفع Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ border: `1.5px solid ${G.border}`, color: G.charcoalSoft, background: G.white }}>
              <Download className="w-4 h-4" />تصدير
            </button>
            <GoldBtn small>
              <Plus className="w-4 h-4" />إضافة ضيف
            </GoldBtn>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو رقم الهاتف..."
              className="w-full px-4 py-3 pe-11 rounded-2xl text-sm"
              style={{ background: G.white, border: `1.5px solid ${G.border}` }}
            />
          </div>
          {filterBtns.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: filter === key ? G.charcoal : G.white,
                color: filter === key ? G.gold : G.charcoalSoft,
                border: `1.5px solid ${filter === key ? G.charcoal : G.border}`,
              }}
            >
              {label}
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: filter === key ? `${G.gold}30` : G.beige, color: filter === key ? G.gold : G.muted }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: G.beige, borderBottom: `1px solid ${G.border}` }}>
                  {['الاسم', 'رقم الهاتف', 'الحالة', 'رمز QR', 'الإجراءات'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-right text-xs font-bold" style={{ color: G.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((g, i) => (
                  <tr
                    key={g.id}
                    className="transition-colors hover:bg-amber-50/30"
                    style={{ background: i % 2 === 0 ? G.white : `${G.beige}60`, borderBottom: `1px solid ${G.borderSoft}` }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${G.gold}, ${G.goldLight})` }}
                        >
                          {g.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm" style={{ color: G.charcoal }}>{g.name}</div>
                          {g.checked && <div className="text-xs mt-0.5" style={{ color: G.success }}>✓ تم تسجيل الدخول</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: G.muted, direction: 'ltr', textAlign: 'right' }}>{g.phone}</td>
                    <td className="px-5 py-4"><Badge status={g.status} /></td>
                    <td className="px-5 py-4"><Badge status={g.qr} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-green-50 hover:scale-110" title="إرسال واتساب">
                          <MessageCircle className="w-4 h-4" style={{ color: '#25D366' }} />
                        </button>
                        <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-blue-50 hover:scale-110" title="تعديل">
                          <Pencil className="w-4 h-4" style={{ color: G.info }} />
                        </button>
                        <button className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-red-50 hover:scale-110" title="حذف">
                          <Trash2 className="w-4 h-4" style={{ color: G.danger }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderTop: `1px solid ${G.border}`, background: G.beige }}>
            <span className="text-sm" style={{ color: G.muted }}>عرض {filtered.length} من {guestList.length} ضيف</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className="w-8 h-8 rounded-xl text-sm font-semibold" style={{ background: p === 1 ? G.charcoal : G.white, color: p === 1 ? G.gold : G.muted, border: `1px solid ${G.border}` }}>{p}</button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 7 — INVITATION PAGE
// ──────────────────────────────────────────────────────────────────────────────
function InvitationPage({ setPage }: { setPage: (p: Page) => void }) {
  const [answered, setAnswered] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg, #111827 0%, #1F2937 50%, #0F172A 100%)', fontFamily: 'Cairo' }}
    >
      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)' }} />
      <div className="fixed bottom-0 left-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-sm anim-scale-in">
        {/* Card */}
        <div className="rounded-[28px] overflow-hidden shadow-gold-lg" style={{ border: `2px solid ${G.gold}50`, background: G.offWhite }}>

          {/* Hero image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=400&fit=crop&auto=format"
              alt="wedding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,253,247,1) 0%, rgba(255,253,247,0) 60%)' }} />
            {/* Top ribbon */}
            <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-center gold-gradient">
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
              <span className="relative text-white text-xs font-bold tracking-[4px]">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-7 pb-8 text-center -mt-4">
            <p className="text-xs font-medium mb-3" style={{ color: G.muted }}>يتشرفان بدعوتكم الكريمة</p>

            <h1 className="text-3xl font-black mb-0.5" style={{ color: G.charcoal }}>أحمد محمد</h1>
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="flex-1 h-px" style={{ background: `${G.gold}50` }} />
              <Heart className="w-4 h-4" style={{ color: G.gold }} fill={G.gold} />
              <div className="flex-1 h-px" style={{ background: `${G.gold}50` }} />
            </div>
            <h2 className="text-2xl font-black mb-1" style={{ color: G.gold }}>سارة عبدالله</h2>
            <p className="text-sm mb-5" style={{ color: G.charcoalSoft }}>لحضور حفل زفافهم المبارك</p>

            <Divider className="mb-5" />

            <div className="space-y-2.5 mb-5 text-right">
              {[
                { icon: Calendar, text: 'السبت ١٥ مارس ٢٠٢٥ — ٧:٠٠ مساءً' },
                { icon: MapPin,   text: 'قاعة الفردوس، طريق الملك عبدالله، الرياض' },
                { icon: Phone,    text: 'للاستفسار: 0501234567' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: G.beige }}>
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: G.gold }} />
                  <span className="text-sm leading-relaxed" style={{ color: G.charcoal }}>{text}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3 rounded-2xl text-sm font-bold mb-5" style={{ background: `${G.gold}15`, color: G.gold, border: `1px solid ${G.gold}40` }}>
              <Globe className="w-4 h-4 inline ml-2" />
              فتح الموقع على الخريطة
            </button>

            <Divider className="mb-5" />

            <p className="text-sm font-bold mb-4" style={{ color: G.charcoalMid }}>هل ستشرّفنا بحضوركم الكريم؟</p>

            <div className="flex gap-3">
              <button
                onClick={() => { setAnswered(true); setTimeout(() => setPage('confirm-success'), 300) }}
                className="flex-1 py-4 rounded-2xl font-black text-sm text-charcoal gold-gradient shadow-gold-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ color: G.charcoal }}
              >
                ✓ تأكيد الحضور
              </button>
              <button
                onClick={() => setPage('decline')}
                className="flex-1 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-gray-100"
                style={{ background: '#F3F4F6', color: '#6B7280', border: `1px solid ${G.border}` }}
              >
                ✕ اعتذار
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: `${G.white}30` }}>
          مشغّل بواسطة <span style={{ color: G.gold }}>دعـوة</span> — منصة الدعوات الإلكترونية
        </p>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 8 — CONFIRMATION SUCCESS
// ──────────────────────────────────────────────────────────────────────────────
function ConfirmSuccess({ setPage }: { setPage: (p: Page) => void }) {
  // Generate a simple QR-like pattern
  const qrCells = Array.from({ length: 100 }, (_, i) => {
    const row = Math.floor(i / 10), col = i % 10
    const corner = (row < 3 && col < 3) || (row < 3 && col > 6) || (row > 6 && col < 3)
    return corner || Math.random() > 0.48
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(160deg, #111827 0%, #1F2937 100%)', fontFamily: 'Cairo' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(201,162,39,0.07) 0%, transparent 60%)' }} />

      <div className="w-full max-w-sm anim-scale-in">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full flex items-center justify-center gold-gradient shadow-gold-lg anim-success pulse-ring mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mt-5 mb-2">تم التأكيد! 🎊</h1>
          <p style={{ color: `${G.white}60` }}>يسعدنا تشريفك. إليك تذكرة دخولك</p>
        </div>

        {/* Ticket */}
        <div className="rounded-3xl overflow-hidden shadow-gold-lg" style={{ border: `2px solid ${G.gold}50` }}>
          {/* Ticket header */}
          <div className="gold-gradient p-5 text-center relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
            <p className="relative text-xs font-semibold mb-0.5" style={{ color: `${G.charcoal}bb` }}>تذكرة دخول</p>
            <h2 className="relative font-black text-xl" style={{ color: G.charcoal }}>حفل زفاف أحمد وسارة</h2>
          </div>

          {/* Ticket body */}
          <div className="p-6" style={{ background: G.offWhite }}>
            {/* QR */}
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-2xl" style={{ background: G.white, border: `1px solid ${G.border}` }}>
                <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(10, 18px)' }}>
                  {qrCells.map((filled, i) => (
                    <div key={i} className="rounded-sm" style={{ width: 18, height: 18, background: filled ? G.charcoal : G.white }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mb-5">
              <p className="text-xs mb-0.5" style={{ color: G.muted }}>اسم الضيف</p>
              <p className="font-black text-xl" style={{ color: G.charcoal }}>أحمد محمد العمري</p>
            </div>

            <Divider className="mb-5" />

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[['التاريخ', 'السبت ١٥ مارس'], ['الوقت', '٧:٠٠ مساءً'], ['المكان', 'قاعة الفردوس'], ['رقم التذكرة', 'INV-2025-0415']].map(([label, val]) => (
                <div key={label} className="p-3 rounded-xl text-center" style={{ background: G.beige }}>
                  <p className="text-xs mb-0.5" style={{ color: G.muted }}>{label}</p>
                  <p className="font-bold text-sm" style={{ color: G.charcoal }}>{val}</p>
                </div>
              ))}
            </div>

            <GoldBtn className="w-full py-3.5 rounded-2xl mb-3">
              <Download className="w-4 h-4" />
              تنزيل التذكرة
            </GoldBtn>

            <div className="grid grid-cols-2 gap-3">
              {['Apple Wallet', 'Google Wallet'].map((wallet) => (
                <button key={wallet} className="py-3 rounded-2xl text-sm font-semibold transition-all hover:bg-amber-50"
                  style={{ border: `1.5px solid ${G.border}`, color: G.charcoalSoft }}>
                  {wallet}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,255,255,0.06)', color: `${G.white}70`, border: `1px solid rgba(255,255,255,0.1)` }}>
            <Share2 className="w-4 h-4" />
            مشاركة
          </button>
          <button onClick={() => setPage('invitation')} className="flex-1 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.06)', color: `${G.white}70`, border: `1px solid rgba(255,255,255,0.1)` }}>
            الرجوع للدعوة
          </button>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 9 — DECLINE
// ──────────────────────────────────────────────────────────────────────────────
function DeclinePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(160deg, #111827 0%, #1F2937 100%)', fontFamily: 'Cairo' }}>
      <div className="w-full max-w-sm text-center anim-scale-in">
        {/* Illustration */}
        <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: `2px solid rgba(255,255,255,0.08)` }}>
          <div className="text-5xl">💛</div>
        </div>

        <h1 className="text-3xl font-black text-white mb-4">شكراً لإعلامنا</h1>
        <p className="text-lg leading-8 mb-8" style={{ color: `${G.white}55` }}>
          نقدر جداً تفهمك واعتذارك.<br />
          نتمنى أن تتشرف بزيارتنا في مناسبات أخرى.
        </p>

        <div className="rounded-2xl p-6 mb-8 text-right" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)` }}>
          <p className="text-sm leading-8 text-center italic" style={{ color: `${G.white}55` }}>
            "إن لم يكن لك وجود في المكان،<br />
            فلتكن دعواتك الطيبة حاضرة في القلوب"
          </p>
        </div>

        <div className="space-y-3">
          <button onClick={() => setPage('invitation')} className="w-full py-4 rounded-2xl font-bold text-sm"
            style={{ background: `${G.gold}20`, color: G.gold, border: `1px solid ${G.gold}50` }}>
            تغيير الرد
          </button>
          <button onClick={() => setPage('landing')} className="w-full py-4 rounded-2xl font-semibold text-sm"
            style={{ background: 'rgba(255,255,255,0.05)', color: `${G.white}40`, border: `1px solid rgba(255,255,255,0.08)` }}>
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 10 — QR SCANNER
// ──────────────────────────────────────────────────────────────────────────────
function QRScanner({ setPage }: { setPage: (p: Page) => void }) {
  const [state, setState] = useState<'scanning' | 'success' | 'invalid' | 'used'>('scanning')

  const stateConfig = {
    scanning: { color: G.gold,    bg: 'transparent',         label: 'ضع رمز QR داخل الإطار للمسح',  icon: null },
    success:  { color: G.success, bg: `${G.success}15`,      label: 'تم التحقق بنجاح ✓',             icon: Check },
    invalid:  { color: G.danger,  bg: `${G.danger}15`,       label: 'رمز QR غير صالح أو منتهي الصلاحية', icon: X },
    used:     { color: '#F59E0B', bg: `${G.warning}15`,      label: 'هذا الرمز تم استخدامه مسبقاً', icon: Clock },
  }

  const cfg = stateConfig[state]

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A0F1A', fontFamily: 'Cairo' }}>
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ChevronRight className="w-4 h-4" />
            رجوع
          </button>
          <h1 className="font-black text-xl text-white">ماسح رموز QR</h1>
          <div className="w-16" />
        </div>

        {/* Viewfinder */}
        <div className="relative rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: '1', background: '#0F1A2E', border: `2px solid ${cfg.color}40` }}>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `linear-gradient(${cfg.color} 1px, transparent 1px), linear-gradient(90deg, ${cfg.color} 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }} />

          {/* Center frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Corner brackets */}
              {[
                ['top-0 right-0', 'border-t-4 border-r-4 rounded-tr-2xl'],
                ['top-0 left-0',  'border-t-4 border-l-4 rounded-tl-2xl'],
                ['bottom-0 right-0', 'border-b-4 border-r-4 rounded-br-2xl'],
                ['bottom-0 left-0',  'border-b-4 border-l-4 rounded-bl-2xl'],
              ].map(([pos, cls]) => (
                <div key={pos} className={`absolute w-10 h-10 ${pos} ${cls} transition-colors duration-500`} style={{ borderColor: cfg.color }} />
              ))}

              {/* Center icon or scan line */}
              <div className="absolute inset-0 flex items-center justify-center">
                {state === 'scanning' && (
                  <>
                    <div className="scan-line" style={{ background: `linear-gradient(to right, transparent, ${G.gold}, transparent)`, boxShadow: `0 0 12px ${G.gold}` }} />
                    <ScanLine className="w-16 h-16" style={{ color: `${G.gold}30` }} />
                  </>
                )}
                {state !== 'scanning' && cfg.icon && (
                  <div className="w-20 h-20 rounded-full flex items-center justify-center anim-success" style={{ background: cfg.color }}>
                    {state === 'used'
                      ? <Clock className="w-10 h-10 text-white" />
                      : state === 'success'
                      ? <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      : <X className="w-10 h-10 text-white" strokeWidth={3} />
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-0 inset-x-0 p-5 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: `${cfg.color}25`, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
              {cfg.label}
            </div>
          </div>
        </div>

        {/* Test state buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {(['scanning', 'success', 'invalid', 'used'] as const).map((s) => (
            <button key={s}
              onClick={() => setState(s)}
              className="py-2.5 rounded-2xl text-xs font-bold transition-all"
              style={{
                background: state === s ? stateConfig[s].color : 'rgba(255,255,255,0.05)',
                color: state === s ? (s === 'used' ? G.charcoal : G.white) : 'rgba(255,255,255,0.5)',
              }}
            >
              {{ scanning: 'مسح', success: 'نجاح', invalid: 'خطأ', used: 'مستخدم' }[s]}
            </button>
          ))}
        </div>

        {/* Guest detail card — success */}
        {state === 'success' && (
          <div className="rounded-2xl p-5 anim-fade-up" style={{ background: `${G.success}12`, border: `1.5px solid ${G.success}50` }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl flex-shrink-0 gold-gradient shadow-gold-sm">أ</div>
              <div>
                <p className="font-black text-lg text-white">أحمد محمد العمري</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>0501234567</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[['الفعالية', 'حفل زفاف أحمد وسارة'], ['التذكرة', 'INV-2025-0415'], ['الوقت', '٧:٠٠ مساءً'], ['الحالة', 'مؤكد ✓']].map(([k, v]) => (
                <div key={k} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{k}</p>
                  <p className="text-sm font-bold text-white">{v}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-3.5 rounded-2xl font-black text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
              ✓ تأكيد تسجيل الدخول
            </button>
          </div>
        )}

        {/* Used warning */}
        {state === 'used' && (
          <div className="rounded-2xl p-5 anim-fade-up text-center" style={{ background: `${G.warning}12`, border: `1.5px solid ${G.warning}50` }}>
            <p className="font-bold text-white mb-1">هذا الرمز تم استخدامه بالفعل</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>تم تسجيل دخول هذا الضيف في ٧:٢٣ مساءً</p>
          </div>
        )}

        {/* Invalid */}
        {state === 'invalid' && (
          <div className="rounded-2xl p-5 anim-fade-up text-center" style={{ background: `${G.danger}12`, border: `1.5px solid ${G.danger}50` }}>
            <p className="font-bold text-white mb-1">رمز QR غير صالح</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>تأكد من أن الرمز صادر من هذه الفعالية</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 11 — INVITATION TEMPLATES
// ──────────────────────────────────────────────────────────────────────────────
function Templates({ setPage }: { setPage: (p: Page) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = templateList.filter(t => t.name.includes(search))

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>قوالب الدعوات</h1>
            <p className="text-sm mt-1" style={{ color: G.muted }}>{templateList.length} قوالب احترافية جاهزة للاستخدام</p>
          </div>
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="بحث..."
              className="px-4 py-2.5 pe-11 rounded-2xl text-sm"
              style={{ background: G.white, border: `1.5px solid ${G.border}`, width: '200px' }}
            />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map(({ id, name, icon: Icon, color, img, h }) => {
            const isSel = selected === id
            return (
              <div
                key={id}
                onClick={() => setSelected(isSel ? null : id)}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  border: isSel ? `2px solid ${color}` : `1.5px solid ${G.border}`,
                  boxShadow: isSel ? `0 0 0 4px ${color}20, 0 12px 32px ${color}25` : '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden group" style={{ height: `${h}px` }}>
                  <img
                    src={`https://images.unsplash.com/${img}?w=400&h=${h * 2}&fit=crop&auto=format`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transform: isSel ? 'scale(1.04)' : undefined }}
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${color}20` }} />
                  {/* selected badge */}
                  {isSel && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center anim-success"
                      style={{ background: color }}>
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  )}
                  {/* bottom gradient + name */}
                  <div className="absolute bottom-0 inset-x-0 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                    <p className="text-white font-bold text-sm">{name}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-between" style={{ background: G.white }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="font-bold text-xs" style={{ color: G.charcoal }}>{name}</span>
                  </div>
                  <button className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                    style={{
                      background: isSel ? color : G.beige,
                      color: isSel ? G.white : G.charcoalSoft,
                    }}
                  >
                    {isSel ? 'محدد' : 'اختر'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky bottom bar when a template is selected */}
      {selected && (
        <div className="fixed bottom-0 inset-x-0 p-4 anim-fade-up" style={{ background: 'rgba(31,41,55,0.95)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${G.gold}30` }}>
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {(() => {
                const t = templateList.find(t => t.id === selected)!
                return (
                  <>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}25` }}>
                      <t.icon className="w-5 h-5" style={{ color: t.color }} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs" style={{ color: `${G.white}50` }}>تم اختيار القالب</p>
                    </div>
                  </>
                )
              })()}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPage('invitation')} className="px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: `${G.white}70` }}>
                معاينة
              </button>
              <GoldBtn onClick={() => setPage('create-event')} small>
                استخدم القالب
              </GoldBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE 12 — SETTINGS
// ──────────────────────────────────────────────────────────────────────────────
function SettingsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState('profile')

  const tabs = [
    { id: 'profile',       label: 'الملف الشخصي',  icon: Users },
    { id: 'password',      label: 'كلمة المرور',   icon: Lock },
    { id: 'branding',      label: 'الهوية البصرية', icon: Image },
    { id: 'notifications', label: 'الإشعارات',      icon: Bell },
  ]

  const [notifs, setNotifs] = useState({
    confirm: true, decline: true, daily: false, qr: true, email: false,
  })

  return (
    <div className="min-h-screen pt-16" style={{ background: G.offWhite, fontFamily: 'Cairo' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black mb-8" style={{ color: G.charcoal }}>الإعدادات</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-60 flex-shrink-0">
            <Card className="overflow-hidden">
              {/* Profile mini */}
              <div className="p-6 text-center" style={{ background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 100%)', borderBottom: `1px solid ${G.border}` }}>
                <div className="relative inline-block mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format"
                    className="w-16 h-16 rounded-2xl object-cover"
                    style={{ border: `2px solid ${G.gold}` }}
                    alt="profile"
                  />
                  <button className="absolute -bottom-1 -left-1 w-6 h-6 rounded-xl flex items-center justify-center" style={{ background: G.gold }}>
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <p className="font-bold text-sm" style={{ color: G.charcoal }}>محمد أحمد العمري</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${G.gold}18`, color: G.gold }}>الخطة الاحترافية</span>
              </div>

              {/* Nav */}
              <nav className="p-3 space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-right"
                    style={{ background: tab === id ? `${G.gold}12` : 'transparent', color: tab === id ? G.gold : G.charcoalSoft }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </button>
                ))}
                <div className="pt-2 mt-2" style={{ borderTop: `1px solid ${G.border}` }}>
                  <button
                    onClick={() => setPage('landing')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-right transition-all hover:bg-red-50"
                    style={{ color: G.danger }}
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </button>
                </div>
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            <Card className="p-7">
              {tab === 'profile' && (
                <div className="anim-fade-up">
                  <h2 className="text-xl font-black mb-6" style={{ color: G.charcoal }}>الملف الشخصي</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'الاسم الكامل',      type: 'text',  val: 'محمد أحمد العمري',    icon: Users },
                      { label: 'البريد الإلكتروني', type: 'email', val: 'mohammed@example.com', icon: Mail },
                      { label: 'رقم الهاتف',        type: 'tel',   val: '0501234567',            icon: Phone },
                      { label: 'المدينة',            type: 'text',  val: 'الرياض، المملكة العربية السعودية', icon: MapPin },
                    ].map(({ label, type, val, icon: Icon }) => (
                      <div key={label}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>{label}</label>
                        <div className="relative">
                          <Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
                          <input type={type} defaultValue={val} className="w-full px-4 py-3.5 pe-11 rounded-2xl text-sm"
                            style={{ background: G.beige, border: `1.5px solid ${G.border}` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <GoldBtn small>حفظ التغييرات</GoldBtn>
                </div>
              )}

              {tab === 'password' && (
                <div className="anim-fade-up">
                  <h2 className="text-xl font-black mb-6" style={{ color: G.charcoal }}>تغيير كلمة المرور</h2>
                  <div className="space-y-4 max-w-sm">
                    {['كلمة المرور الحالية', 'كلمة المرور الجديدة', 'تأكيد كلمة المرور الجديدة'].map((label) => (
                      <div key={label}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>{label}</label>
                        <div className="relative">
                          <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: G.muted }} />
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3.5 pe-11 rounded-2xl text-sm"
                            style={{ background: G.beige, border: `1.5px solid ${G.border}` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <GoldBtn small>تحديث كلمة المرور</GoldBtn>
                  </div>
                </div>
              )}

              {tab === 'branding' && (
                <div className="anim-fade-up">
                  <h2 className="text-xl font-black mb-6" style={{ color: G.charcoal }}>الهوية البصرية</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-3" style={{ color: G.charcoalMid }}>شعار المنشأة</label>
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: G.beige, border: `2px dashed ${G.border}` }}>
                          <Image className="w-8 h-8" style={{ color: G.muted }} />
                        </div>
                        <div>
                          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold mb-2 block" style={{ background: `${G.gold}15`, color: G.gold, border: `1px solid ${G.gold}40` }}>رفع الشعار</button>
                          <p className="text-xs" style={{ color: G.muted }}>PNG, SVG — ٢ ميجابايت كحد أقصى</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>اسم المنشأة</label>
                      <input type="text" placeholder="اسم شركتك أو منشأتك" className="w-full px-4 py-3.5 rounded-2xl text-sm max-w-sm"
                        style={{ background: G.beige, border: `1.5px solid ${G.border}` }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: G.charcoalMid }}>لون العلامة التجارية</label>
                      <div className="flex items-center gap-3">
                        {[G.gold, '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444'].map((c) => (
                          <button key={c} className="w-9 h-9 rounded-xl transition-all hover:scale-110" style={{ background: c, border: c === G.gold ? `3px solid ${G.charcoal}` : 'none' }} />
                        ))}
                      </div>
                    </div>
                    <GoldBtn small>حفظ الهوية</GoldBtn>
                  </div>
                </div>
              )}

              {tab === 'notifications' && (
                <div className="anim-fade-up">
                  <h2 className="text-xl font-black mb-6" style={{ color: G.charcoal }}>إعدادات الإشعارات</h2>
                  <div className="space-y-3">
                    {([
                      { key: 'confirm', label: 'إشعارات تأكيد الحضور',   desc: 'عند تأكيد ضيف لحضوره' },
                      { key: 'decline', label: 'إشعارات الاعتذار',       desc: 'عند اعتذار ضيف' },
                      { key: 'daily',   label: 'تقارير يومية',            desc: 'ملخص يومي بالإحصائيات' },
                      { key: 'qr',      label: 'تنبيهات مسح QR',         desc: 'عند تسجيل دخول ضيف' },
                      { key: 'email',   label: 'إشعارات البريد الإلكتروني', desc: 'استقبال الإشعارات عبر البريد' },
                    ] as { key: keyof typeof notifs; label: string; desc: string }[]).map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: G.beige }}>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: G.charcoal }}>{label}</p>
                          <p className="text-xs mt-0.5" style={{ color: G.muted }}>{desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
                          className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                          style={{ background: notifs[key] ? G.gold : G.border }}
                        >
                          <div
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                            style={{ right: notifs[key] ? '4px' : 'auto', left: notifs[key] ? 'auto' : '4px' }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <GoldBtn small>حفظ الإعدادات</GoldBtn>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// ROOT
// ──────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('landing')

  const withNav   = new Set(['dashboard', 'events', 'create-event', 'guests', 'templates', 'settings'])
  const fullscreen = new Set(['invitation', 'confirm-success', 'decline', 'qr-scanner', 'login', 'register'])

  // scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
      {withNav.has(page) && <NavBar page={page} setPage={setPage} />}

      {/* Public header for landing */}
      {page === 'landing' && (
        <header className="fixed top-0 inset-x-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-gold-xs">
                <Heart className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl" style={{ color: G.charcoal }}>دعـوة</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold" style={{ color: G.charcoalSoft }}>
              <a href="#" className="hover:text-amber-600 transition-colors">المميزات</a>
              <a href="#" className="hover:text-amber-600 transition-colors">القوالب</a>
              <a href="#" className="hover:text-amber-600 transition-colors">الأسعار</a>
            </div>
            <div className="flex gap-3">
              <OutlineBtn onClick={() => setPage('login')}>دخول</OutlineBtn>
              <GoldBtn onClick={() => setPage('register')} small>ابدأ مجاناً</GoldBtn>
            </div>
          </div>
        </header>
      )}

      {/* Pages */}
      {page === 'landing'         && <LandingPage   setPage={setPage} />}
      {page === 'login'           && <AuthPage mode="login"     setPage={setPage} />}
      {page === 'register'        && <AuthPage mode="register"  setPage={setPage} />}
      {page === 'dashboard'       && <Dashboard      setPage={setPage} />}
      {page === 'events'          && <EventsList     setPage={setPage} />}
      {page === 'create-event'    && <CreateEvent    setPage={setPage} />}
      {page === 'guests'          && <GuestsPage     setPage={setPage} />}
      {page === 'invitation'      && <InvitationPage setPage={setPage} />}
      {page === 'confirm-success' && <ConfirmSuccess setPage={setPage} />}
      {page === 'decline'         && <DeclinePage    setPage={setPage} />}
      {page === 'qr-scanner'      && <QRScanner      setPage={setPage} />}
      {page === 'templates'       && <Templates      setPage={setPage} />}
      {page === 'settings'        && <SettingsPage   setPage={setPage} />}
    </div>
  )
}
