"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Twitter, Linkedin, Github, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("submitting");
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <section id="contact" className="px-6 py-32">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-white px-8 py-20 text-center text-black md:px-20 relative">
                <AnimatePresence mode="wait">
                    {status !== "success" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-7xl">
                                Ready to lift your <br /> business?
                            </h2>
                            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-600 font-medium">
                                Enter your email for a free performance audit. We'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow rounded-full border border-neutral-200 bg-neutral-50 px-6 py-4 text-black focus:border-black focus:outline-none transition-colors"
                                />
                                <button
                                    disabled={status === "submitting"}
                                    className="group flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                                >
                                    {status === "submitting" ? "Sending..." : "Get Audit"}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-10"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h3 className="mb-4 text-3xl font-bold tracking-tight">Email Received.</h3>
                            <p className="text-lg text-neutral-600">
                                We've sent a confirmation to <span className="font-bold text-black">{email}</span>.
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-8 text-sm font-bold text-black/40 hover:text-black transition-colors"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] px-6 py-20 pb-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8 mb-20">
                    {/* Brand Column */}
                    <div className="flex flex-col items-start gap-6">
                        <Link href="/" className="hover:opacity-70 transition-opacity">
                            <img src="/logo.png" alt="sitelift" className="h-8 w-auto px-1" />
                        </Link>
                        <p className="max-w-xs text-sm text-muted-foreground/60 leading-relaxed font-medium">
                            Architecting the future of the web with high-performance Next.js ecosystems.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white hover:text-white hover:bg-white/10 transition-all">
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:ml-auto">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black tracking-widest text-white uppercase">Platform</h4>
                            <ul className="space-y-4 text-sm text-muted-foreground/60 font-medium">
                                <li><Link href="/work" className="hover:text-white transition-colors">Work</Link></li>
                                <li><Link href="/founders" className="hover:text-white transition-colors">Founders</Link></li>
                                <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black tracking-widest text-white uppercase">Legal</h4>
                            <ul className="space-y-4 text-sm text-muted-foreground/60 font-medium">
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="md:ml-auto">
                        <h4 className="text-[10px] font-black tracking-widest text-white uppercase mb-6">Stay Ahead</h4>
                        <p className="text-sm text-muted-foreground/60 mb-6 max-w-xs font-medium">Get the latest on Next.js performance and SEO benchmarks.</p>
                        <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-bold text-white transition-opacity hover:opacity-70">
                            Contact Us
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row">
                    <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
                        © 2026 sitelift. all rights reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold tracking-widest text-white/20 uppercase">
                        <span>Crafted by arafat & monjur</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
