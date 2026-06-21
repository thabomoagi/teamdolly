'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  color: string
  size: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('teamdolly-cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (!name || !phone || !address) {
        alert('Please fill in all required fields')
        return
    }
    
    const orderData = {
        items: cart,
        total,
        customer: { name, phone, address, email }
    }
    
    localStorage.setItem('teamdolly-order', JSON.stringify(orderData))
    
    // Save to Supabase
    cart.forEach(async (item) => {
        await supabase.from('orders').insert({
        product_name: `TeamDolly Tee — ${item.color}, ${item.size}`,
        price: item.price * item.quantity,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        email: email || null,
        customer_name: name,
        phone: phone,
        address: address,
        status: 'pending'
        })
    })
  
    const itemNames = cart.map(i => `TeamDolly Tee ${i.color} ${i.size} x${i.quantity}`).join(', ')
  const payfastUrl = `https://www.payfast.co.za/eng/process?amount=${total}&item_name=${encodeURIComponent(itemNames)}&return_url=${encodeURIComponent('https://teamdolly.co.za/success')}&cancel_url=${encodeURIComponent('https://teamdolly.co.za/cart')}`
  
  window.location.href = payfastUrl
}

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#2a2a2a]">
        <Link href="/" className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">
          TEAM <span className="text-[#ff2d78]">DOLLY</span>
        </Link>
        <Link href="/cart" className="text-[#888] text-xs tracking-[0.15em] uppercase hover:text-[#ff2d78] transition-colors">
          Back to Cart
        </Link>
      </nav>

      <div className="pt-24 px-4 max-w-2xl mx-auto pb-20">
        <h1 className="font-['Bebas_Neue'] text-5xl text-white mb-8">Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#888] mb-6">Your cart is empty</p>
            <Link href="/#shop" className="inline-block bg-[#ff2d78] text-white px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-[#171717] border border-[#2a2a2a] rounded p-6">
              <h2 className="text-sm tracking-[0.2em] uppercase text-[#888] mb-4">Order Summary</h2>
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                  <span>TeamDolly Tee — {item.color}, {item.size} x{item.quantity}</span>
                  <span>R{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 text-xl font-bold">
                <span>Total</span>
                <span>R{total}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Full Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Phone Number *</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Delivery Address *</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Email (optional)</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition" />
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full bg-[#ff2d78] text-white py-4 rounded font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
              Pay with PayFast — R{total}
            </button>

            <p className="text-[#444] text-xs text-center">Delivery within South Africa included</p>
          </div>
        )}
      </div>
    </main>
  )
}