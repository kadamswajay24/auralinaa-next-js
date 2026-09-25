'use client';

import { useTransition } from 'react';
import { toggleUserRole, deleteUser } from '@/app/lib/actions';

export default function UserActions({ userId, currentRole }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleRole = () => {
    if (confirm(`Are you sure you want to change this user's role to ${currentRole === 'admin' ? 'user' : 'admin'}?`)) {
      startTransition(async () => {
        await toggleUserRole(userId, currentRole);
      });
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      startTransition(async () => {
        await deleteUser(userId);
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggleRole}
        disabled={isPending}
        title={currentRole === 'admin' ? 'Demote to User' : 'Promote to Admin'}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
          currentRole === 'admin'
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
        }`}
      >
        {currentRole === 'admin' ? 'Demote' : 'Make Admin'}
      </button>

      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Delete User"
        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
      >
        <i className="fas fa-trash-alt text-sm"></i>
      </button>
    </div>
  );
}
