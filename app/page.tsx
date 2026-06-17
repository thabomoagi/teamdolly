'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [color, setColor] = useState('Pink')
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [email, setEmail] = useState('')

  const colors = ['Pink', 'White', 'Yellow', 'Blue', 'Orange']
  const sizes = ['S', 'M', 'L', 'XL']

  const colorHex: Record<string, string> = {
    Pink: '#ff69b4',
    White: '#ffffff',
    Yellow: '#ffd700',
    Blue: '#0066cc',
    Orange: '#ff6600'
  }

  const handleBuy = async () => {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        product_name: `TeamDolly Tee — ${color}, ${size}`,
        price: 400 * quantity,
        color,
        size,
        quantity,
        email: email || null,
        status: 'pending'
      })
      .select()
      .single()

    if (error || !data) {
      alert('Error creating order')
      return
    }

    const orderId = data.id
    const payfastUrl = `https://www.payfast.co.za/eng/process?m_payment_id=${orderId}&amount=${400 * quantity}&item_name=TeamDolly+Tee+${color}+${size}&return_url=${encodeURIComponent('https://teamdolly.co.za/success')}&cancel_url=${encodeURIComponent('https://teamdolly.co.za/')}`

    window.location.href = payfastUrl
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-2 tracking-tight">TEAM DOLLY</h1>
        <p className="text-gray-400 text-lg mb-12">Official merchandise</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-gray-900 flex items-center justify-center" style={{ backgroundColor: colorHex[color] }}>
              <span className="text-2xl font-bold text-black">TeamDolly Tee</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold">TeamDolly Tee</h2>
              <p className="text-gray-400 mt-2">R400</p>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Color</p>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition ${color === c ? 'border-white' : 'border-gray-600'}`}
                      style={{ backgroundColor: colorHex[c] }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Size</p>
                <div className="flex gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-10 h-10 border rounded transition ${size === s ? 'border-white bg-gray-800' : 'border-gray-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Quantity</p>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="w-16 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-center"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Email (optional, for receipt)</p>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                />
              </div>

              <button
                onClick={handleBuy}
                className="w-full mt-6 bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition"
              >
                Buy Now — R{400 * quantity}
              </button>
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg overflow-hidden opacity-50">
            <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">Coming Soon</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold">TeamDolly Hoodie</h2>
              <p className="text-gray-400 mt-2">R600</p>
              <p className="text-gray-500 mt-4 text-sm">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}