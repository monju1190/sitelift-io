"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="relative overflow-hidden bg-black py-40 px-6">
            <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-12 md:p-24 text-center relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase">
                        The Future is Next
                    </div>
                    <h2 className="mb-10 text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        READY TO <br />
                        <span className="text-white/20 italic">LIFT YOUR</span> BRAND?
                    </h2>
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-black text-black transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    >
                        <span className="relative z-10 transition-colors group-hover:text-black">START A PROJECT</span>
                        <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <motion.div
                            className="absolute inset-0 z-0 bg-neutral-200"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Meta */}
                    <div className="md:col-span-4">
                        <Link href="/" className="inline-block text-2xl font-black tracking-tighter mb-8 transition-opacity hover:opacity-70">
                            sitelift
                        </Link>
                        <p className="text-sm text-white/40 font-medium leading-relaxed max-w-[240px]">
                            High-performance digital systems for the next generation of web engineering.
                        </p>
                    </div>

                    {/* Navigation Groups */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black tracking-[0.25em] text-white/20 uppercase mb-8">Studio</h4>
                        <ul className="space-y-4">
                            {["Work", "Founders", "Contact", "Career"].map(item => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-sm font-bold text-white/50 hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Status */}
                    <div className="md:col-span-6 flex flex-col items-start md:items-end text-left md:text-right">
                        <div className="flex flex-col items-start md:items-end mb-12">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                <span className="text-[10px] font-black tracking-widest text-green-500 uppercase">Operational</span>
                            </div>
                            <p className="text-[10px] font-mono text-white/20">SYSTEMS CHECK: 100% SUCCESS</p>
                        </div>

                        <Link
                            href="mailto:hello@sitelift.io"
                            className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-all hover:bg-white hover:text-black"
                        >
                            <span className="text-[10px] font-black tracking-widest uppercase">hello@sitelift.io</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar: Ultra Compact */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                        <p className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
                            © {currentYear} SITELIFT LABS
                        </p>
                        <div className="flex gap-6">
                            {["Privacy", "Terms", "Legal"].map(item => (
                                <Link key={item} href="#" className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase hover:text-white transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                            <Link key={i} href="#" className="text-white/20 hover:text-white transition-colors">
                                <Icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
