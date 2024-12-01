import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const targetUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_API_URL;

  if (!targetUrl) {
    return NextResponse.json(
      { error: "API URL이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("프록시 에러:", error);
    return NextResponse.json(
      { error: "API 요청 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}
