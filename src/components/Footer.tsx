"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, ArrowRight, Dot } from "lucide-react";

export function CTA() {
    return (
        <section className="relative overflow-hidden bg-black py-40 px-6">
            <div className="mx-auto max-w-5xl rounded-[4rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-16 md:p-32 text-center relative overflow-hidden group">
                <motion.div
                    whileHover={{ scale: 1.2, opacity: 0.1 }}
                    className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none transition-all duration-1000"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="mb-12 text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] text-white">
                        ELEVATE <br />
                        <span className="text-white/20 italic">TO THE EDGE.</span>
                    </h2>

                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-6 overflow-hidden rounded-full bg-white px-12 py-6 text-[11px] font-black tracking-[0.2em] text-black transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
                    >
                        START A PROJECT
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
        <footer className="bg-black py-20 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl border-t border-white/5 pt-20">
                <div className="flex flex-col md:flex-row items-start justify-between gap-20">
                    {/* Left: Brand & Ethos */}
                    <div className="space-y-8 max-w-xs">
                        <Link href="/" className="group flex items-center gap-2 text-2xl font-black tracking-tighter">
                            <div className="h-4 w-4 rounded-full bg-white transition-transform group-hover:rotate-45" />
                            sitelift
                        </Link>
                        <p className="text-xs font-bold text-white/30 tracking-tight leading-relaxed uppercase">
                            Forging high-performance digital systems for the world's most ambitious brands.
                        </p>
                    </div>

                    {/* Right: Minimal Navigation Bento */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        <div className="space-y-6">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Core</span>
                            <div className="flex flex-col gap-4">
                                {["Work", "Founders", "Services"].map(item => (
                                    <Link key={item} href={`/${item.toLowerCase()}`} className="text-xs font-black tracking-widest text-white/40 hover:text-white transition-colors uppercase">
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Connect</span>
                            <div className="flex flex-col gap-4">
                                {["Twitter", "LinkedIn", "Instagram"].map(item => (
                                    <Link key={item} href="#" className="text-xs font-black tracking-widest text-white/40 hover:text-white transition-colors uppercase">
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 col-span-2 md:col-span-1">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">Status</span>
                            <div className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05]">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">Systems Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Ultra Compact */}
                <div className="mt-40 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-8">
                    <div className="flex gap-8">
                        <p className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">© {currentYear} SITELIFT LABS</p>
                        <p className="text-[9px] font-black tracking-[0.4em] text-white/10 uppercase italic">Built for speed</p>
                    </div>

                    <div className="flex gap-12">
                        {["Privacy", "Terms"].map(item => (
                            <Link key={item} href="#" className="text-[9px] font-black tracking-[0.4em] text-white/20 hover:text-white transition-colors uppercase">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
