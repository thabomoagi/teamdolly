'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface OrderItem {
  id: string
  order_id: string
  product_name: string
  price: number
  fee: number | null
  net_amount: number | null
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

interface GroupedOrder {
  order_id: string
  customer_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  status: string
  created_at: string
  items: {
    product_name: string
    color: string
    size: string
    quantity: number
    price: number
  }[]
  totalPrice: number
  totalFee: number
  totalNet: number
}

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return 
      }

      setIsAuthorized(true)
      
      const { data } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'pending')
        .order('created_at', { ascending: false })
      
      if (data) setOrders(data)
      loading && setLoading(false)
    }

    checkAuthAndFetch()
  }, [router])

  const updateOrderStatus = async (orderId: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('order_id', orderId)
    
    const { data } = await supabase
      .from('orders')
      .select('*')
      .neq('status', 'pending')
      .order('created_at', { ascending: false })
    if (data) setOrders(data)
  }

  if (!isAuthorized) {
    return null 
  }

  const totalNetRevenue = orders
    .filter(o => o.status === 'paid' || o.status === 'shipped')
    .reduce((sum, o) => sum + (o.net_amount || o.price), 0)

  const groupedOrdersMap: { [key: string]: GroupedOrder } = {}

  orders.forEach(item => {
    if (!groupedOrdersMap[item.order_id]) {
      groupedOrdersMap[item.order_id] = {
        order_id: item.order_id,
        customer_name: item.customer_name,
        email: item.email,
        phone: item.phone,
        address: item.address,
        status: item.status,
        created_at: item.created_at,
        items: [],
        totalPrice: 0,
        totalFee: 0,
        totalNet: 0
      }
    }
    
    groupedOrdersMap[item.order_id].items.push({
      product_name: item.product_name,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.price
    })
    
    groupedOrdersMap[item.order_id].totalPrice += item.price
    groupedOrdersMap[item.order_id].totalFee += item.fee || 0
    groupedOrdersMap[item.order_id].totalNet += item.net_amount || item.price
  })

  const groupedOrdersList = Object.values(groupedOrdersMap)
  const processingCount = groupedOrdersList.filter(o => o.status === 'paid').length

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans p-6">
      <h1 className="font-['Bebas_Neue'] text-4xl text-white mb-2">Orders</h1>
      <p className="text-[#888] text-sm mb-6">Daflame (PTY) Ltd</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">Successful Orders</p>
          <p className="text-2xl font-bold text-white">{groupedOrdersList.length}</p>
        </div>
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">To Process</p>
          <p className="text-2xl font-bold text-[#f5d000]">{processingCount}</p>
        </div>
        <div className="bg-[#171717] border border-[#2a2a2a] rounded p-4">
          <p className="text-[#888] text-xs uppercase tracking-wider">Net Revenue</p>
          <p className="text-2xl font-bold text-[#1db954]">R{totalNetRevenue.toFixed(2)}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-[#888]">Loading...</p>
      ) : groupedOrdersList.length === 0 ? (
        <p className="text-[#888]">No successful orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-left text-[#888]">
                <th className="p-3">Date</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Products Purchased</th>
                <th className="p-3">Financials (Gross/Fee/Net)</th>
                <th className="p-3">Email</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {groupedOrdersList.map(order => (
                <tr key={order.order_id} className="border-b border-[#2a2a2a] hover:bg-[#171717] align-top">
                  <td className="p-3 text-[#888] whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-400">
                    {order.order_id}
                  </td>
                  <td className="p-3">
                    <ul className="space-y-1 list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-white">
                          <span className="font-medium">{item.product_name}</span>{' '}
                          <span className="text-[#888] text-xs">
                            ({item.color} / {item.size}) x{item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 whitespace-nowrap text-xs space-y-0.5">
                    <div className="text-gray-400">Gross: R{order.totalPrice.toFixed(2)}</div>
                    <div className="text-red-400">Fee: -R{order.totalFee.toFixed(2)}</div>
                    <div className="text-[#1db954] font-semibold">Net: R{order.totalNet.toFixed(2)}</div>
                  </td>
                  <td className="p-3 text-[#888]">{order.email || '-'}</td>
                  <td className="p-3 whitespace-nowrap">{order.customer_name || '-'}</td>
                  <td className="p-3 whitespace-nowrap">{order.phone || '-'}</td>
                  <td className="p-3 text-[#888] max-w-xs truncate">{order.address || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs inline-block ${order.status === 'paid' ? 'bg-[#1db954]/20 text-[#1db954]' : order.status === 'shipped' ? 'bg-[#3a7bd5]/20 text-[#3a7bd5]' : 'bg-[#f5d000]/20 text-[#f5d000]'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.order_id, e.target.value)}
                      className="bg-[#171717] border border-[#2a2a2a] rounded px-2 py-1 text-xs"
                    >
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