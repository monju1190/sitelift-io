"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import NextImage from "next/image";

const projects = [
    {
        title: "TechStart SaaS",
        category: "WordPress Migration",
        metrics: "+45% Conversion",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        speed: "0.4s Load"
    },
    {
        title: "Design Lab",
        category: "Webflow to Next.js",
        metrics: "100/100 Lighthouse",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        speed: "Perfect SEO"
    },
    {
        title: "EcoCom Store",
        category: "Custom Build",
        metrics: "+80% Revenue",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        speed: "Zero Downtime"
    },
    {
        title: "Nexus Agency",
        category: "Framer Portfolio",
        metrics: "High Fidelity",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
        speed: "Instant Feel"
    }
];

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="mx-auto max-w-7xl px-6 py-40">
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        Our Portfolio
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-extrabold tracking-tight md:text-[10rem] leading-[0.85]"
                    >
                        SELECTED <br />
                        <span className="text-white/20 italic">WORKS.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-12 max-w-2xl text-xl text-muted-foreground/60 leading-relaxed"
                    >
                        We transform businesses by elevating their digital presence. These are the success stories of companies that chose excellence over the status quo.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] transition-all duration-700 group-hover:border-white/20">
                                <NextImage
                                    src={project.image}
                                    alt={`${project.title} - ${project.category}`}
                                    fill
                                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <ArrowUpRight className="h-8 w-8 text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-start justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h3>
                                    <p className="text-sm font-bold text-white/30 tracking-widest uppercase">{project.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black tracking-tighter text-white">{project.metrics}</p>
                                    <p className="text-[10px] font-black text-white/30 tracking-widest mb-1 uppercase">{project.speed}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
