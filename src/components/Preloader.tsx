"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white"
                >
                    <div className="relative overflow-hidden px-10">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[12vw] font-black tracking-tighter leading-none"
                        >
                            sitelift
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 left-10 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[4vw] font-bold text-white/20 italic tabular-nums"
                        >
                            {counter}%
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 right-10 max-w-[200px] text-right">
                        <p className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                            Optimizing Performance Experience
                        </p>
                    </div>

                    {/* Decorative progress line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: counter / 100 }}
                        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-white"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
