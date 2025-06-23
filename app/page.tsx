import { SolanaLogo } from "./components/SolanaLogo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-indigo-950">
      <div className="container mx-auto max-w-2xl px-4 py-12">

        {/* Header */}
        <div className="flex items-center justify-center mb-16 float-animation">
          <SolanaLogo className="w-12 h-12 mr-4" />
          <h1 className="text-4xl font-bold text-white">SOLANA</h1>
        </div>

        
      </div>
    </div>
  );
}