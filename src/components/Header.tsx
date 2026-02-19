"use client";

import { ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NavButton = ({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) => (
    <Link href={href} className="relative group px-6 py-2">
        <div className={`absolute inset-0 border border-cyan-500/30 group-hover:border-cyan-400 transform -skew-x-12 transition-all duration-300 ${active ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.2)]' : 'bg-transparent'}`}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400 hidden group-hover:block" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400 hidden group-hover:block" />
        </div>
        <span className={`relative font-mono font-bold text-sm tracking-widest transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
            {children}
        </span>
    </Link>
);

export default function Header() {
    const { items, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Polygon shape for the "HUD" look
    const hudClipPath = 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)';

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
            >
                {/* Main HUD Container Wrapper for Border Effect */}
                <div
                    className="p-[2px] bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"
                    style={{ clipPath: hudClipPath }}
                >
                    <div
                        className="relative bg-[#050510]/95 backdrop-blur-xl w-full h-full"
                        style={{ clipPath: hudClipPath }}
                    >
                        {/* Circuit Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(0,242,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,242,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <div className="relative px-6 py-4 flex justify-between items-center h-20 md:h-24">

                            {/* LOGO SECTION */}
                            <Link href="/" className="relative group flex items-center">
                                <div className="relative border-2 border-[var(--neon-cyan)] px-4 py-2 rounded-tl-lg rounded-br-lg bg-black/40 group-hover:border-[var(--neon-pink)] group-hover:shadow-[0_0_15px_var(--neon-pink)] transition-all duration-300 transform group-hover:scale-105">
                                    <span className="font-mono font-black text-xl italic text-white tracking-tighter">
                                        FUTURE<span className="text-[var(--neon-cyan)] group-hover:text-[var(--neon-pink)] transition-colors">PRINTER</span>
                                    </span>
                                    {/* Glowing dot */}
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--neon-cyan)] rounded-full shadow-[0_0_10px_var(--neon-cyan)] group-hover:bg-[var(--neon-pink)] group-hover:shadow-[0_0_10px_var(--neon-pink)]" />
                                </div>
                            </Link>

                            {/* DESKTOP NAV */}
                            <nav className="hidden md:flex items-center gap-4 bg-black/20 px-8 py-2 rounded-full border border-white/5">
                                <NavButton href="/" active={pathname === '/'}>INICIO</NavButton>
                                <NavButton href="/#catalogo" active={pathname?.includes('catalogo')}>CATÁLOGO</NavButton>
                                <NavButton href="/peticiones" active={pathname?.includes('peticiones')}>PETICIONES</NavButton>
                            </nav>

                            {/* CART & MOBILE TOGGLE */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={toggleCart}
                                    className="group relative p-3 transition-colors"
                                >
                                    <div className="absolute inset-0 border border-green-500/30 rounded-lg transform skew-x-12 group-hover:border-green-400 group-hover:bg-green-500/10 transition-all" />
                                    <div className="relative z-10 text-green-500 group-hover:text-green-300 transition-colors">
                                        <ShoppingCart className="w-6 h-6" />
                                    </div>

                                    {itemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded bg-red-600 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse z-20">
                                            {itemCount}
                                        </span>
                                    )}
                                </button>

                                <button
                                    className="md:hidden text-white hover:text-cyan-400 transition-colors"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    {isMenuOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -20, scaleY: 0.9 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0.9 }}
                            className="md:hidden mt-4 mx-2 bg-[#050510] border border-cyan-500/30 overflow-hidden shadow-2xl relative z-40"
                            style={{ clipPath: hudClipPath }}
                        >
                            <div className="p-6 flex flex-col gap-4 font-mono text-center relative z-10">
                                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-cyan-400 py-2 border-b border-white/5 uppercase tracking-widest">Inicio</Link>
                                <Link href="/#catalogo" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-cyan-400 py-2 border-b border-white/5 uppercase tracking-widest">Catálogo</Link>
                                <Link href="/peticiones" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-cyan-400 py-2 uppercase tracking-widest">Peticiones</Link>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
