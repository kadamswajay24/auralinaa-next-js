'use client';

import { useActionState } from 'react';
import { authenticateAdmin } from '@/app/lib/actions';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateAdmin,
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center">
            <div className="relative w-32 h-12 mx-auto mb-4 opacity-80">
                <Image 
                  src="/logo.png" 
                  alt="Auralinaa" 
                  fill 
                  className="object-contain" 
                />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-1">Admin Portal</h2>
            <p className="text-blue-300 text-sm">Authorized personnel only</p>
        </div>
        
        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-blue-300 uppercase tracking-wide mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-navy/50 border border-blue-900/50 rounded text-white placeholder-blue-500/50 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                placeholder="admin@auralinaa.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-blue-300 uppercase tracking-wide mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-navy/50 border border-blue-900/50 rounded text-white placeholder-blue-500/50 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-3 text-white bg-coral hover:bg-coral-dark rounded font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-coral/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </div>
          
          <div className="flex h-8 items-end space-x-1 justify-center" aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <>
                <i className="fas fa-exclamation-triangle text-red-400"></i>
                <p className="text-sm text-red-400 font-bold">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
        
        <div className="text-center text-xs text-blue-400/50 border-t border-white/5 pt-6">
            <p>&copy; Auralinaa Foods. Secure System.</p>
        </div>
      </div>
    </div>
  );
}
