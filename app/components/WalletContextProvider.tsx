"use client"

import type React from "react"
import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css";


export default function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network],
  )

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/8t2I-J5xDw6ybv7oHQMaC"}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}