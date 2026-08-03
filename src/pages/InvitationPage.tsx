import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  CheckCircle2,
  XCircle,
  Share2,
  Map,
  ChevronRight,
  UserCheck
} from 'lucide-react'
import { G } from '../constants/theme'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'


export function InvitationPage() {
    const navigate=useNavigate();
  // تفاصيل الفعالية (يمكن استبدالها ببيانات قادمة من API أو Props)
  const eventDetails = {
    title: 'حفل زفاف أحمد وسارة',
    hosts: 'عائلة العمري والخالدي',
    welcomeText: 'يتشرفون بدعوتكم لحضور حفل الزفاف وتكتمل فرحتنا بحضوركم الكريم',
    date: '٢٠٢٦/١٠/١٥',
    targetDateStr: '2026-10-15T19:00:00',
    time: '٠٧:٠٠ مساءً',
    locationName: 'قاعة الفردوس الكبرى',
    address: 'طريق الملك فهد، الرياض',
    googleMapsUrl: 'https://maps.google.com',
  }

  // العداد التنازلي للمناسبة
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(eventDetails.targetDateStr) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [eventDetails.targetDateStr])

  return (
    <div
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      {/* عناصر خلفية جمالية */}
      <div
        className="absolute top-10 right-10 w-96 h-96 opacity-20 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #E8C84A 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 opacity-20 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-2xl relative z-10 space-y-4">
        {/* زر العودة للوحة التحكم / الفعاليات */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-80"
            style={{ color: G.gold }}
          >
            <ChevronRight className="w-4 h-4" />
            العودة للفعاليات
          </button>

          <button
            onClick={() => alert('تم نسخ رابط الدعوة!')}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:bg-amber-50"
            style={{ border: `1px solid ${G.border}`, color: G.charcoal }}
          >
            <Share2 className="w-3.5 h-3.5" style={{ color: G.gold }} />
            مشاركة الدعوة
          </button>
        </div>

        {/* كارت البطاقة الرئيسي */}
        <div
          className="rounded-3xl shadow-gold-lg overflow-hidden relative"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {/* الإطار الزخرفي الإضافي داخل الكارت */}
          <div className="p-6 sm:p-10 text-center relative border-4 border-double m-3 sm:m-4 rounded-2xl" style={{ borderColor: `${G.gold}40` }}>
            
            {/* أيقونة الفخامة الأيقونية */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 gold-gradient shadow-gold-sm">
              <Heart className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            {/* المستضيف */}
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: G.gold }}>
              {eventDetails.hosts}
            </p>

            {/* عنوان المناسبة */}
            <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: G.charcoal }}>
              {eventDetails.title}
            </h1>

            {/* نص الترحيب */}
            <p className="text-sm max-w-md mx-auto leading-relaxed mb-6" style={{ color: G.charcoalSoft }}>
              "{eventDetails.welcomeText}"
            </p>

            <Divider className="my-6" />

            {/* تفاصيل المكان والزمان */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-right">
              <div className="p-4 rounded-2xl flex items-center gap-3.5" style={{ background: G.beige, border: `1px solid ${G.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G.gold}20` }}>
                  <Calendar className="w-5 h-5" style={{ color: G.gold }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: G.muted }}>التاريخ والتوقيت</div>
                  <div className="text-sm font-black" style={{ color: G.charcoal }}>{eventDetails.date}</div>
                  <div className="text-xs" style={{ color: G.charcoalSoft }}>{eventDetails.time}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl flex items-center gap-3.5" style={{ background: G.beige, border: `1px solid ${G.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G.gold}20` }}>
                  <MapPin className="w-5 h-5" style={{ color: G.gold }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold" style={{ color: G.muted }}>الموقع والتفاصيل</div>
                  <div className="text-sm font-black truncate" style={{ color: G.charcoal }}>{eventDetails.locationName}</div>
                  <a
                    href={eventDetails.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold underline inline-flex items-center gap-1 mt-0.5"
                    style={{ color: G.gold }}
                  >
                    عرض الخريطة <Map className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* العداد التنازلي */}
            <div className="my-8">
              <div className="text-xs font-bold mb-3 flex items-center justify-center gap-1" style={{ color: G.gold }}>
                <Sparkles className="w-3.5 h-3.5" />
                المتبقي على الفعالية
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: 'يوم', val: timeLeft.days },
                  { label: 'ساعة', val: timeLeft.hours },
                  { label: 'دقيقة', val: timeLeft.minutes },
                  { label: 'ثانية', val: timeLeft.seconds },
                ].map(({ label, val }) => (
                  <div key={label} className="p-3 rounded-2xl text-center" style={{ background: G.offWhite, border: `1px solid ${G.border}` }}>
                    <div className="text-xl sm:text-2xl font-black" style={{ color: G.charcoal }}>
                      {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold" style={{ color: G.muted }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Divider className="my-6" />

            {/* أزرار اتخاذ القرار RSVP */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <GoldBtn
                onClick={() => navigate('/confirm-success')}
                className="w-full py-4 text-sm font-bold shadow-gold-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                تأكيد الحضور
              </GoldBtn>

              <OutlineBtn
                onClick={() => navigate('/decline')}
                className="w-full py-3 text-sm font-bold"
              >
                <XCircle className="w-4 h-4" />
                الاعتذار عن الحضور
              </OutlineBtn>
            </div>
          </div>

          {/* تذييل البطاقة */}
          <div className="p-4 text-center text-xs border-t" style={{ borderColor: G.borderSoft, background: G.beige }}>
            <span style={{ color: G.charcoalSoft }}>دعوة رقمية مصممة عبر </span>
            <span className="font-black" style={{ color: G.gold }}>دعـوة</span>
          </div>
        </div>
      </div>
    </div>
  )
}