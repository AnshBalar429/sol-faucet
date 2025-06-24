"use client"

import { useEffect } from "react"
import { CheckCircleIcon, XCircleIcon, XIcon as XMarkIcon } from 'lucide-react'

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div
        className={`rounded-xl shadow-2xl p-4 flex items-start space-x-3 ${
          type === "success"
            ? "bg-emerald-900/90 backdrop-blur-sm border border-emerald-700/50 shadow-2xl"
            : "bg-red-900/90 backdrop-blur-sm border border-red-700/50 shadow-2xl"
        }`}
      >
        {type === "success" ? (
          <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <p className="text-white text-sm">{message}</p>
        </div>

        <button onClick={onClose} className="text-gray-400 hover:text-white flex-shrink-0">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}