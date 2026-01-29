"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    CheckCircle2,
    ArrowLeft,
    Zap,
    Shield,
    Globe,
    Cpu,
    Layers,
    Rocket,
    Clock,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";

const planData: Record<string, any> = {
    starter: {
        name: "Starter",
        price: "$2,499",
        tagline: "FOR GROWING STARTUPS",
        description: "A high-performance foundation for companies ready to move beyond basic templates.",
        features: ["Custom Next.js 15 Arch", "Core Web Vitals Optm", "Responsive Design", "Basic SEO Engine"],
        metrics: { speed: "98+", SEO: "100", uptime: "99.9%" },
        accent: "bg-blue-500"
    },
    performance: {
        name: "Performance",
        price: "$4,999",
        tagline: "MOST POPULAR CHOICE",
        description: "The gold standard for high-traffic brands requiring maximum speed and conversion.",
        features: ["Edge Middleware Customization", "Dynamic OG Image Eng", "Full CMS Integration", "Advanced SEO Authority"],
        metrics: { speed: "100", SEO: "100", uptime: "100%" },
        accent: "bg-white"
    },
    enterprise: {
        name: "Enterprise",
        price: "Custom",
        tagline: "SCALED ARCHITECTURE",
        description: "Bespoke digital ecosystems designed for massive scale and complex requirements.",
        features: ["Multi-tenant Arch", "Custom API Orchestration", "Dedicated Support", "Infrastructure Audit"],
        metrics: { speed: "100", SEO: "100", uptime: "99.99%" },
        accent: "bg-purple-500"
    }
};

export default function PlanPage() {
    const params = useParams();
    const id = (params.id as string)?.toLowerCase();
    const plan = planData[id] || planData.performance;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Section with Parallax */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
                {/* Parallax Background Elements */}
                <motion.div
                    style={{ rotate: bgRotate, scale: bgScale }}
                    className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/[0.03] to-transparent blur-[120px]"
                />

                <motion.div
                    style={{ y: textY }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="z-10 text-center"
                >
                    <Link
                        href="/#pricing"
                        className="group mb-12 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/30 uppercase transition-all hover:text-white"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        Back to Plans
                    </Link>

                    <div className={`mx-auto mb-8 h-1 w-24 rounded-full ${plan.accent}`} />
                    <h1 className="mb-6 text-7xl font-black tracking-tighter md:text-[140px] leading-[0.8]">
                        {plan.name.toUpperCase()} <br />
                        <span className="text-white/20 italic">EDITION.</span>
                    </h1>
                    <p className="mx-auto max-w-xl text-xl text-white/40 font-medium">
                        {plan.description}
                    </p>
                </motion.div>

                {/* Floating Metric Cards */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] left-[10%] hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-3xl lg:block"
                    >
                        <p className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase mb-4">Performance Score</p>
                        <p className="text-4xl font-black">{plan.metrics.speed}</p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[20%] right-[10%] hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-3xl lg:block"
                    >
                        <p className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase mb-4">Search Optimization</p>
                        <p className="text-4xl font-black">{plan.metrics.SEO}</p>
                    </motion.div>
                </div>
            </section>

            {/* Deep Technical Breakdown */}
            <section className="relative z-10 py-40 bg-black">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter md:text-6xl mb-12">
                                WHAT'S <span className="text-white/20">INSIDE?</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                                {plan.features.map((feature: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-3 w-3 text-white" />
                                        </div>
                                        <span className="text-lg font-bold text-white/60">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Zap, title: "Edge Speed", text: "Global distribution with near-zero latency." },
                                { icon: Shield, title: "Hardened Security", text: "Enterprise-grade protection by default." },
                                { icon: Layers, title: "Infinite Scaling", text: "Built for growth without architecture debt." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-1">{item.title}</h4>
                                            <p className="text-sm text-white/40 font-medium">{item.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bold CTA Section */}
            <section className="py-40 bg-white text-black">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.8] mb-12">
                            READY TO <span className="italic text-neutral-300">ACTIVATE?</span>
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-black px-12 py-6 text-sm font-black text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                        >
                            START THE LIFT
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
