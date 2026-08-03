//api    http://localhost:5000/api/events
//request body
//{
//   "title": "Wedding Ceremony",
//   "description": "Join us to celebrate our wedding.",
//   "date": "2026-09-15T18:00:00Z",
//   "location": "Cairo, Egypt",
//   "googleMapsLink": "https://maps.google.com/...",
//   "coverImage": "https://example.com/image.jpg"
//}

import React, { useState } from 'react'
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Image as ImageIcon,
  Check,
  Crown,
  Star,
  Flower2,
  Moon,
  Users,
  ChevronRight,
  HelpCircle
} from 'lucide-react'
import { G } from '../constants/theme'
import { GoldBtn } from '../components/common/GoldBtn'
import {  OutlineBtn } from '../components/common/OutlineBtn'
import {  Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

export function CreateEventPage() {
    const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('luxury')
  const [formData, setFormData] = useState({
    title: '',
    type: 'زفاف',
    hostName: '',
    date: '',
    time: '',
    location: '',
    city: 'الرياض',
    maxGuests: '',
    description: '',
    allowRsvp: true,
    sendQrCode: true,
  })

  const templates = [
    { id: 'luxury', name: 'زفاف فاخر', icon: Crown, color: G.gold },
    { id: 'classic', name: 'كلاسيكي', icon: Star, color: '#6B7280' },
    { id: 'floral', name: 'زهري راقي', icon: Flower2, color: '#EC4899' },
    { id: 'islamic', name: 'نقش إسلامي', icon: Moon, color: G.success },
  ]
const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 const handleSubmit = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: `${formData.date}T${formData.time}:00Z`,
      location: `${formData.location}, ${formData.city}`,
      googleMapsLink: "",
      coverImage: "",
    };

    await axios.post(
      "http://localhost:5000/api/events",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("تم إنشاء الفعالية بنجاح");
    navigate("/events");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "حدث خطأ أثناء إنشاء الفعالية"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
              إنشاء فعالية جديدة
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              صمم دعوتك الرقمية وقم بإدارتها وإرسالها لضيوفك بسهولة
            </p>
          </div>

          <div className="flex gap-3">
            <OutlineBtn onClick={() => navigate('/events')}>إلغاء</OutlineBtn>
            <GoldBtn onClick={handleSubmit} disabled={loading}>
  <Sparkles className="w-4 h-4" />
  {loading ? "جارٍ الحفظ..." : "حفظ ونشر الدعوة"}
</GoldBtn>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div
              className="p-6 sm:p-8 rounded-3xl shadow-gold-sm"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <h3 className="text-lg font-black mb-6 flex items-center gap-2.5" style={{ color: G.charcoal }}>
                <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                التفاصيل الأساسية
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                    عنوان الفعالية / المناسبة *
                  </label>
                  <input
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="مثال: حفل زفاف أحمد وسارة"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                    style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      نوع المناسبة
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                      style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                    >
                      <option value="زفاف">حفل زفاف</option>
                      <option value="تخرج">حفل تخرج</option>
                      <option value="عيد ميلاد">عيد ميلاد</option>
                      <option value="مؤتمر">مؤتمر / أعمال</option>
                      <option value="خاص">مناسبة خاصة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      اسم الداعي / المستضيف
                    </label>
                    <input
                      type="text"
                      name="hostName"
                      value={formData.hostName}
                      onChange={handleChange}
                      placeholder="مثال: عائلة العمري"
                      className="w-full px-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                      style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                    وصف الدعوة / نص الترحيب
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="يتشرف عريسنا بدعوتكم لحضور حفل زفافه وتكتمل فرحتنا بوجودكم..."
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none"
                    style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                  />
                </div>
              </div>
            </div>

            {/* Time & Location Card */}
            <div
              className="p-6 sm:p-8 rounded-3xl shadow-gold-sm"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <h3 className="text-lg font-black mb-6 flex items-center gap-2.5" style={{ color: G.charcoal }}>
                <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                الوقت والمكان
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      تاريخ المناسبة *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                      <Calendar
                        className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                        style={{ color: G.muted }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      الوقت *
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        required
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                      <Clock
                        className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                        style={{ color: G.muted }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      المدينة
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="الرياض"
                      className="w-full px-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                      style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                      اسم القاعة / العنوان *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="قاعة الفردوس - طريق الملك فهد"
                        className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                      <MapPin
                        className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                        style={{ color: G.muted }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Options Card */}
            <div
              className="p-6 sm:p-8 rounded-3xl shadow-gold-sm"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <h3 className="text-lg font-black mb-6 flex items-center gap-2.5" style={{ color: G.charcoal }}>
                <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                إعدادات الحضور والرموز
              </h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:bg-amber-50/50" style={{ border: `1px solid ${G.border}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}18` }}>
                      <Check className="w-5 h-5" style={{ color: G.gold }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: G.charcoal }}>تفعيل نموذج تأكيد الحضور (RSVP)</div>
                      <div className="text-xs" style={{ color: G.charcoalSoft }}>السماح للضيوف بتأكيد أو اعتذار الحضور بلمسة واحدة</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.allowRsvp}
                    onChange={(e) => setFormData({ ...formData, allowRsvp: e.target.checked })}
                    className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:bg-amber-50/50" style={{ border: `1px solid ${G.border}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G.gold}18` }}>
                      <Users className="w-5 h-5" style={{ color: G.gold }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: G.charcoal }}>توليد بطاقة QR إلكترونية لكل ضيف</div>
                      <div className="text-xs" style={{ color: G.charcoalSoft }}>يتم استخدامها عند بوابات الدخول لتنظيم الحضور</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.sendQrCode}
                    onChange={(e) => setFormData({ ...formData, sendQrCode: e.target.checked })}
                    className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar Area: Template Selection & Preview */}
          <div className="space-y-6">
            {/* Template Chooser */}
            <div
              className="p-6 rounded-3xl shadow-gold-sm"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <h3 className="text-base font-black mb-4" style={{ color: G.charcoal }}>
                اختر تصميم الدعوة
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {templates.map(({ id, name, icon: Icon, color }) => {
                  const isSelected = selectedTemplate === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedTemplate(id)}
                      className={`p-3.5 rounded-2xl text-right transition-all flex flex-col justify-between h-24 ${
                        isSelected ? 'ring-2' : ''
                      }`}
                      style={{
                        background: isSelected ? `${G.gold}12` : G.beige,
                        border: `1.5px solid ${isSelected ? G.gold : G.border}`,
                        // @ts-ignore
                        ringColor: G.gold,
                      }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: G.charcoal }}>
                        {name}
                      </span>
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => navigate('/templates')}
                className="w-full text-center text-xs font-bold py-2 hover:underline"
                style={{ color: G.gold }}
              >
                استعراض مكتبة القوالب الكاملة →
              </button>
            </div>

            {/* Quick Live Card Preview */}
            <div
              className="p-6 rounded-3xl text-center relative overflow-hidden"
              style={{ background: G.offWhite, border: `1px solid ${G.border}` }}
            >
              <div className="text-xs font-bold uppercase mb-3 tracking-wider" style={{ color: G.gold }}>
                معاينة سريعة
              </div>

              <div
                className="p-5 rounded-2xl shadow-gold-xs relative"
                style={{ background: G.white, border: `1px solid ${G.border}` }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 gold-gradient">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-gray-400 mb-1">{formData.hostName || 'اسم المستضيف'}</div>
                <h4 className="font-black text-lg mb-2" style={{ color: G.charcoal }}>
                  {formData.title || 'عنوان الدعوة هنا'}
                </h4>
                <Divider className="my-3" />
                <div className="text-xs space-y-1.5" style={{ color: G.charcoalSoft }}>
                  <div>📅 {formData.date || 'تاريخ المناسبة'}</div>
                  <div>📍 {formData.location || 'مكان الفعالية'}</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}