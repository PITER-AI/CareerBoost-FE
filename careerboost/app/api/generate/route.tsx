import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { prompt } = body;

    const llmResponse = await fetch("https:127.0.0.1/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    const data = await llmResponse.json();
    return NextResponse.json(data);
}