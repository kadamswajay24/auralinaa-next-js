'use client';

import { useTransition } from 'react';
import { toggleUserRole, deleteUser } from '@/app/lib/actions';

const SUPER_ADMIN_EMAIL = 'admin@auralinaa.com';

export default function UserActions({ userId, currentRole, targetEmail, currentUserEmail, isSuperAdmin }) {
  const [isPending, startTransition] = useTransition();

  const isSelf = targetEmail === currentUserEmail;
  const isSuperAdminAccount = targetEmail === SUPER_ADMIN_EMAIL;

  const handleToggleRole = () => {
    if (isSelf) return alert('You cannot demote or change your own account role.');
    if (isSuperAdminAccount) return alert('The Super Admin account role cannot be changed.');
    if (!isSuperAdmin) return alert('Only the Super Admin (admin@auralinaa.com) can change user roles.');

    if (confirm(`Are you sure you want to change ${targetEmail}'s role to ${currentRole === 'admin' ? 'user' : 'admin'}?`)) {
      startTransition(async () => {
        try {
          await toggleUserRole(userId, currentRole);
        } catch (err) {
          alert(err.message || 'Failed to update role');
        }
      });
    }
  };

  const handleDelete = () => {
    if (isSelf) return alert('You cannot delete your own account.');
    if (isSuperAdminAccount) return alert('The Super Admin account cannot be deleted.');

    if (confirm(`Are you sure you want to delete user ${targetEmail}? This action cannot be undone.`)) {
      startTransition(async () => {
        try {
          await deleteUser(userId);
        } catch (err) {
          alert(err.message || 'Failed to delete user');
        }
      });
    }
  };

  if (isSelf) {
    return <span className="text-xs font-semibold text-slate-400 italic">Current User</span>;
  }

  if (isSuperAdminAccount) {
    return <span className="text-xs font-semibold text-amber-600 italic">Super Admin</span>;
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={handleToggleRole}
        disabled={isPending || !isSuperAdmin}
        title={!isSuperAdmin ? 'Only Super Admin can change user roles' : (currentRole === 'admin' ? 'Demote to User' : 'Promote to Admin')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
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
        className="p-1 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-40"
      >
        <i className="fas fa-trash-alt text-sm"></i>
      </button>
    </div>
  );
}
