'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateProduct } from '@/app/lib/actions';
import Link from 'next/link';
import Image from 'next/image';

export default function EditProductPage({ params, product }) {
  const [state, formAction, isPending] = useActionState(
    updateProduct.bind(null, product._id), 
    null
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-navy transition-colors">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="text-3xl font-bold text-navy">Edit Product: {product.name}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={formAction} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">Product Name</label>
              <input type="text" id="name" name="name" defaultValue={product.name} required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-semibold text-gray-700">Price (₹)</label>
              <input type="number" id="price" name="price" defaultValue={product.price} required min="0" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" />
            </div>

            <div className="space-y-2">
              <label htmlFor="stockQuantity" className="text-sm font-semibold text-gray-700">Stock Quantity</label>
              <input type="number" id="stockQuantity" name="stockQuantity" defaultValue={product.stockQuantity || 0} required min="0" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</label>
                <select id="category" name="category" defaultValue={product.category} required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all">
                    <option value="">Select Category</option>
                    <option value="Fish">Fish</option>
                    <option value="Prawns">Prawns</option>
                    <option value="Crabs">Crabs</option>
                    <option value="Lobster">Lobster</option>
                    <option value="Squid">Squid</option>
                    <option value="Shellfish">Shellfish</option>
                </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-semibold text-gray-700">Unit</label>
              <input type="text" id="unit" name="unit" defaultValue={product.unit} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
            <textarea id="description" name="description" rows="3" defaultValue={product.description} required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="certification" className="text-sm font-semibold text-gray-700">Certification</label>
            <input type="text" id="certification" name="certification" defaultValue={product.certification} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-semibold text-gray-700">Product Image</label>
            
            {product.image && (
                <div className="relative w-32 h-32 mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
            )}

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input type="file" id="image" name="image" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="space-y-2 pointer-events-none">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                    <p className="text-sm text-gray-500">
                        {product.image ? 'Click to replace image' : 'Click to upload image'}
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isPending} className="w-full bg-coral hover:bg-coral-dark text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? 'Updating Product...' : 'Update Product'}
            </button>
          </div>

          {state?.message && (
            <div className={`p-4 rounded-lg text-center ${state.message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
