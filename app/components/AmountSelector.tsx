"use client"

interface AmountSelectorProps {
  onSelect: (amount: number) => void
  onClose: () => void
}

export function AmountSelector({ onSelect, onClose }: AmountSelectorProps) {
  const amounts = [0.5, 1, 2.5, 5]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Selector */}
      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-2xl z-50 p-4">
        <div className="grid grid-cols-2 gap-3">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => onSelect(amount)}
              className="bg-slate-700/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-white py-2 px-4 rounded-xl border border-slate-600/50 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium"
            >
              {amount} SOL
            </button>
          ))}
        </div>
      </div>
    </>
  )
}