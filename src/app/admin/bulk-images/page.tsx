"use client";

import { useState } from 'react';

export default function BulkImageUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [relinking, setRelinking] = useState(false); // 🟢 New state
  const [logs, setLogs] = useState<string[]>([]);

  // 1. Handle New Uploads
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    setLogs(["⏳ Starting upload engine..."]);

    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch('/api/admin/bulk-images', {
        method: 'POST',
        body: formData,
      });
      
      const result = await res.json();
      
      if (result.success) {
        setLogs(prev => [
          `🎉 Upload Complete! Matched ${result.count} images.`,
          "--------------------------------",
          ...result.logs
        ]);
      } else {
        setLogs(prev => [...prev, "❌ Upload failed: " + result.error]);
      }
    } catch (error) {
      setLogs(prev => [...prev, "❌ Server error occurred."]);
    } finally {
      setUploading(false);
    }
  };

  // 2. 🟢 New: Handle Re-Match (Sync)
  const handleRelink = async () => {
    setRelinking(true);
    setLogs(prev => ["🔄 Scanning folder for unmatched files...", ...prev]);

    try {
      const res = await fetch('/api/admin/relink-images', { method: 'POST' });
      const result = await res.json();

      if (result.success) {
        setLogs(prev => [
          `✅ Re-Sync Complete! Connected ${result.count} previously orphaned images.`,
          "--------------------------------",
          ...prev
        ]);
      } else {
        setLogs(prev => [`❌ Sync Error: ${result.error}`, ...prev]);
      }
    } catch (error) {
      setLogs(prev => ["❌ Connection failed.", ...prev]);
    } finally {
      setRelinking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bulk Image Matcher</h1>
          <p className="text-gray-500 text-sm mt-1">Upload images named like <code>SKU.jpg</code> to auto-connect them.</p>
        </div>
        
        {/* 🟢 THE RE-MATCH BUTTON */}
        <button 
          onClick={handleRelink}
          disabled={relinking || uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {relinking ? (
            <><span>🔄</span> Scanning...</>
          ) : (
            <><span>⚡️</span> Re-Sync / Rematch Files</>
          )}
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex gap-6">
          {/* LEFT: Upload Area */}
          <div className="w-1/2">
            <label className={`block w-full border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${uploading ? 'bg-gray-50 border-gray-300' : 'border-blue-300 hover:bg-blue-50'}`}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleUpload}
                disabled={uploading}
              />
              {uploading ? (
                <div className="text-gray-500 font-bold animate-pulse">Processing...</div>
              ) : (
                <div>
                  <span className="text-5xl block mb-4">📂</span>
                  <span className="text-gray-700 font-bold text-lg">Click to Upload Images</span>
                  <p className="text-xs text-gray-400 mt-2">Supports .jpg, .png, .webp</p>
                </div>
              )}
            </label>
            
            <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-xs text-yellow-800">
              <strong>Tip:</strong> If you upload images <em>before</em> creating the products, just come back here and click the <strong>Re-Sync</strong> button top-right to connect them later.
            </div>
          </div>

          {/* RIGHT: Logs */}
          <div className="w-1/2 bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-xs shadow-inner">
            <div className="text-gray-400 border-b border-gray-700 pb-2 mb-2 flex justify-between">
              <span>System Logs</span>
              <button onClick={() => setLogs([])} className="text-gray-500 hover:text-white">Clear</button>
            </div>
            {logs.length === 0 && <span className="text-gray-600 italic">Waiting for action...</span>}
            {logs.map((log, i) => (
              <div key={i} className={`mb-1 break-words ${log.includes('✅') || log.includes('🎉') ? 'text-green-400' : log.includes('⚠️') ? 'text-yellow-400' : log.includes('❌') ? 'text-red-400' : 'text-gray-300'}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}