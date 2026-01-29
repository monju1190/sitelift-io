"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Box } from "lucide-react";

const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Founders", href: "/founders" },
    { name: "Services", href: "/#services" },
    { name: "Pricing", href: "/#pricing" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mouse Interaction for "Gem" Flare
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 80);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none"
        >
            {/* SVG Filter for Liquid Effect */}
            <svg className="absolute hidden">
                <defs>
                    <filter id="liquid-glass">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav className="flex items-center pointer-events-auto relative">
                {/* Refractive Lens Flare (Follows Mouse) */}
                <motion.div
                    style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                    className="fixed top-0 left-0 -z-10 h-32 w-32 rounded-full bg-white/[0.05] blur-2xl pointer-events-none"
                />

                <motion.div
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 0.5
                    }}
                    style={{ filter: scrolled ? "url(#liquid-glass)" : "none" }}
                    className={`relative flex items-center transition-all duration-700 ${scrolled
                            ? "gap-2 rounded-[3.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                            : "gap-12 px-12 py-6 bg-transparent border-transparent"
                        }`}
                >
                    {/* Brand / Logo Orb */}
                    <Link href="/" className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-black transition-transform hover:scale-110 active:scale-90 shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                        <Box className="relative z-10 h-6 w-6" />
                        <motion.div
                            className="absolute inset-0 z-0 bg-neutral-200"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>

                    {/* Navigation Items */}
                    <AnimatePresence mode="popLayout">
                        {(!scrolled || mobileMenuOpen) && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                className="hidden items-center md:flex"
                            >
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="group relative px-6 py-3 text-[10px] font-black tracking-[0.25em] text-white/40 uppercase transition-all hover:text-white"
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <motion.div
                                            className="absolute inset-0 z-0 rounded-full bg-white/5 opacity-0 transition-all group-hover:opacity-100"
                                            layoutId="nav-hover-active"
                                        />
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CTA Gem */}
                    <Link
                        href="/contact"
                        className={`group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white hover:text-black active:scale-95 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] ${scrolled ? "h-14 w-14" : "px-10 py-4"
                            }`}
                    >
                        <span className={`relative z-10 text-[10px] font-black tracking-widest ${scrolled ? "hidden" : "block"}`}>
                            CONTACT
                        </span>
                        <ArrowUpRight className="relative z-10 h-4 w-4" />
                    </Link>

                    {/* Mobile Toggle (Only when scrolled) */}
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

            {/* Expanded Mobile Menu (Crystal Layer) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        className="fixed top-32 left-6 right-6 z-[90] overflow-hidden rounded-[3.5rem] border border-white/10 bg-black/90 p-12 backdrop-blur-[50px] md:hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                    >
                        <div className="flex flex-col gap-10">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-6xl font-black tracking-tighter text-white/20 transition-all hover:text-white hover:translate-x-4"
                                >
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
