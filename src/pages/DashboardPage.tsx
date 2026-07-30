import React from 'react'
import { Plus, Calendar, Users, Send, CheckCircle2, Clock, XCircle, ArrowUpLeft, ChevronLeft } from 'lucide-react'
import { G } from '../constants/theme'
import { Page } from '../types'
import { GoldBtn } from '../components/common/GoldBtn'

interface DashboardPageProps {
  setPage: (p: Page) => void
}

export function DashboardPage({ setPage }: DashboardPageProps) {
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch {
      return {}
    }
  }, [])

  // Dummy data for dashboard summary
  const stats = [
    { title: 'إجمالي الفعاليات', value: '12', icon: Calendar, color: G.gold },
    { title: 'إجمالي المدعوين', value: '450', icon: Users, color: '#3B82F6' },
    { title: 'تم إرسالها', value: '380', icon: Send, color: '#10B981' },
    { title: 'تأكيد الحضور', value: '290', icon: CheckCircle2, color: '#059669' },
  ]

  const recentEvents = [
    { id: 1, title: 'حفل زفاف سارة وأحمد', date: '15 أغسطس 2026', guestsCount: 150, status: 'نشط' },
    { id: 2, title: 'مؤتمر التكنولوجيا السنوي', date: '28 سبتمبر 2026', guestsCount: 200, status: 'مسودة' },
    { id: 3, title: 'حفل تخرج خالد', date: '05 أكتوبر 2026', guestsCount: 80, status: 'مكتمل' },
  ]

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8"
      style={{ fontFamily: 'Cairo' }}
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-amber-100/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ color: G.charcoal }}>
            أهلاً بك، {user.name || 'عزيزنا المستخدم'} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
            إليك نظرة عامة على مناسباتك والدعوات التي قمت بإنشائها.
          </p>
        </div>
        <GoldBtn onClick={() => setPage('events')} className="flex items-center gap-2 self-start md:self-auto px-5 py-3">
          <Plus className="w-5 h-5" />
          إنشاء مناسبة جديدة
        </GoldBtn>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white transition-all hover:shadow-md border border-amber-100/50 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold" style={{ color: G.muted }}>
                {stat.title}
              </p>
              <h3 className="text-2xl font-black mt-2" style={{ color: G.charcoal }}>
                {stat.value}
              </h3>
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${stat.color}15` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Events List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-amber-100/50 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ color: G.charcoal }}>
              أحدث المناسبات
            </h2>
            <button
              onClick={() => setPage('events')}
              className="text-xs font-semibold flex items-center gap-1 hover:underline"
              style={{ color: G.gold }}
            >
              عرض الكل
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-2xl border flex items-center justify-between transition-all hover:border-amber-300"
                style={{ borderColor: G.borderSoft, background: G.offWhite }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-white flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: G.charcoal }}>
                      {event.title}
                    </h4>
                    <p className="text-xs" style={{ color: G.muted }}>
                      {event.date} • {event.guestsCount} مدعو
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{
                      background: event.status === 'نشط' ? '#DEF7EC' : G.beige,
                      color: event.status === 'نشط' ? '#03543F' : G.charcoalSoft,
                    }}
                  >
                    {event.status}
                  </span>
                  <button
                    onClick={() => setPage('events')}
                    className="p-2 rounded-lg hover:bg-amber-100/50 transition-colors"
                  >
                    <ArrowUpLeft className="w-4 h-4" style={{ color: G.charcoalSoft }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Responses Summary & Quick Links */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100/50 shadow-sm space-y-4">
            <h2 className="text-lg font-bold" style={{ color: G.charcoal }}>
              وصول سريع
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPage('guests')}
                className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all hover:bg-amber-50"
                style={{ background: G.beige, border: `1px solid ${G.border}` }}
              >
                <Users className="w-6 h-6" style={{ color: G.gold }} />
                <span className="text-xs font-bold" style={{ color: G.charcoal }}>
                  قائمة الضيوف
                </span>
              </button>
              <button
                onClick={() => setPage('templates')}
                className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all hover:bg-amber-50"
                style={{ background: G.beige, border: `1px solid ${G.border}` }}
              >
                <Send className="w-6 h-6" style={{ color: G.gold }} />
                <span className="text-xs font-bold" style={{ color: G.charcoal }}>
                  قوالب الدعوات
                </span>
              </button>
            </div>
          </div>

          {/* Invitation Status Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100/50 shadow-sm space-y-4">
            <h2 className="text-lg font-bold" style={{ color: G.charcoal }}>
              حالة ردود المدعوين
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-semibold" style={{ color: G.charcoal }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> تأكيد الحضور
                </span>
                <span className="font-bold">64%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '64%' }} />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 font-semibold" style={{ color: G.charcoal }}>
                  <Clock className="w-4 h-4 text-amber-500" /> في انتظار الرد
                </span>
                <span className="font-bold">26%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '26%' }} />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="flex items-center gap-2 font-semibold" style={{ color: G.charcoal }}>
                  <XCircle className="w-4 h-4 text-rose-500" /> الاعتذار عن الحضور
                </span>
                <span className="font-bold">10%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}