import React, { useState } from 'react'
import {
  Sparkles,
  Heart,
  GraduationCap,
  Briefcase,
  PartyPopper,
  Eye,
  Check,
  ChevronRight,
  Crown,
  Search,
  Wand2
} from 'lucide-react'
import { G } from '../constants/theme'
import  {GoldBtn} from '../components/common/GoldBtn'
import  { OutlineBtn } from '../components/common/OutlineBtn'
import  {Divider } from '../components/common/Divider'
import { useNavigate } from 'react-router-dom'



interface TemplateItem {
  id: string
  title: string
  category: 'زفاف' | 'تخرج' | 'أعمال' | 'حفلات'
  image: string
  isPremium?: boolean
  description: string
  popularCount: number
}

export function TemplatesPage() {
    const navigate=useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل')
  const [searchTerm, setSearchTerm] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null)

  // قائمة القوالب المتاحة
  const templates: TemplateItem[] = [
    {
      id: 'tpl-1',
      title: 'دعوة زفاف مذهبة الملكي',
      category: 'زفاف',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&fit=crop&q=80',
      isPremium: true,
      description: 'تصميم فاخر بأطر مذهبة وزخارف أندلسية راقية تناسب حفل الزفاف الأسطوري.',
      popularCount: 1420,
    },
    {
      id: 'tpl-2',
      title: 'حفل تخرج وتكريم مهني',
      category: 'تخرج',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&fit=crop&q=80',
      isPremium: false,
      description: 'بطاقة أنيقة مخصصة لمنتسبي الجامعات والدرجات العلمية الرفيعة.',
      popularCount: 890,
    },
    {
      id: 'tpl-3',
      title: 'مؤتمر ومعرض الأعمال الملكي',
      category: 'أعمال',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&fit=crop&q=80',
      isPremium: true,
      description: 'طابع عملي ورسمي مميز بدعم رموز الاستجابة السريعة السريعة وحضور VIP.',
      popularCount: 650,
    },
    {
      id: 'tpl-4',
      title: 'حفل ميلاد أريج الذهبي',
      category: 'حفلات',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&fit=crop&q=80',
      isPremium: false,
      description: 'بطاقة دعوة مبهجة وأنيقة بألوان دافئة وحيوية لاستقبال الضيوف والأصدقاء.',
      popularCount: 430,
    },
    {
      id: 'tpl-5',
      title: 'عقد قران ومأدبة عشاء',
      category: 'زفاف',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&fit=crop&q=80',
      isPremium: false,
      description: 'تصميم كلاسيكي ناعم يعكس الفخامة البسيطة وأجواء الفرح العائلية.',
      popularCount: 1100,
    },
    {
      id: 'tpl-6',
      title: 'ملتقى الابتكار والتقنية',
      category: 'أعمال',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&fit=crop&q=80',
      isPremium: true,
      description: 'تصميم متطور بطابع عصري جذاب للمؤتمرات والندوات الاستثمارية.',
      popularCount: 520,
    },
  ]

  const categories = [
    { id: 'الكل', label: 'جميع القوالب', icon: Sparkles },
    { id: 'زفاف', label: 'أعراس وعقد قران', icon: Heart },
    { id: 'تخرج', label: 'حفلات تخرج', icon: GraduationCap },
    { id: 'أعمال', label: 'مؤتمرات وأعمال', icon: Briefcase },
    { id: 'حفلات', label: 'مناسبات خاصة', icon: PartyPopper },
  ]

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCat = selectedCategory === 'الكل' || tpl.category === selectedCategory
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCat && matchesSearch
  })

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: `${G.gold}15`, color: G.gold }}>
              <Wand2 className="w-3.5 h-3.5" /> قوالب مصممة باحترافية
            </div>
            <h1 className="text-3xl font-black" style={{ color: G.charcoal }}>
              مكتبة قوالب الدعوات
            </h1>
            <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
              اختر القالب الأنسب لمناسبتك واستمتع بتخصيص كامل للألوان والتفاصيل
            </p>
          </div>

          <GoldBtn onClick={() => navigate('/create-event')} className="px-6 py-3">
            <Sparkles className="w-4 h-4" />
            إنشاء تصميم مخصص
          </GoldBtn>
        </div>

        {/* Filter and Search Bar */}
        <div
          className="p-4 rounded-3xl shadow-gold-xs space-y-4"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(({ id, label, icon: Icon }) => {
                const active = selectedCategory === id
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap"
                    style={{
                      background: active ? G.gold : G.beige,
                      color: active ? G.white : G.charcoalSoft,
                      border: `1px solid ${active ? G.gold : G.border}`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث باسم القالب..."
                className="w-full px-4 py-2.5 pr-10 rounded-2xl text-xs outline-none transition-all"
                style={{ background: G.beige, border: `1px solid ${G.border}`, color: G.charcoal }}
              />
              <Search
                className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{ color: G.muted }}
              />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group rounded-3xl overflow-hidden shadow-gold-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-md flex flex-col justify-between"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <div>
                {/* Template Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4 gap-2">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-black/60 backdrop-blur-md flex items-center gap-1.5 hover:bg-black/80 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> معاينة
                    </button>
                    <GoldBtn
                      onClick={() => navigate('/create-event')}
                      className="text-xs py-2 px-4 shadow-none"
                    >
                      استخدام القالب
                    </GoldBtn>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {template.isPremium && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-gold-xs">
                        <Crown className="w-3 h-3" /> VIP
                      </span>
                    )}
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md text-white bg-black/40"
                    >
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-black" style={{ color: G.charcoal }}>
                    {template.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: G.charcoalSoft }}>
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t" style={{ borderColor: G.borderSoft }}>
                <span style={{ color: G.muted }}>استُخدم {template.popularCount} مرة</span>
                <button
                  onClick={() => navigate('/create-event')}
                  className="font-bold flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: G.gold }}
                >
                  اختر القالب <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Quick Preview */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div
              className="w-full max-w-lg rounded-3xl p-6 shadow-gold-lg relative space-y-6"
              style={{ background: G.white, border: `1px solid ${G.border}` }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src={previewTemplate.image}
                  alt={previewTemplate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  قالب {previewTemplate.category}
                </span>
                <h3 className="text-xl font-black mt-2" style={{ color: G.charcoal }}>
                  {previewTemplate.title}
                </h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: G.charcoalSoft }}>
                  {previewTemplate.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GoldBtn
                  onClick={() => {
                    setPreviewTemplate(null)
                    navigate('/create-event')
                  }}
                  className="flex-1 py-3 text-xs"
                >
                  بدء التصميم بهذا القالب
                </GoldBtn>
                <OutlineBtn
                  onClick={() => setPreviewTemplate(null)}
                  className="py-3 px-5 text-xs"
                >
                  إغلاق
                </OutlineBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}