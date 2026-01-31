"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Search,
    ArrowRight,
    ShieldCheck,
    Globe,
    Zap,
    BarChart3,
    CheckCircle2,
    Lock,
    Cpu
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function FreeAuditPage() {
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const downloadPdf = async () => {
        setIsGeneratingPdf(true);
        // We capture a dedicated, simplified version of the report to ensure success
        const reportElement = document.getElementById('audit-pdf-template');
        if (!reportElement) {
            setIsGeneratingPdf(false);
            return;
        }

        try {
            // Force visibility for capture - BUT OFF SCREEN to prevent flash
            reportElement.style.display = 'block';
            reportElement.style.position = 'fixed';
            reportElement.style.left = '-10000px';
            reportElement.style.top = '0';

            await new Promise(resolve => setTimeout(resolve, 500)); // Ensure images load

            const canvas = await html2canvas(reportElement, {
                scale: 2, // High res
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                width: 800,
                windowWidth: 1000, // Force a wide window context
                onclone: (clonedDoc) => {
                    const el = clonedDoc.getElementById('audit-pdf-template');
                    if (el) {
                        // Ensure it's visible in the clone viewport logic if needed, 
                        // though html2canvas typically handles off-screen elements if passed directly.
                        // We reset positioning in the clone just in case to ensure full capture
                        el.style.position = 'relative';
                        el.style.left = '0';
                        el.style.top = '0';
                    }
                }
            });

            // Restore hidden state
            reportElement.style.display = 'none';

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = (canvas.height * imgWidth) / canvas.width;

            // Create PDF with dynamic height to fit all content (no cutoff)
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: [imgWidth, pageHeight]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pageHeight);

            let hostname = 'report';
            try { hostname = new URL(url).hostname; } catch (e) { }
            pdf.save(`Sitelift_Audit_${hostname}.pdf`);
        } catch (err) {
            console.error("PDF Export failed:", err);
            alert("Digital report generation encountered a technical limitation. Please use the Print (Ctrl+P) option and select 'Save as PDF' to export your report reliably.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const handleStartAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsAnalyzing(true);
        setProgress(0);
        setStep(2);

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, name }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to analyze site");
            }

            const data = await response.json();
            setReportData(data);

            // Artificial delay to show progress animation even if API is fast
            // though PSI is usually slow anyway.
        } catch (err: any) {
            setError(err.message);
            setStep(1);
            setIsAnalyzing(false);
        }
    };

    useEffect(() => {
        if (isAnalyzing) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95 && !reportData) {
                        return 95; // Wait for data at 95%
                    }
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setStep(3);
                            setIsAnalyzing(false);
                        }, 800);
                        return 100;
                    }
                    return prev + (prev < 90 ? 1 : 0.2); // Slow down near the end
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing, reportData]);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="relative mx-auto max-w-7xl px-6 py-40">
                {/* Background Refractive Lights */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/[0.03] via-transparent to-transparent blur-[120px]" />

                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:items-center">
                    {/* Left Side: Cinematic Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                            Performance Diagnostics
                        </motion.div>

                        <h1 className="mb-8 text-4xl font-black tracking-tighter md:text-8xl leading-[0.9]">
                            KNOW YOUR <br />
                            <span className="text-white/20 italic text-5xl md:text-9xl">LIMITS.</span>
                        </h1>

                        <p className="mb-12 max-w-xl text-xl font-medium text-white/40 leading-relaxed">
                            Stop guessing. Get a deep technical breakdown of your website's performance, Core Web Vitals, and conversion leaks.
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
                            {[
                                { icon: Zap, label: "Speed Matrix", value: "Real-time" },
                                { icon: ShieldCheck, label: "Security", value: "AES-256" },
                                { icon: Globe, label: "SEO Impact", value: "Direct" },
                                { icon: BarChart3, label: "Conversion", value: "High Fidelity" }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <stat.icon className="h-4 w-4 text-white/20" />
                                    <div className="text-xs font-black uppercase tracking-widest text-white">{stat.label}</div>
                                    <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: The Interactive Gem Form */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                                    className="rounded-[3.5rem] border border-white/10 bg-white/[0.02] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                                >
                                    {/* Glass Morph Decoration */}
                                    <div className="absolute top-0 right-0 h-40 w-40 bg-white/[0.03] rotate-45 translate-x-10 -translate-y-10" />

                                    <h3 className="mb-10 text-3xl font-black tracking-tight">Technical Request</h3>

                                    <form onSubmit={handleStartAudit} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Website URL</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-6 flex items-center text-white/20 group-focus-within:text-white transition-colors">
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <input
                                                    required
                                                    type="url"
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    placeholder="https://yourwork.com"
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-5 pl-14 pr-6 text-white placeholder:text-white/20 outline-none transition-all focus:border-white focus:bg-white/10"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Your Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white placeholder:text-white/20 outline-none transition-all focus:border-white focus:bg-white/10"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="ceo@brand.com"
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white placeholder:text-white/20 outline-none transition-all focus:border-white focus:bg-white/10"
                                                />
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isAnalyzing}
                                            className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 py-6 text-xs font-black text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase">
                                                Run Performance Audit
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                            <motion.div className="absolute inset-x-0 bottom-0 h-1 bg-neutral-200" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} />
                                        </button>

                                        <div className="flex items-center justify-center gap-4 pt-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                                <Lock className="h-3 w-3" />
                                                Protected
                                            </div>
                                            <div className="h-1 w-1 rounded-full bg-white/10" />
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Verified
                                            </div>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="analyzing"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                                    className="flex flex-col items-center justify-center rounded-[3.5rem] border border-white/10 bg-white/[0.03] p-24 text-center backdrop-blur-3xl min-h-[500px]"
                                >
                                    <div className="relative mb-20">
                                        {/* Orb Scanning Animation */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="h-48 w-48 rounded-full border border-white/10 flex items-center justify-center relative"
                                        >
                                            <div className="absolute inset-0 rounded-full border-t border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
                                            <Cpu className="h-12 w-12 text-white/40" />
                                        </motion.div>

                                        {/* Progress Rings */}
                                        <svg className="absolute top-0 left-0 h-48 w-48 -rotate-90">
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="92"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="transparent"
                                                className="text-white"
                                                style={{
                                                    strokeDasharray: 578,
                                                    strokeDashoffset: 578 - (578 * progress) / 100,
                                                    transition: "stroke-dashoffset 0.1s linear"
                                                }}
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="mb-4 text-3xl font-black tracking-tight uppercase">Analyzing Infrastructure</h3>
                                    <div className="h-1 w-64 rounded-full bg-white/5 overflow-hidden mb-6">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: `${progress - 100}%` }}
                                            className="h-full w-full bg-white"
                                        />
                                    </div>
                                    <div className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase italic">
                                        {progress < 30 ? "Initializing Vercel Audit..." :
                                            progress < 60 ? "Scanning Build Bundle Sizes..." :
                                                progress < 90 ? "Calculating SEO Depth..." : "Finalizing Diagnostic Report..."}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="report"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 backdrop-blur-3xl"
                                >
                                    <div id="audit-report-content" className="p-2 md:p-4 bg-black/40 rounded-[2.5rem]">
                                        <div className="mb-0 flex items-center justify-between border-b border-white/10 pb-8 px-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="h-6 w-6 rounded bg-white flex items-center justify-center">
                                                        <Zap className="h-4 w-4 text-black" />
                                                    </div>
                                                    <h3 className="text-xl font-black tracking-tight uppercase">Sitelift Audit</h3>
                                                </div>
                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] truncate max-w-[200px] md:max-w-xs">
                                                    {url}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Report Prepared For</div>
                                                <div className="text-xs font-bold text-white uppercase">{name || "Valued Partnership"}</div>
                                            </div>
                                        </div>

                                        {/* Main Scores Chart Section */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 px-4">
                                            {[
                                                { label: "Performance", score: reportData?.performance || 0 },
                                                { label: "Accessibility", score: reportData?.accessibility || 0 },
                                                { label: "Best Practices", score: reportData?.bestPractices || 0 },
                                                { label: "SEO", score: reportData?.seo || 0 }
                                            ].map((metric, i) => (
                                                <div key={i} className="flex flex-col items-center">
                                                    <div className="relative h-24 w-24 mb-4">
                                                        <svg className="h-full w-full -rotate-90">
                                                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                                                            <motion.circle
                                                                cx="48" cy="48" r="44"
                                                                stroke={metric.score >= 90 ? "#10b981" : metric.score >= 50 ? "#f59e0b" : "#ef4444"}
                                                                strokeWidth="6" strokeDasharray={276}
                                                                initial={{ strokeDashoffset: 276 }}
                                                                animate={{ strokeDashoffset: 276 - (276 * metric.score) / 100 }}
                                                                transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                                                                fill="transparent"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                            <span className="text-2xl font-black tracking-tighter">{metric.score}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest text-center">{metric.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Core Web Vitals - The Real Data */}
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10 px-4">
                                            {[
                                                { label: "FCP", value: reportData?.metrics?.fcp, name: "First Contentful Paint" },
                                                { label: "LCP", value: reportData?.metrics?.lcp, name: "Largest Contentful Paint" },
                                                { label: "CLS", value: reportData?.metrics?.cls, name: "Cumulative Layout Shift" },
                                                { label: "TBT", value: reportData?.metrics?.tbt, name: "Total Blocking Time" },
                                                { label: "TTI", value: reportData?.metrics?.tti, name: "Time to Interactive" },
                                                { label: "Speed Index", value: reportData?.metrics?.si, name: "Visual Load Speed" }
                                            ].map((m, i) => (
                                                <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 group transition-colors hover:bg-white/[0.05]">
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 group-hover:text-white/40">{m.label}</div>
                                                    <div className="text-lg font-black text-white mb-1">{m.value}</div>
                                                    <div className="text-[8px] font-medium text-white/20 uppercase tracking-tighter">{m.name}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Critical Opportunities */}
                                        <div className="mb-10 px-4">
                                            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                                <Search className="h-3 w-3" />
                                                Critical Opportunities
                                            </div>
                                            <div className="space-y-3">
                                                {reportData?.opportunities?.map((opt: any, i: number) => (
                                                    <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/20">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                                                            <Zap className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <h4 className="text-sm font-bold text-white">{opt.title}</h4>
                                                                {opt.displayValue && (
                                                                    <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded text-white/60">-{opt.displayValue}</span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-white/40 leading-relaxed max-w-lg">{opt.description.replace(/\[Learn more\].*/, "")}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!reportData?.opportunities || reportData.opportunities.length === 0) && (
                                                    <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-8 text-center">
                                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-3" />
                                                        <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">No Critical Performance Leaks Detected</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Sitelift Verdict */}
                                        <div className="px-4 pb-8">
                                            {(() => {
                                                const score = reportData?.performance || 0;
                                                let message = "Your infrastructure is running at sub-optimal levels. We can propel these scores to 100 within 14 days.";
                                                if (score >= 90) message = "Exceptional performance detected. You are leading the industry. We can help you maintain this peak efficiency as you continue to scale.";
                                                else if (score >= 70) message = "Solid architecture, but potential remains untapped. We can fine-tune your Core Web Vitals to reach a consistent 100.";
                                                else if (score < 50) message = "Critical performance bottlenecks isolated. Your conversion rates are at significant risk. Immediate architectural intervention is recommended.";

                                                return (
                                                    <div className="rounded-2xl bg-white/5 p-6 text-center border border-white/10">
                                                        <p className="text-xs text-white/60 mb-4 font-medium italic leading-relaxed">
                                                            "{message}"
                                                        </p>
                                                        <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                                                            — The Sitelift Team
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setStep(4)}
                                                className="rounded-full bg-white py-4 text-[10px] font-black text-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                            >
                                                Secure Intervention
                                            </button>
                                            <button
                                                onClick={downloadPdf}
                                                disabled={isGeneratingPdf}
                                                className="rounded-full border border-white/20 bg-white/5 py-4 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                                            >
                                                {isGeneratingPdf ? (
                                                    <div className="h-3 w-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <ArrowRight className="h-3 w-3 rotate-90" />
                                                )}
                                                {isGeneratingPdf ? "Generating..." : "Download Full Report"}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-6 mt-2">
                                            <button
                                                onClick={() => {
                                                    setStep(1);
                                                    setReportData(null);
                                                    setError(null);
                                                }}
                                                className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors"
                                            >
                                                Test Another
                                            </button>
                                            <div className="h-1 w-1 rounded-full bg-white/10" />
                                            <Link href="/" className="text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors text-center">
                                                Return to Home
                                            </Link>
                                        </div>
                                    </div>

                                    <div id="audit-pdf-template" style={{ display: 'none', width: '800px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif', position: 'fixed', left: '-10000px', top: 0, paddingBottom: '20px' }}>
                                        {/* Cover / Header */}
                                        <div style={{ padding: '60px', borderBottom: '2px solid #f3f4f6' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ marginBottom: '25px', height: '60px', display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.04em', color: '#000', fontFamily: 'sans-serif', lineHeight: '1', textTransform: 'uppercase' }}>Sitelift.io</span>
                                                    </div>
                                                    <h1 style={{ margin: '20px 0 0 0', fontSize: '38px', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1.1', color: '#000' }}>
                                                        PERFORMANCE<br />
                                                        <span style={{ color: '#6b7280' }}>AUDIT REPORT</span>
                                                    </h1>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ backgroundColor: '#f9fafb', padding: '15px 25px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                                        <p style={{ margin: '0 0 5px 0', fontSize: '9px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target URL</p>
                                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: '#111827' }}>{url}</p>
                                                    </div>
                                                    <div style={{ marginTop: '15px' }}>
                                                        <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Prepared For</p>
                                                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#000' }}>{name || 'Valued Client'}</p>
                                                        <p style={{ margin: '5px 0 0 0', fontSize: '9px', color: '#4b5563' }}>{new Date().toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ padding: '60px' }}>
                                            {/* Score Showcase */}
                                            <div style={{ marginBottom: '50px' }}>
                                                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#111', marginBottom: '20px', fontWeight: '800', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Executive Summary</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                                                    {[
                                                        { label: 'Performance', val: reportData?.performance },
                                                        { label: 'Accessibility', val: reportData?.accessibility },
                                                        { label: 'Best Practices', val: reportData?.bestPractices },
                                                        { label: 'SEO', val: reportData?.seo }
                                                    ].map((m, i) => {
                                                        const color = (m.val || 0) >= 90 ? '#059669' : (m.val || 0) >= 50 ? '#d97706' : '#dc2626';
                                                        return (
                                                            <div key={i} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: color }}></div>
                                                                <h2 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 5px 0', color: color, letterSpacing: '-0.05em' }}>{m.val}</h2>
                                                                <p style={{ fontSize: '9px', color: '#4b5563', margin: 0, textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em' }}>{m.label}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Core Metrics Grid */}
                                            <div style={{ marginBottom: '50px' }}>
                                                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#111', marginBottom: '20px', fontWeight: '800', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Core Web Vitals</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                                    {[
                                                        { k: 'FCP', n: 'First Contentful Paint', v: reportData?.metrics?.fcp },
                                                        { k: 'LCP', n: 'Largest Contentful Paint', v: reportData?.metrics?.lcp },
                                                        { k: 'CLS', n: 'Cumulative Layout Shift', v: reportData?.metrics?.cls },
                                                        { k: 'TBT', n: 'Total Blocking Time', v: reportData?.metrics?.tbt },
                                                        { k: 'TTI', n: 'Time to Interactive', v: reportData?.metrics?.tti },
                                                        { k: 'SI', n: 'Speed Index', v: reportData?.metrics?.si }
                                                    ].map((m, i) => (
                                                        <div key={i} style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '20px', borderRadius: '12px' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                                <span style={{ fontSize: '10px', fontWeight: '900', color: '#374151' }}>{m.k}</span>
                                                            </div>
                                                            <p style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#111827', letterSpacing: '-0.02em' }}>{m.v}</p>
                                                            <p style={{ fontSize: '8px', color: '#6b7280', margin: '5px 0 0 0', textTransform: 'uppercase', fontWeight: '600' }}>{m.n}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Opportunities */}
                                            <div>
                                                <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#111', marginBottom: '20px', fontWeight: '800', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Optimization Opportunities</h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {reportData?.opportunities?.map((o: any, i: number) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                                                </svg>
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                                    <h4 style={{ fontSize: '14px', margin: 0, fontWeight: '800', color: '#111827' }}>{o.title}</h4>
                                                                    {o.savings > 0 && (
                                                                        <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                                                            Potential Savings
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: '1.6', fontWeight: '500', paddingBottom: '2px' }}>{o.description.split('[')[0]}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {(!reportData?.opportunities || reportData.opportunities.length === 0) && (
                                                        <div style={{ padding: '30px', textAlign: 'center', border: '2px dashed #e5e7eb', borderRadius: '12px', backgroundColor: '#f9fafb' }}>
                                                            <p style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', fontWeight: '500' }}>No critical opportunities found. Your site is well optimized.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ padding: '30px 60px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ fontSize: '9px', color: '#6b7280', fontStyle: 'italic', margin: 0, fontWeight: '500' }}>
                                                "Speed is a feature." — Generated by Sitelift Intelligence
                                            </p>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                                            </div>
                                            <p style={{ fontSize: '9px', color: '#111827', fontWeight: '900', margin: 0 }}>
                                                SITELIFT.IO
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-20 text-center backdrop-blur-3xl"
                                >
                                    <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-black shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                                        <CheckCircle2 className="h-12 w-12" />
                                    </div>
                                    <h2 className="mb-6 text-4xl font-black tracking-tighter">REQUEST LOGGED.</h2>
                                    <p className="mb-12 max-w-sm text-white/50 leading-relaxed font-medium">
                                        The Sitelift Team has received your diagnostic data. We'll reach out within 2 hours to discuss your 100-score roadmap.
                                    </p>
                                    <Link href="/" className="text-[10px] font-black tracking-[0.3em] uppercase border-b border-white pb-1 transition-all hover:text-white/60">
                                        Return Home
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
