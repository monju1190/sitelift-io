"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Rocket, Award } from "lucide-react";

const metrics = [
    {
        value: "3.2x",
        label: "Higher Conversion",
        description: "Sites migrated to Next.js see average 3.2x increase in conversion rates",
        icon: TrendingUp,
    },
    {
        value: "87%",
        label: "User Retention",
        description: "Faster load times directly correlate with better user engagement",
        icon: Users,
    },
    {
        value: "45%",
        label: "Lower Bounce Rate",
        description: "Sub-second page loads keep visitors on your site longer",
        icon: Rocket,
    },
    {
        value: "10x",
        label: "ROI Increase",
        description: "Performance improvements translate to measurable business growth",
        icon: Award,
    },
];

export function DataShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects for different elements - reduced for stability
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-black py-32 md:py-48 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side: Content */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase">
                                Why Next.js + Sitelift?
                            </div>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
                                THE NUMBERS
                                <br />
                                <span className="text-white/30 italic">DON'T LIE</span>
                            </h2>
                            <p className="text-xl text-white/60 leading-relaxed max-w-lg font-medium">
                                Performance isn't just a metric—it's your bottom line. We use the most advanced
                                web architecture to ensure your site is faster than 99% of the internet.
                            </p>
                        </motion.div>

                        {/* Interactive Tech Specs */}
                        <div className="space-y-6">
                            {[
                                { label: "Server Components", value: "Zero Bundle Size", desc: "We move logic to the server, keeping your frontend lightweight." },
                                { label: "Edge Middleware", value: "Global Speed", desc: "Dynamic content served from the closest possible location to the user." },
                            ].map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                    className="p-6 rounded-3xl border border-white/5 bg-white/[0.01]"
                                >
                                    <h4 className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">{spec.label}</h4>
                                    <p className="text-xl font-bold text-white mb-2">{spec.value}</p>
                                    <p className="text-sm text-white/40">{spec.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4 + i * 0.1,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    viewport={{ once: true }}
                                    className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <metric.icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-4xl font-black tracking-tighter text-white mb-1">
                                        {metric.value}
                                    </div>
                                    <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                        {metric.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Animated Visual Element */}
                    <div className="relative h-full py-10">
                        <motion.div
                            style={{ y, opacity, scale }}
                            className="relative lg:sticky lg:top-24"
                        >
                            {/* Main Card with Scroll Animation */}
                            <div className="relative">
                                {/* Background Glow */}
                                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl" />

                                {/* Main Content Card */}
                                <div className="relative rounded-[3rem] border border-white/10 bg-black/50 backdrop-blur-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
                                    {/* Animated Grid Background */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                                            backgroundSize: '40px 40px',
                                        }} />
                                    </div>

                                    {/* Floating Metrics */}
                                    <div className="relative space-y-6">
                                        {metrics.map((metric, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.15,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                viewport={{ once: false, amount: 0.3 }}
                                                className="group flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-transform group-hover:rotate-12">
                                                    <metric.icon className="h-6 w-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-2xl font-black tracking-tighter text-white">
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-[9px] font-black tracking-widest text-white/30 uppercase">
                                                        {metric.label}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Decorative Elements */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.2, 0.4, 0.2],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[120px]" />
        </section>
    );
}
