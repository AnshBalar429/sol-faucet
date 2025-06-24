"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { WalletIcon, CheckIcon } from 'lucide-react'

export function WalletButton() {
  const { connected, publicKey } = useWallet()    

  if (connected && publicKey) {
    return (
      <div className="bg-slate-700/80 text-white px-4 py-3 rounded-xl border border-slate-600/50 flex items-center space-x-3">
        <CheckIcon className="w-5 h-5 text-green-400" />
        <div className="flex-1">
          <p className="text-sm text-gray-400">Connected Wallet</p>
          <p className="font-mono text-sm">
            {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <WalletMultiButton
        style={{
          background: "linear-gradient(to right, #06b6d4, #2563eb)",
          borderRadius: "0.75rem",
          height: "48px",
          fontSize: "16px",
          fontWeight: "600",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.1)",
        }}
      >
        {/* <WalletIcon className="w-5 h-5 mr-2" /> */}
        Connect Wallet
      </WalletMultiButton>
    </div>
  )
}