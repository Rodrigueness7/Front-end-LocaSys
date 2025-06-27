import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageHome from "./Home";
import fetchData from "@/utils/fetchData";



export default async function Home() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

   
    if (!token) {
        redirect('./login')   
    }

    const branch = await fetchData('http://localhost:3001/findAllBranch', token)

    if(branch.message) {
        redirect('./login')
    }

    return (
        <PageHome token={token} dataBranch={branch}></PageHome>
       
    )
}