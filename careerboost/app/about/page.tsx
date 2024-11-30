// About 페이지 
// 우리 팀 소개
import Link from "next/link";
import Image from "next/image";

export default function workAndLowPage() {
    return (
        <>우리는 역경과 고난을 이겨낸 PITer 팀이야!
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
        </>
    );
}