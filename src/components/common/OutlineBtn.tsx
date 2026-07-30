import { G } from '../../constants/theme'

export function OutlineBtn({ children, onClick, className = '' }: {
  children: React.ReactNode; onClick?: () => void; className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.97] hover:bg-amber-50 ${className}`}
      style={{ border: `1.5px solid ${G.gold}`, color: G.gold, borderRadius: '14px', padding: '11px 24px', fontSize: '14px', background: 'transparent' }}
    >
      {children}
    </button>
  )
}