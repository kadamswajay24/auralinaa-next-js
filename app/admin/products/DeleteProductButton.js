'use client';

import { deleteProduct } from '@/app/lib/actions';

export default function DeleteProductButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-400 hover:text-red-600">
      <i className="fas fa-trash-alt"></i>
    </button>
  );
}
