import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  QrCode,
  Download,
  Trash2,
  Phone
} from 'lucide-react'
import { G } from '../constants/theme'
import {  Guest } from '../types'
import { initialGuests } from '../data/mockData'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import { useNavigate } from 'react-router-dom'


export function GuestsPage() {
    const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'الكل' | 'مؤكد' | 'معتذر' | 'معلق'>('الكل')

  // تصفية الضيوف حسب البحث والحالة
  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'الكل' || guest.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // إحصائيات الأرقام
  const totalGuests = guests.length
  const confirmedCount = guests.filter((g) => g.status === 'مؤكد').length
  const declinedCount = guests.filter((g) => g.status === 'معتذر').length
  const pendingCount = guests.filter((g) => g.status === 'معلق').length

  // حذف ضيف
  const handleDelete = () => {
  }

  // تغيير حالة الضيف
  const handleStatusChange = () => {
    
  }

  const getStatusBadge = (status: 'مؤكد' | 'معتذر' | 'معلق') => {
    switch (status) {
      case 'مؤكد':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> مؤكد
          </span>
        )
      case 'معتذر':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> معتذر
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> بانتظار الرد
          </span>
        )
    }
  }

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
              قائمة الضيوف
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              متابعة وإدارة حالة حضور الضيوف، إرسال الدعوات، وتوليد رموز الـ QR
            </p>
          </div>

          <div className="flex items-center gap-3">
            <OutlineBtn className="text-xs">
              <Download className="w-4 h-4" />
              تصدير القائمة (CSV)
            </OutlineBtn>
            <GoldBtn onClick={() => navigate('/create-guest')}>
              <UserPlus className="w-4 h-4" />
              إضافة ضيف جديد
            </GoldBtn>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'إجمالي الضيوف', value: totalGuests, icon: Users, color: G.gold },
            { label: 'تأكيد الحضور', value: confirmedCount, icon: CheckCircle2, color: G.success },
            { label: 'المعتذرون', value: declinedCount, icon: XCircle, color: '#EF4444' },
            { label: 'بانتظار الرد', value: pendingCount, icon: Clock, color: G.warning },
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

        {/* Search & Filter Bar */}
        <div
          className="p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-gold-xs"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الضيف، الفعالية أو رقم الهاتف..."
              className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm transition-all outline-none"
              style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
            />
            <Search
              className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: G.muted }}
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 ml-1 flex-shrink-0 hidden sm:block" style={{ color: G.muted }} />
            {(['الكل', 'مؤكد', 'معتذر', 'معلق'] as const).map((status) => {
              const active = statusFilter === status
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                  style={{
                    background: active ? G.gold : G.beige,
                    color: active ? G.white : G.charcoalSoft,
                    border: `1px solid ${active ? G.gold : G.border}`,
                  }}
                >
                  {status}
                </button>
              )
            })}
          </div>
        </div>

        {/* Guests Table Card */}
        <div
          className="rounded-3xl overflow-hidden shadow-gold-sm"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          {filteredGuests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr
                    className="text-xs font-bold border-b"
                    style={{ background: G.beige, borderColor: G.border, color: G.charcoalSoft }}
                  >
                    <th className="py-4 px-6">الضيف</th>
                    <th className="py-4 px-6">الفعالية / المناسبة</th>
                    <th className="py-4 px-6">رقم الهاتف</th>
                    <th className="py-4 px-6">عدد المرافقين</th>
                    <th className="py-4 px-6">حالة الحضور</th>
                    <th className="py-4 px-6 text-center">رمز QR</th>
                    <th className="py-4 px-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: G.borderSoft }}>
                  {filteredGuests.map((guest) => (
                    <tr
                      key={guest.id}
                      className="transition-colors hover:bg-amber-50/40"
                    >
                      {/* الضيف */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                            style={{ background: 'linear-gradient(135deg, #C9A227 0%, #E8C84A 100%)' }}
                          >
                            {guest.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm" style={{ color: G.charcoal }}>
                              {guest.name}
                            </div>
                            <div className="text-xs" style={{ color: G.muted }}>
                              تأكيد: {guest.updatedAt || 'غير متاح'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* المناسبة */}
                      <td className="py-4 px-6 font-semibold" style={{ color: G.charcoalSoft }}>
                        {guest.eventName}
                      </td>

                      {/* الهاتف */}
                      <td className="py-4 px-6 font-mono text-xs" style={{ color: G.charcoal }}>
                        <div className="flex items-center gap-1.5 dir-ltr justify-end">
                          <Phone className="w-3.5 h-3.5" style={{ color: G.muted }} />
                          <span>{guest.phone}</span>
                        </div>
                      </td>

                      {/* المرافقين */}
                      <td className="py-4 px-6 font-bold" style={{ color: G.charcoal }}>
                        {guest.plusOne || 1}
                      </td>

                      {/* الحالة */}
                      <td className="py-4 px-6">
                        <div className="relative inline-block group">
                          {getStatusBadge(guest.status as 'مؤكد' | 'معتذر' | 'معلق')}
                          
                          {/* قائمة تعديل السريع للحالة عند التمرير أو النقر */}
                          <div className="hidden group-hover:flex absolute right-0 top-full mt-1 bg-white border border-amber-200 rounded-xl shadow-gold-md p-1 z-20 flex-col gap-1 min-w-[110px]">
                            <button
                              onClick={() => handleStatusChange()}
                              className="px-2 py-1 text-xs text-right hover:bg-amber-50 rounded-lg text-emerald-700 font-bold"
                            >
                              مؤكد
                            </button>
                            <button
                              onClick={() => handleStatusChange()}
                              className="px-2 py-1 text-xs text-right hover:bg-amber-50 rounded-lg text-rose-700 font-bold"
                            >
                              معتذر
                            </button>
                            <button
                              onClick={() => handleStatusChange()}
                              className="px-2 py-1 text-xs text-right hover:bg-amber-50 rounded-lg text-amber-700 font-bold"
                            >
                              معلق
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* رمز QR */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => navigate('/confirm-success')}
                          title="عرض بطاقة QR"
                          className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-transform hover:scale-110"
                          style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.gold }}
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                      </td>

                      {/* الإجراءات */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDelete()}
                          title="حذف الضيف"
                          className="p-2 rounded-lg transition-colors hover:bg-rose-50 hover:text-rose-600 text-gray-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: G.beige }}
              >
                <Users className="w-8 h-8" style={{ color: G.muted }} />
              </div>
              <h3 className="text-lg font-black mb-1" style={{ color: G.charcoal }}>
                لم يتم العثور على ضيوف
              </h3>
              <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: G.charcoalSoft }}>
                لا يوجد ضيوف يطابقون خيارات البحث الحالية.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}