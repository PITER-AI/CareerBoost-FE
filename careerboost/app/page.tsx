import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl p-8">
        {/* Left: Career Boost Section */}
        <div className="col-span-1 flex flex-col bg-white p-6 shadow-md rounded-lg">
          <img
            src="/careerboost_logo.png"
            alt="Career Boost Logo"
            className="w-100% h-100% mb-4"
          />
          <h1 className="text-4xl font-bold text-burgundy">Career Boost</h1>
          <div className="flex space-x-2 mt-4">
            <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
              AI 플랫폼 개발자
            </span>
            <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
              장그래 사원
            </span>
          </div>
        </div>

        {/* Right: Buttons Section */}
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4 h-full">
          {/* 문장 변환 버튼 */}
          <Link href="/textChange">
            <div className="bg-gray-100 border border-gray-200 shadow-md rounded-lg flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer transition h-full">
              <h2 className="text-4xl font-bold text-burgundy">문장 변환</h2>
            </div>
          </Link>

          {/* 노동 금융 법률 버튼 */}
          <Link href="/workAndLow">
            <div className="bg-burgundy text-white shadow-md rounded-lg flex items-center justify-center text-center hover:bg-red-700 cursor-pointer transition h-full">
              <h2 className="text-4xl font-bold">노동·금융 법률</h2>
            </div>
          </Link>

          {/* 나만의 멘토 버튼 */}
          <Link href="/myMento">
            <div className="bg-mint shadow-md rounded-lg flex items-center justify-center text-center hover:bg-mint-light cursor-pointer transition h-full">
              <h2 className="text-4xl font-bold text-burgundy">나만의 멘토</h2>
            </div>
          </Link>

          {/* 업무 문서 작성 버튼 */}
          <Link href="/textGenerator">
            <div className="bg-gray-100 border border-gray-200 shadow-md rounded-lg flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer transition h-full">
              <h2 className="text-4xl font-bold text-burgundy">업무 문서 작성</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
