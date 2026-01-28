"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Showcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <section ref={containerRef} className="relative h-[150vh] overflow-hidden bg-black py-40">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 max-w-4xl"
                >
                    <h2 className="mb-6 text-5xl font-bold tracking-tight md:text-9xl leading-none">
                        EYE-CATCHING <br />
                        <span className="text-white/30 italic">RESULTS.</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-lg text-muted-foreground/60 md:text-xl">
                        We don't just build websites. We build digital assets that move the needle.
                    </p>
                </motion.div>

                {/* Floating Parallax Elements */}
                <motion.div
                    style={{ y: y1, rotate }}
                    className="absolute top-[20%] left-[10%] h-64 w-96 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-6 hidden lg:block"
                >
                    <div className="flex gap-2 mb-4">
                        <div className="h-2 w-2 rounded-full bg-red-500/50" />
                        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                        <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-full rounded bg-white/5" />
                        <div className="h-2 w-[80%] rounded bg-white/5" />
                        <div className="h-2 w-[90%] rounded bg-white/5" />
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y2, rotate: -5 }}
                    className="absolute top-[40%] right-[5%] h-80 w-80 rounded-full border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-12 transition-colors flex items-center justify-center hidden lg:flex"
                >
                    <div className="text-6xl font-black text-white/10 italic">NEXT</div>
                </motion.div>

                <motion.div
                    style={{ y: y3 }}
                    className="absolute bottom-[10%] left-[20%] flex flex-col items-center gap-4 hidden lg:flex"
                >
                    <div className="text-9xl font-black text-white/[0.02] tracking-widest">100</div>
                    <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">PERFORMANCE SCORE</div>
                </motion.div>
            </div>
        </section>
    );
}
