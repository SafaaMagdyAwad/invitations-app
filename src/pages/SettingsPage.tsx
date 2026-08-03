import React, { useState } from 'react'
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Save,
  Camera,
  Check,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { G } from '../constants/theme'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'


export function SettingsPage() {
    const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>('profile')
  const [saved, setSaved] = useState(false)

  // بيانات نموذج الحساب الشخصي
  const [profile, setProfile] = useState({
    name: 'صفاء مجدي',
    email: 'safaa@example.com',
    phone: '+201012345678',
    orgName: 'استوديو المناسبات الفاخرة',
  })

  // إعدادات التنبيهات
  const [notifications, setNotifications] = useState({
    emailRsvp: true,
    smsRsvp: true,
    whatsappAlerts: true,
    marketing: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'notifications', label: 'التنبيهات والإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان وكلمة المرور', icon: Lock },
    { id: 'preferences', label: 'تفضيلات المنصة', icon: Palette },
  ] as const

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>
              إعدادات الحساب
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              إدارة بيانات حسابك، خيارات التنبيهات، وإعدادات الأمان والتفضيلات
            </p>
          </div>

          <GoldBtn onClick={handleSave} className="px-6 py-2.5">
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'تم الحفظ بنجاح!' : 'حفظ التغييرات'}
          </GoldBtn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Tabs Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div
              className="p-2 rounded-3xl shadow-gold-xs space-y-1"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              {tabs.map(({ id, label, icon: Icon }) => {
                const active = activeTab === id
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-right"
                    style={{
                      background: active ? `${G.gold}18` : 'transparent',
                      color: active ? G.gold : G.charcoalSoft,
                      border: `1px solid ${active ? G.gold : 'transparent'}`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Settings Content Area */}
          <div className="lg:col-span-9">
            <form onSubmit={handleSave}>
              {/* Tab 1: Profile Settings */}
              {activeTab === 'profile' && (
                <div
                  className="p-6 sm:p-8 rounded-3xl shadow-gold-sm space-y-6"
                  style={{ background: G.white, border: `1px solid ${G.border}` }}
                >
                  <h3 className="text-lg font-black flex items-center gap-2" style={{ color: G.charcoal }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                    البيانات الشخصية
                  </h3>

                  {/* Avatar Upload */}
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format"
                        alt="Avatar"
                        className="w-20 h-20 rounded-2xl object-cover border-2 shadow-gold-xs"
                        style={{ borderColor: G.gold }}
                      />
                      <button
                        type="button"
                        className="absolute -bottom-2 -left-2 w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-gold-xs transition-transform hover:scale-110"
                        style={{ background: G.gold }}
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold" style={{ color: G.charcoal }}>الصورة الشخصية</h4>
                      <p className="text-xs mt-1" style={{ color: G.charcoalSoft }}>
                        تظهر الصورة في أعلى شريط الملاحة وبطاقات المشاركة
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        رقم الجوال
                      </label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all dir-ltr text-right"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        اسم الشركة / الجهة المنظمة (اختياري)
                      </label>
                      <input
                        type="text"
                        value={profile.orgName}
                        onChange={(e) => setProfile({ ...profile, orgName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Notifications */}
              {activeTab === 'notifications' && (
                <div
                  className="p-6 sm:p-8 rounded-3xl shadow-gold-sm space-y-6"
                  style={{ background: G.white, border: `1px solid ${G.border}` }}
                >
                  <h3 className="text-lg font-black flex items-center gap-2" style={{ color: G.charcoal }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                    خيارات والتنبيهات
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        key: 'emailRsvp',
                        title: 'إشعارات البريد الإلكتروني',
                        desc: 'تلقي إشعار فور تأكيد أو اعتذار أي ضيف على الدعوة',
                      },
                      {
                        key: 'smsRsvp',
                        title: 'إشعارات الرسائل النصية (SMS)',
                        desc: 'إرسال ملخص يومي لنسبة الحضور على رقم جوالك',
                      },
                      {
                        key: 'whatsappAlerts',
                        title: 'تنبيهات WhatsApp المباشرة',
                        desc: 'تلقي رسائل فورية عبر تطبيق واتساب عند اكتمال الحضور',
                      },
                    ].map(({ key, title, desc }) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:bg-amber-50/50"
                        style={{ border: `1px solid ${G.border}` }}
                      >
                        <div>
                          <div className="text-sm font-bold" style={{ color: G.charcoal }}>{title}</div>
                          <div className="text-xs mt-0.5" style={{ color: G.charcoalSoft }}>{desc}</div>
                        </div>
                        <input
                          type="checkbox"
                          // @ts-ignore
                          checked={notifications[key]}
                          onChange={(e) =>
                            setNotifications({ ...notifications, [key]: e.target.checked })
                          }
                          className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Security */}
              {activeTab === 'security' && (
                <div
                  className="p-6 sm:p-8 rounded-3xl shadow-gold-sm space-y-6"
                  style={{ background: G.white, border: `1px solid ${G.border}` }}
                >
                  <h3 className="text-lg font-black flex items-center gap-2" style={{ color: G.charcoal }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                    كلمة المرور والحماية
                  </h3>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        كلمة المرور الحالية
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        كلمة المرور الجديدة
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      />
                    </div>
                  </div>

                  <Divider />

                  <div className="p-4 rounded-2xl flex items-center justify-between" style={{ background: G.beige }}>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6" style={{ color: G.gold }} />
                      <div>
                        <div className="text-sm font-bold" style={{ color: G.charcoal }}>تفعيل التحقق بخطوتين (2FA)</div>
                        <div className="text-xs" style={{ color: G.charcoalSoft }}>حماية حسابك برمز تأكيد يصل للهاتف عند الدخول</div>
                      </div>
                    </div>
                    <OutlineBtn className="text-xs py-2">تفعيل الآن</OutlineBtn>
                  </div>
                </div>
              )}

              {/* Tab 4: Preferences */}
              {activeTab === 'preferences' && (
                <div
                  className="p-6 sm:p-8 rounded-3xl shadow-gold-sm space-y-6"
                  style={{ background: G.white, border: `1px solid ${G.border}` }}
                >
                  <h3 className="text-lg font-black flex items-center gap-2" style={{ color: G.charcoal }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: G.gold }} />
                    تفضيلات المنصة
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        اللغة المفضلـة
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      >
                        <option value="ar">العربية (Arabic)</option>
                        <option value="en">الإنجليزية (English)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                        العملة الافتراضية
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
                      >
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="AED">درهم إماراتي (AED)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}