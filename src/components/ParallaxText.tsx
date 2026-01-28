"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function ParallaxText({ text }: { text: string }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.05, 0.15, 0.15, 0.05]);

    return (
        <div ref={container} className="relative py-28 overflow-hidden whitespace-nowrap select-none">
            <motion.h2
                style={{ x, opacity }}
                className="text-[20vw] font-black uppercase tracking-tighter text-white/80"
            >
                {text} &nbsp; {text} &nbsp; {text} &nbsp; {text}
            </motion.h2>
        </div>
    );
}
