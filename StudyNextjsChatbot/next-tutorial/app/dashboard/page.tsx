import Card from "@/components/Card";
import { Suspense } from "react";

export default async function DashboardPage() {
    // path를 사용하기에 async를 추가한다.
    const response = await fetch("http://localhost:3000/api/test");
    const data = await response.json();
    console.log("data",data);
    return (
        <>
            <Suspense fallback={<div> Card 1 loading...</div>}>
                <Card />
            </Suspense>
            <Suspense fallback={<div> Card 2 loading...</div>}>
                <Card />
            </Suspense>
            <Suspense fallback={<div> Card 3 loading...</div>}>
                <Card />
            </Suspense>
            <Suspense fallback={<div> Card 4 loading...</div>}>
                <Card />
            </Suspense>
        </>
    );
}