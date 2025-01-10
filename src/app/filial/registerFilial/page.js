import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageRegisterFilial from "./RegisterFilial";



export default async function RegisterFilial() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    return (
        <PageRegisterFilial token={token}></PageRegisterFilial>
    )
}