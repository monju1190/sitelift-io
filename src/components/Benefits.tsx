"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Search, Smartphone } from "lucide-react";

const benefits = [
    {
        title: "Static Generation",
        subtitle: "Fastest on the Edge",
        description: "Next.js sites are pre-rendered at build time, ensuring sub-second response times globally.",
        icon: Zap,
        stat: "100ms",
        label: "TTFB"
    },
    {
        title: "Technical SEO",
        subtitle: "Rank Like a Pro",
        description: "Built-in metadata management and automated sitemaps mean your site is index-ready instantly.",
        icon: Search,
        stat: "#1",
        label: "GOOGLE"
    },
    {
        title: "Bulletproof Security",
        subtitle: "Zero Trust Architecture",
        description: "No server-side database means no SQL injection, no plugins to hack, and zero downtime.",
        icon: Shield,
        stat: "99.9%",
        label: "UPTIME"
    },
    {
        title: "Mobile First",
        subtitle: "Adaptive Images",
        description: "Automatic image resizing and lazy loading optimized for every device in the hand.",
        icon: Smartphone,
        stat: "2x",
        label: "CONV"
    },
];

export function Benefits() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgTextX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={containerRef} className="relative overflow-hidden py-20 bg-[#050505]">
            {/* Cinematic Background Text */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden h-full flex items-center">
                <motion.div
                    style={{ x: bgTextX }}
                    className="hidden md:block text-[25vw] font-black text-white/[0.03] whitespace-nowrap leading-none tracking-tighter"
                >
                    NEXT.JS EXCELLENCE NEXT.JS EXCELLENCE
                </motion.div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-4 text-xs font-black tracking-[0.3em] text-white/40 uppercase"
                        >
                            Why Next.js?
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-3xl font-bold tracking-tight md:text-8xl leading-[0.9]"
                        >
                            ENGINEERED FOR <br />
                            <span className="text-white/20">ELITE PERFORMANCE</span>
                        </motion.h2>
                    </div>
                    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between flex-grow">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="max-w-sm text-lg text-muted-foreground/60 leading-relaxed font-medium"
                        >
                            WordPress and Webflow were built for the past. We build for the future of the web.
                        </motion.p>

                        {/* Right side: Performance Terminal Animation */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="hidden lg:block w-[300px] rounded-2xl border border-white/10 bg-black p-6 font-mono text-[10px]"
                        >
                            <div className="mb-4 flex gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                                <div className="h-2 w-2 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2 text-emerald-500/60">
                                <p className="text-white/40">{">"} ANALYZING PAYLOAD...</p>
                                <motion.p animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>{">"} OPTIMIZING ASSETS...</motion.p>
                                <div className="flex gap-2 text-white">
                                    <span className="text-emerald-500">FASTEST</span>
                                    <span>[||||||||||] 100%</span>
                                </div>
                                <p className="text-white/20">ELITE PERFORMANCE ENGAGED</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-px bg-white/10 overflow-hidden rounded-[2.5rem] border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="group relative bg-[#050505] p-10 hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="mb-12 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <benefit.icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black tracking-tighter text-white">{benefit.stat}</div>
                                        <div className="text-[9px] font-black tracking-widest text-white/40 uppercase">{benefit.label}</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase mb-1">{benefit.subtitle}</h4>
                                        <h3 className="text-2xl font-bold tracking-tight text-white">{benefit.title}</h3>
                                    </div>
                                    <p className="text-sm text-white/60 leading-relaxed font-medium">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Decorative hover line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
