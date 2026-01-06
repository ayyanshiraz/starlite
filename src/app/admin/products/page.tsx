import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; 
import Link from 'next/link';
import Image from 'next/image';

// Client Components
import AdminSearch from '@/components/admin/AdminSearch';
import AdminProductForm from '@/components/admin/AdminProductForm';
import ProductTable from '@/components/admin/ProductTable';
import CsvImporter from '@/components/admin/CsvImporter';
import AdminGuard from '@/components/admin/AdminGuard';

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
  const query = params.search || '';

  // 1. BUILD DATABASE FILTER
  const whereCondition: any = {};
  if (query) {
    const isNumber = !isNaN(Number(query));
    whereCondition.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { sku: { contains: query, mode: 'insensitive' } },
      { slug: { contains: query, mode: 'insensitive' } },
      { category: { contains: query, mode: 'insensitive' } },
    ];
    if (isNumber) {
      whereCondition.OR.push({ price: { equals: Math.round(Number(query) * 100) } });
    }
  }

  // 2. FETCH DATA
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  let productToEdit = null;
  if (editingId) {
    productToEdit = await prisma.product.findUnique({ where: { id: editingId } });
  }

  // --- SERVER ACTIONS ---

  async function saveProduct(formData: FormData) {
    "use server";
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slugInput = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const priceInput = formData.get('price') as string;
    const sku = formData.get('sku') as string;
    const stock = parseInt(formData.get('stock') as string) || 0;
    const description = formData.get('description') as string;
    const availability = formData.get('availability') as string;
    
    const imageBase64 = formData.get('imageBase64') as string;
    const imageURLInput = formData.get('imageURL') as string;
    const finalImage = imageBase64 || imageURLInput || '/placeholder.png';

    const priceCents = priceInput ? Math.round(parseFloat(priceInput) * 100) : null;

    let finalSlug = slugInput;
    if (!finalSlug) {
      const slugRaw = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); 
      finalSlug = `${slugRaw}-${Date.now()}`;
    }

    const data = {
      name, slug: finalSlug, category, price: priceCents, image: finalImage, sku, stock, description, availability
    };

    try {
      if (id) await prisma.product.update({ where: { id }, data });
      else await prisma.product.create({ data });
      revalidatePath('/admin/products');
    } catch (error) { console.error("Save Error:", error); }
  }

  async function goToPage(formData: FormData) {
    "use server";
    const page = formData.get('page');
    redirect(`/admin/products?page=${page}&search=${query}`);
  }

  return (
    <AdminGuard requiredPermission="products">
      <div className="max-w-7xl mx-auto min-h-screen pb-20 p-6 bg-gray-50">
        
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Manager</h1>
            <p className="text-sm text-gray-500 mt-1">Manage inventory, prices, and import data.</p>
          </div>
          
          {/* --- ACTION BAR --- */}
          <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-center">
            {/* 1. Search Bar */}
            <div className="flex-grow md:w-64 w-full">
              <AdminSearch />
            </div>

            {/* 2. Bulk Product Upload (CSV) */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <CsvImporter />
            </div>

            {/* 3. 🟢 NEW: Bulk Image Upload Button */}
            <Link 
              href="/admin/bulk-images"
              className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 hover:text-blue-600 transition h-[42px]"
            >
              <span>📷</span> 
              <span>Bulk Images</span>
            </Link>

            {/* 4. Cancel Edit (Only visible when editing) */}
            {editingId && (
              <Link href={`/admin/products?page=${currentPage}`} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow transition flex items-center justify-center h-[42px]">
                Cancel
              </Link>
            )}
          </div>
        </div>

        <AdminProductForm productToEdit={productToEdit} saveProductAction={saveProduct} />

        {products.length === 0 ? (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or add a new product.</p>
           </div>
        ) : (
          <ProductTable products={products} />
        )}

        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 gap-4">
          <div className="flex items-center gap-2">
            <Link href={`/admin/products?page=1&search=${query}`} className={`px-3 py-1.5 border rounded text-sm font-medium transition ${currentPage === 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}>« First</Link>
            <Link href={`/admin/products?page=${currentPage > 1 ? currentPage - 1 : 1}&search=${query}`} className={`px-3 py-1.5 border rounded text-sm font-medium transition ${currentPage === 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}>‹ Prev</Link>
            <span className="px-4 text-sm font-bold text-gray-800">Page {currentPage} <span className="text-gray-400 font-normal">of</span> {totalPages || 1}</span>
            <Link href={`/admin/products?page=${currentPage < totalPages ? currentPage + 1 : totalPages}&search=${query}`} className={`px-3 py-1.5 border rounded text-sm font-medium transition ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}>Next ›</Link>
            <Link href={`/admin/products?page=${totalPages}&search=${query}`} className={`px-3 py-1.5 border rounded text-sm font-medium transition ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'hover:bg-gray-50 text-gray-700'}`}>Last »</Link>
          </div>
          <form action={goToPage} className="flex gap-2 items-center bg-gray-50 p-1.5 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase pl-2">Go to</span>
            <input type="hidden" name="term" value={query} />
            <input type="number" name="page" min="1" max={totalPages} className="w-12 p-1 text-center text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="#" />
            <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-bold hover:bg-black transition">Go</button>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}