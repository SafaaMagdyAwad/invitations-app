import { G } from '../../constants/theme'

export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, ${G.gold}80, transparent)` }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: G.gold }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${G.gold}80, transparent)` }} />
    </div>
  )
}