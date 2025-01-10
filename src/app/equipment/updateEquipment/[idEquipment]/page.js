import { cookies } from "next/headers"
import UpdateEquipment from "./updateEquipment"
import { redirect } from "next/navigation"
import fetchData from "../../../../../utils/fetchData"


export default async function PageUpdateEquipment({ params }) {

    const idEquipment = (await params).idEquipment
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    let user = await fetchData('http://localhost:3001/findAllUser', token)
    let filial = await fetchData('http://localhost:3001/findAllFilial', token)
    let sector = await fetchData('http://localhost:3001/findAllSector', token)
    let supplier = await fetchData('http://localhost:3001/findAllSupplier', token)
    let equipment = await fetchData(`http://localhost:3001/findEquipmentId/${idEquipment}`, token)


    return (
        <UpdateEquipment dataEquipment={equipment} dataUser={user} dataFilial={filial} dataSector={sector} dataSupplier={supplier} token={token} idEquipment={idEquipment}></UpdateEquipment>
    )
}