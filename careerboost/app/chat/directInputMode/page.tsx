"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DirectInputModePage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [responseTime, setResponseTime] = useState<number | null>(null); // 응답 시간 상태

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const startTime = Date.now(); // 요청 시작 시간 기록

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: inputText,
              ref: [],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();

      // 응답에서 입력값 제거 후 파싱
      const fullContent = data.message?.content || "서버에서 적절한 응답을 받지 못했습니다.";
      const parsedContent = parseContent(fullContent, inputText);

      const endTime = Date.now(); // 요청 종료 시간 기록
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // 응답 시간 계산 (초 단위)
      setResponseTime(Number(timeTaken)); // 응답 시간 저장

      const serverMessage = { sender: "server", text: parsedContent };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error("LLM 서버 통신 실패:", error);
      const errorMessage = { sender: "server", text: "서버와의 연결이 불안정합니다." };
      setMessages((prev) => [...prev, errorMessage]);
      setResponseTime(null); // 응답 시간 초기화
    }
  };

  const parseContent = (content: string, userInput: string): string => {
    const marker = "are EXAONE model from LG AI Research, a helpful assistant question :";
    const markerIndex = content.indexOf(marker);

    if (markerIndex !== -1) {
      const relevantContent = content.slice(markerIndex + marker.length).trim();
      // 입력값 제거
      const sanitizedContent = relevantContent.replace(userInput, "").trim();
      return sanitizedContent;
    }
    return content;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col">
      {/* 상단 헤더 */}
      <header className="flex items-center p-3 bg-white shadow-md">
        <h1 className="text-4xl font-bold text-burgundy flex-grow">Career Boost</h1>
        <div className="flex space-x-2">
          <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
            AI 플랫폼 개발자
          </span>
          <span className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm">
            장그래 사원
          </span>
        </div>
      </header>

      {/* 채팅 영역 */}
      <div className="flex-grow overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`p-4 rounded-lg shadow-md max-w-xs ${
                msg.sender === "user"
                  ? "bg-gray-200 text-[#5c000981] text-right"
                  : "bg-gray-100 text-black text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* 응답 시간 출력 */}
        {responseTime !== null && (
          <div className="text-gray-600 text-sm mt-2">
            이 답변은 서버에서 {responseTime}초 만에 출력되었습니다.
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <footer className="p-4 bg-white shadow-md flex items-center space-x-4">
        {/* 하단 - 그리드 아이콘 */}
        <Link href="/">
          <div className="cursor-pointer">
            <Image
              src="/grid_icon.png"
              alt="메인페이지로 이동"
              width={42}
              height={42}
              className="m-1"
            />
          </div>
        </Link>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트
          placeholder="메시지를 입력하세요..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0009]"
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#5C0009] text-white px-6 py-2 rounded-lg hover:bg-[#5c000981] transition"
        >
          전송
        </button>
      </footer>
    </div>
  );
}
