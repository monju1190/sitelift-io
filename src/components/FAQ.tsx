"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How long does a typical migration take?",
        answer: "For most standard websites (5-10 pages), the process takes between 1-3 weeks. Larger e-commerce sites or complex Webflow builds can take 4-6 weeks.",
    },
    {
        question: "Do I lose my SEO rankings during the move?",
        answer: "No. In fact, most clients see an SEO boost within 30 days. We handle all 301 redirects and technical SEO migrations to ensure zero traffic loss.",
    },
    {
        question: "What happens after the site is launched?",
        answer: "We provide 30 days of post-launch support for free. You can also opt for our monthly performance tuning and maintenance plans.",
    },
    {
        question: "Is Next.js actually better than WordPress?",
        answer: "Yes, for several reasons: speed, security, and developer experience. Next.js sites are statically generated, meaning there's no database to hack and images are perfectly optimized.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="px-6 py-40 border-t border-white/5">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 md:mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        Knowledge Base
                    </motion.div>
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-8xl">
                        COMMON <span className="text-white/20 italic">QUERIES</span>
                    </h2>
                </div>

                <div className="divide-y divide-white/5">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="group"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex w-full items-center justify-between py-10 text-left transition-all group-hover:px-4"
                            >
                                <span className={`text-2xl font-bold tracking-tight md:text-4xl transition-all duration-500 ${openIndex === i ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-700 ${openIndex === i ? "border-white bg-white text-black rotate-45 shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white/60"}`}>
                                    <Plus className="h-6 w-6" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                                        exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="pb-10 pl-4 text-xl font-medium text-white/50 leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
