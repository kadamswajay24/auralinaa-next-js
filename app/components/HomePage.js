"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { handleSignOut } from '@/app/lib/actions';

export default function HomePage({ user, products }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-navy shadow-lg text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="relative h-16 w-64 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Auralinaa Foods Logo" 
              fill 
              sizes="(max-width: 768px) 150px, 200px"
              className="object-contain object-left"
              priority
            />
          </Link>
          
          <div className="hidden md:flex space-x-8 font-medium items-center">
            <Link href="#home" className="hover:text-coral transition-colors">Home</Link>
            <Link href="#about" className="hover:text-coral transition-colors">Story</Link>
            <Link href="#products" className="hover:text-coral transition-colors">Product</Link>
            <Link href="#contact" className="hover:text-coral transition-colors">Contact</Link>
            
            {user ? (
                <div className="flex items-center gap-4 ml-4">
                    {user.role === 'admin' && (
                        <Link href="/admin" className="text-sm font-semibold text-coral hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-full">
                            Admin <i className="fas fa-lock ml-1 text-xs"></i>
                        </Link>
                    )}
                    <span className="text-sm text-blue-200">Hi, {user.name}</span>
                    <form action={handleSignOut}>
                        <button className="bg-coral hover:bg-coral-dark text-white px-5 py-2 rounded-full transition-all text-sm font-semibold">
                            Logout
                        </button>
                    </form>
                </div>
            ) : (
                <Link href="/login" className="bg-coral hover:bg-coral-dark text-white px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg ml-4">
                    Login
                </Link>
            )}
          </div>

          <button 
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-navy border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 space-y-4 font-medium">
            <Link href="#home" className="hover:text-coral transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="#about" className="hover:text-coral transition-colors" onClick={() => setIsMenuOpen(false)}>Story</Link>
            <Link href="#products" className="hover:text-coral transition-colors" onClick={() => setIsMenuOpen(false)}>Product</Link>
            <Link href="#contact" className="hover:text-coral transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
                <>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-200">Hi, {user.name}</span>
                        {user.role === 'admin' && (
                            <Link href="/admin" className="text-sm font-bold text-coral bg-white/10 px-3 py-1 rounded-full">
                                Admin Panel
                            </Link>
                        )}
                    </div>
                    <form action={handleSignOut}>
                         <button className="text-left w-full hover:text-coral transition-colors">Logout</button>
                    </form>
                </>
            ) : (
                <Link href="/login" className="hover:text-coral transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=2069&auto=format&fit=crop"
            alt="Fishermen on Boat"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-dancing text-5xl md:text-7xl mb-6 leading-tight">
            Empowering Sustainable Fisheries
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
            Supporting fishermen, delivering traceable seafood, and building a responsible blue economy.
          </p>
          <Link 
            href="#catalog"
            className="inline-block bg-coral hover:bg-coral-dark text-white text-lg font-semibold px-10 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" 
              alt="Sustainable Fishing"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="font-dancing text-4xl text-dark-blue mb-4">Our Story</h2>
            <h3 className="text-3xl font-bold text-navy mb-4">Bridging Communities & Markets</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Auralinaa works at the intersection of fisheries, sustainability, and livelihoods—connecting coastal communities to global markets.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe in empowering local fishermen while ensuring the highest standards of quality and environmental responsibility. Through direct partnerships and fair trade practices, we ensure that every catch supports a brighter future for our oceans and the people who depend on them.
            </p>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="products" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="font-dancing text-center text-5xl text-dark-blue mb-16">What We Offer</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-coral">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-fish text-3xl text-coral"></i>
              </div>
              <h3 className="text-2xl font-bold text-center text-navy mb-4">Fresh Seafood</h3>
              <p className="text-gray-600 text-center">
                Sustainably sourced, traceable and fresh seafood from trusted local fishermen. Delivered daily to ensure maximum freshness.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-coral">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-box text-3xl text-coral"></i>
              </div>
              <h3 className="text-2xl font-bold text-center text-navy mb-4">Processed Products</h3>
              <p className="text-gray-600 text-center">
                Quality-assured, responsibly processed seafood products ready for global market with full traceability.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-coral">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-truck text-3xl text-coral"></i>
              </div>
              <h3 className="text-2xl font-bold text-center text-navy mb-4">Supply Chain Support</h3>
              <p className="text-gray-600 text-center">
                End-to-end support ensuring traceability, quality assurance, and sustainability throughout the supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="font-dancing text-center text-5xl text-dark-blue mb-4">Our Premium Selection</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Explore our range of sustainably sourced seafood, delivered fresh to your doorstep.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {product.image ? (
                         <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                             <Image
                                 src={product.image}
                                 alt={product.name}
                                 fill
                                 className="object-cover"
                             />
                         </div>
                    ) : (
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-coral group-hover:text-white transition-colors mb-4">
                            <i className={`${product.icon || 'fas fa-fish'} text-2xl text-coral group-hover:text-white transition-colors`}></i>
                        </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start">
                     <div>
                        {product.stockQuantity > 0 ? (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit mb-2">
                                <i className="fas fa-check-circle text-[10px]"></i> In Stock ({product.stockQuantity})
                            </span>
                        ) : (
                            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 w-fit mb-2">
                                <i className="fas fa-times-circle text-[10px]"></i> Out of Stock
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-dark-blue mb-2">{product.name}</h3>
                     </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-coral">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 text-sm">{product.unit}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      {product.certification}
                    </span>
                    <button className="text-sm font-semibold text-coral hover:text-coral-dark transition-colors">
                      Add to Cart <i className="fas fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 px-6 md:px-12 bg-navy text-white relative overflow-hidden">
        {/* Abstract shapes or overlay ideally */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="font-dancing text-5xl mb-8">Sustainability First</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-16 font-light">
            We are committed to sustainable fishing practices that protect marine ecosystems while supporting coastal communities. Every product in our catalog is sourced with strict environmental and ethical standards.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold text-coral mb-2">100%</div>
              <div className="text-lg font-medium">Traceable Supply Chain</div>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold text-coral mb-2">500+</div>
              <div className="text-lg font-medium">Fishermen Supported</div>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold text-coral mb-2">50+</div>
              <div className="text-lg font-medium">Sustainable Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 md:px-12 bg-dark-blue text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <i className="fas fa-ship text-4xl text-coral mb-4"></i>
              <h3 className="text-lg font-bold">Fishermen Empowerment</h3>
            </div>
            <div className="p-4">
              <i className="fas fa-clipboard-check text-4xl text-coral mb-4"></i>
              <h3 className="text-lg font-bold">Traceability & Quality</h3>
            </div>
            <div className="p-4">
              <i className="fas fa-shield-alt text-4xl text-coral mb-4"></i>
              <h3 className="text-lg font-bold">Ethical Sourcing</h3>
            </div>
            <div className="p-4">
              <i className="fas fa-water text-4xl text-coral mb-4"></i>
              <h3 className="text-lg font-bold">Ocean Health</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-dancing text-center text-5xl text-dark-blue mb-12">Get in Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-coral group-hover:text-white transition-colors">
                <i className="fas fa-envelope text-2xl text-coral group-hover:text-white transition-colors"></i>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Email Us</h3>
              <a href="mailto:info@auralinaa.com" className="text-gray-600 hover:text-coral transition-colors">info@auralinaa.com</a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-coral group-hover:text-white transition-colors">
                <i className="fas fa-phone text-2xl text-coral group-hover:text-white transition-colors"></i>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Call Us</h3>
              <a href="tel:+911234567890" className="text-gray-600 hover:text-coral transition-colors">+91 123 456 7890</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-16 pb-8 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="relative h-16 w-48 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Auralinaa Foods Logo" 
                  fill 
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-blue-200 max-w-sm">
                Empowering sustainable fisheries with traceable, ethical seafood. Bringing the best of the ocean to your table while protecting our marine ecosystems.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="#home" className="hover:text-coral transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-coral transition-colors">About Us</Link></li>
                <li><Link href="#products" className="hover:text-coral transition-colors">Our Products</Link></li>
                <li><Link href="#sustainability" className="hover:text-coral transition-colors">Sustainability</Link></li>
                <li><Link href="#contact" className="hover:text-coral transition-colors">Contact</Link></li>
                <li><Link href="/admin/login" className="hover:text-coral transition-colors text-xs opacity-50">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p className="text-blue-200 text-sm">
                <i className="fas fa-map-marker-alt mr-2"></i> Taloja, India
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-blue-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Auralinaa Foods. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
