import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // 환경 변수에서 API URL 가져오기
  const targetUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_API_URL
      : process.env.LOCAL_API_URL;

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'API URL이 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  try {
    // 타임아웃 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 5분 제한

    // 로컬 API로 요청 전달
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('프록시 에러:', error);
    return NextResponse.json(
      { error: '로컬 API 서버와의 통신에 실패했습니다.' },
      { status: 500 }
    );
  }
}
