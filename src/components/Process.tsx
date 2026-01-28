"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        title: "Discovery & Consultation",
        description: "We dive deep into your business goals, current bottlenecks, and target audience to define the perfect Next.js roadmap.",
        period: "1-2 Days",
    },
    {
        title: "Site Analysis & Strategy",
        description: "Full audit of your existing WordPress, Webflow, or Framer site to identify performance gaps and SEO opportunities.",
        period: "2-3 Days",
    },
    {
        title: "Development & Optimization",
        description: "Our experts rebuild your site from the ground up using Next.js, ensuring pixel-perfect design and blazing speed.",
        period: "1-3 Weeks",
    },
    {
        title: "Launch & Support",
        description: "Rigorous testing across devices followed by a seamless launch. We stay by your side for ongoing performance tuning.",
        period: "Continuous",
    },
];

export function Process() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section id="process" ref={containerRef} className="px-6 py-20">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter md:text-5xl">Our Process</h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-white to-transparent md:left-1/2"
                    />

                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <div key={i} className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                                {/* Step Marker */}
                                <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-white md:left-1/2 md:ml-[-6px]" />

                                <motion.div
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`w-full pl-8 md:w-[45%] md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                                >
                                    <span className="mb-2 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                        Step 0{i + 1} — {step.period}
                                    </span>
                                    <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
