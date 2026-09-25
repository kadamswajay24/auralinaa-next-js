'use client';

import { useState, useTransition } from 'react';
import { toggleUserRole, deleteUser } from '@/app/lib/actions';

const SUPER_ADMIN_EMAIL = 'admin@auralinaa.com';

export default function UserActions({ userId, currentRole, targetEmail, currentUserEmail, isSuperAdmin }) {
  const [isPending, startTransition] = useTransition();
  const [activeModal, setActiveModal] = useState(null); // 'role' | 'delete' | null
  const [errorMsg, setErrorMsg] = useState('');

  const isSelf = targetEmail === currentUserEmail;
  const isSuperAdminAccount = targetEmail === SUPER_ADMIN_EMAIL;

  const handleRoleAction = () => {
    setErrorMsg('');
    startTransition(async () => {
      try {
        await toggleUserRole(userId, currentRole);
        setActiveModal(null);
      } catch (err) {
        setErrorMsg(err.message || 'Failed to update role');
      }
    });
  };

  const handleDeleteAction = () => {
    setErrorMsg('');
    startTransition(async () => {
      try {
        await deleteUser(userId);
        setActiveModal(null);
      } catch (err) {
        setErrorMsg(err.message || 'Failed to delete user');
      }
    });
  };

  if (isSelf) {
    return <span className="text-xs font-semibold text-slate-400 italic">Current User</span>;
  }

  if (isSuperAdminAccount) {
    return <span className="text-xs font-semibold text-amber-600 italic">Super Admin</span>;
  }

  const nextRole = currentRole === 'admin' ? 'user' : 'admin';

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => { setErrorMsg(''); setActiveModal('role'); }}
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
          onClick={() => { setErrorMsg(''); setActiveModal('delete'); }}
          disabled={isPending}
          title="Delete User"
          className="p-1 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-40"
        >
          <i className="fas fa-trash-alt text-sm"></i>
        </button>
      </div>

      {/* Custom Modal for Role Change */}
      {activeModal === 'role' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 border border-slate-100 relative">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <i className="fas fa-user-shield text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Change User Role</h3>
                <p className="text-xs text-slate-500">{targetEmail}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to change this user&apos;s role from <strong className="uppercase text-slate-800">{currentRole}</strong> to <strong className="uppercase text-amber-700">{nextRole}</strong>?
            </p>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                disabled={isPending}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRoleAction}
                disabled={isPending}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isPending && <i className="fas fa-spinner fa-spin"></i>}
                <span>{isPending ? 'Updating...' : `Confirm Change to ${nextRole.toUpperCase()}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal for User Deletion */}
      {activeModal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 border border-slate-100 relative">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Delete Account</h3>
                <p className="text-xs text-slate-500">{targetEmail}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete the account for <strong className="text-slate-800">{targetEmail}</strong>? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                disabled={isPending}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAction}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isPending && <i className="fas fa-spinner fa-spin"></i>}
                <span>{isPending ? 'Deleting...' : 'Delete User'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
