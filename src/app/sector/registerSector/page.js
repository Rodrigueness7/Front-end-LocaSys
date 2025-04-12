import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PageRegisterSector from "./registerSector"
import fetchData from "../../../utils/fetchData"


export default async function RegisterSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const branch = await fetchData('http://localhost:3001/findAllBranch', token)

    return (
        <PageRegisterSector dataBranch={branch} token={token}></PageRegisterSector>
    )

}