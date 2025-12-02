"use client"
import { useState, useEffect } from 'react';
import AdminGuard from '@/components/admin/AdminGuard';

interface OrderItem {
  id: string;
  name?: string; 
  quantity: number;
  price: number;
}

interface Order {
  id: string; 
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  status: string;
  total: number;     
  amountTotal?: number;
  createdAt: string;
  
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;

  items?: OrderItem[]; 
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((order) => order.id === orderId ? { ...order, status: newStatus } : order));
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update db", error);
      alert("Failed to save status");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = search.toLowerCase();
    const orderId = order.id.toLowerCase();
    const customer = (order.customerName || '').toLowerCase();
    const hasProduct = order.items?.some(item => (item.name || '').toLowerCase().includes(term));
    return orderId.includes(term) || customer.includes(term) || hasProduct;
  });

  const toggleDetails = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  if (loading) return <div className="p-6 text-black">Loading orders...</div>;

  return (
    <AdminGuard requiredPermission="orders">
      <div className="p-6 bg-white shadow-md rounded-lg m-4 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-black">Order Management</h1>
          <input
            type="text"
            placeholder="Search by Order ID, Name, or Product..."
            className="p-2 border border-gray-300 rounded w-full md:w-1/3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-black">
            <thead>
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <th className="p-4 font-bold">Order ID</th>
                <th className="p-4 font-bold">Date Placed</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Total</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td></tr>
              ) : (
                filteredOrders.map((order) => {
                  const displayTotal = (order.amountTotal || order.total || 0) / 100;
                  const orderDate = new Date(order.createdAt);

                  return (
                    <>
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4"><span className="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">#{order.id.toUpperCase()}</span></td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{orderDate.toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{order.customerName || "Guest"}</div>
                          <div className="text-xs text-gray-500">{order.customerEmail}</div>
                          {order.customerPhone && <div className="text-xs text-blue-600 font-mono mt-1">{order.customerPhone}</div>}
                        </td> 
                        <td className="p-4 font-bold text-lg">${displayTotal.toFixed(2)}</td>
                        <td className="p-4">
                          <select
                            value={order.status?.toLowerCase() || 'pending'} 
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`p-2 rounded text-xs font-bold border cursor-pointer outline-none shadow-sm uppercase ${
                              order.status?.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800 border-green-300' :
                              order.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                              order.status?.toLowerCase() === 'refunded' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                              'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }`}
                          >
                            <option value="pending">PENDING</option>
                            <option value="processing">PROCESSING</option>
                            <option value="shipped">SHIPPED</option>
                            <option value="delivered">DELIVERED</option>
                            <option value="cancelled">CANCELLED</option>
                            <option value="refunded">REFUNDED</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <button onClick={() => toggleDetails(order.id)} className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1">{expandedOrderId === order.id ? "Hide 🔼" : "View 🔽"}</button>
                        </td>
                      </tr>

                      {expandedOrderId === order.id && (
                        <tr className="bg-gray-50 border-b shadow-inner">
                          <td colSpan={6} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold border-b pb-2 mb-3 text-gray-800">📍 Shipping Address</h3>
                                {order.addressLine1 ? (
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    <span className="block font-medium text-gray-900">{order.addressLine1}</span>
                                    {order.addressLine2 && <span className="block">{order.addressLine2}</span>}
                                    <span className="block">{order.city}, {order.state} {order.postalCode}</span>
                                    <span className="block font-bold text-gray-400 mt-1">{order.country}</span>
                                  </p>
                                ) : <p className="text-sm text-red-500 italic">⚠️ No address found.</p>}
                              </div>
                              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold border-b pb-2 mb-3 text-gray-800">🛒 Items Ordered</h3>
                                {order.items && order.items.length > 0 ? (
                                  <ul className="space-y-0 divider-y divide-gray-100">
                                    {order.items.map((item, index) => (
                                      <li key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                        <div><span className="font-medium text-gray-900 block">{item.name || "Unknown Product"}</span><span className="text-xs text-gray-500">Qty: {item.quantity}</span></div>
                                        <div className="text-right font-bold text-gray-800">${((item.price * item.quantity) / 100).toFixed(2)}</div>
                                      </li>
                                    ))}
                                  </ul>
                                ) : <p className="text-sm text-red-500 italic">⚠️ No items found.</p>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}