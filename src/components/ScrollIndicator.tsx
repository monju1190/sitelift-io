"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;

            if (Math.abs(scrollY - lastScrollY) < 5) {
                ticking = false;
                return;
            }

            setScrollDirection(scrollY > lastScrollY ? "down" : "up");

            // Hide when at top
            const isAtTop = scrollY < 100;
            // Hide when at bottom
            const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;

            // Logic: 
            // - If at top, hide.
            // - If at bottom, hide.
            // - Otherwise, show.
            setIsVisible(!isAtTop && !isAtBottom);

            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDirection);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToDirection = () => {
        if (scrollDirection === "down") {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        } else {
            window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
        }
    };

    return (
        <motion.div
            style={{ opacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
            <motion.button
                onClick={scrollToDirection}
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

                {/* Icon Container */}
                <motion.div
                    animate={{
                        y: scrollDirection === "down" ? [0, 4, 0] : [0, -4, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {scrollDirection === "down" ? (
                        <ArrowDown className="h-6 w-6 text-white transition-colors group-hover:text-white" />
                    ) : (
                        <ArrowUp className="h-6 w-6 text-white transition-colors group-hover:text-white" />
                    )}
                </motion.div>

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
                        strokeDashoffset={useTransform(
                            scrollY,
                            [0, document.documentElement.scrollHeight - window.innerHeight],
                            [188.4, 0]
                        )}
                        className="opacity-30"
                    />
                </svg>

                {/* Tooltip */}
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                        {scrollDirection === "down" ? "Scroll Down" : "Scroll Up"}
                    </div>
                </div>
            </motion.button>
        </motion.div>
    );
}
