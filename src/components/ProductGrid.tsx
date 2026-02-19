"use client";

import { useState } from 'react';
import ProductCard from './ProductCard';
import { productos } from '../data/productos';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const categories = ['Todos', 'Anime', 'Llaveros', 'Repuestos', 'Custom'];

export default function ProductGrid() {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredProducts = activeCategory === 'Todos'
        ? productos
        : productos.filter(p => p.categoria === activeCategory);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    return (
        <section id="catalogo" className="py-20 px-6 container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <h2 className="text-4xl font-mono font-bold text-white relative">
                    CATÁLOGO <span className="text-[var(--neon-cyan)]">OFICIAL</span>
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--neon-cyan)] animate-pulse" />
                </h2>

                <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-4 py-2 rounded font-mono text-sm transition-all whitespace-nowrap ${activeCategory === cat
                                ? 'bg-[var(--neon-cyan)] text-black font-bold shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.map((product) => (
                    <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded bg-[var(--industrial-grey)] border border-white/10 hover:border-[var(--neon-cyan)] disabled:opacity-50 transition-colors"
                    >
                        <ChevronLeft className="text-[var(--neon-cyan)]" />
                    </button>
                    <span className="flex items-center font-mono text-gray-400">
                        PÁGINA <span className="text-white mx-2">{currentPage}</span> DE <span className="text-white mx-2">{totalPages}</span>
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded bg-[var(--industrial-grey)] border border-white/10 hover:border-[var(--neon-cyan)] disabled:opacity-50 transition-colors"
                    >
                        <ChevronRight className="text-[var(--neon-cyan)]" />
                    </button>
                </div>
            )}
        </section>
    );
}
