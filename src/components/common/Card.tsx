
import { G } from '../../constants/theme'

export function Card({ children, className = '', onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-gold-md' : ''} ${className}`}
      style={{ background: G.white, border: `1px solid ${G.border}` }}
    >
      {children}
    </div>
  )
}