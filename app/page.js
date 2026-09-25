import { auth } from '@/auth';
import HomePage from './components/HomePage';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function Home() {
  const session = await auth();
  await dbConnect();
  // Fetch products from DB
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  // Convert _id to string to pass to client component
  const productsPlain = products.map(product => ({
    ...product,
    id: product._id.toString(),
    _id: product._id.toString(),
  }));
  
  return (
    <HomePage user={session?.user} products={productsPlain} />
  );
}
