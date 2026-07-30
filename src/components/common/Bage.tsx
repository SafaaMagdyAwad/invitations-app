import { G } from '../../constants/theme'

export function Badge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; bg: string; color: string; dot: string }> = {
    confirmed: { label: 'مؤكد', bg: G.successLight, color: '#065F46', dot: G.success },
    declined: { label: 'مرفوض', bg: G.dangerLight, color: '#991B1B', dot: G.danger },
    pending: { label: 'معلق', bg: G.warningLight, color: '#92400E', dot: G.warning },
    used: { label: 'مستخدم', bg: G.infoLight, color: '#1E40AF', dot: G.info },
    sent: { label: 'مرسل', bg: G.purpleLight, color: '#5B21B6', dot: G.purple },
    none: { label: 'لا يوجد', bg: '#F9FAFB', color: '#6B7280', dot: '#D1D5DB' },
  }
  const { label, bg, color, dot } = cfg[status] ?? cfg.none
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: bg, color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  )
}