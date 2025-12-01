import { redirect } from 'next/navigation';

export default function CategoryIndexPage() {
  // Instantly redirects /category -> /categories
  redirect('/categories');
}