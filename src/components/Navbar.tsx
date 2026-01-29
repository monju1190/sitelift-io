"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Founders", href: "/founders" },
    { name: "Services", href: "/#services" },
    { name: "Pricing", href: "/#pricing" },
];

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.4);
        y.set((clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative">
            <motion.div style={{ x: springX, y: springY }} onClick={onClick} className={className}>
                {children}
            </motion.div>
        </div>
    );
}

export function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 100);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none"
        >
            {/* SVG Filter for Liquid Prism Effect */}
            <svg className="absolute hidden">
                <defs>
                    <filter id="liquid-gem">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav className="flex items-center pointer-events-auto relative group/nav">
                {/* Refractive Prism Glow */}
                <motion.div
                    style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                    className="fixed top-0 left-0 -z-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-[80px] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000 pointer-events-none"
                />

                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    style={{ filter: scrolled ? "url(#liquid-gem)" : "none" }}
                    className={`relative flex items-center transition-all duration-700 ${scrolled
                        ? "gap-3 rounded-[3rem] bg-black/60 backdrop-blur-[40px] border border-white/10 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                        : "gap-14 px-12 py-6 bg-transparent"
                        }`}
                >
                    {/* Branding Orb */}
                    <Link href="/" className="group relative flex items-center gap-3">
                        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-black transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <img src="/logo.png" alt="Sitelift Logo" className="relative z-10 h-11 w-11 object-contain" />
                            <motion.div className="absolute inset-0 bg-neutral-200" initial={{ y: "100%" }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }} />
                        </div>
                        {!scrolled && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-black tracking-tighter text-white"
                            >
                                sitelift
                            </motion.span>
                        )}
                    </Link>

                    {/* Navigation Items - Magnetic */}
                    <AnimatePresence mode="popLayout">
                        {!scrolled && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                className="hidden items-center gap-2 md:flex"
                            >
                                {navLinks.map((link) => (
                                    <MagneticButton key={link.name}>
                                        <Link href={link.href} className="group relative px-6 py-3 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase transition-all hover:text-white">
                                            {link.name}
                                            <motion.div className="absolute inset-x-4 -bottom-1 h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform" />
                                        </Link>
                                    </MagneticButton>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CTA Gem - Hyper Reactive */}
                    <MagneticButton className="relative">
                        <Link
                            href="/contact"
                            className={`group flex items-center justify-center overflow-hidden rounded-full border bg-white/5 transition-all active:scale-90 ${scrolled ? "h-14 w-14 border-white/20" : "px-10 py-4 border-white/10"
                                }`}
                        >
                            <span className={`relative z-10 text-[10px] font-black tracking-widest text-white ${scrolled ? "hidden" : "block"}`}>GET IN TOUCH</span>
                            <ArrowUpRight className="relative z-10 h-4 w-4 text-white" />
                            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        </Link>
                    </MagneticButton>

                    {/* Mobile Hud Toggle */}
                    {scrolled && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    )}
                </motion.div>
            </nav>

            {/* Mobile "Gem" Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-6 top-32 z-[-1] overflow-hidden rounded-[3.5rem] border border-white/10 bg-black/90 p-12 backdrop-blur-[60px] md:hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                    >
                        <div className="flex flex-col gap-10">
                            {navLinks.map((link, i) => (
                                <Link key={i} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-6xl font-black tracking-tighter text-white/20 hover:text-white transition-all uppercase hover:translate-x-4">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
