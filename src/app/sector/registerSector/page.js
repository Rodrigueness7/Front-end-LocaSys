import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PageRegisterSector from "./registerSector"
import fetchData from "../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"


export default async function RegisterSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 20)


    if(number == undefined) {
        redirect('/')
    }

    const branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)

    if(branch.message) {
        redirect('/login')
    }

    return (
        <PageRegisterSector dataBranch={branch} token={token}></PageRegisterSector>
    )

}