"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { ShieldCheck, Lock, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NextImage from "next/image";

const plans: Record<string, { price: string; name: string }> = {
    standard: { name: "Standard", price: "$2,900" },
    professional: { name: "Professional", price: "$5,500" },
    enterprise: { name: "Enterprise", price: "Custom" },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("plan") || "professional";
    const plan = plans[planId] || plans.professional;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleProceed = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(step + 1);
        }, 1500);
    };

    const handlePayment = () => {
        setPaymentStatus("processing");
        setTimeout(() => {
            setPaymentStatus("success");
        }, 3000);
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-40">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                {/* Left: Info & Summary */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
                    >
                        Secure Checkout
                    </motion.div>
                    <h1 className="mb-8 text-3xl font-extrabold tracking-tight md:text-7xl leading-tight">
                        LIFT YOUR <br />
                        <span className="text-white/20 italic">BUSINESS.</span>
                    </h1>

                    <div className="space-y-8 rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10">
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                            <div>
                                <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Scale Plan</p>
                                <h3 className="text-2xl font-bold text-white">{plan.name} Package</h3>
                            </div>
                            <p className="text-3xl font-black tracking-tighter text-white">{plan.price}</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "White-glove Next.js transformation",
                                "Premium technical SEO migration",
                                "Full performance optimization (100 Score)",
                                "24/7 Priority engineer support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 flex items-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest">
                            <ShieldCheck className="h-4 w-4" />
                            Secured by SiteLift Encryption
                        </div>
                    </div>
                </motion.div>

                {/* Right: Payment Interface */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-3xl"
                            >
                                <h3 className="mb-10 text-3xl font-bold tracking-tight">Client Details</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Address</label>
                                        <input type="email" placeholder="john@company.com" className="w-full rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-colors" />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleProceed}
                                        disabled={loading}
                                        className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-sm font-black text-black hover:bg-neutral-200 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50"
                                    >
                                        {loading ? "INITIALIZING..." : "PROCEED TO PAYMENT"}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-3xl"
                            >
                                <div className="mb-10 flex items-center justify-between">
                                    <h3 className="text-3xl font-bold tracking-tight">Payment</h3>
                                    <div className="flex gap-2">
                                        <CreditCard className="h-5 w-5 text-white/40" />
                                        <Lock className="h-5 w-5 text-white/40" />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {paymentStatus !== "success" ? (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Card Details</label>
                                                <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white flex items-center justify-between">
                                                    <span>•••• •••• •••• ••••</span>
                                                    <span className="text-white/40 uppercase text-[10px]">MM / YY</span>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-400 font-medium">
                                                Stripe Secure Checkout integrated. International payments active.
                                            </div>

                                            <div className="space-y-4">
                                                <button
                                                    onClick={handlePayment}
                                                    disabled={paymentStatus === "processing"}
                                                    className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 transition-all hover:bg-neutral-200"
                                                >
                                                    {paymentStatus === "processing" ? (
                                                        <span className="flex items-center gap-2 text-sm font-black text-black">
                                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                                                            PROCESSING...
                                                        </span>
                                                    ) : (
                                                        <NextImage
                                                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_%28GPay%29_Logo_%282020%29.svg"
                                                            alt="Google Pay"
                                                            width={48}
                                                            height={24}
                                                            className="h-6 w-auto"
                                                        />
                                                    )}
                                                </button>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handlePayment}
                                                    disabled={paymentStatus === "processing"}
                                                    className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-5 text-sm font-black text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest"
                                                >
                                                    Pay {plan.price} with Card
                                                </motion.button>
                                            </div>

                                            <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                                                Encrypted by AES-256 Protocol
                                            </p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-10 text-center"
                                        >
                                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-black">
                                                <CheckCircle2 className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-3xl font-bold mb-4">Payment Success</h3>
                                            <p className="text-white/40 mb-10 leading-relaxed">
                                                Your order has been confirmed. The Sitelift Team will reach out via email within 2 hours.
                                            </p>
                                            <Link href="/" className="text-xs font-black tracking-widest uppercase border-b border-white hover:text-white/60 transition-colors">
                                                Return Home
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <Suspense fallback={
                <div className="flex min-h-screen items-center justify-center bg-black text-white">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold tracking-tighter"
                    >
                        SITELIFT SECURE
                    </motion.div>
                </div>
            }>
                <CheckoutContent />
            </Suspense>
            <Footer />
        </main>
    );
}
