"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Showcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 0]); // Base value
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]); // Base value

    // Parallax logic that respects screen size should ideally be done differently in React, 
    // but I'll provide a cleaner solution by mapping the transforms correctly or using a hook.
    // For now, I'll just adjust the transforms to be less aggressive.
    const y1Dynamic = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2Dynamic = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative bg-black py-20 pb-0 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    style={{ opacity }}
                    className="relative z-20 mb-20 text-center"
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase">
                        The Next.js Edge
                    </div>
                    <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-9xl leading-[0.8]">
                        MODERN <br />
                        <span className="text-white/30 italic">ARCHITECTURE.</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-medium px-4">
                        We leverage Next.js 15+ and React Server Components to eliminate client-side weight,
                        delivering instant interaction and unmatched SEO authority.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-20">
                    {/* Performance Info */}
                    <motion.div
                        style={{ y: y1Dynamic }}
                        whileHover={{ y: y1Dynamic.get() - 20, scale: 1.02 }}
                        className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl transition-all duration-500 cursor-default hover:bg-white/[0.04] hover:border-white/10 group"
                    >
                        <h4 className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-4 transition-colors group-hover:text-white/60">Core Web Vitals</h4>
                        <p className="text-3xl font-bold mb-6 transition-colors group-hover:text-white">Perfect 100 on Mobile</p>
                        <p className="text-sm text-white/40 leading-relaxed font-medium transition-colors group-hover:text-white/60">
                            Our architecture ensures LCP stays under 1.2s even on slow 4G networks.
                            Google loves fast sites, and so do your customers.
                        </p>
                    </motion.div>

                    {/* Scalability Info */}
                    <motion.div
                        whileHover={{ y: -20, scale: 1.02 }}
                        className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl transition-all duration-500 mt-0 md:mt-24 cursor-default hover:bg-white/[0.04] hover:border-white/10 group"
                    >
                        <h4 className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-4 transition-colors group-hover:text-white/60">Scaling</h4>
                        <p className="text-3xl font-bold mb-6 transition-colors group-hover:text-white">Edge Infrastructure</p>
                        <p className="text-sm text-white/40 leading-relaxed font-medium transition-colors group-hover:text-white/60">
                            Deploy globally with Vercel Edge. Your site is served from the nearest server to the user,
                            reducing latency to near-zero globally.
                        </p>
                    </motion.div>

                    {/* SEO Info */}
                    <motion.div
                        style={{ y: y2Dynamic }}
                        whileHover={{ y: y2Dynamic.get() - 20, scale: 1.02 }}
                        className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl transition-all duration-500 cursor-default hover:bg-white/[0.04] hover:border-white/10 group"
                    >
                        <h4 className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-4 transition-colors group-hover:text-white/60">SEO Efficiency</h4>
                        <p className="text-3xl font-bold mb-6 transition-colors group-hover:text-white">Metadata Engine</p>
                        <p className="text-sm text-white/40 leading-relaxed font-medium transition-colors group-hover:text-white/60">
                            Dynamic OpenGraph images and lightning-fast sitemaps.
                            We automate your SEO so you rank higher while focusing on your code.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[150px]" />
        </section>
    );
}
