import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageRegisterBranch from "./RegisterBranch";
import { jwtDecode } from "jwt-decode";


export default async function RegisterBranch() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    } 

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 7)


    if(number == undefined) {
        redirect('/')
    }


    return (
        <PageRegisterBranch token={token}></PageRegisterBranch>
    )
}