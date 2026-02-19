"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { items, total, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [errorMessage, setErrorMessage] = useState('');

    // IMPORTANT: This ID must be replaced by the user
    const FORMSPREE_ID: string = "xykdjrqa";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if the user has configured the Formspree ID
        if (FORMSPREE_ID === "YOUR_FORM_ID" || !FORMSPREE_ID) {
            setErrorMessage("CONFIGURACIÓN REQUERIDA: Debes crear un formulario en Formspree.io y reemplazar 'YOUR_FORM_ID' en el archivo src/components/CheckoutModal.tsx");
            setStatus('ERROR');
            return;
        }

        setStatus('SENDING');
        setErrorMessage('');

        const orderDetails = items.map(i => `${i.quantity}x ${i.nombre} ($${i.precio})`).join('\n');
        const message = `
      NUEVO PEDIDO FUTUREPRINTER:
      Cliente: ${formData.name}
      Teléfono: ${formData.phone}
      Email: ${formData.email}
      
      Detalles del Pedido:
      ${orderDetails}
      
      TOTAL: $${total.toFixed(2)}
    `;

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: message,
                    _subject: `Nuevo Pedido de ${formData.name}`
                })
            });

            if (response.ok) {
                setStatus('SUCCESS');
                clearCart();
            } else {
                const errorData = await response.json();
                setErrorMessage(`Error al enviar: ${errorData.error || 'Intente nuevamente más tarde.'}`);
                setStatus('ERROR');
            }
        } catch (error) {
            setErrorMessage("Error de conexión. Verifique su internet.");
            setStatus('ERROR');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[var(--industrial-grey)] border border-[var(--neon-cyan)] p-8 max-w-md w-full rounded-2xl shadow-[0_0_30px_rgba(0,242,255,0.2)] relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                    {status === 'SUCCESS' ? (
                        <div className="text-center space-y-4">
                            <CheckCircle className="mx-auto w-16 h-16 text-[var(--neon-cyan)] animate-bounce" />
                            <h2 className="text-2xl font-bold font-mono text-white">¡PEDIDO RECIBIDO!</h2>
                            <p className="text-gray-300">
                                Para procesar tu impresión, realiza el pago a:
                                <br /><br />
                                <span className="font-mono bg-black/50 p-2 rounded block border border-white/10 text-[var(--neon-cyan)] text-sm">
                                    BANCO: [DATOS BANCARIOS] <br />
                                    CUENTA: XXXX-XXXX-XXXX <br />
                                    TITULAR: [NOMBRE]
                                </span>
                                <br />
                                Y envía el comprobante a <a href="mailto:futureprint68@gmail.com" className="text-[var(--neon-cyan)] underline">futureprint68@gmail.com</a>
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full bg-[var(--neon-cyan)] text-black font-bold py-3 rounded hover:opacity-90 transition-opacity mt-4"
                            >
                                CERRAR
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold font-mono text-[var(--neon-cyan)] mb-4">CONFIRMAR PEDIDO</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-mono text-gray-400 mb-1">NOMBRE COMPLETO</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-[var(--neon-cyan)] outline-none transition-colors"
                                        placeholder="Tu Nombre"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-mono text-gray-400 mb-1">TELÉFONO MÓVIL</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-[var(--neon-cyan)] outline-none transition-colors"
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-mono text-gray-400 mb-1">EMAIL DE CONTACTO</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-[var(--neon-cyan)] outline-none transition-colors"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="bg-black/30 p-4 rounded border border-white/5">
                                <div className="flex justify-between text-sm text-gray-400 mb-2">
                                    <span>Total Productos:</span>
                                    <span>{items.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-white">
                                    <span>TOTAL A PAGAR:</span>
                                    <span className="text-[var(--neon-cyan)]">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {status === 'ERROR' && (
                                <div className="bg-red-900/50 border border-red-500 p-3 rounded flex gap-2 items-start text-red-200 text-sm">
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'SENDING'}
                                className="w-full bg-[var(--neon-cyan)] text-black font-bold py-3 rounded hover:shadow-[0_0_15px_var(--neon-cyan)] transition-shadow disabled:opacity-50"
                            >
                                {status === 'SENDING' ? 'ENVIANDO...' : 'FINALIZAR COMPRA'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
