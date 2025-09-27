import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterProfile from "./registerProfile";
import fetchData from "../../../utils/fetchData";
import { jwtDecode } from "jwt-decode";


export default async function PageRegisterProfile() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

     if (!token) {
        redirect('/login')
    }

    let permissionUser = jwtDecode(token).permission
    const number = permissionUser.find(number => number == 16)

    const permission = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllPermission`, token)

    if(permission.message) {
        redirect('/login')
    }

    if(number == undefined) {
        redirect('/')
    }

    return (
        <RegisterProfile token={token} dataPermission={permission}></RegisterProfile>  
    )
}