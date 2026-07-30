export function GoldBtn({ children, onClick, className = '', small = false }: {
  children: React.ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.97] hover:scale-[1.02] shadow-gold-sm hover:shadow-gold-md ${className}`}
      style={{
        background: 'linear-gradient(135deg, #C9A227 0%, #E8C84A 45%, #B8911E 100%)',
        color: '#FFFFFF',
        borderRadius: '14px',
        padding: small ? '8px 20px' : '12px 28px',
        fontSize: small ? '13px' : '15px',
      }}
    >
      {children}
    </button>
  )
}