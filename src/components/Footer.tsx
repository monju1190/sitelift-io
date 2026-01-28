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
                            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-600">
                                Enter your email for a free performance audit and discovery call. We'll get back to you within 24 hours.
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
                                We've sent a confirmation to <span className="font-bold text-black">{email}</span>. <br /> Check your inbox shortly.
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
        <footer className="border-t border-white/10 px-6 py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
                <div className="max-w-[120px]">
                    <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
                        sitelift
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground">
                        © 2026 SiteLift. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-8 text-sm text-muted-foreground">
                    <Link href="#" className="transition-colors hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="transition-colors hover:text-white">Terms of Service</Link>
                    <Link href="#" className="transition-colors hover:text-white">Contact</Link>
                </div>

                <div className="flex gap-4">
                    <Link href="#" className="rounded-full border border-white/10 p-2 text-muted-foreground transition-colors hover:border-white hover:text-white">
                        <Twitter className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="rounded-full border border-white/10 p-2 text-muted-foreground transition-colors hover:border-white hover:text-white">
                        <Linkedin className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="rounded-full border border-white/10 p-2 text-muted-foreground transition-colors hover:border-white hover:text-white">
                        <Github className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
