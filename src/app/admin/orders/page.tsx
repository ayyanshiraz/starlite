"use client"
import { useState, useEffect } from 'react';

// ==========================================
// 1. FIXED INTERFACE (This fixes the red lines)
// ==========================================
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
  status: string;
  total: number;       // Your API might return 'total'
  amountTotal?: number; // Or 'amountTotal' (Prisma default)
  createdAt: string;
  
  // 🟢 ADDED THESE ADDRESS FIELDS TO FIX ERRORS
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;

  // Relation
  items?: OrderItem[]; 
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Optimistic Update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

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

  // SEARCH FILTER
  const filteredOrders = orders.filter((order) => {
    const term = search.toLowerCase();
    const orderId = order.id.toLowerCase();
    const customer = (order.customerName || '').toLowerCase();
    const hasProduct = order.items?.some(item => 
      (item.name || '').toLowerCase().includes(term)
    );
    return orderId.includes(term) || customer.includes(term) || hasProduct;
  });

  const toggleDetails = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  if (loading) return <div className="p-6 text-black">Loading orders...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg m-4 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-black">Order Management</h1>
        
        <input
          type="text"
          placeholder="Search by Order ID, Name, or Product..."
          className="p-2 border border-gray-300 rounded w-full md:w-1/3 text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <table className="w-full text-left border-collapse text-black">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-4 font-bold">ID / Date</th>
            <th className="p-4 font-bold">Customer</th>
            <th className="p-4 font-bold">Total</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr><td colSpan={5} className="p-4 text-center">No orders found.</td></tr>
          ) : (
            filteredOrders.map((order) => {
              const displayTotal = (order.total || order.amountTotal || 0) / 100;
              
              return (
                <>
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="text-xs font-mono font-bold">{order.id.slice(0, 8)}...</div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold">{order.customerName || "Guest"}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </td> 
                    <td className="p-4 font-bold">${displayTotal.toFixed(2)}</td>
                    
                    <td className="p-4">
                      <select
                        // 🟢 FIX: Force lowercase for comparison so it matches the options below
                        value={order.status?.toLowerCase() || 'pending'} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`p-2 rounded text-xs font-bold border cursor-pointer outline-none shadow-sm ${
                          order.status?.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800 border-green-300' :
                          order.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                          order.status?.toLowerCase() === 'refunded' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                          'bg-yellow-100 text-yellow-800 border-yellow-300'
                        }`}
                      >
                        {/* 🟢 VALUES: Use lowercase to be safe with string DB fields */}
                        <option value="pending">PENDING</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                        <option value="refunded">REFUNDED</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <button 
                        onClick={() => toggleDetails(order.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                      >
                        {expandedOrderId === order.id ? "Hide 🔼" : "View 🔽"}
                      </button>
                    </td>
                  </tr>

                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50 border-b">
                      <td colSpan={5} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* ADDRESS SECTION */}
                          <div className="bg-white p-4 rounded border shadow-sm">
                            <h3 className="font-bold border-b pb-2 mb-2 text-gray-700">📍 Shipping Address</h3>
                            {order.addressLine1 ? (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {order.addressLine1}<br />
                                {order.addressLine2 && <>{order.addressLine2}<br/></>}
                                {order.city}, {order.state} {order.postalCode}<br />
                                {order.country}
                              </p>
                            ) : (
                              <p className="text-sm text-red-500 italic">
                                ⚠️ No address found in database.
                              </p>
                            )}
                          </div>

                          {/* ITEMS SECTION */}
                          <div className="bg-white p-4 rounded border shadow-sm">
                            <h3 className="font-bold border-b pb-2 mb-2 text-gray-700">🛒 Items Ordered</h3>
                            {order.items && order.items.length > 0 ? (
                              <ul className="text-sm text-gray-600 space-y-2">
                                {order.items.map((item, index) => (
                                  <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className="font-medium">{item.name || "Product"}</span>
                                    <div className="text-right">
                                      <span className="block text-xs text-gray-500">Qty: {item.quantity}</span>
                                      <span className="font-bold">
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-red-500 italic">
                                ⚠️ No items found.
                              </p>
                            )}
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
  );
}