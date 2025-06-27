import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterProfile from "./registerProfile";
import fetchData from "../../../utils/fetchData";


export default async function PageRegisterProfile() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }
    const permission = await fetchData('http://localhost:3001/findAllPermission', token)

    if(permission.message) {
        redirect('../login')
    }
    return (
        <RegisterProfile token={token} dataPermission={permission}></RegisterProfile>  
    )
}