"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const founders = [
    {
        name: "Arafat Arnob",
        role: "Co-Founder & CEO",
        bio: "Ex-Vercel engineer with a passion for high-performance web architecture and user experience design.",
        image: "/founders/founder1.jpg",
        links: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
        name: "Monjur",
        role: "Co-Founder & CTO",
        bio: "Full-stack architect specializing in Next.js migrations and scalable cloud infrastructure.",
        image: "/founders/founder2.jpg",
        links: { twitter: "#", linkedin: "#", github: "#" }
    }
];

export function Founders() {
    return (
        <section id="founders" className="relative px-6 py-40 bg-black overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        The Minds Behind SiteLift
                    </motion.div>
                    <h2 className="text-5xl font-extrabold tracking-tight md:text-8xl mb-8">
                        MEET THE <br />
                        <span className="text-white/20 italic">ARCHITECTS</span>
                    </h2>
                    <Link
                        href="/founders"
                        className="group flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors"
                    >
                        Read Our Story
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 max-w-5xl mx-auto">
                    {founders.map((founder, i) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 text-center hover:bg-white/[0.04] transition-colors"
                        >
                            <div className="relative mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="mb-6">
                                <h3 className="text-3xl font-bold tracking-tight text-white">{founder.name}</h3>
                                <p className="text-sm font-bold text-white/30 tracking-widest uppercase mt-1">{founder.role}</p>
                            </div>

                            <p className="mb-10 text-lg text-white/50 leading-relaxed max-w-sm">
                                "{founder.bio}"
                            </p>

                            <div className="flex gap-4">
                                <Link href={founder.links.twitter} className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all">
                                    <Twitter className="h-4 w-4" />
                                </Link>
                                <Link href={founder.links.linkedin} className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all">
                                    <Linkedin className="h-4 w-4" />
                                </Link>
                                <Link href={founder.links.github} className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all">
                                    <Github className="h-4 w-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
