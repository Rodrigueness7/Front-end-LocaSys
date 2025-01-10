import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PageRegisterSector from "./registerSector"
import fetchData from "../../../../utils/fetchData"


export default async function RegisterSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const filial = await fetchData('http://localhost:3001/findAllFilial', token)

    return (
        <PageRegisterSector dataFilial={filial} token={token}></PageRegisterSector>
    )

}