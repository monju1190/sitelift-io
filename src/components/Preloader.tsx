"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["PERFORMANCE", "SCALABILITY", "SPEED", "SEO", "NEXT.JS"];

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Word cycle animation
        const wordInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 200);

        // Preload duration
        const timer = setTimeout(() => {
            clearInterval(wordInterval);
            setLoading(false);
        }, 2500);

        return () => {
            clearInterval(wordInterval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <>
                    {/* Top Shutter */}
                    <motion.div
                        className="fixed top-0 left-0 w-full h-1/2 bg-black z-[200] flex items-end justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                    >
                        <div className="pb-4 md:pb-8 flex flex-col items-center">
                            <motion.div
                                className="text-4xl md:text-8xl font-black tracking-tighter text-white overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            >
                                <span className="inline-block relative">
                                    SITE
                                    {/* Decorative line attached to text */}
                                    <motion.div
                                        className="absolute -bottom-4 left-0 w-full h-[2px] bg-white"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom Shutter */}
                    <motion.div
                        className="fixed bottom-0 left-0 w-full h-1/2 bg-black z-[200] flex items-start justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ y: "100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                    >
                        <div className="pt-4 md:pt-8 flex flex-col items-center">
                            <motion.div
                                className="text-4xl md:text-8xl font-black tracking-tighter text-white/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            >
                                LIFT
                            </motion.div>

                            {/* Cycling Tech Words */}
                            <div className="mt-8 h-6 overflow-hidden relative">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xs font-mono text-white/40 tracking-[0.5em] uppercase text-center min-w-[200px]"
                                    >
                                        {words[index]}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Line Expansion Effect */}
                    <motion.div
                        className="fixed top-1/2 left-0 w-full h-[1px] bg-white z-[201] pointer-events-none"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    />

                    {/* Vertical Center Line */}
                    <motion.div
                        className="fixed top-0 left-1/2 h-full w-[1px] bg-white/10 z-[199] pointer-events-none"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
