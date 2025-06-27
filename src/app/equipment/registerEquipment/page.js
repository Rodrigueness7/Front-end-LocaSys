
import { cookies } from "next/headers"
import PageRegisterEquipment from "./RegisterEquipment"
import { redirect } from 'next/navigation'
import fetchData from "../../../utils/fetchData"


export default async function RegisterEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    let user = await fetchData('http://localhost:3001/findAllUser', token)
    let branch = await fetchData('http://localhost:3001/findAllBranch', token)
    let sector = await fetchData('http://localhost:3001/findAllSector', token)
    let supplier = await fetchData('http://localhost:3001/findAllSupplier', token)

    if(branch.message) {
        redirect('../login')
    }


    return (
        <PageRegisterEquipment dataUser={user} dataBranch={branch} dataSector={sector} dataSupplier={supplier} token={token}></PageRegisterEquipment>
    )
}