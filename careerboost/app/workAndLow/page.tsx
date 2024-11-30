"use client";

import Link from "next/link";
import Image from "next/image";

export default function workAndLowPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col p-6 relative">
      {/* 헤더 - Career Boost */}
      <header className="flex items-center mb-8 relative">
        <h1 className="text-5xl font-bold text-burgundy">Career Boost</h1>

        {/* 오른쪽 상단 배치 */}
        <div className="absolute top-0 right-0 flex space-x-2">
          <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
            AI 플랫폼 개발자
          </span>
          <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
            장그래 사원
          </span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        {/* 왼쪽 - 아이콘 및 텍스트 */}
        <div className="flex flex-col w-full md:w-1/3 pr-6 mb-8 md:mb-0">
          <Image
            src="/workandlow_logo.png"
            className="mb-4"
            width={64}
            height={64}
            alt="노동·금융 로고"
          />
          <h2 className="text-4xl font-bold text-burgundy mb-4">노동·금융 법률</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
          노동법, 금융법 등 궁금한 것들을 물어보세요!<br />
          이 탭에서는 노동법과 금융법 관련 자주 묻는<br />
          질문들을 살펴볼 수 있고, 직접 작성한 질문에<br /> 
          대한 답변도 받아볼 수 있습니다.
          </p>
        </div>

        {/* 오른쪽 - 버튼 영역 */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-12 grid grid-cols-2 sm:grid-cols-1 gap-6">
          {/* 버튼들 */}
          {[
            { label: "노동법 자주 묻는 질문", type: "workquestion" },
            { label: "금융법 자주 묻는 질문", type: "lowquestion" },
            { label: "질문 직접 입력", type: "userinput" },
          ].map((button) => (
            <Link
              href={{
                pathname: "/chat",
                query: { type: button.type },
              }}
              key={button.type}
            >
              <div className="bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center h-28 shadow-md hover:bg-mint cursor-pointer transition">
                <h2 className="text-3xl font-bold text-burgundy">
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
