"use client";

import { useState } from "react";
import Image from "next/image";

// Define the shape of our dynamic specs
interface SpecRow {
  key: string;   // The Heading (e.g. "Storage")
  value: string; // The Detail (e.g. "1TB SSD")
}

interface ProductFormProps {
  productToEdit: any; // Passed from the server
  saveProductAction: (formData: FormData) => Promise<void>; // The Server Action
}

export default function ProductForm({ productToEdit, saveProductAction }: ProductFormProps) {
  
  // 1. Initialize Dynamic Specs State
  const [specs, setSpecs] = useState<SpecRow[]>(() => {
    // If editing, try to convert existing JSON into rows
    if (productToEdit?.description && typeof productToEdit.description === 'object') {
      const desc = productToEdit.description;
      const rows: SpecRow[] = [];
      
      // Attempt to flatten the old JSON structure or new simple structure
      Object.entries(desc).forEach(([k, v]: any) => {
        if (k === 'overview') return; // Skip overview, it has its own box
        
        // Handle the old complex structure (e.g. design.formFactor)
        if (typeof v === 'object' && v.title) {
           // Find the first value that isn't the title
           const detailKey = Object.keys(v).find(subKey => subKey !== 'title');
           const detailValue = detailKey ? v[detailKey] : '';
           rows.push({ key: v.title, value: String(detailValue) });
        } 
        // Handle simple key-value pairs (The new way)
        else if (typeof v === 'string') {
          rows.push({ key: k, value: v });
        }
      });
      return rows.length > 0 ? rows : [{ key: "", value: "" }];
    }
    // Default empty row
    return [{ key: "", value: "" }];
  });

  const [overview, setOverview] = useState(productToEdit?.description?.overview || "");

  // Handlers for Dynamic Rows
  const addRow = () => setSpecs([...specs, { key: "", value: "" }]);
  
  const removeRow = (index: number) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  const updateRow = (index: number, field: 'key' | 'value', text: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = text;
    setSpecs(newSpecs);
  };

  // Styles
  const inputStyle = "w-full border-2 border-gray-300 p-2 rounded-lg text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm";
  const labelStyle = "block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide";

  return (
    <div className={`p-8 rounded-2xl shadow-md border mb-12 transition-colors duration-300 ${
        productToEdit ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-bold mb-6 border-b pb-3 ${productToEdit ? 'text-blue-800 border-blue-200' : 'text-gray-800 border-gray-100'}`}>
          {productToEdit ? `✏️ Editing: ${productToEdit.name}` : '✨ Add New Product'}
        </h2>
        
        <form action={saveProductAction} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {productToEdit && <input type="hidden" name="id" value={productToEdit.id} />}
          
          {/* HIDDEN INPUT TO SEND JSON DATA TO SERVER */}
          <input type="hidden" name="specs_json" value={JSON.stringify({ overview, specs })} />

          {/* BASIC INFO */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Product Name *</label>
            <input name="name" required defaultValue={productToEdit?.name || ''} className={inputStyle} placeholder="Product Title" />
          </div>
          <div className="md:col-span-2">
            <label className={labelStyle}>Slug</label>
            <input name="slug" defaultValue={productToEdit?.slug || ''} className={inputStyle} placeholder="Auto-generated" />
          </div>
          <div>
            <label className={labelStyle}>Category</label>
            <input name="category" defaultValue={productToEdit?.category || ''} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Price ($)</label>
            <input name="price" type="number" step="0.01" defaultValue={productToEdit?.price ? (productToEdit.price / 100).toFixed(2) : ''} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Stock</label>
            <input name="stock" type="number" defaultValue={productToEdit?.stock || 100} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>SKU</label>
            <input name="sku" defaultValue={productToEdit?.sku || ''} className={inputStyle} />
          </div>
          
          <div className="md:col-span-2">
            <label className={labelStyle}>Availability</label>
            <select name="availability" defaultValue={productToEdit?.availability || 'In Stock'} className={inputStyle}>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre Order">Pre Order</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className={labelStyle}>Image URL</label>
            <input name="image" defaultValue={productToEdit?.image || ''} className={inputStyle} />
          </div>

          {/* 🟢 DYNAMIC DETAILS SECTION */}
          <div className="col-span-full border-t pt-6 mt-2">
            <h3 className="text-blue-800 font-bold mb-4 uppercase text-sm">Product Specifications (JSON Builder)</h3>
            
            {/* 1. Main Overview Paragraph */}
            <div className="mb-6">
              <label className={labelStyle}>Main Overview (Paragraph)</label>
              <textarea 
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                rows={3} 
                className={inputStyle} 
                placeholder="A top-tier 32-Channel 4K NVR..." 
              />
            </div>

            {/* 2. Dynamic Rows */}
            <div className="space-y-3">
              <label className={labelStyle}>Custom Specifications</label>
              {specs.map((row, index) => (
                <div key={index} className="flex gap-2 items-center">
                   {/* Heading Input */}
                   <input 
                      type="text" 
                      value={row.key} 
                      onChange={(e) => updateRow(index, 'key', e.target.value)}
                      placeholder="Heading (e.g. Design)"
                      className={`w-1/3 ${inputStyle}`}
                   />
                   
                   {/* Value Input */}
                   <input 
                      type="text" 
                      value={row.value} 
                      onChange={(e) => updateRow(index, 'value', e.target.value)}
                      placeholder="Value (e.g. 1.5U Rack)"
                      className={`w-full ${inputStyle}`}
                   />

                   {/* Delete Button */}
                   <button 
                    type="button" 
                    onClick={() => removeRow(index)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
                   >
                     ✕
                   </button>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={addRow}
                className="text-sm text-blue-600 font-bold hover:underline mt-2 flex items-center gap-1"
              >
                + Add New Heading
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-4 mt-6">
            <button className={`w-full text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${
              productToEdit ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-gradient-to-r from-blue-700 to-blue-500'
            }`}>
              {productToEdit ? 'Update Product' : '+ Create Product'}
            </button>
          </div>
        </form>
      </div>
  );
}