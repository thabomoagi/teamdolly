export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-4">Order Received</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your order. We will contact you shortly with payment confirmation and shipping details.
        </p>
        <a href="/" className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition">
          Back to Shop
        </a>
      </div>
    </main>
  )
}