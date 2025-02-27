import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageRegisterBranch from "./RegisterBranch";



export default async function RegisterBranch() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    return (
        <PageRegisterBranch token={token}></PageRegisterBranch>
    )
}