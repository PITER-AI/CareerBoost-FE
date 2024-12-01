"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DirectInputModePage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 환경 변수에서 API URL 가져오기
  const API_BASE_URL = "/api/proxy/chat"; // 프록시 경로
  const DOCUMENT_API_URL = "/api/proxy/documents"; // 프록시 경로

  useEffect(() => {
    const timeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // 딜레이 추가
  
    return () => clearTimeout(timeout);
  }, [messages]);  

  // 채팅 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const response = await fetch(API_BASE_URL, {
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
        throw new Error(`서버 응답 오류: ${response.statusText}`);
      }

      const data = await response.json();

       // 응답에서 입력값 제거 후 파싱
      const fullContent = data.message?.content || "서버에서 적절한 응답을 받지 못했습니다.";
      const parsedContent = parseContent(fullContent);
      const serverMessage = { sender: "server", text: parsedContent };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error("채팅 서버 통신 실패:", error);
      const errorMessage = { sender: "server", text: "API 서버가 종료되었습니다." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // 파일 업로드 핸들러
  const handleFileUpload = async (file: File) => {
    try {
      const contentType = file.type === "text/csv" ? "text/csv" : "application/json";
  
      const response = await fetch(DOCUMENT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: await file.text(), // 파일 내용을 텍스트로 변환하여 전송
      });
  
      if (!response.ok) {
        throw new Error(`CSV 업로드 실패: ${response.statusText}`);
      }
  
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "server", text: `CSV 업로드 완료: ${data.message}` }]);
    } catch (error) {
      console.error("CSV 업로드 실패:", error);
      setMessages((prev) => [...prev, { sender: "server", text: "CSV 업로드 중 오류가 발생했습니다." }]);
    }
  };  

  // 파일 선택 이벤트 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const parseContent = (content: string): string => {
    // 시작 및 종료 패턴들
    const startPatterns = ["1)","#1", "[1]", "(1)", "###1", "1", ""];
    const endPatterns = ["#2", "[2]", "(2)", "###2", "2)", "2"];
  
    // 시작 인덱스를 찾기
    let startIndex = -1;
    for (const pattern of startPatterns) {
      const index = content.indexOf(pattern);
      if (index !== -1 && (startIndex === -1 || index < startIndex)) {
        // 가장 먼저 나오는 시작 패턴의 인덱스를 설정
        startIndex = index + pattern.length;
      }
    }
  
    // 시작 패턴이 없으면 전체 반환
    if (startIndex === -1) {
      return content;
    }
  
    // 종료 인덱스를 찾기
    let endIndex = -1;
    for (const pattern of endPatterns) {
      const index = content.indexOf(pattern, startIndex); // startIndex 이후부터 검색
      if (index !== -1 && (endIndex === -1 || index < endIndex)) {
        endIndex = index;
      }
    }
  
    // 시작 패턴과 종료 패턴 사이의 텍스트 반환
    if (endIndex !== -1) {
      return content.slice(startIndex, endIndex).trim();
    }
  
    // 종료 패턴이 없으면 시작 패턴 이후부터 끝까지 반환
    return content.slice(startIndex).trim();
  };

  // Enter 키 입력 처리
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
                  ? "bg-gray-100 text-[#310005d0] text-right"
                  : "bg-gray-100 text-black text-left"
              }`}
            >
              {msg.text}
            </div>
            <div ref={chatEndRef}></div>
          </div>
        ))}
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
          onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
          placeholder="메시지를 입력하세요..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0009]"
        />
        {/* 파일 업로드 버튼 */}
        <label className="cursor-pointer">
          <Image
            src="/csvImport.png"
            alt="CSV 업로드"
            width={42}
            height={42}
            className="m-1"
          />
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange} // 파일 변경 이벤트 처리
          />
        </label>
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
