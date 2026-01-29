"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="relative overflow-hidden bg-black py-24 px-6 md:py-40">
            <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-12 md:p-24 text-center relative overflow-hidden group">
                <motion.div
                    whileHover={{ scale: 1.2, opacity: 0.1 }}
                    className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none transition-all duration-1000"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="mb-10 text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                        ELEVATE YOUR <br />
                        <span className="text-white/20 italic">DIGITAL EDGE.</span>
                    </h2>

                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-6 overflow-hidden rounded-full bg-white px-10 py-5 text-[10px] font-black tracking-[0.2em] text-black transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
                    >
                        GET IN TOUCH
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-12 px-6 border-t border-white/5 mx-auto max-w-7xl mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left: Brand */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="group flex items-center gap-2 text-xl font-black tracking-tighter">
                        <img src="/logo.png" alt="Sitelift Logo" className="h-14 w-14 object-contain transition-transform group-hover:rotate-12" />
                        sitelift
                    </Link>
                    <p className="hidden md:block text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">
                        High-performance systems
                    </p>
                </div>

                {/* Center: Essential Links */}
                <div className="flex items-center gap-8 md:gap-12">
                    {["Work", "Founders", "Contact", "Terms"].map(item => (
                        <Link
                            key={item}
                            href={item === "Contact" ? "/contact" : item === "Terms" ? "#" : `/${item.toLowerCase()}`}
                            className="text-[10px] font-black tracking-widest text-white/30 hover:text-white transition-colors uppercase"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right: Copyright */}
                <div className="flex items-center gap-4">
                    <div className="h-1 w-1 rounded-full bg-green-500/50" />
                    <p className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
                        © {currentYear} SITELIFT
                    </p>
                </div>
            </div>
        </footer>
    );
}
