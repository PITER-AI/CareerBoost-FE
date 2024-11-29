import './globals.css'; // Tailwind CSS 로드

export const metadata = {
  title: 'Career Boost',
  description: '신입사원 장그래들을 위한 맞춤형 AI 챗봇 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
