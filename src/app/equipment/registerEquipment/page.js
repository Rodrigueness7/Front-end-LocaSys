
import { cookies } from "next/headers"
import PageRegisterEquipment from "./RegisterEquipment"
import { redirect } from 'next/navigation'
import fetchData from "../../../../utils/fetchData"


export default async function RegisterEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    let user = await fetchData('http://localhost:3001/findAllUser', token)
    let filial = await fetchData('http://localhost:3001/findAllFilial', token)
    let sector = await fetchData('http://localhost:3001/findAllSector', token)
    let supplier = await fetchData('http://localhost:3001/findAllSupplier', token)

    return (
        <PageRegisterEquipment dataUser={user} dataFilial={filial} dataSector={sector} dataSupplier={supplier} token={token}></PageRegisterEquipment>

    )
}