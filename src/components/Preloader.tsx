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
        }, 15);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white px-4"
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background Noise/Grain Effect could go here if requested, keeping it clean for now */}

                    <div className="relative w-full max-w-md">
                        {/* Main Title Reveal */}
                        <div className="overflow-hidden mb-4 flex justify-center">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                                className="text-6xl md:text-8xl font-black tracking-tighter uppercase relative z-10"
                            >
                                SITELIFT
                            </motion.div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative h-[2px] w-full bg-white/10 overflow-hidden rounded-full mb-4">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: `${counter}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>

                        {/* Counter and Status Text */}
                        <div className="flex justify-between items-center text-xs md:text-sm font-medium uppercase tracking-widest text-white/50">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Loading Experience
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="tabular-nums text-white"
                            >
                                {counter}%
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                        className="absolute bottom-10 left-10 text-[10px] uppercase tracking-widest text-white/20 hidden md:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        © 2026 Sitelift Inc.
                    </motion.div>

                    <motion.div
                        className="absolute bottom-10 right-10 text-[10px] uppercase tracking-widest text-white/20 hidden md:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Prepare for Lift Off
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
