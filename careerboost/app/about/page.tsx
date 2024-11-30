// About 페이지
// 우리 팀 소개
import Link from "next/link";
import Image from "next/image";

export default function WorkAndLowPage() {
  const teamMembers = [
    {
      name: "이찬우",
      role: "팀장",
      skills: "PM, AI, FE",
      image: "/team_leader.jpg",
    },
    {
      name: "김형준",
      role: "팀원",
      skills: "AI, 데이터전처리",
      image: "/team_member_1.jpg",
    },
    {
      name: "민경빈",
      role: "팀원",
      skills: "BE, RAG",
      image: "/team_member_2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-burgundy mb-8">우리는 PITer 팀입니다</h1>
      <p className="text-lg text-gray-700 mb-12">
        역경과 고난을 이겨내며 목표를 이루기 위해 노력하는 팀입니다!
      </p>

      {/* 팀원 카드 뷰 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <Image
              src={member.image}
              alt={`${member.name} 이미지`}
              width={120}
              height={120}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-burgundy">{member.name}</h2>
            <p className="text-gray-800 mt-2">{member.role}</p>
            <p className="text-gray-600 mt-1">{member.skills}</p>
          </div>
        ))}
      </div>
    
    {/* 하단 - Thanks */}
    <br />
    <br />
    <p className="text-lg text-gray-700">
        LPU를 제공해 준 하이퍼엑셀에게 감사드립니다.
    </p>
      {/* 하단 - 그리드 아이콘 */}
      <footer className="flex justify-start mt-12">
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
