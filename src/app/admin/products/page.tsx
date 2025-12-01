import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // 🟢 FIXED IMPORT
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 10;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; page?: string }>;
}) {
  const params = await searchParams;
  const editingId = params.edit;
  const currentPage = Number(params.page) || 1;

  // 1. Fetch Paginated Products
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // 2. Fetch Product to Edit
  let productToEdit = null;
  if (editingId) {
    productToEdit = await prisma.product.findUnique({
      where: { id: editingId },
    });
  }

  // Helper: Convert Description (JSON or String) to text for the input box
  const getDescriptionString = (desc: any) => {
    if (!desc) return '';
    if (typeof desc === 'string') return desc;
    return JSON.stringify(desc, null, 2); // Makes JSON readable in the box
  };

  const editDescriptionValue = getDescriptionString(productToEdit?.description);

  // =========================================================
  // SERVER ACTIONS
  // =========================================================

  async function saveProduct(formData: FormData) {
    "use server";
    
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slugInput = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const priceInput = formData.get('price') as string;
    const image = formData.get('image') as string || '/placeholder.png';
    const sku = formData.get('sku') as string;
    const stock = parseInt(formData.get('stock') as string) || 0;
    const description = formData.get('description') as string;
    const availability = formData.get('availability') as string;

    const priceCents = priceInput ? Math.round(parseFloat(priceInput) * 100) : null;

    let finalSlug = slugInput;
    if (!finalSlug) {
      const slugRaw = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); 
      finalSlug = `${slugRaw}-${Date.now()}`;
    }

    const data = {
      name,
      slug: finalSlug,
      category,
      price: priceCents,
      image,
      sku,
      stock,
      description, // Save as text/string now
      availability
    };

    if (id) {
      await prisma.product.update({ where: { id }, data });
    } else {
      await prisma.product.create({ data });
    }
    
    revalidatePath('/admin/products');
  }

  async function deleteProduct(formData: FormData) {
    "use server";
    const id = formData.get('id') as string;
    try {
      await prisma.product.delete({ where: { id } });
      revalidatePath('/admin/products');
    } catch (error) {
      console.error("Failed to delete product");
    }
  }

  async function goToPage(formData: FormData) {
    "use server";
    const page = formData.get('page');
    redirect(`/admin/products?page=${page}`);
  }

  // 🟢 STYLE CONSTANTS (Visible Borders & Colors)
  const inputStyle = "w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 bg-white focus:border-blue-600 outline-none shadow-sm font-medium";
  const labelStyle = "block text-xs font-bold text-gray-600 uppercase mb-1 ml-1";

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="max-w-7xl mx-auto min-h-screen pb-20 p-6 bg-gray-50">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Product Manager</h1>
        {editingId && (
          <Link 
            href={`/admin/products?page=${currentPage}`}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow transition"
          >
            Cancel Editing
          </Link>
        )}
      </div>

      {/* --- EDIT/ADD FORM --- */}
      <div className={`p-8 rounded-2xl shadow-md border mb-12 transition-all duration-300 ${
        productToEdit ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-bold mb-6 border-b pb-4 ${productToEdit ? 'text-blue-800 border-blue-200' : 'text-gray-800 border-gray-100'}`}>
          {productToEdit ? `✏️ Editing: ${productToEdit.name}` : '✨ Add New Product'}
        </h2>
        
        <form action={saveProduct} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {productToEdit && <input type="hidden" name="id" value={productToEdit.id} />}

          {/* 1. Name */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Product Name *</label>
            <input name="name" required defaultValue={productToEdit?.name || ''} className={inputStyle} placeholder="e.g. Dell Latitude 5540" />
          </div>

          {/* 2. Slug */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Slug (URL)</label>
            <input name="slug" defaultValue={productToEdit?.slug || ''} className={inputStyle} placeholder="Auto-generated if empty" />
          </div>

          {/* 3. Category */}
          <div>
            <label className={labelStyle}>Category</label>
            <input name="category" defaultValue={productToEdit?.category || ''} className={inputStyle} placeholder="Laptops" />
          </div>

          {/* 4. SKU */}
          <div>
            <label className={labelStyle}>SKU</label>
            <input name="sku" defaultValue={productToEdit?.sku || ''} className={inputStyle} placeholder="ABC-123" />
          </div>

          {/* 5. Stock */}
          <div>
            <label className={labelStyle}>Stock Qty</label>
            <input name="stock" type="number" defaultValue={productToEdit?.stock || 100} className={inputStyle} />
          </div>

          {/* 6. Availability */}
          <div>
            <label className={labelStyle}>Availability</label>
            <select name="availability" defaultValue={productToEdit?.availability || 'In Stock'} className={inputStyle}>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre Order">Pre Order</option>
            </select>
          </div>

          {/* 7. Price */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Price ($)</label>
            <input name="price" type="number" step="0.01" defaultValue={productToEdit?.price ? (productToEdit.price / 100).toFixed(2) : ''} className={inputStyle} placeholder="0.00 (Leave empty for Quote)" />
          </div>

          {/* 8. Image */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Image URL</label>
            <input name="image" defaultValue={productToEdit?.image || ''} className={inputStyle} placeholder="/images/product.jpg" />
          </div>

          {/* 9. Description */}
          <div className="md:col-span-4">
            <label className={labelStyle}>Description</label>
            <textarea 
              name="description" 
              rows={6} 
              defaultValue={editDescriptionValue} 
              className={`${inputStyle} font-mono text-sm`} // Monospace for JSON editing
              placeholder="Enter details..." 
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-4 mt-4 flex justify-end">
            <button className={`text-white py-3 px-8 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${
              productToEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-700 hover:bg-blue-800'
            }`}>
              {productToEdit ? 'Update Product' : '+ Create Product'}
            </button>
          </div>
        </form>
      </div>

      {/* --- PRODUCT TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase font-bold tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-5">Image</th>
              <th className="p-5">Info</th>
              <th className="p-5">Stock/SKU</th>
              <th className="p-5">Price</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className={`group transition-colors duration-200 ${editingId === p.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <td className="p-5 w-24">
                  <div className="w-16 h-16 relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-1">
                    {p.image && <Image src={p.image} alt={p.name} fill className="object-contain" />}
                  </div>
                </td>
                <td className="p-5">
                  <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-1 font-mono bg-gray-100 inline-block px-2 py-0.5 rounded">{p.slug.slice(0, 30)}...</div>
                  <div className="text-xs text-gray-400 mt-1">{p.category || 'Uncategorized'}</div>
                </td>
                <td className="p-5 text-sm">
                  <div className={`font-bold ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {p.stock > 0 ? `${p.stock} Units` : 'Out of Stock'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">SKU: {p.sku || '--'}</div>
                </td>
                <td className="p-5 font-bold text-gray-800">
                  {p.price ? `$${(p.price / 100).toFixed(2)}` : <span className="text-blue-600 text-xs uppercase font-bold">Quote</span>}
                </td>
                <td className="p-5 text-right space-x-4">
                  <Link 
                    href={`/admin/products?page=${currentPage}&edit=${p.id}`} 
                    scroll={true} 
                    className="text-blue-600 font-bold hover:underline bg-blue-50 px-3 py-1.5 rounded text-xs"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct} className="inline-block">
                    <input type="hidden" name="id" value={p.id} />
                    <button className="text-red-500 font-bold hover:underline bg-red-50 px-3 py-1.5 rounded text-xs">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟢 FIXED PAGINATION BAR (First | Prev | Next | Last) */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl border shadow-sm gap-4">
        
        <div className="flex items-center gap-2">
          {/* First */}
          <Link 
            href={`/admin/products?page=1`} 
            className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}
          >
            « First
          </Link>
          
          {/* Previous */}
          <Link 
            href={`/admin/products?page=${currentPage > 1 ? currentPage - 1 : 1}`} 
            className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}
          >
            ‹ Prev
          </Link>

          <span className="mx-2 text-sm font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded border border-gray-200">
            Page {currentPage} <span className="text-gray-500 font-normal">of</span> {totalPages || 1}
          </span>

          {/* Next */}
          <Link 
            href={`/admin/products?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`} 
            className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}
          >
            Next ›
          </Link>

          {/* Last */}
          <Link 
            href={`/admin/products?page=${totalPages}`} 
            className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}
          >
            Last »
          </Link>
        </div>

        {/* Go To Page */}
        <form action={goToPage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
          <span className="text-sm font-bold text-gray-700 pl-2">Go to:</span>
          <input 
            type="number" 
            name="page" 
            min="1" 
            max={totalPages} 
            placeholder="#" 
            className="border-gray-300 border-2 rounded p-1 w-16 text-center text-sm font-bold text-black focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />
          <button className="bg-gray-900 text-white px-4 py-1 rounded text-sm font-bold hover:bg-black transition shadow-md">
            Go
          </button>
        </form>

      </div>
    </div>
  );
}