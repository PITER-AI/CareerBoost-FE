import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
    const randomDelay = Math.floor(Math.random() * 3000);
    console.log("randomDelay",randomDelay);

    throw new Error();
    // next.js는 캐시기반이라 이전에 캐시된 데이터를 사용하므로 개발자도구 강력 새로고침을 해야한다.

    await delay(randomDelay);
    return NextResponse.json({ data: `${randomDelay}초 응답 완료!` });
}