export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <div className="w-16 h-16 bg-[#1db954]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-['Bebas_Neue'] text-5xl text-white mb-2">Thank You</h1>
        <p className="text-[#888] mb-8">Your order has been received. We will contact you shortly with confirmation and shipping details.</p>

        <a href="/" className="inline-block bg-[#ff2d78] text-white px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
          Back to Shop
        </a>
      </div>
    </main>
  )
}