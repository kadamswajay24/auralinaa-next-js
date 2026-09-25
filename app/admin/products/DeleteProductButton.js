'use client';

import { useTransition } from 'react';
import { deleteProduct } from '@/app/lib/actions';

export default function DeleteProductButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        try {
          await deleteProduct(id);
        } catch (err) {
          alert('Failed to delete product');
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="text-red-400 hover:text-red-600 disabled:opacity-50 transition-all p-1"
      title="Delete Product"
    >
      {isPending ? (
        <i className="fas fa-spinner fa-spin text-sm text-red-500"></i>
      ) : (
        <i className="fas fa-trash-alt text-sm"></i>
      )}
    </button>
  );
}
