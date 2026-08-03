import React, { useState } from 'react'
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  MoreVertical,
  QrCode,
  ExternalLink,
  Sparkles,
  Filter
} from 'lucide-react'
import { G } from '../constants/theme'
import {  EventItem } from '../types'
import { eventList } from '../data/mockData'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import { useNavigate } from 'react-router-dom'



export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('الكل')
const navigate=useNavigate();
  // تصفية الفعاليات حسب البحث والوسم
  const filteredEvents = eventList.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = filterTag === 'الكل' || event.tag === filterTag
    return matchesSearch && matchesTag
  })

  // إحصائيات سريعة
  const totalEvents = eventList.length
  const totalGuests = eventList.reduce((acc, item) => acc + item.guests, 0)
  const totalConfirmed = eventList.reduce((acc, item) => acc + item.confirmed, 0)
  const confirmationRate = Math.round((totalConfirmed / totalGuests) * 100) || 0

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>
              إدارة الفعاليات
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              استعرض جميع المناسبات الخاصة بك، راقب الحضور واختصر إدارة الضيوف
            </p>
          </div>

          <GoldBtn onClick={() => navigate('/create-event')}>
            <Plus className="w-5 h-5" />
            إنشاء فعالية جديدة
          </GoldBtn>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'إجمالي الفعاليات', value: totalEvents, icon: Calendar, color: G.gold },
            { label: 'إجمالي الضيوف المدعوين', value: totalGuests, icon: Users, color: G.info },
            { label: 'تأكيد الحضور', value: totalConfirmed, icon: CheckCircle2, color: G.success },
            { label: 'نسبة الإجابة العامة', value: `${confirmationRate}%`, icon: Sparkles, color: G.purple },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="p-5 rounded-2xl flex items-center gap-4 shadow-gold-xs transition-transform hover:-translate-y-0.5"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: G.muted }}>
                  {label}
                </div>
                <div className="text-2xl font-black mt-0.5" style={{ color: G.charcoal }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div
          className="p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-gold-xs"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن فعالية أو موقع..."
              className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm transition-all outline-none"
              style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
            />
            <Search
              className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: G.muted }}
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 ml-1 flex-shrink-0 hidden sm:block" style={{ color: G.muted }} />
            {['الكل', 'زفاف', 'تخرج', 'عيد ميلاد', 'أعمال'].map((tag) => {
              const active = filterTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                  style={{
                    background: active ? G.gold : G.beige,
                    color: active ? G.white : G.charcoalSoft,
                    border: `1px solid ${active ? G.gold : G.border}`,
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: EventItem) => {
              const progressPercentage = Math.round((event.confirmed / event.guests) * 100)

              return (
                <div
                  key={event.id}
                  className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold-md flex flex-col justify-between"
                  style={{ background: G.white, border: `1px solid ${G.border}` }}
                >
                  {/* Event Image Banner */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${event.img}?w=600&h=300&fit=crop&auto=format`}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.7) 0%, transparent 60%)' }}
                    />
                    
                    {/* Tag Badge */}
                    <span
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-gold-xs"
                      style={{ background: G.gold }}
                    >
                      {event.tag}
                    </span>

                    {/* Quick QR Scanner Icon */}
                    <button
                      onClick={() => navigate('/qr-scanner')}
                      title="ماسح QR الفعالية"
                      className="absolute top-4 left-4 w-9 h-9 rounded-xl glass flex items-center justify-center text-white transition-transform hover:scale-110"
                      style={{ border: `1px solid rgba(255,255,255,0.3)` }}
                    >
                      <QrCode className="w-4 h-4" />
                    </button>

                    {/* Event Title inside Image */}
                    <div className="absolute bottom-3 right-4 left-4">
                      <h3 className="text-lg font-black text-white truncate">{event.name}</h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5 text-xs" style={{ color: G.charcoalSoft }}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: G.gold }} />
                        <span className="font-semibold">{event.date}</span>
                        <span className="text-gray-300">•</span>
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: G.gold }} />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: G.gold }} />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* RSVP Progress Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span style={{ color: G.charcoal }}>حالة تأكيد الحضور</span>
                        <span style={{ color: G.gold }}>{event.confirmed} / {event.guests} مؤكد</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: G.beige }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progressPercentage}%`,
                            background: 'linear-gradient(90deg, #C9A227 0%, #E8C84A 100%)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="pt-3 flex items-center gap-2 border-t" style={{ borderColor: G.borderSoft }}>
                      <OutlineBtn
                        onClick={() => navigate('/guests')}
                        className="flex-1 py-2.5 text-xs font-bold"
                      >
                        <Users className="w-3.5 h-3.5" />
                        الضيوف ({event.guests})
                      </OutlineBtn>

                      <button
                        onClick={() => navigate('/invitation')}
                        title="معاينة البطاقة"
                        className="p-2.5 rounded-xl transition-colors hover:bg-amber-50"
                        style={{ border: `1px solid ${G.border}`, color: G.gold }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div
            className="p-12 text-center rounded-3xl shadow-gold-xs"
            style={{ background: G.white, border: `1px solid ${G.border}` }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: G.beige }}
            >
              <Calendar className="w-8 h-8" style={{ color: G.muted }} />
            </div>
            <h3 className="text-lg font-black mb-1" style={{ color: G.charcoal }}>
              لم يتم العثور على فعاليات
            </h3>
            <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: G.charcoalSoft }}>
              لا توجد نتائج تطابق بحثك حالياً. يمكنك تعديل كلمات البحث أو إضافة فعالية جديدة.
            </p>
            <GoldBtn onClick={() => navigate('/create-event')}>
              <Plus className="w-4 h-4" />
              إنشاء فعالية جديدة
            </GoldBtn>
          </div>
        )}
      </div>
    </div>
  )
}