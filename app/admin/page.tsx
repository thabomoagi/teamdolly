import { supabase } from '@/lib/supabase'

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-800">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="p-4">Date</th>
              <th className="p-4">Product</th>
              <th className="p-4">Color</th>
              <th className="p-4">Size</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => (
              <tr key={order.id} className="border-b border-gray-800">
                <td className="p-4 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-4">{order.product_name}</td>
                <td className="p-4">{order.color}</td>
                <td className="p-4">{order.size}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">R{order.price}</td>
                <td className="p-4">{order.email || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${order.status === 'paid' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">No orders yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}