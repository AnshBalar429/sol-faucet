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
import "@solana/wallet-adapter-react-ui/styles.css";

export default function WalletContextProvider({ children }: { children: React.ReactNode }) {
    const network = WalletAdapterNetwork.Devnet
    const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || `https://api.${network}.solana.com`

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
        <ConnectionProvider endpoint={RPC_URL}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
