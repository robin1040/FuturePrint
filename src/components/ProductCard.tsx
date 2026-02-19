"use client";

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/productos';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group bg-[#161625] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]"
        >
            {/* Holographic Border Effect */}
            <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-transparent via-[var(--neon-cyan)] to-[var(--neon-purple)] opacity-30 group-hover:opacity-100 transition-opacity z-0" />

            {/* Scan Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-[2px] bg-[var(--neon-cyan)] shadow-[0_0_15px_var(--neon-cyan)] absolute box-border z-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-cyan)]/10 to-transparent opacity-20 mix-blend-screen" />
            </div>

            <div className="relative z-10 bg-[#161625] h-full flex flex-col rounded-xl overflow-hidden">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden border-b border-white/5 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-110"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 text-[var(--neon-cyan)] text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md border border-[var(--neon-cyan)]/30 uppercase shadow-lg">
                        {product.categoria}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col relative bg-gradient-to-t from-[var(--industrial-grey)] to-[#161625]">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors line-clamp-1 drop-shadow-sm">{product.nombre}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px] font-light leading-relaxed">{product.descripcion}</p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-2xl font-mono text-[var(--neon-cyan)] font-black tracking-tight drop-shadow-[0_0_8px_rgba(0,242,255,0.3)]">
                            ${product.precio.toFixed(2)}
                        </span>

                        <button
                            onClick={() => addToCart(product)}
                            className="relative overflow-hidden p-2.5 rounded-lg bg-white/5 hover:bg-[var(--neon-cyan)] text-gray-300 hover:text-black transition-all active:scale-95 group/btn"
                        >
                            <div className="flex items-center gap-2 relative z-10 font-bold">
                                <ShoppingCart size={20} className="group-hover/btn:animate-bounce" />
                                <span className="text-xs hidden group-hover/btn:block uppercase tracking-wider">Agregar</span>
                            </div>
                            {/* Button glow background */}
                            <div className="absolute inset-0 bg-[var(--neon-cyan)] blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
