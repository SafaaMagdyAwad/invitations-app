import { QrCode, MessageCircle, TrendingUp, Sparkles, Eye, Calendar, MapPin, Check, Users } from 'lucide-react'
import { G } from '../constants/theme'
import { templateList } from '../data/mockData'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { FAQItem } from '../components/layout/FAQItem'
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate();
  const features = [
    { icon: QrCode, title: 'رموز QR ذكية', desc: 'رمز فريد لكل ضيف — مسح فوري عند الدخول مع تأكيد تلقائي.' },
    { icon: MessageCircle, title: 'واتساب تلقائي', desc: 'إرسال الدعوات للجميع بنقرة واحدة مع تتبع حالة التسليم.' },
    { icon: TrendingUp, title: 'تحليلات لحظية', desc: 'لوحة تحكم غنية تُظهر نسب التأكيد والاعتذار والدخول.' },
    { icon: Sparkles, title: 'قوالب فاخرة', desc: 'أكثر من ٨ قوالب مصممة باحترافية — جاهزة للتخصيص الكامل.' },
  ]

  const steps = [
    { n: '١', title: 'أنشئ فعاليتك', desc: 'أضف التفاصيل واختر القالب المناسب في دقائق' },
    { n: '٢', title: 'أضف ضيوفك', desc: 'استورد من Excel أو أضفهم يدوياً بسهولة' },
    { n: '٣', title: 'أرسل واستقبل', desc: 'أرسل عبر واتساب وتابع الردود فورياً' },
  ]

  const plans = [
    {
      name: 'أساسي', price: '٤٩', guests: '٥٠', events: '١',
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
    { q: 'هل يمكنني تخصيص تصميم الدعوة بالكامل؟', a: 'نعم، كل عنصر قابل للتعديل — الألوان والخطوط والصور والنصوص.' },
    { q: 'كيف يعمل نظام QR عند الدخول؟', a: 'كل ضيف يتلقى رمزاً فريداً. عند المسح يتأكد الحضور تلقائياً ويُحدَّث السجل.' },
    { q: 'هل يدعم النظام اللغة العربية والـ RTL؟', a: 'بالكامل — النظام مبني من الأساس للعربية مع تخطيط RTL أصيل.' },
    { q: 'هل يمكن إرسال الدعوات عبر واتساب؟', a: 'نعم، بنقرة واحدة لجميع الضيوف أو لكل ضيف على حدة مع رسالة مخصصة.' },
  ]

  return (
    <div style={{ fontFamily: 'Cairo' }}>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
        style={{ background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)' }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, #E8C84A55 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A22733 0%, transparent 70%)' }} />

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
              <GoldBtn onClick={() => navigate('/register')}>
                <Sparkles className="w-4 h-4" />
                ابدأ إنشاء دعوتك
              </GoldBtn>
              <OutlineBtn onClick={() => navigate('/invitation')}>
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

          <div className="hidden lg:flex justify-center anim-float">
            <div className="relative w-[300px]">
              <div
                className="rounded-[28px] overflow-hidden shadow-gold-lg"
                style={{ border: `2px solid ${G.gold}55`, background: G.offWhite }}
              >
                <div className="h-14 flex items-center justify-center relative gold-gradient">
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <span className="relative font-bold text-white text-sm tracking-wide">دعوة زواج مبارك</span>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=280&fit=crop&auto=format"
                    alt="wedding"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.5) 0%, transparent 55%)' }} />
                </div>

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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: `${G.gold}50` }}>
            <div className="w-1 h-2 rounded-full" style={{ background: G.gold, animation: 'float 1.4s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-6" style={{ background: G.white }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>المميزات</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: G.charcoal }}>كل ما تحتاجه في مكان واحد</h2>
            <p style={{ color: G.charcoalSoft }}>منصة متكاملة لإدارة مناسباتك بأعلى مستوى من الاحتراف</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
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

      {/* Templates Preview */}
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
                onClick={() => navigate('/templates')}
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
            <OutlineBtn onClick={() => navigate('/templates')}>
              <Eye className="w-4 h-4" />
              عرض جميع القوالب
            </OutlineBtn>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-28 px-6" style={{ background: G.white }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold mb-3 tracking-widest uppercase" style={{ color: G.gold }}>الخطوات</p>
            <h2 className="text-4xl font-black" style={{ color: G.charcoal }}>ثلاث خطوات فقط</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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

      {/* Pricing */}
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
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold shadow-gold-sm gold-gradient whitespace-nowrap"
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
                  onClick={() => navigate('/register')}
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

      {/* FAQ */}
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
    </div>
  )
}