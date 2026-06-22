'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface CartItem {
  color: string
  size: string
  price: number
  quantity: number
}

const isValidPhone = (phone: string) => {
  const clean = phone.replace(/\s/g, '')
  return /^0[6-8][0-9]{8}$/.test(clean) || /^\+27[6-8][0-9]{8}$/.test(clean)
}

const isValidEmail = (email: string) => {
  if (!email) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('teamdolly-cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleCheckout = () => {
    const newErrors: Record<string, string> = {}

    if (name.trim().length < 2) newErrors.name = 'Enter your full name'
    if (!isValidPhone(phone)) newErrors.phone = 'Enter a valid SA number (e.g. 0662317303)'
    if (address.trim().length < 10) newErrors.address = 'Enter a complete delivery address'
    if (email && !isValidEmail(email)) newErrors.email = 'Invalid email address'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setPaying(true)

    const orderData = {
      items: cart,
      total,
      customer: { name, phone, address, email }
    }

    localStorage.setItem('teamdolly-order', JSON.stringify(orderData))

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
    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY

    const payfastUrl = `https://www.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${total}&item_name=${encodeURIComponent(itemNames)}&return_url=${encodeURIComponent('https://teamdolly.co.za/success')}&cancel_url=${encodeURIComponent('https://teamdolly.co.za/cart')}`

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
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); clearError('name') }}
                  className={`w-full bg-[#171717] border rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition ${errors.name ? 'border-red-500' : 'border-[#2a2a2a]'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); clearError('phone') }}
                  placeholder="0662317303"
                  className={`w-full bg-[#171717] border rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition ${errors.phone ? 'border-red-500' : 'border-[#2a2a2a]'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">Delivery Address *</label>
                <textarea
                  value={address}
                  onChange={e => { setAddress(e.target.value); clearError('address') }}
                  rows={3}
                  placeholder="123 Main Street, Pretoria, 0001"
                  className={`w-full bg-[#171717] border rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition ${errors.address ? 'border-red-500' : 'border-[#2a2a2a]'}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); clearError('email') }}
                  className={`w-full bg-[#171717] border rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition ${errors.email ? 'border-red-500' : 'border-[#2a2a2a]'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={paying}
              className="w-full bg-[#ff2d78] text-white py-4 rounded font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors disabled:opacity-50"
            >
              {paying ? 'Redirecting to PayFast...' : `Pay with PayFast — R${total}`}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}