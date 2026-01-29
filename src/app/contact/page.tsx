"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Calendar, ArrowRight, CheckCircle2, Globe, Github, Twitter, Linkedin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function CustomSelect({ options, name }: { options: string[], name: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <input type="hidden" name={name} value={selected} />
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-left text-white focus:border-white transition-all hover:bg-white/5"
            >
                <span className="text-sm font-bold">{selected}</span>
                <ChevronDown className={`h-4 w-4 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 backdrop-blur-xl shadow-2xl"
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    setSelected(option);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center px-4 py-3 text-sm font-bold transition-all rounded-xl ${selected === option
                                    ? "bg-white text-black"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("submitting");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            projectType: formData.get("projectType"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setFormState("success");
            } else {
                setFormState("idle");
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            setFormState("idle");
            alert("Network error. Please check your connection.");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            <section className="mx-auto max-w-7xl px-6 py-40">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
                    {/* Left Side: Copy & Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                        >
                            Get In Touch
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-8 text-6xl font-extrabold tracking-tight md:text-8xl leading-[0.85]"
                        >
                            LET'S START <br />
                            <span className="text-white/20 italic">THE LIFT.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mb-12 max-w-lg text-xl text-muted-foreground/60 leading-relaxed"
                        >
                            Whether you're migrating from WordPress or building a custom Next.js application from scratch, we're ready to help you scale.
                        </motion.p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors group-hover:border-white/20">
                                    <Mail className="h-5 w-5 text-white/60" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest text-white/20 uppercase">Email Us</p>
                                    <p className="text-lg font-bold">hello@sitelift.io</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors group-hover:border-white/20">
                                    <Globe className="h-5 w-5 text-white/60" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black tracking-widest text-white/20 uppercase">Global Office</p>
                                    <p className="text-lg font-bold">Remote-First / Dhaka HQ</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex gap-6">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5 }}
                                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form & Tabs */}
                    <div className="relative">
                        <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-3xl">
                            <div className="mb-10 flex gap-4 border-b border-white/5 pb-8">
                                <button className="text-xs font-black tracking-widest uppercase text-white border-b-2 border-white pb-2">Direct Message</button>
                                <button
                                    onClick={() => window.open('https://calendly.com', '_blank')}
                                    className="text-xs font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors pb-2"
                                >
                                    Book Call
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {formState !== "success" ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Name</label>
                                                <input name="name" required type="text" placeholder="John Doe" className="w-full rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-white focus:border-white focus:outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email</label>
                                                <input name="email" required type="email" placeholder="john@company.com" className="w-full rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-white focus:border-white focus:outline-none transition-colors" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Project Type</label>
                                            <CustomSelect
                                                name="projectType"
                                                options={[
                                                    "WordPress Migration",
                                                    "Webflow to Next.js",
                                                    "Custom SaaS Build",
                                                    "Performance Audit"
                                                ]}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Message</label>
                                            <textarea name="message" rows={4} placeholder="How can we help?" className="w-full rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-white focus:border-white focus:outline-none transition-colors resize-none" />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={formState === "submitting"}
                                            className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-sm font-black text-black transition-all hover:bg-neutral-200 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] disabled:opacity-50"
                                        >
                                            {formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white text-black">
                                            <CheckCircle2 className="h-12 w-12" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4">Message Sent.</h3>
                                        <p className="text-white/40 mb-10 leading-relaxed">
                                            We've received your request. Arafat or Monjur will reach out to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setFormState("idle")}
                                            className="text-xs font-black tracking-widest uppercase border-b border-white hover:text-white/60 transition-colors"
                                        >
                                            Send another
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
