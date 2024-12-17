import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PageRegisterSector from "./registerSector"


const fetchDataFilial = async (token) => {
    const res = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}


export default async function RegisterSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
    }

    const filial = await fetchDataFilial(token)

    return(
        <PageRegisterSector dataFilial={filial}></PageRegisterSector>
    )

}