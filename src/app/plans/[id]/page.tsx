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
    BarChart3,
    Code2,
    Database,
    Route,
    Server,
    ZapIcon
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";

const planData: Record<string, any> = {
    standard: {
        name: "Standard",
        price: "$2,900",
        tagline: "FOR GROWING STARTUPS",
        description: "A high-performance foundation for companies ready to move beyond basic templates.",
        features: ["WordPress to Next.js Migration", "Lighthouse Score 90+", "Technical SEO Foundation", "Responsive Layout", "14-Day Delivery"],
        metrics: { speed: "92+", SEO: "95", uptime: "99.9%" },
        accent: "bg-blue-500",
        roadmap: [
            { step: "Audit", desc: "Full performance & SEO audit of current site." },
            { step: "Arch", desc: "Next.js 15 project setup with optimized routing." },
            { step: "Deploy", desc: "Vercel edge deployment with 14-day delivery." }
        ]
    },
    professional: {
        name: "Professional",
        price: "$5,500",
        tagline: "MOST POPULAR CHOICE",
        description: "The gold standard for high-traffic brands requiring maximum speed and conversion.",
        features: ["Advanced Animation & Parallax", "Lighthouse Score 100", "Custom CMS Integration", "CRO Optimization", "Priority Support"],
        metrics: { speed: "100", SEO: "100", uptime: "100%" },
        accent: "bg-white",
        roadmap: [
            { step: "Strategy", desc: "Conversion and animation strategy session." },
            { step: "Engine", desc: "Custom CMS & Framer Motion engine build." },
            { step: "Polish", desc: "Refinement & priority support launch." }
        ]
    },
    enterprise: {
        name: "Enterprise",
        price: "Custom",
        tagline: "SCALED ARCHITECTURE",
        description: "Bespoke digital ecosystems designed for massive scale and complex requirements.",
        features: ["Custom Web Apps", "E-commerce Next.js Builds", "Advanced Database Logic", "Dedicated Dev Team", "Ongoing Tuning"],
        metrics: { speed: "100", SEO: "100", uptime: "99.99%" },
        accent: "bg-purple-500",
        roadmap: [
            { step: "Consult", desc: "In-depth architecture & scaling consultation." },
            { step: "Build", desc: "Dedicated team development of custom logic." },
            { step: "Scale", desc: "Global infrastructure & database orchestration." }
        ]
    }
};

export default function PlanPage() {
    const params = useParams();
    const id = (params.id as string)?.toLowerCase();
    const plan = planData[id] || planData.professional;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -500]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Section with Deep Parallax */}
            <section className="relative flex min-h-[110vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
                {/* Layered Parallax Background */}
                <motion.div
                    style={{ rotate: bgRotate, scale: bgScale }}
                    className="absolute top-1/2 left-1/2 -z-20 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/[0.04] to-transparent blur-[120px]"
                />

                <motion.div
                    style={{ y: layer2Y }}
                    className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
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
                        Explore Packages
                    </Link>

                    <div className={`mx-auto mb-8 h-1 w-24 rounded-full ${plan.accent} shadow-[0_0_20px_rgba(255,255,255,0.2)]`} />
                    <h1 className="mb-4 text-7xl font-black tracking-tighter md:text-[140px] leading-[0.8]">
                        {plan.name.toUpperCase()} <br />
                        <span className="text-white/20 italic">EDITION.</span>
                    </h1>

                    <div className="mt-8 mb-12 flex flex-col items-center gap-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                            {plan.price !== "Custom" && <span className="text-lg font-bold text-white/40">/package</span>}
                        </div>
                        <p className="max-w-xl text-xl text-white/40 font-medium italic">
                            {plan.description}
                        </p>
                    </div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-20 opacity-20"
                    >
                        <div className="h-12 w-6 rounded-full border border-white flex justify-center p-1">
                            <div className="h-2 w-1 bg-white rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Technical Roadmap Cards */}
            <section className="relative z-10 py-40 bg-[#050505] border-y border-white/5">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mb-4">Technical Track</h4>
                            <h2 className="text-4xl font-black md:text-6xl tracking-tighter">IMPLEMENTATION <span className="text-white/20">FLOW.</span></h2>
                        </div>
                        <p className="max-w-sm text-sm text-white/40 font-medium">A structured roadmap ensuring institutional-grade deployment for every {plan.name} build.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plan.roadmap.map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 text-4xl font-black text-white/5">{i + 1}</div>
                                <h4 className="text-2xl font-black mb-4">{item.step}</h4>
                                <p className="text-sm text-white/40 leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comprehensive Specs */}
            <section className="relative z-10 py-40 bg-black">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter md:text-6xl mb-12">
                                FEATURE <span className="text-white/20">SPECS.</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {plan.features.map((feature: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-6 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-xl font-bold tracking-tight text-white/80">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Code2, title: "Modern Stack", text: "React 19, Next.js 15, and TailWind 4." },
                                { icon: Server, title: "Edge Ready", text: "Globally distributed infrastructure." },
                                { icon: Database, title: "CMS Flexible", text: "Sanity, Contentful, or custom SQL." },
                                { icon: Route, title: "SEO Driven", text: "Programmatic metadata and sitemaps." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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

            {/* Premium CTA */}
            <section className="py-40 bg-white text-black overflow-hidden relative">
                <motion.div
                    style={{ y: layer3Y }}
                    className="absolute top-0 left-0 w-full h-full bg-[#f0f0f0] -z-10"
                />
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.8] mb-12">
                            AWAKEN <br />
                            <span className="italic text-neutral-300 underline decoration-black decoration-[8px]">DIGITAL.</span>
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-black px-12 py-6 text-sm font-black text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
                        >
                            START YOUR LIFT
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
