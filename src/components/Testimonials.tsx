"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, TechStart Inc",
        content: "The migration from WordPress to Next.js was transformative. Our conversions increased by 45% and the site is blazing fast.",
    },
    {
        name: "Michael Chen",
        role: "Marketing Director",
        content: "Finally, a website that actually scores 100 on Google PageSpeed. Our organic traffic has doubled since the launch.",
    },
    {
        name: "Emily Rodriguez",
        role: "Founder, Creative Studio",
        content: "They preserved our complex animations perfectly while making the site much more stable and SEO-friendly.",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="overflow-hidden py-32">
            <div className="px-6">
                <h2 className="mb-20 text-center text-3xl font-bold tracking-tighter md:text-5xl">What Clients Say</h2>
            </div>

            <div className="flex px-4">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex gap-6 whitespace-nowrap"
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                            className="w-[350px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 cursor-default group"
                        >
                            <p className="mb-8 text-lg font-medium whitespace-normal leading-relaxed text-neutral-300 transition-colors group-hover:text-white">
                                "{t.content}"
                            </p>
                            <div>
                                <p className="font-bold transition-colors group-hover:text-white">{t.name}</p>
                                <p className="text-sm text-muted-foreground transition-colors group-hover:text-white/60">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
