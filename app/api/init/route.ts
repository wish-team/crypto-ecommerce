// app/api/init/route.ts
import { NextResponse } from 'next/server';
import { products } from '../../../data';

export async function POST(req) {
  try {
    const { id } = req.body;
    const product = products.find((p) => p.id === id);

    // Assuming you have a valid API endpoint for creating invoices
    const createInvoiceResponse = await fetch('https://api.cryptomus.com/v1/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: product.price,
        currency: product.currency,
        order_id: 1,
      }),
    });

    // Handle createInvoiceResponse as needed (e.g., check status, etc.)

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
