import React, { useState } from 'react'
import {
  Heart,
  Send,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Check
} from 'lucide-react'
import { G } from '../constants/theme'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'



export function DeclinePage() {
    const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')

  const eventDetails = {
    guestName: 'أحمد محمد العمري',
    title: 'حفل زفاف أحمد وسارة',
    host: 'عائلة العمري والخالدي',
    date: 'السبت، ١٥ مارس ٢٠٢٥',
  }

  const defaultReasons = [
    'تزامن مع التزام آخر',
    'السفر خارج المدينة',
    'ظروف خاصة',
    'ظروف صحية',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
        className="absolute top-1/3 left-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 70%, #E8C84A 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* زر العودة */}
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

        {/* الكارت الرئيسي */}
        <div
          className="rounded-3xl shadow-gold-lg overflow-hidden relative"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {/* الهيدر */}
          <div className="p-8 text-center relative" style={{ background: G.beige, borderBottom: `1px solid ${G.border}` }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-gold-xs"
              style={{ background: `${G.gold}20` }}
            >
              <Heart className="w-7 h-7" style={{ color: G.gold }} />
            </div>
            <h1 className="text-2xl font-black mb-1" style={{ color: G.charcoal }}>
              تأكيد الاعتذار عن الحضور
            </h1>
            <p className="text-sm" style={{ color: G.charcoalSoft }}>
              {eventDetails.title} — {eventDetails.host}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-center mb-4" style={{ color: G.charcoal }}>
                    عزيزنا <span className="font-bold" style={{ color: G.gold }}>{eventDetails.guestName}</span>، يُسعدنا دائماً تواصلك، ونقّدر جداً إبلاغنا مسبقاً.
                  </p>
                  <Divider className="my-4" />
                </div>

                {/* سبب الاعتذار */}
                <div>
                  <label className="block text-xs font-bold mb-3" style={{ color: G.charcoal }}>
                    سبب الاعتذار (اختياري)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {defaultReasons.map((r) => {
                      const isSelected = reason === r
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setReason(isSelected ? '' : r)}
                          className="p-3 rounded-xl text-xs font-bold transition-all text-right flex items-center justify-between"
                          style={{
                            background: isSelected ? `${G.gold}18` : G.beige,
                            border: `1px solid ${isSelected ? G.gold : G.border}`,
                            color: isSelected ? G.goldDark : G.charcoal,
                          }}
                        >
                          <span>{r}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" style={{ color: G.gold }} />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* رسالة التهنئة للداعي */}
                <div>
                  <label className="block text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color: G.charcoal }}>
                    <MessageSquare className="w-3.5 h-3.5" style={{ color: G.gold }} />
                    رسالة تهنئة أو كلمة للداعي
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="بارك الله لهما وبارك عليهما... نتمنى لكم حفل زفاف أسطوري!"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none"
                    style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                  />
                </div>

                {/* الأزرار */}
                <div className="space-y-3 pt-2">
                  <GoldBtn className="w-full py-3.5 text-sm">
                    <Send className="w-4 h-4" />
                    تأكيد إرسال الاعتذار
                  </GoldBtn>

                  <OutlineBtn
                    onClick={() => navigate('/confirm-success')}
                    className="w-full py-3 text-sm"
                  >
                    تغيير الرأي وتأكيد الحضور
                  </OutlineBtn>
                </div>
              </form>
            ) : (
              /* شاشة التأكيد بعد الإرسال */
              <div className="text-center py-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-amber-50 border border-amber-200">
                  <Sparkles className="w-8 h-8" style={{ color: G.gold }} />
                </div>

                <div>
                  <h3 className="text-xl font-black mb-1" style={{ color: G.charcoal }}>
                    تم استلام اعتذارك بنجاح
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: G.charcoalSoft }}>
                    شكراً لوقتك، وتم إيصال مباركتك ودعواتك الصادقة للداعي.
                  </p>
                </div>

                {message && (
                  <div className="p-4 rounded-2xl text-xs italic text-right" style={{ background: G.beige, border: `1px solid ${G.border}` }}>
                    <span className="font-bold non-italic block mb-1" style={{ color: G.gold }}>رسالتك:</span>
                    "{message}"
                  </div>
                )}

                <OutlineBtn onClick={() => navigate('/invitation')} className="w-full py-3 text-sm">
                  العودة للبطاقة الرئيسية
                </OutlineBtn>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs border-t" style={{ borderColor: G.borderSoft, background: G.beige }}>
            <span style={{ color: G.charcoalSoft }}>تم تنظيم هذه الدعوة بواسطة </span>
            <span className="font-black" style={{ color: G.gold }}>دعـوة</span>
          </div>
        </div>
      </div>
    </div>
  )
}