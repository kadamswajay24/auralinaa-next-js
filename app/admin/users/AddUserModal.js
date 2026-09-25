'use client';

import { useState, useActionState } from 'react';
import { createUserByAdmin } from '@/app/lib/actions';

export default function AddUserModal({ isSuperAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createUserByAdmin, null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-coral hover:bg-coral-dark text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-2"
      >
        <i className="fas fa-user-plus"></i>
        <span>{isSuperAdmin ? 'Add User / Admin' : 'Add User'}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6 relative border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">
                {isSuperAdmin ? 'Create User or Admin' : 'Create Customer User'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-sm font-medium">
                {state.success}
              </div>
            )}

            <form
              action={async (formData) => {
                await formAction(formData);
                if (!state?.error) {
                  setTimeout(() => setIsOpen(false), 800);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1 flex items-center justify-between">
                  <span>Role</span>
                  {!isSuperAdmin && (
                    <span className="text-[10px] text-amber-600 font-normal lowercase">(Super Admin permission needed for Admin role)</span>
                  )}
                </label>
                <select
                  name="role"
                  defaultValue="user"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-white"
                >
                  <option value="user">User (Customer)</option>
                  {isSuperAdmin && <option value="admin">Admin (Full Access)</option>}
                </select>
              </div>


              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-coral hover:bg-coral-dark text-white text-sm font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  {isPending ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
