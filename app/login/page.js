'use client';

import { Suspense, useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold font-dancing text-coral mb-2">Welcome Back</h2>
          <p className="text-blue-200">Sign in to your account</p>
        </div>
        
        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 mt-1 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all text-white placeholder-blue-300/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 mt-1 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all text-white placeholder-blue-300/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-coral border-white/20 rounded focus:ring-coral bg-white/10"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-blue-200">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-coral hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-3 text-white bg-coral rounded-lg hover:bg-coral-dark focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-navy disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg hover:shadow-coral/20"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="flex h-8 items-end space-x-1 justify-center" aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <>
                <i className="fas fa-exclamation-circle text-red-400"></i>
                <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
        
        <div className="text-center text-sm border-t border-white/10 pt-6">
            <p className="text-blue-200">
                Don't have an account?{' '}
                <a href="/register" className="font-bold text-coral hover:text-white transition-colors">
                    Register here
                </a>
            </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-navy text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
