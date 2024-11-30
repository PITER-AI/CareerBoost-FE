import { NextResponse } from 'next/server';

const isDevelopment = process.env.NODE_ENV === 'development';

export async function POST(req: Request) {
  const body = await req.json();

  // 환경에 따라 API Base URL 설정
  const baseUrl = isDevelopment
    ? 'http://localhost:8080/api/v1/chat' // 개발 환경
    : 'https://career-boost-fe.vercel.app/api/v1/chat'; // 프로덕션 환경

  try {
    // 요청을 대상 API 서버로 전달
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy 에러:', error);
    return NextResponse.json(
      { error: '서버 요청 중 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}