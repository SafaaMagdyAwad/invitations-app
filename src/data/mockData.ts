import { Crown, Star, Flower2, Moon, Sparkles, Cake, GraduationCap, Briefcase } from 'lucide-react'
import { G } from '../constants/theme'
import { Guest, EventItem, TemplateItem } from '../types'

export const chartMonths = [
  { month: 'يناير', confirmed: 45, declined: 8, pending: 20 },
  { month: 'فبراير', confirmed: 88, declined: 12, pending: 32 },
  { month: 'مارس', confirmed: 130, declined: 25, pending: 48 },
  { month: 'أبريل', confirmed: 105, declined: 18, pending: 38 },
  { month: 'مايو', confirmed: 168, declined: 32, pending: 55 },
  { month: 'يونيو', confirmed: 215, declined: 44, pending: 70 },
]

export const pieSlices = [
  { name: 'تأكيد', value: 65, color: G.gold },
  { name: 'رفض', value: 15, color: G.danger },
  { name: 'معلق', value: 20, color: G.muted },
]

export const guestList: Guest[] = [
  { id: 1, name: 'أحمد محمد العمري', phone: '0501234567', status: 'confirmed', qr: 'used', checked: true },
  { id: 2, name: 'سارة عبدالله الخالدي', phone: '0559876543', status: 'confirmed', qr: 'sent', checked: false },
  { id: 3, name: 'محمد يوسف الشمري', phone: '0531112233', status: 'pending', qr: 'pending', checked: false },
  { id: 4, name: 'نورة سعد القحطاني', phone: '0567890123', status: 'declined', qr: 'none', checked: false },
  { id: 5, name: 'عبدالرحمن فهد الدوسري', phone: '0543219876', status: 'confirmed', qr: 'sent', checked: false },
  { id: 6, name: 'ريم خالد المطيري', phone: '0512345678', status: 'pending', qr: 'pending', checked: false },
  { id: 7, name: 'فيصل عمر الغامدي', phone: '0556789012', status: 'confirmed', qr: 'used', checked: true },
  { id: 8, name: 'منى ناصر الزهراني', phone: '0534567890', status: 'pending', qr: 'pending', checked: false },
  { id: 9, name: 'خالد سليمان البقمي', phone: '0548765432', status: 'confirmed', qr: 'sent', checked: false },
  { id: 10, name: 'لمياء حسن العتيبي', phone: '0522334455', status: 'declined', qr: 'none', checked: false },
]

export const eventList: EventItem[] = [
  { id: 1, name: 'حفل زفاف أحمد وسارة', date: '١٥ مارس ٢٠٢٥', time: '٧:٠٠ م', location: 'قاعة الفردوس، الرياض', guests: 250, confirmed: 180, img: 'photo-1519741497674-611481863552', tag: 'زفاف' },
  { id: 2, name: 'حفل تخرج محمد العمري', date: '٢٢ أبريل ٢٠٢٥', time: '٤:٠0 م', location: 'فندق هيلتون، جدة', guests: 100, confirmed: 75, img: 'photo-1523050854058-8df90110c9f1', tag: 'تخرج' },
  { id: 3, name: 'عيد ميلاد نورة', date: '١٠ مايو ٢٠٢٥', time: '٦:٠٠ م', location: 'فيلا الورود، الدمام', guests: 50, confirmed: 42, img: 'photo-1464349095431-e9a21285b5f3', tag: 'عيد ميلاد' },
  { id: 4, name: 'مؤتمر شركة الابتكار', date: '٥ يونيو ٢٠٢٥', time: '٩:٠٠ ص', location: 'مركز الملك عبدالله، الرياض', guests: 500, confirmed: 320, img: 'photo-1558618666-fcd25c85cd64', tag: 'أعمال' },
]

export const templateList: TemplateItem[] = [
  { id: 'luxury', name: 'زفاف فاخر', icon: Crown, color: G.gold, img: 'photo-1519741497674-611481863552', h: 260 },
  { id: 'classic', name: 'كلاسيكي', icon: Star, color: '#6B7280', img: 'photo-1464366400600-7168b8af9bc3', h: 200 },
  { id: 'floral', name: 'زهري', icon: Flower2, color: '#EC4899', img: 'photo-1490750967868-88df5691a85e', h: 280 },
  { id: 'islamic', name: 'إسلامي', icon: Moon, color: G.success, img: 'photo-1580418827493-f2b22c0a76cb', h: 220 },
  { id: 'modern', name: 'عصري', icon: Sparkles, color: G.info, img: 'photo-1550305080-4e029753abcf', h: 240 },
  { id: 'birthday', name: 'عيد ميلاد', icon: Cake, color: G.warning, img: 'photo-1464349095431-e9a21285b5f3', h: 210 },
  { id: 'graduation', name: 'تخرج', icon: GraduationCap, color: G.purple, img: 'photo-1523050854058-8df90110c9f1', h: 250 },
  { id: 'business', name: 'أعمال', icon: Briefcase, color: G.charcoal, img: 'photo-1558618666-fcd25c85cd64', h: 230 },
]