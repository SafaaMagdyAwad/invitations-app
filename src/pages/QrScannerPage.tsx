import React, { useState } from 'react'
import {
  QrCode,
  Camera,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Users,
  ChevronRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react'
import { G } from '../constants/theme'
import { Page } from '../types'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'


interface ScanResult {
  status: 'valid' | 'already_used' | 'invalid'
  guestName?: string
  ticketNo?: string
  eventName?: string
  plusOne?: number
  scannedAt?: string
}

export function QrScannerPage() {
    const navigate=useNavigate();
  const [manualCode, setManualCode] = useState('')
  const [isScanning, setIsScanning] = useState(true)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  // سجّل العمليات السابقة
  const [recentScans, setRecentScans] = useState<ScanResult[]>([
    {
      status: 'valid',
      guestName: 'سارة خالد المنصور',
      ticketNo: '#INV-8842',
      eventName: 'حفل زفاف أحمد وسارة',
      plusOne: 2,
      scannedAt: '٠٧:١٥ مساءً',
    },
    {
      status: 'already_used',
      guestName: 'محمد عبد الله العتيبي',
      ticketNo: '#INV-3310',
      eventName: 'حفل زفاف أحمد وسارة',
      plusOne: 1,
      scannedAt: '٠٦:٤٥ مساءً',
    },
  ])

  // محاكاة عملية الفحص
  const handleSimulateScan = (type: 'valid' | 'already_used' | 'invalid') => {
    let result: ScanResult

    if (type === 'valid') {
      result = {
        status: 'valid',
        guestName: 'عبد الرحمن الفايز',
        ticketNo: manualCode || '#INV-9921',
        eventName: 'حفل زفاف أحمد وسارة',
        plusOne: 3,
        scannedAt: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      }
    } else if (type === 'already_used') {
      result = {
        status: 'already_used',
        guestName: 'فيصل المطيري',
        ticketNo: manualCode || '#INV-4412',
        eventName: 'حفل زفاف أحمد وسارة',
        plusOne: 1,
        scannedAt: '٠٧:٠٠ مساءً',
      }
    } else {
      result = {
        status: 'invalid',
        ticketNo: manualCode || '#INVALID-000',
      }
    }

    setScanResult(result)
    setIsScanning(false)
  }

  const handleApproveEntry = () => {
    if (scanResult && scanResult.status === 'valid') {
      setRecentScans([scanResult, ...recentScans])
    }
    setScanResult(null)
    setIsScanning(true)
    setManualCode('')
  }

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-1.5 text-xs font-bold mb-2 transition-colors hover:opacity-80"
              style={{ color: G.gold }}
            >
              <ChevronRight className="w-4 h-4" />
              العودة للفعاليات
            </button>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>
              ماسح رمز الدخول (QR Scanner)
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              قم بفحص تذاكر وبطاقات الضيوف لتنظيم وتسهيل عملية الدخول في الاستقبال
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              الكاميرا متصلة
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Scanner Viewport Section */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className="p-6 sm:p-8 rounded-3xl shadow-gold-md relative overflow-hidden text-center"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              {/* Camera Frame Box */}
              <div
                className="relative w-full max-w-xs h-72 mx-auto rounded-3xl overflow-hidden flex flex-col items-center justify-center border-2 border-dashed transition-all"
                style={{
                  background: isScanning ? '#111827' : G.beige,
                  borderColor: isScanning ? G.gold : G.border,
                }}
              >
                {isScanning ? (
                  <>
                    {/* Glowing Overlay Effects */}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Scanner Target Lines */}
                    <div className="w-48 h-48 border-2 border-amber-400 rounded-2xl relative z-10 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-400 shadow-[0_0_15px_#E8C84A] animate-bounce" />
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 z-10 text-white text-xs font-bold flex items-center justify-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
                      وجّه الكاميرا نحو رمز QR
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 p-4">
                    <QrCode className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-xs font-bold text-gray-500">تم إيقاف الفحص مؤقتاً</p>
                    <GoldBtn onClick={() => setIsScanning(true)} className="text-xs py-2">
                      <RefreshCw className="w-3.5 h-3.5" />
                      إعادة تشغيل الماسح
                    </GoldBtn>
                  </div>
                )}
              </div>

              {/* Simulation Testing Toolbar (للتجربة في بيئة التطوير) */}
              <div className="mt-6 p-4 rounded-2xl" style={{ background: G.beige, border: `1px solid ${G.border}` }}>
                <p className="text-xs font-bold mb-3" style={{ color: G.muted }}>
                  🧪 تجربة الفحص فوراً (محاكاة):
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSimulateScan('valid')}
                    className="py-2 px-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                  >
                    بطاقة صالحة ✓
                  </button>
                  <button
                    onClick={() => handleSimulateScan('already_used')}
                    className="py-2 px-2 rounded-xl text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors"
                  >
                    مُستخدمة سابقاً ⚠️
                  </button>
                  <button
                    onClick={() => handleSimulateScan('invalid')}
                    className="py-2 px-2 rounded-xl text-xs font-bold text-rose-800 bg-rose-100 hover:bg-rose-200 transition-colors"
                  >
                    غير صالحة ✕
                  </button>
                </div>
              </div>

              <Divider className="my-6" />

              {/* Manual Input Search */}
              <div className="text-right">
                <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                  أو أدخل رقم التذكرة / الدعوة يدوياً
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="مثال: #INV-8842"
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                  />
                  <GoldBtn onClick={() => handleSimulateScan('valid')} className="px-5 text-xs">
                    فحص
                  </GoldBtn>
                </div>
              </div>
            </div>
          </div>

          {/* Result / History Section */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scan Result Card (إذا وُجدت نتيجة) */}
            {scanResult && (
              <div
                className="p-6 rounded-3xl shadow-gold-lg border-2 animate-fade-in relative overflow-hidden"
                style={{
                  background: G.white,
                  borderColor:
                    scanResult.status === 'valid'
                      ? G.success
                      : scanResult.status === 'already_used'
                      ? G.warning
                      : '#EF4444',
                }}
              >
                {scanResult.status === 'valid' && (
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        دعوة صالحة لمرحلة الدخول
                      </span>
                      <h3 className="text-xl font-black mt-2" style={{ color: G.charcoal }}>
                        {scanResult.guestName}
                      </h3>
                      <p className="text-xs font-mono font-bold text-gray-400">{scanResult.ticketNo}</p>
                    </div>

                    <div className="p-3 rounded-2xl text-xs space-y-1 text-right" style={{ background: G.beige }}>
                      <div className="flex justify-between">
                        <span style={{ color: G.muted }}>عدد الحضور المسموح:</span>
                        <span className="font-bold">{scanResult.plusOne} أشخاص</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: G.muted }}>اسم الفعالية:</span>
                        <span className="font-bold">{scanResult.eventName}</span>
                      </div>
                    </div>

                    <GoldBtn onClick={handleApproveEntry} className="w-full py-3 text-sm">
                      <UserCheck className="w-4 h-4" />
                      تأكيد الدخول الآن
                    </GoldBtn>
                  </div>
                )}

                {scanResult.status === 'already_used' && (
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-600">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        تنبيه: تم استخدام البطاقة سابقاً
                      </span>
                      <h3 className="text-xl font-black mt-2" style={{ color: G.charcoal }}>
                        {scanResult.guestName}
                      </h3>
                      <p className="text-xs font-mono font-bold text-gray-400">
                        سُجل الدخول الساعة: {scanResult.scannedAt}
                      </p>
                    </div>

                    <OutlineBtn onClick={() => setScanResult(null)} className="w-full py-2.5 text-xs">
                      إغلاق والتجاوز
                    </OutlineBtn>
                  </div>
                )}

                {scanResult.status === 'invalid' && (
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-rose-600">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                        رمز غير صالح أو مجهول
                      </span>
                      <p className="text-sm font-bold mt-2" style={{ color: G.charcoal }}>
                        لم يتم العثور على أي دعوة مطابقة لهذا الرمز
                      </p>
                    </div>

                    <OutlineBtn onClick={() => setScanResult(null)} className="w-full py-2.5 text-xs">
                      المحاولة مرة أخرى
                    </OutlineBtn>
                  </div>
                )}
              </div>
            )}

            {/* Recent Scans Log Card */}
            <div
              className="p-6 rounded-3xl shadow-gold-sm"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: G.charcoal }}>
                <ShieldCheck className="w-5 h-5" style={{ color: G.gold }} />
                أحدث عمليات الدخول
              </h3>

              <div className="space-y-3">
                {recentScans.map((scan, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl flex items-center justify-between text-xs"
                    style={{ background: G.beige, border: `1px solid ${G.border}` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                          scan.status === 'valid' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      >
                        {scan.status === 'valid' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: G.charcoal }}>
                          {scan.guestName}
                        </div>
                        <div className="text-[10px]" style={{ color: G.muted }}>
                          {scan.ticketNo} • {scan.plusOne} مرافقين
                        </div>
                      </div>
                    </div>

                    <div className="text-left font-mono font-bold" style={{ color: G.charcoalSoft }}>
                      {scan.scannedAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}