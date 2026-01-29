"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    // Calculate progress for the ring
    const [maxScroll, setMaxScroll] = useState(0);

    useEffect(() => {
        const updateMaxScroll = () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            setMaxScroll(height);
        };

        updateMaxScroll();

        // Polling as a fallback for dynamic content height changes
        const interval = setInterval(updateMaxScroll, 2000);

        window.addEventListener("resize", updateMaxScroll);
        window.addEventListener("scroll", updateMaxScroll, { passive: true });

        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", updateMaxScroll);
            window.removeEventListener("scroll", updateMaxScroll);
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const strokeDashoffset = useTransform(
        scrollY,
        [0, maxScroll || 1],
        [188.4, 0]
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50 hidden md:block"
                >
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-xl transition-all duration-500 hover:border-white hover:bg-white/10"
                    >
                        {/* Animated Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                        />

                        {/* Icon Container - Always Up Arrow */}
                        <div className="relative">
                            <ArrowUp className="h-6 w-6 text-white transition-colors group-hover:text-white" />
                        </div>

                        {/* Progress Ring */}
                        <svg className="absolute inset-0 -rotate-90" width="64" height="64">
                            <motion.circle
                                cx="32"
                                cy="32"
                                r="30"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="188.4"
                                strokeDashoffset={strokeDashoffset}
                                className="opacity-30"
                            />
                        </svg>

                        {/* Tooltip */}
                        <div className="absolute -left-28 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                                Back to Top
                            </div>
                        </div>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
