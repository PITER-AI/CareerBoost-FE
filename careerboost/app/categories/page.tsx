"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [selectedOptions, setSelectedOptions] = useState({
    reportType: "",
    subject: "",
    userRole: "",
  });

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const buildQueryString = () => {
    return new URLSearchParams(selectedOptions).toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">카테고리 선택</h1>

      {/* 보고서 유형 */}
      <div>
        <h2 className="text-xl font-bold mb-4">보고서 유형</h2>
        <div className="flex gap-4">
          {["정기 보고", "결제 정산", "해외", "기타 보고"].map((type) => (
            <button
              key={type}
              onClick={() => handleOptionSelect("reportType", type)}
              className={`px-4 py-2 rounded-full ${
                selectedOptions.reportType === type
                  ? "bg-mint text-white"
                  : "bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 주제 */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">주제</h2>
        <div className="flex gap-4">
          {["경영", "공학 & IT", "디자인", "인적자원"].map((subject) => (
            <button
              key={subject}
              onClick={() => handleOptionSelect("subject", subject)}
              className={`px-4 py-2 rounded-full ${
                selectedOptions.subject === subject
                  ? "bg-mint text-white"
                  : "bg-gray-200"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* 대상 */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">대상</h2>
        <div className="flex gap-4">
          {["공공기관", "이사진", "동료", "거래처"].map((role) => (
            <button
              key={role}
              onClick={() => handleOptionSelect("userRole", role)}
              className={`px-4 py-2 rounded-full ${
                selectedOptions.userRole === role
                  ? "bg-mint text-white"
                  : "bg-gray-200"
              }`}
            >
                {role}
            </button>
          ))}
        </div>
      </div>

      {/* 이동 버튼 */}
      <div className="mt-8">
        <Link href={`/chat?${buildQueryString()}`}>
          <button className="px-6 py-3 bg-burgundy text-white rounded-lg">
            채팅 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}
