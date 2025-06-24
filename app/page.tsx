"use client"

import { useState, useEffect } from "react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { ChevronDownIcon, LinkIcon } from 'lucide-react'
import { SolanaLogo } from "./components/SolanaLogo"
import { AmountSelector } from "./components/AmountSelector"
import { Toast } from "./components/Toast"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletButton } from "./components/WalletButton"

interface AirdropRequest {
  timestamp: number
  amount: number
}

export default function SolanaFaucet() {
  const [network, setNetwork] = useState("devnet")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showAmountSelector, setShowAmountSelector] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [requestCount, setRequestCount] = useState(0)
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    const requests = getStoredRequests()
    setRequestCount(requests.length)
  }, [])

  const getStoredRequests = (): AirdropRequest[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("solana-faucet-requests")
    if (!stored) return []

    const requests: AirdropRequest[] = JSON.parse(stored)
    const eightHoursAgo = Date.now() - 8 * 60 * 60 * 1000

    const validRequests = requests.filter((req) => req.timestamp > eightHoursAgo)
    
    localStorage.setItem("solana-faucet-requests", JSON.stringify(validRequests))

    return validRequests
  }

  const addRequest = (amount: number) => {
    const requests = getStoredRequests()
    requests.push({ timestamp: Date.now(), amount })
    localStorage.setItem("solana-faucet-requests", JSON.stringify(requests))
    setRequestCount(requests.length)
  }

  const canMakeRequest = (): boolean => {
    return requestCount < 2;
  }

  const handleConfirmAirdrop = async () => {
    if (!canMakeRequest() || !selectedAmount || !publicKey) return

    setIsLoading(true)

    try {
      const lamports = selectedAmount * LAMPORTS_PER_SOL

      const result = await connection.requestAirdrop(publicKey,lamports);
      console.log("Airdrop result:", result)

      addRequest(selectedAmount)
      setToast({
        message: `Successfully airdropped ${selectedAmount} SOL!`,
        type: "success",
      })

      // Reset form
      setSelectedAmount(null)
    } catch (error) {
      console.error("Airdrop failed:", error)
      setToast({
        message: "Airdrop failed. Please try again later.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-indigo-950">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-center mb-16 float-animation">
          <SolanaLogo className="w-12 h-12 mr-4" />
          <h1 className="text-4xl font-bold text-white">SOLANA</h1>
        </div>

        {/* Request Airdrop Card */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Airdrop</h2>
              <p className="text-gray-400">Maximum of 2 requests every 8 hours</p>
              <p className="text-sm text-gray-500 mt-1">Requests used: {requestCount}/2</p>
            </div>

            {/* Network Selector */}
            <div className="relative">
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="bg-slate-700/80 text-white px-4 py-2 rounded-xl border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none pr-10"
              >
                <option value="devnet">devnet</option>
                <option value="testnet">testnet</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Wallet Connection */}
            <div>
              <WalletButton />
            </div>

            {/* Amount Selector */}
            <div className="relative">
              <button
                onClick={() => setShowAmountSelector(!showAmountSelector)}
                className="w-full bg-slate-700/80 text-white px-4 py-3 rounded-xl border border-slate-600/50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-left flex items-center justify-between"
              >
                <span className={selectedAmount ? "text-white" : "text-gray-400"}>
                  {selectedAmount ? `${selectedAmount} SOL` : "Amount"}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </button>

              {showAmountSelector && (
                <AmountSelector
                  onSelect={(amount) => {
                    setSelectedAmount(amount)
                    setShowAmountSelector(false)
                  }}
                  onClose={() => setShowAmountSelector(false)}
                />
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmAirdrop}
              disabled={!canMakeRequest() || isLoading}
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                canMakeRequest() && !isLoading
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-600/50 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span>Confirm Airdrop</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">  
          <p className="mb-2">This tool is designed for development purposes and does not distribute mainnet SOL.</p> 
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}