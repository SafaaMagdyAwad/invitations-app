import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { G } from '../../constants/theme'

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ background: G.beige, border: `1px solid ${G.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-right font-bold text-base"
        style={{ color: G.charcoal }}
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} style={{ color: G.gold }} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: G.charcoalSoft, borderTop: `1px solid ${G.borderSoft}` }}>
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}