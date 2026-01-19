import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API response
  const mockOrders = Array.from({ length: 10 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    items: [],
    subtotal: Math.random() * 1000 + 100,
    tax: Math.random() * 100 + 10,
    total: Math.random() * 1000 + 100,
    discount: Math.random() * 50,
    paymentMethod: Math.random() > 0.5 ? 'cash' : 'card' as const,
    status: 'completed' as const,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    customerName: `Customer ${i + 1}`,
  }));

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  const order = await request.json();
  
  // Simulate order creation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newOrder = {
    ...order,
    id: `ORD-${Date.now()}`,
    status: 'completed',
    createdAt: new Date().toISOString(),
  };
  
  return NextResponse.json(newOrder, { status: 201 });
}