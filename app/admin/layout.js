import Link from 'next/link';
import Image from 'next/image';
import { handleSignOut } from '@/app/lib/actions';
import { auth } from '@/auth';

export default async function AdminLayout({ children }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white fixed h-full z-20 hidden md:block">
        <div className="p-6">
            <div className="relative h-12 w-full mb-8">
                <Image 
                  src="/logo.png" 
                  alt="Auralinaa" 
                  fill 
                  className="object-contain object-left" 
                />
            </div>
            
            <nav className="space-y-2">
                <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                    <i className="fas fa-home w-5"></i>
                    <span>Dashboard</span>
                </Link>
                <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-blue-200 hover:text-white transition-colors">
                    <i className="fas fa-fish w-5"></i>
                    <span>Products</span>
                </Link>
                <Link href="/admin/orders" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-blue-200 hover:text-white transition-colors">
                    <i className="fas fa-shopping-bag w-5"></i>
                    <span>Orders</span>
                </Link>
                <Link href="/admin/users" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-blue-200 hover:text-white transition-colors">
                    <i className="fas fa-users w-5"></i>
                    <span>Users</span>
                </Link>
            </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.[0] || 'A'}
                </div>
                <div>
                    <p className="text-sm font-semibold">{session?.user?.name || 'Admin'}</p>
                    <p className="text-xs text-blue-300">Administrator</p>
                </div>
            </div>
            <form action={handleSignOut}>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
