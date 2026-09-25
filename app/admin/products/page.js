import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { toggleProductStock } from '@/app/lib/actions';
import DeleteProductButton from './DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {

  await dbConnect();
  const productsRaw = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = productsRaw.map(product => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy">Products</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/add" className="bg-coral hover:bg-coral-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <i className="fas fa-plus"></i>
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Product</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                        {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                        ) : (
                            <i className={`${product.icon || 'fas fa-fish'} text-lg`}></i>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <Link href={`/admin/products/${product._id.toString()}/edit`} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <DeleteProductButton id={product._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                  <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">
                          No products found. Add one to get started!
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
