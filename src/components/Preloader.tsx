"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Slightly faster counter for better UX
        const duration = 2000; // 2 seconds total
        const interval = 20;
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setCounter((prev) => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Format counter to integer
    const displayCounter = Math.min(100, Math.floor(counter));

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%", // Slide up like a curtain
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background Grid Pattern (Subtle) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <div className="relative z-10 w-full max-w-3xl px-6 md:px-0">
                        {/* Main Typography */}
                        <div className="overflow-hidden flex justify-center mb-12">
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                                className="text-[12vw] md:text-[8rem] font-black tracking-tighter leading-[0.85] text-center"
                            >
                                SITELIFT
                            </motion.h1>
                        </div>

                        {/* Progress Bar & Counter */}
                        <div className="relative">
                            <motion.div
                                className="h-[1px] bg-white/20 w-full rounded-full overflow-hidden mb-4"
                            >
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${displayCounter}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                />
                            </motion.div>

                            <div className="flex justify-between items-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xs font-bold tracking-[0.2em] uppercase text-white/50"
                                >
                                    Experience Loading
                                </motion.div>
                                <motion.div
                                    className="text-6xl md:text-8xl font-medium tracking-tight tabular-nums leading-none"
                                >
                                    {displayCounter}
                                    <span className="text-2xl md:text-4xl text-white/40 ml-1">%</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status Text */}
                    <motion.div
                        className="absolute bottom-10 left-0 w-full text-center text-[10px] md:text-xs uppercase tracking-widest text-white/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Redefining Performance
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
