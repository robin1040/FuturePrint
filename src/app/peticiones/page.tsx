"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File as FileIcon, Send, AlertTriangle } from 'lucide-react';

export default function PeticionesPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [errorMessage, setErrorMessage] = useState('');

    // User configuration
    const FORMSPREE_ID = "xykdjrqa";

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...droppedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Warning currently Formspree free plan doesn't support file attachments easily without paid plans or 3rd party
        // But we will send the text data.
        // To support files, user might need a paid plan or use a different service.
        // We will note this in the message.

        let message = `
        SOLICITUD DE COTIZACIÓN CUSTOM
        
        Nombre: ${formData.get('name')}
        Teléfono: ${formData.get('phone')}
        Email: ${formData.get('email')}
        Descripción:
        ${formData.get('description')}
        
        Archivos adjuntos: ${files.map(f => f.name).join(', ')}
        (Nota: Los archivos no se adjuntan en el plan gratuito de Formspree, por favor contactar al cliente para pedirlos)
        `;

        setStatus('SENDING');
        setErrorMessage('');

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFiles([]);
                form.reset();
            } else {
                const data = await response.json();
                setErrorMessage(data.error || "Error al enviar el formulario");
                setStatus('ERROR');
            }
        } catch (error) {
            setErrorMessage("Error de conexión. Intente nuevamente.");
            setStatus('ERROR');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
                    PROYECTOS <span className="text-[var(--neon-cyan)] drop-shadow-[0_0_20px_var(--neon-cyan)]">CUSTOM</span>
                </h1>
                <p className="text-gray-300 text-center mb-12 font-light text-lg">
                    Sube tus archivos .STL, .OBJ o imágenes de referencia para recibir una cotización personalizada.
                </p>

                {status === 'SUCCESS' ? (
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-[var(--industrial-grey)]/80 backdrop-blur-md border border-[var(--neon-cyan)] p-8 rounded-xl text-center shadow-[0_0_50px_rgba(0,242,255,0.3)]"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4 font-mono">¡SOLICITUD ENVIADA!</h2>
                        <p className="text-gray-200 mb-8 text-lg">Analizaremos tu solicitud y te contactaremos a tu correo pronto.</p>
                        <button
                            onClick={() => setStatus('IDLE')}
                            className="px-10 py-4 bg-[var(--neon-cyan)] text-black font-bold text-lg rounded hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all"
                        >
                            ENVIAR OTRA SOLICITUD
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl">
                        {status === 'ERROR' && (
                            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded flex items-center gap-3">
                                <AlertTriangle />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group ${isDragging
                                ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10 scale-105 shadow-[0_0_30px_rgba(0,242,255,0.2)]'
                                : 'border-white/20 hover:border-[var(--neon-cyan)] hover:bg-white/5'
                                }`}
                        >
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files && setFiles(prev => [...prev, ...Array.from(e.target.files!)])}
                            />
                            <Upload className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300 ${isDragging ? 'text-[var(--neon-cyan)] animate-bounce' : 'text-gray-400 group-hover:text-[var(--neon-cyan)]'}`} />
                            <p className="text-xl text-white font-mono mb-2 font-bold">ARRASTRA TUS ARCHIVOS AQUÍ</p>
                            <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">Soporta .STL, .OBJ, .JPG, .PNG</p>
                        </div>

                        <AnimatePresence>
                            {files.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-3"
                                >
                                    <p className="text-sm text-[var(--neon-cyan)] font-mono font-bold uppercase tracking-wider">Archivos Seleccionados ({files.length})</p>
                                    {files.map((file, i) => (
                                        <motion.div
                                            key={`${file.name}-${i}`}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: 20, opacity: 0 }}
                                            className="flex items-center justify-between bg-black/40 p-4 rounded-lg border border-white/10 hover:border-[var(--neon-cyan)]/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-[var(--neon-cyan)]/20 rounded">
                                                    <FileIcon className="text-[var(--neon-cyan)]" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white font-medium truncate max-w-[200px]">{file.name}</p>
                                                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(i)}
                                                className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-all"
                                            >
                                                <X size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                name="name"
                                required
                                type="text"
                                placeholder="Nombre Completo"
                                className="bg-black/60 border border-white/20 rounded-lg p-5 text-white focus:border-[var(--neon-cyan)] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] outline-none transition-all placeholder:text-gray-500"
                            />
                            <input
                                name="phone"
                                required
                                type="tel"
                                placeholder="Teléfono Móvil"
                                className="bg-black/60 border border-white/20 rounded-lg p-5 text-white focus:border-[var(--neon-cyan)] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] outline-none transition-all placeholder:text-gray-500"
                            />
                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="Email de contacto"
                                className="bg-black/60 border border-white/20 rounded-lg p-5 text-white focus:border-[var(--neon-cyan)] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] outline-none transition-all placeholder:text-gray-500 md:col-span-2"
                            />
                        </div>

                        <textarea
                            name="description"
                            rows={5}
                            placeholder="Describe tu proyecto (dimensiones, material, color, cantidad...)"
                            className="w-full bg-black/60 border border-white/20 rounded-lg p-5 text-white focus:border-[var(--neon-cyan)] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] outline-none transition-all placeholder:text-gray-500 resize-none"
                        />

                        <button
                            type="submit"
                            disabled={status === 'SENDING'}
                            className="w-full bg-[var(--neon-cyan)] text-black font-bold text-lg py-5 rounded-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                        >
                            {status === 'SENDING' ? 'ENVIANDO...' : (
                                <>
                                    ENVIAR SOLICITUD <Send size={24} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
