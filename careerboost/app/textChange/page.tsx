"use client";

import Link from "next/link";
import Image from "next/image";

export default function TextChangePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col p-6 relative">
      {/* 헤더 - Career Boost */}
      <header className="flex items-center mb-8 relative">
        <h1 className="text-5xl font-bold text-burgundy">Career Boost</h1>

      </header>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        {/* 왼쪽 - 아이콘 및 텍스트 */}
        <div className="flex flex-col w-full md:w-1/3 pr-6 mb-8 md:mb-0">
          <Image
            src="/textchange_logo.png"
            className="mb-4"
            alt="텍스트 변환 로고"
            width={64}
            height={64}
          />
          <h2 className="text-4xl font-bold text-burgundy mb-4">문장 변환</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
          문장을 알맞은 형식으로 변경해보세요!<br />
          이 탭에서는 문장을 입력하여 해당 문장을<br />
          보고서, 이메일, 브리핑 대본 등 다양한<br /> 
          형식으로 변경해볼 수 있습니다.
          </p>
        </div>

        {/* 오른쪽 - 버튼 영역 */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* 버튼들 */}
          {[
            { label: "보고서", type: "report" },
            { label: "이메일", type: "email" },
            { label: "경조사", type: "event" },
            { label: "브리핑 대본", type: "briefing" },
            { label: "PPT", type: "ppt" },
            { label: "그 외", type: "others" },
          ].map((button) => (
            <Link
              href={{
                pathname: "/chat",
                query: { type: button.type },
              }}
              key={button.type}
            >
              <div className="bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center h-48 shadow-md hover:bg-mint cursor-pointer transition">
                <h2 className="text-4xl font-bold text-burgundy">
                  {button.label}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 하단 - 그리드 아이콘 */}
      <footer className="flex justify-start mt-auto">
        <Link href="/">
          <div className="cursor-pointer">
            <Image
              src="/grid_icon.png"
              alt="메인페이지로 이동"
              width={42}
              height={42}
            />
          </div>
        </Link>
      </footer>
    </div>
  );
}
