import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // 🟢 FIXED IMPORT LOCATION
import Link from 'next/link';
import Image from 'next/image';
import ProductForm from '@/components/admin/ProductForm'; // Import the new component
import ProductSearch from '@/components/admin/ProductSearch'; // 🟢 Import Search

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 10;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const editingId = params.edit;
  const currentPage = Number(params.page) || 1;
  const searchTerm = params.search || "";

  // 🟢 1. Build Search Filter
  const whereCondition: any = {};
  
  if (searchTerm) {
    whereCondition.OR = [
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { sku: { contains: searchTerm, mode: 'insensitive' } },
      { category: { contains: searchTerm, mode: 'insensitive' } },
      { slug: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  // 2. Fetch Data (With Filter)
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: whereCondition, // Apply Filter
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where: whereCondition }), // Count filtered items
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  let productToEdit = null;
  if (editingId) {
    productToEdit = await prisma.product.findUnique({
      where: { id: editingId },
    });
  }

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
    const availability = formData.get('availability') as string;
    
    const specsRaw = formData.get('specs_json') as string;
    let descriptionJson = {};
    
    if (specsRaw) {
      const parsed = JSON.parse(specsRaw);
      const dynamicObj: any = { overview: parsed.overview };
      parsed.specs.forEach((item: any) => {
        if(item.key) dynamicObj[item.key] = item.value;
      });
      descriptionJson = dynamicObj;
    }

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
      description: descriptionJson,
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
    const term = formData.get('term');
    redirect(`/admin/products?page=${page}&search=${term || ''}`);
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="max-w-7xl mx-auto min-h-screen pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
        
        {/* 🟢 SEARCH BAR INTEGRATION */}
        <div className="w-full md:w-1/3">
          <ProductSearch />
        </div>

        {editingId && (
          <Link 
            href={`/admin/products?page=${currentPage}`}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow"
          >
            Cancel Editing
          </Link>
        )}
      </div>

      {/* Render Client Form */}
      <ProductForm productToEdit={productToEdit} saveProductAction={saveProduct} />

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="p-5 border-b">Image</th>
              <th className="p-5 border-b">Info</th>
              <th className="p-5 border-b">Stock/SKU</th>
              <th className="p-5 border-b">Price</th>
              <th className="p-5 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500 font-bold">
                  No products found matching &quot;{searchTerm}&quot;
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className={`group transition-colors duration-200 ${editingId === p.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <td className="p-5 w-24">
                    <div className="w-16 h-16 relative bg-white rounded-lg border shadow-sm overflow-hidden p-1">
                      {p.image && <Image src={p.image} alt={p.name} fill className="object-contain" />}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono bg-gray-100 inline-block px-1 rounded">{p.slug}</div>
                  </td>
                  <td className="p-5 text-sm">
                    <div className={`font-bold ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>{p.stock} Units</div>
                    <div className="text-xs text-gray-400 mt-1">{p.sku || '--'}</div>
                  </td>
                  <td className="p-5 font-bold text-gray-800 text-lg">
                    ${p.price ? (p.price / 100).toFixed(2) : 'Quote'}
                  </td>
                  <td className="p-5 text-right space-x-4">
                    <Link href={`/admin/products?page=${currentPage}&search=${searchTerm}&edit=${p.id}`} scroll={true} className="text-blue-600 font-bold hover:underline bg-blue-50 px-3 py-1 rounded">Edit</Link>
                    <form action={deleteProduct} className="inline-block"><input type="hidden" name="id" value={p.id} /><button className="text-red-500 font-bold hover:underline bg-red-50 px-3 py-1 rounded">Delete</button></form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl border shadow-sm gap-4">
        <div className="flex items-center gap-2">
          {/* Pagination Links now include search term */}
          <Link href={`/admin/products?page=1&search=${searchTerm}`} className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}>« First</Link>
          <Link href={`/admin/products?page=${currentPage > 1 ? currentPage - 1 : 1}&search=${searchTerm}`} className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}>‹ Prev</Link>
          
          <span className="mx-2 text-sm font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded border border-gray-200">
            Page {currentPage} of {totalPages || 1}
          </span>
          
          <Link href={`/admin/products?page=${currentPage < totalPages ? currentPage + 1 : totalPages}&search=${searchTerm}`} className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}>Next ›</Link>
          <Link href={`/admin/products?page=${totalPages}&search=${searchTerm}`} className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-white text-gray-900 hover:bg-black hover:text-white border-gray-300'}`}>Last »</Link>
        </div>
        
        {/* Go To Page Input */}
        <form action={goToPage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
          <input type="hidden" name="term" value={searchTerm} /> {/* Keep search term */}
          <span className="text-sm font-bold text-gray-700 pl-2">Go to:</span>
          <input type="number" name="page" min="1" max={totalPages} placeholder="#" className="border-gray-300 border rounded p-1 w-16 text-center text-sm font-bold text-black focus:ring-2 focus:ring-blue-500 outline-none bg-white"/>
          <button className="bg-gray-900 text-white px-4 py-1 rounded text-sm font-bold hover:bg-black transition shadow-md">Go</button>
        </form>
      </div>
    </div>
  );
}