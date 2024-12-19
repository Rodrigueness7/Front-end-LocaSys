import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterProfile from "./registerProfile";


export default async function PageRegisterProfile() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) { 
        redirect('../login')
    }

    return(
        <RegisterProfile></RegisterProfile>
    )
}