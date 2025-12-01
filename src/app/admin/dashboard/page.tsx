import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Force dynamic rendering so stats are always fresh
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // ==========================================
  // 1. DATA FETCHING
  // ==========================================

  // A. Get Stats Helper (Sum & Count by Status)
  const getStats = async (status: string) => {
    return await prisma.order.aggregate({
      _sum: { amountTotal: true },
      _count: true,
      where: { status: { equals: status, mode: 'insensitive' } } 
    });
  };

  const delivered = await getStats('delivered');
  const cancelled = await getStats('cancelled');
  const refunded = await getStats('refunded');
  
  // B. Get Product Count (Restored)
  const productCount = await prisma.product.count();

  // C. Get Recent Orders (Restored)
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });

  // Helper to format currency
  const formatMoney = (amount: number | null) => {
    return `$${((amount || 0) / 100).toFixed(2)}`;
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Overview</h1>

      {/* ==========================================
          2. STATS CARDS GRID
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Delivered (Revenue) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Net Revenue</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-green-700">{formatMoney(delivered._sum.amountTotal)}</p>
              <p className="text-sm text-gray-500">{delivered._count} Delivered Orders</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full text-xl">✅</div>
          </div>
        </div>

        {/* Card 2: Cancelled (Lost) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Lost Revenue</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-red-600">{formatMoney(cancelled._sum.amountTotal)}</p>
              <p className="text-sm text-gray-500">{cancelled._count} Cancelled</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full text-xl">❌</div>
          </div>
        </div>

        {/* Card 3: Refunded */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Refunds Processed</h3>
          <div className="flex justify-between items-end">
             <div>
              <p className="text-3xl font-bold text-purple-600">{formatMoney(refunded._sum.amountTotal)}</p>
              <p className="text-sm text-gray-500">{refunded._count} Refunded</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full text-xl">↩️</div>
          </div>
        </div>

        {/* Card 4: Active Products (Restored) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Active Products</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-blue-600">{productCount}</p>
              <p className="text-sm text-gray-500">In Catalog</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full text-xl">📦</div>
          </div>
        </div>
      </div>

      {/* ==========================================
          3. RECENT ORDERS TABLE (Restored)
      ========================================== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-700">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline font-medium">
            View All Orders →
          </Link>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">No orders found yet.</td>
              </tr>
            ) : (
              recentOrders.map((order) => {
                const status = order.status.toUpperCase();
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-mono text-xs text-gray-500">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {order.customerName || 'Guest'}
                      <div className="text-xs text-gray-400 font-normal">{order.customerEmail}</div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      {formatMoney(order.amountTotal)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                        status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        status === 'REFUNDED' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}