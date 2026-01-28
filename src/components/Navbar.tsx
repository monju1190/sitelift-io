"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Founders", href: "/founders" },
    { name: "Services", href: "/#services" },
    { name: "Pricing", href: "/#pricing" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const lastYRef = useRef(0);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastYRef.current;

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        if (diff > 20 && latest > 200) {
            setHidden(true);
        } else if (diff < -20) {
            setHidden(false);
        }

        lastYRef.current = latest;
    });

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: hidden ? -100 : 0,
                opacity: 1
            }}
            transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none"
        >
            <nav
                className={`flex items-center gap-8 rounded-full border border-white/10 px-8 py-3 transition-all duration-700 pointer-events-auto ${scrolled || pathname !== "/"
                    ? "bg-black/80 backdrop-blur-2xl py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/20"
                    : "bg-transparent"
                    }`}
            >
                <Link href="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
                    sitelift
                </Link>
                <div className="hidden items-center gap-7 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group relative text-[11px] font-bold tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-white"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>
                <Link
                    href="/#contact"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2 text-xs font-black text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <span className="relative z-10">CONTACT</span>
                    <ArrowUpRight className="relative z-10 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <motion.div
                        className="absolute inset-0 z-0 bg-neutral-200"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </Link>
            </nav>
        </motion.header>
    );
}
