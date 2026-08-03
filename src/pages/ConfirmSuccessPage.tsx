import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { G } from '../constants/theme'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'


export function ConfirmSuccessPage() {
    const navigate = useNavigate();
  // بيانات تجريبية للبطاقة المقبولة
  const eventDetails = {
    guestName: 'أحمد محمد العمري',
    title: 'حفل زفاف أحمد وسارة',
    host: 'عائلة العمري والخالدي',
    date: 'السبت، ١٥ مارس ٢٠٢٥',
    time: '٠٧:٠٠ مساءً',
    location: 'قاعة الفردوس، الرياض',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=INV-2025-AHMED-8842',
    ticketNo: '#INV-8842'
  }

  return (
    <div
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      {/* خلفية جمالية */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, #E8C84A 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-xl relative z-10">
        {/* العودة للدعوة */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate('/invitation')}
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-80"
            style={{ color: G.gold }}
          >
            <ChevronRight className="w-4 h-4" />
            العودة لبطاقة الدعوة
          </button>
        </div>

        {/* كارت النجاح الرئيسي */}
        <div
          className="rounded-3xl shadow-gold-lg overflow-hidden relative"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {/* شريط أعلى الكارت */}
          <div className="p-8 text-center relative gold-gradient text-white">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white shadow-gold-md animate-bounce">
              <CheckCircle2 className="w-10 h-10" style={{ color: G.gold }} />
            </div>
            <h1 className="text-2xl font-black mb-1">تم تأكيد حضورك بنجاح!</h1>
            <p className="text-sm opacity-90">يسعدنا جداً حضورك ومشاركتنا هذه الفرحة</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* تفاصيل الضيف والبطاقة */}
            <div className="text-center">
              <p className="text-xs font-semibold mb-1" style={{ color: G.muted }}>
                مرحباً بك
              </p>
              <h2 className="text-xl font-black" style={{ color: G.charcoal }}>
                {eventDetails.guestName}
              </h2>
              <span
                className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: G.successLight, color: '#065F46' }}
              >
                ✓ بطاقة دخول مؤكدة
              </span>
            </div>

            <Divider />

            {/* تفاصيل الوقت والموقع */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: G.beige }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}20` }}>
                  <Calendar className="w-4 h-4" style={{ color: G.gold }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: G.muted }}>التاريخ</div>
                  <div className="font-bold" style={{ color: G.charcoal }}>{eventDetails.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: G.beige }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}20` }}>
                  <Clock className="w-4 h-4" style={{ color: G.gold }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: G.muted }}>الوقت</div>
                  <div className="font-bold" style={{ color: G.charcoal }}>{eventDetails.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: G.beige }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}20` }}>
                  <MapPin className="w-4 h-4" style={{ color: G.gold }} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold" style={{ color: G.muted }}>المكان</div>
                    <div className="font-bold" style={{ color: G.charcoal }}>{eventDetails.location}</div>
                  </div>
                  <button
                    className="text-xs font-bold underline flex items-center gap-1"
                    style={{ color: G.gold }}
                  >
                    الخريطة <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* بطاقة رمز الـ QR للدخول */}
            <div
              className="p-6 rounded-2xl text-center space-y-3 relative overflow-hidden"
              style={{ background: G.offWhite, border: `1.5px dashed ${G.gold}` }}
            >
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: G.gold }}>
                رمز الدخول الشخصي (QR Code)
              </div>
              <p className="text-xs" style={{ color: G.charcoalSoft }}>
                يرجى إبراز هذا الرمز لموظفي الاستقبال عند الدخول
              </p>

              <div className="w-36 h-36 mx-auto p-2 rounded-xl bg-white shadow-gold-xs border border-amber-100 flex items-center justify-center">
                <img
                  src={eventDetails.qrCodeUrl}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-xs font-mono font-bold" style={{ color: G.muted }}>
                رقم التذكرة: {eventDetails.ticketNo}
              </div>
            </div>

            {/* أزرار الإجراءات السريعة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <GoldBtn className="w-full py-3 text-sm">
                <Download className="w-4 h-4" />
                حفظ البطاقة (PNG)
              </GoldBtn>

              <OutlineBtn className="w-full py-3 text-sm">
                <Calendar className="w-4 h-4" />
                إضافة للتقويم
              </OutlineBtn>
            </div>
          </div>

          {/* Footer بسيط */}
          <div className="p-4 text-center text-xs border-t" style={{ borderColor: G.borderSoft, background: G.beige }}>
            <span style={{ color: G.charcoalSoft }}>تم إصدار هذه الدعوة عبر منصة </span>
            <span className="font-black" style={{ color: G.gold }}>دعـوة</span>
          </div>
        </div>
      </div>
    </div>
  )
}