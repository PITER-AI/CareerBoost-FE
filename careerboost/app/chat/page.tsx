"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function ChatPage() {
  const [chatRecords, setChatRecords] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState({
    reportType: "",
    subject: "",
    userRole: "",
  });

  const fetchChatRecords = async () => {
    try {
      // API 통신을 통해 기존 기록 가져오기
      const response = await axios.get("http://127.0.0.1:8000/generator");
      setChatRecords(response.data.records || []);
    } catch (error) {
      console.error("챗봇 기록 로드 실패:", error);
      // 더미 데이터 설정
      setChatRecords([
        "기존 챗봇 대화 기록 1",
        "기존 챗봇 대화 기록 2",
        "기존 챗봇 대화 기록 3",
      ]);
    }
  };

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handlePromptSubmit = () => {
    const prompt = `보고서유형은 ${selectedOptions.reportType}이고 글에서 다루는 주제는 ${selectedOptions.subject}이며, 대상은 ${selectedOptions.userRole}입니다.`;
    alert(`Prompt 전송: ${prompt}`);
    // LLM 서버로 prompt를 전달하는 로직 추가 가능
  };

  const handleRefresh = () => {
    fetchChatRecords();
  };

  useEffect(() => {
    fetchChatRecords();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex">
      {/* 왼쪽 영역 */}
      <aside className="w-1/3 border-r border-gray-300 p-6 flex flex-col">
        {/* 헤더 */}
        <h1 className="text-3xl font-bold text-burgundy mb-6">Career Boost</h1>

        {/* 챗봇 기록 */}
        <div className="flex-1 overflow-y-auto mb-4">
          <h2 className="text-lg font-bold mb-4">바로 대화하기</h2>
          <ul className="space-y-2">
            {chatRecords.map((record, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg">
                {record}
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center space-x-4">
          {/* 설정 버튼 */}
          <Link href="/about">
            <img
              src="/settings_icon.png"
              alt="설정 아이콘"
              className="w-8 h-8 cursor-pointer"
            />
          </Link>
          {/* 새로고침 버튼 */}
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <img
              src="/refresh_icon.png"
              alt="새로고침 아이콘"
              className="w-8 h-8"
            />
          </button>
          <Link href="/">
          <div className="cursor-pointer">
            <img
              src="/grid_icon.png"
              alt="메인페이지로 이동"
              className="w-10 h-10"
            />
          </div>
        </Link>
        </div>
      </aside>

      {/* 오른쪽 영역 */}
      <main className="w-2/3 p-6 flex flex-col space-y-8">
        {/* 보고서 유형 */}
        <div>
          <h2 className="text-xl font-bold text-burgundy mb-4">보고서 유형은</h2>
          <div className="flex flex-wrap gap-4">
            {["정기 보고", "결제 정산", "해외", "기타 보고"].map((type) => (
              <button
                key={type}
                onClick={() => handleOptionSelect("reportType", type)}
                className={`px-4 py-2 rounded-full border ${
                  selectedOptions.reportType === type
                    ? "bg-mint text-burgundy"
                    : "bg-white text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 글에서 다루는 주제 */}
        <div>
          <h2 className="text-xl font-bold text-burgundy mb-4">글에서 다루는 주제는</h2>
          <div className="flex flex-wrap gap-4">
            {["경영", "공학 & IT", "디자인", "인적자원"].map((subject) => (
              <button
                key={subject}
                onClick={() => handleOptionSelect("subject", subject)}
                className={`px-4 py-2 rounded-full border ${
                  selectedOptions.subject === subject
                    ? "bg-mint text-burgundy"
                    : "bg-white text-gray-700"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* 대상 */}
        <div>
          <h2 className="text-xl font-bold text-burgundy mb-4">대상은 누구인가요?</h2>
          <div className="flex flex-wrap gap-4">
            {["공공기관", "이사진", "동료", "거래처"].map((role) => (
              <button
                key={role}
                onClick={() => handleOptionSelect("userRole", role)}
                className={`px-4 py-2 rounded-full border ${
                  selectedOptions.userRole === role
                    ? "bg-mint text-burgundy"
                    : "bg-white text-gray-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex space-x-4">
          <button
            onClick={handlePromptSubmit}
            className="px-6 py-3 bg-burgundy text-white font-bold rounded-lg hover:bg-red-700 transition"
          >
            선택 완료
          </button>
          <button
            onClick={() => alert("직접 입력 모드")}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            직접 입력
          </button>
        </div>
      </main>
    </div>
  );
}
