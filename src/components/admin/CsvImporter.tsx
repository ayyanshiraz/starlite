"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

export default function CsvImporter() {
  const [importing, setImporting] = useState(false);
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const products = results.data;
        
        try {
          const res = await fetch('/api/admin/products/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products })
          });
          
          const data = await res.json();
          
          if (res.ok) {
            alert(`Import Complete!\nCreated: ${data.stats.created}\nUpdated: ${data.stats.updated}\nErrors: ${data.stats.errors}`);
            router.refresh();
          } else {
            alert("Import failed: " + data.error);
          }
        } catch (err) {
          alert("Failed to send data to server.");
        } finally {
          setImporting(false);
        }
      }
    });
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileUpload}
        disabled={importing}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {importing ? (
        <p className="text-blue-600 font-bold animate-pulse">Importing Products...</p>
      ) : (
        <div>
          <p className="text-gray-700 font-bold">📂 Bulk Import (CSV)</p>
          <p className="text-xs text-gray-500 mt-1">Drag & drop or click to upload</p>
          <p className="text-[10px] text-gray-400 mt-2">Columns: Name, Slug, Price, Category, SKU, Stock, Image, Description</p>
        </div>
      )}
    </div>
  );
}