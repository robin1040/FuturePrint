"use client";

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { getAssetPath } from '../utils/site';
import { useState } from 'react';

export default function SidebarCart() {
    const { isOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = () => {
        toggleCart(); // Close sidebar
        setIsModalOpen(true); // Open modal
    };

    // ... rest of component logic related to open state ... 

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex justify-end"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleCart} />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md h-full bg-[var(--industrial-grey)] border-l border-[var(--neon-cyan)] shadow-2xl flex flex-col p-6 z-50 glass-panel"
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-mono font-bold text-white flex items-center gap-2">
                                    <ShoppingCart className="text-[var(--neon-cyan)]" />
                                    CARRITO
                                </h2>
                                <button onClick={toggleCart} className="hover:text-[var(--neon-cyan)] transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-mono">
                                    <ShoppingCart size={48} className="mb-4 opacity-50" />
                                    <p>Tu carrito está vacío</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                        {items.map((item) => (
                                            <motion.div
                                                layout
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex gap-4 p-4 bg-black/30 rounded-lg border border-white/5 group hover:border-[var(--neon-cyan)] transition-colors"
                                            >
                                                <img
                                                    src={item.imagen.startsWith('http') ? item.imagen : getAssetPath(item.imagen)}
                                                    alt={item.nombre}
                                                    className="w-16 h-16 object-cover rounded bg-white/5"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-white mb-1">{item.nombre}</h4>
                                                    <p className="text-xs text-[var(--neon-cyan)] font-mono">${item.precio.toFixed(2)}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2 bg-black/50 rounded px-2 py-1 border border-white/10">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="text-gray-400 hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-xs text-white font-mono w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="text-gray-400 hover:text-[var(--neon-cyan)] transition-colors w-5 h-5 flex items-center justify-center"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-500 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="border-t border-white/10 pt-6 mt-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-gray-400 font-mono">TOTAL</span>
                                            <span className="text-2xl font-bold text-[var(--neon-cyan)] font-mono">${total.toFixed(2)}</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full py-4 bg-[var(--neon-cyan)] text-black font-bold text-lg rounded hover:shadow-[0_0_20px_var(--neon-cyan)] hover:scale-[1.02] transition-all active:scale-[0.98]"
                                        >
                                            FINALIZAR COMPRA
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
