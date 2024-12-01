import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const targetUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_DOCUMENT_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_DOCUMENT_API_URL;

  if (!targetUrl) {
    console.error("타겟 URL이 설정되지 않았습니다. targetUrl:", targetUrl);
    return NextResponse.json(
      { error: "API URL이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const contentType = req.headers.get("Content-Type") || "";
    const supportedContentTypes = ["application/json", "text/csv"];

    if (!supportedContentTypes.includes(contentType)) {
      console.error(`지원되지 않는 Content-Type: ${contentType}`);
      return NextResponse.json(
        { error: `지원되지 않는 Content-Type: ${contentType}` },
        { status: 415 }
      );
    }

    let body: string;
    try {
      body = contentType.includes("application/json")
        ? JSON.stringify(await req.json())
        : await req.text();
    } catch (parseError) {
      console.error("요청 데이터 처리 중 오류 발생:", parseError);
      return NextResponse.json(
        { error: "요청 데이터를 처리하는 동안 오류가 발생했습니다." },
        { status: 400 }
      );
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("타겟 API 요청 실패:", response.status, errorText);
      return NextResponse.json(
        { error: `API 요청 실패: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.text();
    return NextResponse.json({ message: data });
  } catch (error) {
    console.error("타겟 API 호출 중 네트워크 오류:", error);
    return NextResponse.json(
      { error: "타겟 API 호출 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}
