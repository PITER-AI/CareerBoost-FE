export default async function DashboardPage() {
    // path를 사용하기에 async를 추가한다.
    const response = await fetch("http://localhost:3000/api/test");
    const data = await response.json();
    console.log("data",data);
    return (
        <main>
        <h1>Dashboard</h1>
        <p>Dashboard page</p>
        </main>
    );
}