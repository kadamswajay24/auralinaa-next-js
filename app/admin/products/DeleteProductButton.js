'use client';

import { useState, useTransition } from 'react';
import { deleteProduct } from '@/app/lib/actions';

export default function DeleteProductButton({ id, productName }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const confirmDelete = () => {
    setErrorMsg('');
    startTransition(async () => {
      try {
        await deleteProduct(id);
        setIsOpen(false);
      } catch (err) {
        setErrorMsg('Failed to delete product. Please try again.');
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        disabled={isPending}
        className="text-red-400 hover:text-red-600 disabled:opacity-50 transition-all p-1"
        title="Delete Product"
      >
        <i className="fas fa-trash-alt text-sm"></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 border border-slate-100 relative">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <i className="fas fa-trash-alt text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Delete Product</h3>
                {productName && <p className="text-xs text-slate-500">{productName}</p>}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isPending && <i className="fas fa-spinner fa-spin"></i>}
                <span>{isPending ? 'Deleting...' : 'Delete Product'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
