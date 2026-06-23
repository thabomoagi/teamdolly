'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  product_name: string
  price: number
  color: string
  size: string
  quantity: number
  email: string | null
  customer_name: string | null
  phone: string | null
  address: string | null
  status: string
  created_at: string
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return // Stop right here if not logged in
      }

      // Only run if user is authorized
      setIsAuthorized(true)
      
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setOrders(data)
      setLoading(false)
    }

    checkAuthAndFetch()
  }, [router])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    // Re-fetch clean data safely after update
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setOrders(data)
  }

  // Double check that we are authenticated before rendering calculations
  if (!isAuthorized) {
    return null 
  }

  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.price, 0)
  const pendingCount = orders.filter(o => o.status === 'pending').length

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans p-6">
      <h1 className="font-['Bebas_Neue'] text-4xl text-white mb-2">Orders</h1>
      <p className="text-[#888] text-sm mb-6">Daflame (PTY) Ltd</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-[#f5d000]">{pendingCount}</p>
        </div>
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">Revenue</p>
          <p className="text-2xl font-bold text-[#1db954]">R{totalRevenue}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-[#888]">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-[#888]">No orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-left text-[#888]">
                <th className="p-3">Date</th>
                <th className="p-3">Product</th>
                <th className="p-3">Color</th>
                <th className="p-3">Size</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Price</th>
                <th className="p-3">Email</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-[#2a2a2a] hover:bg-[#171717]">
                  <td className="p-3 text-[#888]">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-3">{order.product_name}</td>
                  <td className="p-3">{order.color}</td>
                  <td className="p-3">{order.size}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">R{order.price}</td>
                  <td className="p-3 text-[#888]">{order.email || '-'}</td>
                  <td className="p-3">{order.customer_name || '-'}</td>
                  <td className="p-3">{order.phone || '-'}</td>
                  <td className="p-3 text-[#888] max-w-xs truncate">{order.address || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${order.status === 'paid' ? 'bg-[#1db954]/20 text-[#1db954]' : order.status === 'shipped' ? 'bg-[#3a7bd5]/20 text-[#3a7bd5]' : 'bg-[#f5d000]/20 text-[#f5d000]'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className="bg-[#171717] border border-[#2a2a2a] rounded px-2 py-1 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}