import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Google PageSpeed Insights API endpoint
        const apiKey = process.env.PAGESPEED_API_KEY;
        if (!apiKey) console.warn("PAGESPEED_API_KEY is missing. Anonymous quota limits apply.");
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
            url
        )}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`;

        const response = await fetch(psiUrl);
        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: data.error.code });
        }

        const lighthouse = data.lighthouseResult;
        const categories = lighthouse.categories;

        const report = {
            performance: Math.round(categories.performance.score * 100),
            accessibility: Math.round(categories.accessibility.score * 100),
            bestPractices: Math.round(categories["best-practices"].score * 100),
            seo: Math.round(categories.seo.score * 100),
            insights: [
                {
                    type: "critical",
                    label: "LCP",
                    message: lighthouse.audits["largest-contentful-paint"].displayValue,
                },
                {
                    type: "insight",
                    label: "TBT",
                    message: lighthouse.audits["total-blocking-time"].displayValue,
                }
            ]
        };

        return NextResponse.json(report);
    } catch (error: any) {
        console.error("Audit error:", error);
        return NextResponse.json({ error: "Failed to run audit" }, { status: 500 });
    }
}
