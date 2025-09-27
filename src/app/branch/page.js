import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fetchData from "../../utils/fetchData";
import Branch from "./branch";
import { jwtDecode } from "jwt-decode";


export default async function PageBranch() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

     if (!token) {
        redirect('/login')
    }

    const permission = jwtDecode(token).permission
    const number = permission.find(number => number == 6)

    if(number == undefined) {
        redirect('/')
    }


    const branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)

    if(branch.message) {
        redirect('/login')
    }
    
    return(
        <Branch tableBranch={branch}></Branch>
    )
}