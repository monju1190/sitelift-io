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
    ZapIcon,
    Terminal,
    Box,
    Sparkles,
    Layout,
    Search,
    Monitor
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
        ],
        details: [
            { icon: Layout, title: "Responsive Engine", desc: "Pixel-perfect fluid layouts that adapt to any device scale." },
            { icon: Search, title: "SEO Core", desc: "Static generation for near-instant indexing on search engines." },
            { icon: Terminal, title: "Next.js 15", desc: "Leveraging React Server Components for minimal bundle sizes." }
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
        ],
        details: [
            { icon: Sparkles, title: "Advanced FX", desc: "Custom shader-based animations and deep scroll parallax." },
            { icon: Database, title: "Headless CMS", desc: "Real-time content management via Sanity or Contentful." },
            { icon: Monitor, title: "CRO Focus", desc: "A/B tested patterns designed to convert visitors to leads." }
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
        ],
        details: [
            { icon: Server, title: "Global Scale", desc: "Multi-region deployment for absolute zero latency." },
            { icon: Shield, title: "Enterprise Sec", desc: "SOC2-compliant architecture and dynamic auth logic." },
            { icon: Globe, title: "E-comm Engine", desc: "High-volume checkout systems built on Next.js Commerce." }
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

    const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const pricingY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
    const pricingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Section: PRICE IS THE HERO */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32">
                {/* Refractive Parallax Layers */}
                <motion.div
                    style={{ rotate: bgRotate, scale: bgScale }}
                    className="absolute top-1/2 left-1/2 -z-20 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/[0.05] via-transparent to-transparent blur-[150px]"
                />

                <motion.div
                    style={{ y: pricingY, opacity: pricingOpacity }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="z-10 text-center"
                >
                    <Link
                        href="/#pricing"
                        className="group mb-12 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase transition-all hover:text-white"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        Back to Selection
                    </Link>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "8rem" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`mx-auto mb-12 h-0.5 ${plan.accent} shadow-[0_0_40px_rgba(255,255,255,0.4)]`}
                    />

                    <h4 className="text-[12px] font-black tracking-[1em] text-white/30 uppercase mb-8">{plan.tagline}</h4>

                    <div className="relative mb-8">
                        <h1 className="text-[100px] font-black tracking-tighter md:text-[220px] leading-none text-white transition-all">
                            {plan.price}
                        </h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute -top-10 -right-10 hidden md:block"
                        >
                            <span className="text-xl font-black italic text-white/10 uppercase tracking-widest">{plan.name} PACK.</span>
                        </motion.div>
                    </div>

                    <p className="mx-auto max-w-2xl text-xl text-white/50 font-medium italic leading-relaxed">
                        {plan.description}
                    </p>
                </motion.div>

                {/* Mouse Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="h-12 w-6 rounded-full border border-white flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-2 w-1 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* In-depth Features Grid: "Gem Level" Animation */}
            <section className="relative z-10 py-32 bg-[#050505]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {plan.details.map((detail: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-12 transition-all hover:bg-white/[0.03] hover:border-white/10"
                            >
                                <div className="mb-8 h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white transition-all group-hover:bg-white group-hover:text-black">
                                    <detail.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tighter">{detail.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed font-medium">{detail.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation Flow Roadmap */}
            <section className="relative z-10 py-40 bg-black border-y border-white/5">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mb-6">Technical Track</h4>
                            <h2 className="text-5xl font-black md:text-8xl tracking-tighter leading-tight mb-12">
                                FROM ZERO <br />
                                <span className="text-white/20 italic">TO DEPLOYED.</span>
                            </h2>
                            <div className="space-y-12">
                                {plan.roadmap.map((item: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-8 group"
                                    >
                                        <div className="text-2xl font-black text-white/10 group-hover:text-white transition-colors">0{i + 1}</div>
                                        <div>
                                            <h4 className="text-xl font-black mb-2 uppercase tracking-widest">{item.step}</h4>
                                            <p className="text-sm text-white/40 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Spec Card */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 20 }}
                            whileInView={{ opacity: 1, rotateY: 0 }}
                            className="relative perspective-1000"
                        >
                            <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-12 backdrop-blur-3xl shadow-2xl">
                                <h4 className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-10">Institutional Specs</h4>
                                <div className="space-y-6">
                                    {plan.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                            <span className="text-sm font-bold text-white/80">{feature}</span>
                                            <CheckCircle2 className="h-4 w-4 text-green-500/50" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA: Refractive Gem */}
            <section className="py-40 bg-white text-black overflow-hidden relative">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.8] mb-16">
                            ACTIVATE <br />
                            <span className="italic text-neutral-300">AUTHORITY.</span>
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-black px-16 py-8 text-xs font-black tracking-[0.2em] text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_40px_80px_rgba(0,0,0,0.4)] uppercase"
                        >
                            GET IN TOUCH
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
