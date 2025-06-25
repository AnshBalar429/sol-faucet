# Solana Faucet DApp

A modern Solana faucet web application built with Next.js, React, and Tailwind CSS. Instantly request SOL airdrops on Devnet or Testnet for development and testing purposes.

## Features

- 🌊 **Request SOL Airdrops**: Get free SOL on Devnet or Testnet (max 2 requests per 8 hours).
- 🔒 **Wallet Integration**: Connect with Phantom, Solflare, Torus, Ledger, and more using Solana Wallet Adapter.
- 🎨 **Beautiful UI**: Responsive, dark-themed interface styled with Tailwind CSS.
- ⚡ **Custom Amounts**: Choose from preset SOL amounts for your airdrop.
- 🛡️ **Rate Limiting**: Prevents abuse by limiting requests per wallet.
- 🧩 **Custom RPC Support**: Easily configure your own Solana RPC endpoint.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/AnshBalar429/sol-faucet.git
   cd solana-faucet
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure RPC Endpoint (Optional):**
   - Edit `app/components/WalletContextProvider.tsx` to set your custom Solana RPC endpoint.

4. **Run the development server:**
   ```
   npm run dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Usage

1. **Connect your wallet** using the "Connect Wallet" button.
2. **Select the amount** of SOL to airdrop.
3. **Confirm the airdrop** (max 2 requests per 8 hours).
4. **Check your wallet** for the new balance!

## Folder Structure

```
app/
  components/         # Reusable React components
  globals.css         # Global styles (Tailwind + custom)
  layout.tsx          # Root layout with wallet context
  page.tsx            # Main faucet page
tailwind.config.js    # Tailwind CSS configuration
postcss.config.js     # PostCSS configuration
```

## Customization

- **Add/Remove Wallets:** Edit `WalletContextProvider.tsx` to change supported wallets.
- **Change Networks:** Use the network selector in the UI or modify defaults in the code.
- **Styling:** Update `globals.css` or Tailwind config for custom themes.

## License

MIT

---

> **Note:** This faucet is for development and testing only. It does **not** distribute mainnet