"use client";

import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-burgundy">Chat Page</h1>
      <p className="mt-4 text-xl text-gray-700">
        선택한 유형: <span className="font-bold">{type || "없음"}</span>
      </p>
    </div>
  );
}
