import { getAllProducts } from '@/lib/products';
import CategoryPageClient from './CategoryPageClient';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 🟢 Fetch ALL products from DB
  const allProducts = await getAllProducts();

  // 🟢 Filter them HERE on the server for better performance
  // This replicates your previous filtering logic but safely on the server
  const filteredProducts = allProducts.filter(product => {
    // Accessores Logic
    if (slug === 'accessories') {
       const lowerCat = product.category.toLowerCase();
       const isAccessory = lowerCat.includes('accessories') || lowerCat.includes('keyboard') || lowerCat.includes('mouse') || lowerCat.includes('dock');
       const isNotAccessory = lowerCat.includes('laptop') || lowerCat.includes('display') || lowerCat.includes('printer') || lowerCat.includes('server');
       return isAccessory && !isNotAccessory; 
    }

    // General Category Logic (e.g. "dell", "hp")
    if (product.categorySlug === slug) return true;

    // Search Term Logic (fallback)
    const searchTerms = slug.split('-').filter(t => t !== 'and');
    const searchableText = (product.category.toLowerCase() + ' ' + product.name.toLowerCase());
    return searchTerms.every(term => searchableText.includes(term));
  });

  return <CategoryPageClient products={filteredProducts} slug={slug} />;
}