"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Globe, Gauge, Cpu, ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const services = [
    {
        title: "WordPress to Next.js",
        description: "Convert your sales-generating machine into a speed demon with higher rankings and lower costs.",
        icon: Zap,
        stat: "80% Faster Load",
    },
    {
        title: "Webflow to Next.js",
        description: "Maintain your design beauty while gaining the SEO power and scalability of Next.js.",
        icon: Globe,
        stat: "Perfect SEO",
    },
    {
        title: "Framer to Next.js",
        description: "Preserve complex animations while improving production-grade performance.",
        icon: Gauge,
        stat: "High Fidelity",
    },
    {
        title: "Custom Development",
        description: "Bespoke Next.js applications tailored specifically for your unique business needs.",
        icon: Cpu,
        stat: "Scalable",
    },
];

export function Services() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Disable parallax on mobile for better visibility/layout alignment
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section id="services" ref={containerRef} className="relative px-6 py-24 bg-black overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-10">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                        >
                            Our Expertise
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl font-bold tracking-tight md:text-8xl leading-none"
                        >
                            TRANSFORMING THE <br />
                            <span className="text-white/30 italic">DIGITAL FRONTIER</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="max-w-xs text-muted-foreground/60 text-lg leading-relaxed"
                    >
                        We take legacy tech and propel it into the modern era of high-speed reactivity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            style={{ y: isMobile ? 0 : (i % 2 === 0 ? y1 : y2) }}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative flex flex-col gap-8 rounded-[3rem] border border-white/5 bg-white/[0.02] p-12 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-black transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[10deg]">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <ArrowUpRight className="h-6 w-6 text-white/20 transition-all duration-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{service.title}</h3>
                                <p className="text-lg text-muted-foreground/70 leading-relaxed font-medium">
                                    {service.description}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                <span className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-white/40 uppercase transition-colors group-hover:border-white group-hover:text-white">
                                    {service.stat}
                                </span>
                                <span className="h-px flex-grow bg-white/5" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[100px]" />
        </section>
    );
}
