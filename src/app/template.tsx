"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // If there's a hash in the URL (e.g., #pricing), don't force scroll-to-top immediately
        // Standard Next.js behavior or a specialized effect will handle the hash jump
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
