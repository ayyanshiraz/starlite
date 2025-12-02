"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

export default function CsvImporter() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState("");
  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setProgress("Reading file...");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const allProducts = results.data;
        const total = allProducts.length;
        
        const BATCH_SIZE = 50; // Process 50 items at a time
        let processed = 0;
        let createdTotal = 0;
        let updatedTotal = 0;
        let errorTotal = 0;

        // 🟢 LOOP IN BATCHES
        for (let i = 0; i < total; i += BATCH_SIZE) {
          const batch = allProducts.slice(i, i + BATCH_SIZE);
          
          setProgress(`Importing ${i + 1} - ${Math.min(i + BATCH_SIZE, total)} of ${total}...`);

          try {
            const res = await fetch('/api/admin/products/import', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ products: batch })
            });
            
            const data = await res.json();
            if (res.ok) {
              createdTotal += data.stats.created;
              updatedTotal += data.stats.updated;
              errorTotal += data.stats.errors;
            } else {
              console.error("Batch failed:", data.error);
              errorTotal += batch.length;
            }
          } catch (err) {
            console.error("Network Error on batch", i);
            errorTotal += batch.length;
          }

          processed += batch.length;
        }

        setImporting(false);
        alert(`Import Complete!\n\n✅ Created: ${createdTotal}\n🔄 Updated: ${updatedTotal}\n❌ Errors: ${errorTotal}`);
        router.refresh();
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
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      {importing ? (
        <div className="text-blue-600">
          <p className="font-bold animate-pulse">Processing...</p>
          <p className="text-xs font-mono mt-1">{progress}</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 font-bold">📂 Bulk Import (CSV)</p>
          <p className="text-xs text-gray-500 mt-1">Drag & drop or click to upload</p>
          <p className="text-[10px] text-gray-400 mt-2">Columns: Manufacturer product no, Description, Price, Availability</p>
        </div>
      )}
    </div>
  );
}