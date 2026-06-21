'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface OrderData {
  items: { color: string; size: string; price: number; quantity: number }[]
  total: number
  customer: { name: string; phone: string; address: string; email: string }
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('teamdolly-order')
    if (saved) {
      setOrder(JSON.parse(saved))
      localStorage.removeItem('teamdolly-cart')
      localStorage.removeItem('teamdolly-order')
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <div className="w-16 h-16 bg-[#1db954]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-['Bebas_Neue'] text-5xl text-white mb-2">Thank You</h1>
        <p className="text-[#888] mb-8">Your order has been received</p>

        {order && (
          <div className="bg-[#171717] border border-[#2a2a2a] rounded p-6 text-left mb-8">
            <h2 className="text-sm tracking-[0.2em] uppercase text-[#888] mb-4">Order Summary</h2>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                <span>TeamDolly Tee — {item.color}, {item.size} x{item.quantity}</span>
                <span>R{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 text-xl font-bold">
              <span>Total</span>
              <span>R{order.total}</span>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2a2a2a] text-sm text-[#888]">
              <p>{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
              {order.customer.email && <p>{order.customer.email}</p>}
            </div>
          </div>
        )}

        <p className="text-[#888] text-sm mb-6">
          We will contact you shortly with payment confirmation and shipping details.
        </p>

        <Link href="/" className="inline-block bg-[#ff2d78] text-white px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
          Back to Shop
        </Link>
      </div>
    </main>
  )
}