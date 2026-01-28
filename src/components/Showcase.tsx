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
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                <motion.div
                    style={{ opacity }}
                    className="relative z-20 max-w-4xl text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        Data-Driven Design
                    </motion.div>
                    <h2 className="mb-6 text-5xl font-bold tracking-tight md:text-9xl leading-[0.8]">
                        EYE-CATCHING <br />
                        <span className="text-white/30 italic">RESULTS.</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-lg text-muted-foreground/60 md:text-xl font-medium">
                        We transform raw data into stunning, high-performance digital experiences that convert.
                    </p>
                </motion.div>

                {/* Floating Parallax Elements - Denser Information */}

                {/* conversion card */}
                <motion.div
                    style={{ y: y1, rotate }}
                    className="absolute top-[15%] left-[5%] h-56 w-72 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8 hidden lg:block"
                >
                    <p className="text-[10px] font-black tracking-widest text-white/40 mb-2">CONVERSION RATE</p>
                    <p className="text-4xl font-bold mb-4">+450%</p>
                    <div className="flex items-end gap-1 h-12">
                        {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                className="w-full bg-white/20 rounded-t-sm"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* SEO Card */}
                <motion.div
                    style={{ y: y2, rotate: -8 }}
                    className="absolute top-[20%] right-[10%] h-64 w-64 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 hidden lg:block"
                >
                    <p className="text-[10px] font-black tracking-widest text-white/40 mb-4">SEO AUTHORITY</p>
                    <div className="relative flex items-center justify-center">
                        <svg className="h-24 w-24 -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                            <motion.circle
                                cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                className="text-white"
                                initial={{ strokeDasharray: "0 251" }}
                                whileInView={{ strokeDasharray: "230 251" }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                        <span className="absolute text-2xl font-bold">98</span>
                    </div>
                </motion.div>

                {/* Speed Element */}
                <motion.div
                    style={{ y: y3 }}
                    className="absolute bottom-[20%] left-[15%] flex flex-col items-start gap-2 hidden lg:flex"
                >
                    <p className="text-[10px] font-black tracking-widest text-white/20 uppercase">Core Web Vitals</p>
                    <div className="flex gap-4">
                        {["LCP 0.8s", "FID 12ms", "CLS 0.01"].map(metric => (
                            <div key={metric} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold text-white/60">
                                {metric}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Aesthetic Circle */}
                <motion.div
                    style={{ y: y2, scale: 1.2 }}
                    className="absolute -bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full border border-white/[0.02] bg-gradient-to-br from-white/[0.03] to-transparent p-12 transition-colors flex items-center justify-center blur-3xl"
                />
            </div>
        </section>
    );
}
