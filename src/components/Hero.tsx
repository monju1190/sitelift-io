"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from "framer-motion";
import { ArrowRight, Zap, Globe, BarChart3, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    // Parallax for background
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={containerRef} className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden px-6 pt-32 pb-20 text-center">
            {/* Background Layer with Parallax */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 origin-top">
                {/* Deep Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(15,15,20,1)_0%,rgba(0,0,0,1)_100%)]" />

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

                {/* Interactive Highlight */}
                <motion.div
                    style={{ left: dx, top: dy }}
                    className="pointer-events-none fixed z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[120px]"
                />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                className="relative z-10 max-w-5xl"
            >
                <motion.div
                    variants={itemVariants}
                    className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase"
                >
                    <span className="flex h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    The New Standard for Performance
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="mb-8 text-5xl font-extrabold tracking-tight md:text-[8rem] md:leading-[0.85] uppercase flex flex-col items-center"
                >
                    <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">SPEED BEYOND MEASURE.</span>
                    <span className="mt-4 text-4xl md:text-5xl font-black text-white/20 tracking-[0.2em]">SEO WITHOUT LIMITS.</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground/80 leading-relaxed md:text-xl font-medium"
                >
                    We architect ultra-fast, conversion-focused <span className="text-white">Next.js</span> experiences for businesses that refuse to compromise.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-32"
                >
                    <Link
                        href="/free-audit"
                        aria-label="Get your free performance audit"
                        className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-12 py-6 text-sm font-black text-black transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            GET YOUR FREE AUDIT
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link
                        href="/work"
                        className="rounded-full border border-white/10 bg-white/5 px-12 py-6 text-sm font-black text-white transition-all hover:bg-white/10 hover:border-white/20"
                    >
                        VIEW OUR WORK
                    </Link>
                </motion.div>

                {/* Metrics Bar - Gem Level High Fidelity */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4"
                >
                    {[
                        { label: "Vercel optimized", value: "99+", icon: Zap },
                        { label: "Lighthouse core", value: "100", icon: BarChart3 },
                        { label: "Global Edge", value: "Enabled", icon: Globe },
                        { label: "Search Ranking", value: "Top 3", icon: BarChart3 },
                    ].map((stat, i) => (
                        <MetricItem key={i} stat={stat} />
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
                        className="h-10 w-6 rounded-full border border-white/10 flex justify-center p-1"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

function MetricItem({ stat }: { stat: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const iconX = useSpring(useMotionValue(0), springConfig);
    const iconY = useSpring(useMotionValue(0), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);

        // Magnetic effect for icon
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        iconX.set((x - centerX) * 0.15);
        iconY.set((y - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        iconX.set(0);
        iconY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center gap-2 p-10 bg-black/40 transition-colors group cursor-default relative overflow-hidden"
        >
            {/* SpotLight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 80%)`
                    ),
                }}
            />

            {/* Shimmer Sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:animate-shimmer pointer-events-none">
                <div className="h-full w-20 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] absolute -left-full top-0" />
            </div>

            <motion.div
                style={{ x: iconX, y: iconY }}
                className="mb-1 pointer-events-none"
            >
                <stat.icon className="h-5 w-5 text-white/20 group-hover:text-white group-hover:scale-125 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </motion.div>

            <span className="text-3xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors relative z-10 drop-shadow-sm">
                {stat.value}
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase group-hover:text-white/60 transition-colors relative z-10">
                {stat.label}
            </span>

            {/* Glowing Border Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-white/20 group-hover:w-full transition-all duration-700" />
        </motion.div>
    );
}
