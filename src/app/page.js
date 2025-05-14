import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageHome from "./Home";



export default async function Home() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('./login')
    }

    return (
        <PageHome token={token}></PageHome>
    )
}