'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  color: string
  size: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('teamdolly-cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const updateQuantity = (index: number, qty: number) => {
    if (qty < 1) return
    const updated = cart.map((item, i) => 
      i === index ? { ...item, quantity: qty } : item
    )
    setCart(updated)
    localStorage.setItem('teamdolly-cart', JSON.stringify(updated))
  }

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index)
    setCart(updated)
    localStorage.setItem('teamdolly-cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#2a2a2a]">
        <Link href="/" className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">
          TEAM <span className="text-[#ff2d78]">DOLLY</span>
        </Link>
        <Link href="/" className="text-[#888] text-xs tracking-[0.15em] uppercase hover:text-[#ff2d78] transition-colors">
          Continue Shopping
        </Link>
      </nav>

      <div className="pt-24 px-4 max-w-3xl mx-auto">
        <h1 className="font-['Bebas_Neue'] text-5xl text-white mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#888] text-lg mb-6">Your cart is empty</p>
            <Link href="/#shop" className="inline-block bg-[#ff2d78] text-white px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center gap-6 bg-[#171717] border border-[#2a2a2a] rounded p-4">
                <div 
                  className="w-20 h-20 rounded flex items-center justify-center text-xs font-semibold"
                  style={{ 
                    backgroundColor: item.color === 'White' ? '#f0f0f0' : 
                                    item.color === 'Pink' ? '#ff69b4' : 
                                    item.color === 'Black' ? '#1a1a1a' : 
                                    item.color === 'Yellow' ? '#f5d000' : 
                                    item.color === 'Blue' ? '#3a7bd5' : 
                                    item.color === 'Orange' ? '#ff6b35' : '#0a0a0a',
                    color: item.color === 'White' || item.color === 'Yellow' ? '#000' : '#fff'
                  }}
                >
                  {item.color}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">TeamDolly Tee</h3>
                  <p className="text-[#888] text-sm">{item.color} / {item.size}</p>
                  <p className="text-white font-semibold mt-1">R{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(i, item.quantity - 1)} className="w-8 h-8 border border-[#2a2a2a] rounded text-[#888] hover:text-white transition">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(i, item.quantity + 1)} className="w-8 h-8 border border-[#2a2a2a] rounded text-[#888] hover:text-white transition">+</button>
                </div>
                <button onClick={() => removeItem(i)} className="text-[#ff2d78] text-sm hover:text-white transition">Remove</button>
              </div>
            ))}

            <div className="border-t border-[#2a2a2a] pt-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#888]">Total</span>
                <span className="text-2xl font-bold text-white">R{total}</span>
              </div>
              <Link href="/checkout" className="block w-full bg-[#ff2d78] text-white text-center py-4 rounded font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition-colors">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}