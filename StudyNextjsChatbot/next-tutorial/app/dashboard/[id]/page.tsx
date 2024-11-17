'use client';

// 다이나믹 라우트는 폴더명에 대괄호 [ ] 를 사용하여 만들 수 있다.
export default function Page({params}: {params: {id: string;}}) {
    //다이나믹 라우트 값은 props에 params로 가져올 수 있다.

    const handleSubmit = async (e: React.FormEvent) => {
      const response = await fetch('/api/test/1234', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'test name', email: 'test email' }),
      });
      const data = await response.json();
      console.log("response data",data); 
    };
    return (
      <>
      다이나믹 라우트 페이지: {params.id}
      <button style={{border: '2px solid'}} type="submit" onClick={handleSubmit}>데이터 전송</button>
      </>
    );
}