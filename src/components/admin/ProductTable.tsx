"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductTable({ products }: { products: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const router = useRouter();

  // Bulk Edit State
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkStock, setBulkStock] = useState("");
  const [isQuote, setIsQuote] = useState(false); // 🟢 New State
  
  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) setSelectedIds([]);
    else setSelectedIds(products.map(p => p.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleBulkUpdate = async () => {
    if(!confirm(`Update ${selectedIds.length} products?`)) return;

    try {
      const res = await fetch('/api/admin/products/bulk-update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            ids: selectedIds, 
            price: bulkPrice, 
            stock: bulkStock,
            isQuote: isQuote // 🟢 Send the checkbox status
        })
      });
      
      if (res.ok) {
        alert("Bulk update successful!");
        setSelectedIds([]);
        setIsBulkEditing(false);
        setIsQuote(false);
        setBulkPrice("");
        setBulkStock("");
        router.refresh();
      }
    } catch (e) {
      alert("Failed to update.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      
      {/* 🟢 BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 p-4 flex flex-wrap items-center gap-4 border-b border-blue-100 animate-in fade-in slide-in-from-top-2">
          <span className="font-bold text-blue-800 whitespace-nowrap">{selectedIds.length} Selected</span>
          
          {isBulkEditing ? (
            <div className="flex flex-wrap gap-3 items-center">
               
               {/* Price Input Group */}
               <div className="flex items-center gap-2 bg-white p-1 rounded border border-gray-300">
                 <input 
                   placeholder="New Price ($)" 
                   className="p-1 text-sm w-28 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                   onChange={e => setBulkPrice(e.target.value)}
                   value={bulkPrice}
                   disabled={isQuote} 
                 />
                 <label className="flex items-center gap-1 text-xs font-bold text-gray-600 px-2 border-l border-gray-200 cursor-pointer hover:text-blue-600">
                    <input 
                        type="checkbox" 
                        checked={isQuote} 
                        onChange={(e) => setIsQuote(e.target.checked)}
                        className="accent-blue-600"
                    />
                    Set Quote
                 </label>
               </div>

               {/* Stock Input */}
               <input 
                 placeholder="New Stock" 
                 className="p-2 border border-gray-300 rounded text-sm w-24 outline-none"
                 onChange={e => setBulkStock(e.target.value)}
                 value={bulkStock} 
               />

               {/* Buttons */}
               <button onClick={handleBulkUpdate} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition">Save</button>
               <button onClick={() => setIsBulkEditing(false)} className="text-gray-600 px-3 py-2 text-sm hover:bg-gray-200 rounded transition">Cancel</button>
            </div>
          ) : (
            <div className="flex gap-2">
               <button onClick={() => setIsBulkEditing(true)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm">
                 Bulk Edit
               </button>
               <button 
                 className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200 transition shadow-sm"
                 onClick={async () => {
                    if(!confirm(`Permanently delete ${selectedIds.length} products?`)) return;
                    await fetch('/api/admin/products/bulk-delete', { 
                        method: 'POST', 
                        body: JSON.stringify({ ids: selectedIds }) 
                    });
                    router.refresh();
                    setSelectedIds([]);
                 }}
               >
                 Bulk Delete
               </button>
            </div>
          )}
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 text-xs uppercase font-bold">
          <tr>
            <th className="p-4 w-10 text-center">
              <input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === products.length && products.length > 0} className="accent-blue-600 w-4 h-4" />
            </th>
            <th className="p-4">Image</th>
            <th className="p-4">Product Info</th>
            <th className="p-4">Stock/SKU</th>
            <th className="p-4">Price</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {products.map((p) => (
            <tr key={p.id} className={`hover:bg-gray-50 transition ${selectedIds.includes(p.id) ? 'bg-blue-50' : ''}`}>
              <td className="p-4 text-center">
                <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} className="accent-blue-600 w-4 h-4" />
              </td>
              <td className="p-4">
                <div className="w-12 h-12 relative bg-white rounded border border-gray-200 p-1 flex items-center justify-center">
                  {p.image && <Image src={p.image} alt={p.name} fill className="object-contain" />}
                </div>
              </td>
              <td className="p-4 max-w-xs">
                <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                <div className="text-xs text-gray-500 mt-1 truncate">{p.category}</div>
              </td>
              <td className="p-4">
                <div className={p.stock > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>{p.stock} Units</div>
                <div className="text-xs text-gray-400 font-mono">SKU: {p.sku || '--'}</div>
              </td>
              <td className="p-4 font-bold text-gray-800">
                {p.price ? `$${(p.price / 100).toFixed(2)}` : <span className="text-blue-600 text-xs uppercase font-bold bg-blue-100 px-2 py-1 rounded">Quote</span>}
              </td>
              <td className="p-4 text-right">
                <Link href={`/admin/products?edit=${p.id}`} scroll={true} className="text-blue-600 font-bold hover:underline">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}