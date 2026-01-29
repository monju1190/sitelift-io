"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

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
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6"
        >
            <nav className="relative flex items-center">
                {/* Main Floating Island */}
                <motion.div
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={`flex items-center gap-8 rounded-[2.5rem] border bg-black/40 backdrop-blur-3xl transition-all duration-700 ${scrolled
                            ? "border-white/20 px-4 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            : "border-white/5 px-8 py-4"
                        }`}
                >
                    <Link href="/" className="group flex items-center gap-2 text-2xl font-black tracking-tighter">
                        <motion.div
                            animate={{ rotate: scrolled ? 180 : 0 }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-all group-hover:bg-neutral-200"
                        >
                            <Plus className="h-5 w-5" />
                        </motion.div>
                        <span className={scrolled ? "hidden md:block" : "block"}>sitelift</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-2 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group relative rounded-full px-4 py-2 text-[10px] font-black tracking-widest text-white/40 uppercase transition-all hover:text-white"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <motion.div
                                    className="absolute inset-0 z-0 rounded-full bg-white/5 opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/contact"
                        className={`group relative flex items-center justify-center overflow-hidden rounded-full bg-white text-black transition-all hover:scale-105 active:scale-95 ${scrolled ? "h-10 w-10 md:w-auto md:px-6 md:py-2.5" : "px-8 py-3"
                            }`}
                    >
                        <span className={`relative z-10 text-[10px] font-black tracking-widest ${scrolled ? "hidden md:block" : "block"}`}>
                            LIFT NOW
                        </span>
                        <ArrowUpRight className={`relative z-10 ${scrolled ? "h-5 w-5" : "h-4 w-4"}`} />
                        <motion.div
                            className="absolute inset-0 z-0 bg-neutral-200"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
                    >
                        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </motion.div>

                {/* Status Indicator (Only when scrolled) */}
                <AnimatePresence>
                    {scrolled && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute -left-32 top-1/2 hidden -translate-y-1/2 items-center gap-2 xl:flex"
                        >
                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase leading-none mt-0.5">EST. 2026</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[-1] bg-black/60 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full gap-8 p-6"
                        >
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-5xl font-black tracking-tighter text-white/20 transition-colors hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-5xl font-black tracking-tighter text-white"
                            >
                                CONTACT
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
