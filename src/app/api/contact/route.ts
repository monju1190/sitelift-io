import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, projectType, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("New Contact Form Submission:", { name, email, projectType, message });

        // TODO: Plug in your DB here (e.g. Supabase, MongoDB, etc.)
        /*
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, project_type: projectType, message }]);
        */

        // Simulate DB delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: "Message received" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
