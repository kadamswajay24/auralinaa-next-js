
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import EditProductForm from './EditProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }) {
  await dbConnect();
  
  // params is a promise in recent Next.js versions often, but usually directly accessible in page props
  // However, for safety in latest versions, we can treat it as such or just access it.
  // In Next 15+ params is async. Assuming standard Next.js 14/15 behavior.
  const { id } = await params; 

  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  // Convert _id and dates to string for client component
  const productSerialized = {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  };

  return <EditProductForm product={productSerialized} />;
}
