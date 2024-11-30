"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DirectInputModePage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // LLM 서버와 통신
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });
      const data = await response.json();
      const serverMessage = { sender: "server", text: data.response };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error("LLM 서버 통신 실패:", error);
      const errorMessage = { sender: "server", text: "서버와의 연결이 불안정합니다." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // PC 기준 엔터키 활성화
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
        {/* 오른쪽 상단 배치 */}
        <div className="absolute top-30 right-10 flex space-x-2">
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
                  ? "bg-mint text-black text-right"
                  : "bg-gray-200 text-black text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <footer className="p-4 bg-white shadow-md flex">
        {/* 하단 - 그리드 아이콘 */}
        <Link href="/">
          <div className="cursor-pointer">
            <Image
              src="/grid_icon.png"
              alt="메인페이지로 이동"
              width={42}
              height={42}
              className="m-1" // 테일윈드 마진 문법
            />
          </div>
        </Link>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
          placeholder="메시지를 입력하세요..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0009]"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-[#5C0009] text-white px-6 py-2 rounded-lg hover:bg-[#5c000981] transition"
        >
          전송
        </button>
      </footer>
    </div>
  );
}