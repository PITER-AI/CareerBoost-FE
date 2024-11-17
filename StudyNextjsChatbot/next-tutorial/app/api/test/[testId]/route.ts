import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: {params: {testId: string} }) {
    const userData = await request.json();
    console.log("server userData",userData);
    console.log("server params",params.testId);
    return NextResponse.json({ message: "사용자가 성공적으로 생성 되었음." });
}