"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Cpu, Key, Smile } from 'lucide-react';

const categories = [
    {
        name: 'ANIME',
        description: 'Coleccionables',
        image: '/portada.jpg', // Cyberpunk character vibe
        color: '#00f2ff', // Cyan
        icon: <Smile />
    },
    {
        name: 'LLAVEROS',
        description: 'Accesorios',
        image: '/llaveros.webp', // Mech keyboard / dark tech
        color: '#ffaa00', // Gold/Yellow for contrast or maybe darker
        icon: <Key />
    },
    {
        name: 'REPUESTOS',
        description: 'Industria',
        image: 'Impresiyn_3D.repuestos_infinitos.jpg', // Tech parts
        color: '#ff00ff', // Pink/Magenta
        icon: <Cpu />
    },
];

// Tech Frame Component for the Holographic Border effect
const TechFrame = ({ color, children }: { color: string, children: React.ReactNode }) => (
    <div className="relative w-full h-full p-1 group">
        {/* Main Border with Clip Path for "Tech" look */}
        <div
            className="absolute inset-0 border-2 opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{
                borderColor: color,
                boxShadow: `0 0 15px ${color}, inset 0 0 10px ${color}40`,
                clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)'
            }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4" style={{ borderColor: color }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4" style={{ borderColor: color }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4" style={{ borderColor: color }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4" style={{ borderColor: color }} />

        {/* Floating "Data" Lines */}
        <div className="absolute top-1/2 -left-2 w-1 h-12 bg-white/50 transform -translate-y-1/2" style={{ backgroundColor: color }} />
        <div className="absolute top-1/2 -right-2 w-1 h-12 bg-white/50 transform -translate-y-1/2" style={{ backgroundColor: color }} />

        <div
            className="relative h-full w-full overflow-hidden"
            style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' }}
        >
            {children}
        </div>
    </div>
);

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={targetRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">

            {/* 1. Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" // High quality Cyberpunk City
                    alt="Cyberpunk City"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay to make text pop */}
                <div className="absolute inset-0 bg-[#050510]/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-[#050510]/80" />
            </div>

            {/* 2. Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">

                {/* Title */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-4"
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2" style={{ fontFamily: 'var(--font-tech)' }}>
                        <span className="text-[#ff00ff] drop-shadow-[0_0_20px_rgba(255,0,255,0.8)] glitch-text">FUTURE</span>
                        <span className="text-[#00f2ff] drop-shadow-[0_0_20px_rgba(0,242,255,0.8)] glitch-text">PRINTER</span>
                    </h1>
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 mb-4" />
                    <p className="text-xl md:text-2xl text-gray-200 font-light tracking-[0.6em] uppercase">
                        Manufactura Digital <span className="text-[#ff00ff] font-bold">Next-Gen</span>
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.2) }}
                            className="h-[400px] md:h-[500px] w-full relative"
                        >
                            <TechFrame color={cat.color}>
                                <div className="absolute inset-0 group">
                                    <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:opacity-20" />
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover filter contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-500 scale-100 group-hover:scale-110"
                                    />

                                    {/* Holographic Scanline */}
                                    <div className="absolute inset-0 z-20 opacity-30 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:10px_10px]" />

                                    {/* Content inside card */}
                                    <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 items-center pb-12">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="mb-4 p-4 rounded-full bg-black/50 border border-white/20 backdrop-blur-md"
                                            style={{ boxShadow: `0 0 20px ${cat.color}40` }}
                                        >
                                            <div style={{ color: cat.color }}>{cat.icon}</div>
                                        </motion.div>

                                        <h3 className="text-3xl font-bold font-mono text-white mb-2 drop-shadow-md text-center">{cat.name}</h3>

                                        <button
                                            className="px-8 py-2 text-black font-bold font-mono text-sm tracking-widest uppercase transform transition-all hover:scale-105 hover:shadow-[0_0_20px_currentColor]"
                                            style={{
                                                backgroundColor: cat.color,
                                                boxShadow: `0 0 10px ${cat.color}`
                                            }}
                                        >
                                            EXPLORAR
                                        </button>
                                    </div>
                                </div>
                            </TechFrame>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                animate={{ opacity: [0.5, 1, 0.5], y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] text-[#00f2ff] tracking-[0.4em] uppercase font-mono">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#00f2ff] to-transparent" />
            </motion.div>

        </section>
    );
}
