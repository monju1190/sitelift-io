"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function HashScroll() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        // Wait for page transition and content to mount
        const timeoutId = setTimeout(() => {
            if (typeof window !== "undefined" && window.location.hash) {
                const targetId = window.location.hash.replace("#", "");
                const element = document.getElementById(targetId);
                if (element && lenis) {
                    lenis.scrollTo(element, { duration: 1.2, offset: -100 });
                }
            }
        }, 800); // Wait for AnimatePresence exit/entrance animations

        return () => clearTimeout(timeoutId);
    }, [pathname, lenis]);

    return null;
}
