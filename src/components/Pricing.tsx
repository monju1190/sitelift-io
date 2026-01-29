"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Standard",
        price: "$2,900",
        description: "Perfect for brochure sites and small business blogs.",
        features: [
            "WordPress to Next.js Migration",
            "Lighthouse Score 90+",
            "Technical SEO Foundation",
            "Responsive Layout",
            "14-Day Delivery",
        ],
        highlight: false,
    },
    {
        name: "Professional",
        price: "$5,500",
        description: "Optimized for high-growth startups and marketing sites.",
        features: [
            "Advanced Animation & Parallax",
            "Lighthouse Score 100",
            "Custom CMS Integration",
            "Conversion Rate Optimization",
            "Priority Support",
        ],
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Complex web applications and massive migrations.",
        features: [
            "Custom Web Apps",
            "E-commerce Next.js Builds",
            "Advanced Database Logic",
            "Dedicated Dev Team",
            "Ongoing Performance Tuning",
        ],
        highlight: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="px-6 py-40 bg-[#050505]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 md:mb-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        Flexible Investment
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 text-3xl font-extrabold tracking-tight md:text-8xl"
                    >
                        READY TO <span className="text-white/20 italic">SCALE?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="mx-auto max-w-xl text-lg text-muted-foreground/60"
                    >
                        Choose a plan that matches your ambition. All packages include our signature performance audit.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className={`group relative flex flex-col rounded-[3rem] border border-white/5 p-12 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10 ${plan.highlight ? "bg-white/[0.02] ring-1 ring-white/10" : "bg-transparent"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-5 py-1.5 text-[9px] font-black text-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-10 text-center">
                                <h3 className="mb-4 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-6xl font-black tracking-tighter text-white">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-sm font-bold text-white/20">/pkg</span>}
                                </div>
                            </div>

                            <p className="mb-10 text-center text-sm font-medium text-white/60 leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="mb-12 flex-grow space-y-5">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-4 border-b border-white/[0.03] pb-4 last:border-0">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-white/80 tracking-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <Link
                                    href={`/plans/${plan.name.toLowerCase()}`}
                                    className={`group flex w-full items-center justify-center gap-2 rounded-full py-5 text-sm font-black transition-all duration-500 ${plan.highlight
                                        ? "bg-white text-black hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
                                        }`}>
                                    VIEW {plan.name} DETAILS
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
