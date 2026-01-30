"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import NextImage from "next/image";

export default function FoundersPage() {
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
                        Our Philosophy
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-extrabold tracking-tight md:text-[10rem] leading-[0.85]"
                    >
                        THE <br />
                        <span className="text-white/20 italic">VISIONARIES.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-12 max-w-2xl text-xl text-muted-foreground/60 leading-relaxed"
                    >
                        SiteLift started with a simple observation: the fastest-growing companies in the world already use Next.js, while everyone else is stuck in the past. We're here to bridge that gap.
                    </motion.p>
                </div>

                <div className="space-y-40">
                    {/* Founder 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
                    >
                        <div className="aspect-square overflow-hidden rounded-[4rem] grayscale hover:grayscale-0 transition-all duration-1000 relative">
                            <NextImage
                                src="/founders/founder1.jpg"
                                alt="Arafat Arnob - CEO of SiteLift"
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold mb-4">Arafat Arnob</h2>
                            <p className="text-white/40 font-black uppercase tracking-widest text-sm mb-8">CHIEF EXECUTIVE OFFICER</p>
                            <p className="text-xl text-white/70 leading-relaxed mb-10">
                                With over a decade of experience in software engineering and cloud infrastructure, Arafat leads the strategic vision for SiteLift. Previously at Vercel, he saw firsthand how the right architecture can transform a business from a laggard into a market leader.
                            </p>
                            <div className="flex gap-6">
                                <Twitter className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                                <Linkedin className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                                <Mail className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Founder 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center md:flex-row-reverse"
                    >
                        <div className="md:order-2 aspect-square overflow-hidden rounded-[4rem] grayscale hover:grayscale-0 transition-all duration-1000 relative">
                            <NextImage
                                src="/founders/founder2.jpg"
                                alt="Monjur Ahmed - CTO of SiteLift"
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="md:order-1">
                            <h2 className="text-5xl font-bold mb-4">Monjur Ahmed</h2>
                            <p className="text-white/40 font-black uppercase tracking-widest text-sm mb-8">CHIEF TECHNOLOGY OFFICER</p>
                            <p className="text-xl text-white/70 leading-relaxed mb-10">
                                Monjur is the technical architect behind SiteLift's migration engine. He specializes in distributed systems and technical SEO, ensuring that every site we build is not just fast, but inherently engineered to dominate search results.
                            </p>
                            <div className="flex gap-6">
                                <Twitter className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                                <Github className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                                <Mail className="h-6 w-6 text-white/20 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
