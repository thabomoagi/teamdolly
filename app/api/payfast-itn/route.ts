import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const text = await req.text()
    const params = new URLSearchParams(text)
    const data = Object.fromEntries(params.entries())

    const paymentStatus = data.payment_status
    const orderId = data.m_payment_id
    const amountGross = parseFloat(data.amount_gross || '0')
    const amountFee = parseFloat(data.amount_fee || '0')
    const amountNet = parseFloat(data.amount_net || '0')

    if (paymentStatus === 'COMPLETE') {
      const { error } = await supabaseAdmin
        .from('orders')
        .update({
          status: 'paid',
          fee: amountFee,
          net_amount: amountNet
        })
        .eq('order_id', orderId)

      if (error) {
        return new NextResponse('Database Error', { status: 500 })
      }
    }

    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}