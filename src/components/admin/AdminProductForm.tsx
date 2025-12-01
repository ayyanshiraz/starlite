"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AdminProductFormProps {
  productToEdit?: any;
  saveProductAction: (formData: FormData) => Promise<void>;
}

export default function AdminProductForm({ productToEdit, saveProductAction }: AdminProductFormProps) {
  const [imagePreview, setImagePreview] = useState(productToEdit?.image || "");
  const [descText, setDescText] = useState("");

  // Helper: Extract readable text from JSON description
  useEffect(() => {
    if (productToEdit?.description) {
      if (typeof productToEdit.description === "string") {
        setDescText(productToEdit.description);
      } else if (typeof productToEdit.description === "object") {
        // If it's the complex JSON, try to grab the 'overview' or just stringify it prettily
        const overview = productToEdit.description.overview;
        if (overview) {
          setDescText(overview);
        } else {
          // Fallback: Convert JSON to text but remove braces to make it cleaner
          setDescText(JSON.stringify(productToEdit.description, null, 2));
        }
      }
    }
  }, [productToEdit]);

  // Handle Image File Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputStyle = "w-full border border-gray-300 p-2 rounded text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none";
  const labelStyle = "block text-xs font-bold text-gray-600 uppercase mb-1";

  return (
    <div className={`p-6 rounded-xl shadow-sm border mb-10 transition-colors ${
        productToEdit ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {productToEdit ? `Editing: ${productToEdit.name}` : 'Add New Product'}
      </h2>
      
      <form action={saveProductAction} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {productToEdit && <input type="hidden" name="id" value={productToEdit.id} />}
        
        {/* 🟢 HIDDEN INPUT TO STORE THE CONVERTED IMAGE DATA */}
        <input type="hidden" name="imageBase64" value={imagePreview} />

        <div className="md:col-span-2">
          <label className={labelStyle}>Product Name *</label>
          <input name="name" required defaultValue={productToEdit?.name || ''} className={inputStyle} placeholder="Product Title" />
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>Slug (URL)</label>
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
        
        {/* 🟢 IMAGE UPLOAD SECTION */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Product Image</label>
          <div className="flex gap-4 items-start">
            {/* File Input */}
            <div className="flex-1">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">Or paste URL below:</p>
              <input 
                name="imageURL" 
                defaultValue={productToEdit?.image || ''} 
                placeholder="https://..." 
                className={inputStyle + " mt-1"} 
                onChange={(e) => setImagePreview(e.target.value)}
              />
            </div>
            {/* Preview */}
            <div className="w-20 h-20 relative bg-gray-100 rounded border overflow-hidden flex-shrink-0">
               {imagePreview ? (
                 <Image src={imagePreview} alt="Preview" fill className="object-contain" />
               ) : (
                 <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
               )}
            </div>
          </div>
        </div>

        {/* 🟢 CLEAN DESCRIPTION TEXT AREA */}
        <div className="md:col-span-4">
          <label className={labelStyle}>Description</label>
          <textarea 
            name="description" 
            rows={5} 
            // Controlled value to ensure we show the "clean" version
            value={descText}
            onChange={(e) => setDescText(e.target.value)}
            className={inputStyle} 
            placeholder="Enter product description here..." 
          />
        </div>

        <div className="md:col-span-4 mt-4">
          <button className={`w-full text-white py-3 px-4 rounded font-bold transition shadow-lg ${
            productToEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}>
            {productToEdit ? 'Update Product' : '+ Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}