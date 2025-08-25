
import { cookies } from "next/headers"
import PageRegisterEquipment from "./RegisterEquipment"
import { redirect } from 'next/navigation'
import fetchData from "../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"


export default async function RegisterEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 2)

    if (!token) {
        redirect('../login')
    }

    if(number == undefined) {
        redirect('../')
    }

    let user = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    let branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)
    let sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)
    let supplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSupplier`, token)
    let type = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllType`, token)

    if(branch.message) {
        redirect('../login')
    }


    return (
        <PageRegisterEquipment dataUser={user} dataBranch={branch} dataSector={sector} dataSupplier={supplier} dataType={type} token={token}></PageRegisterEquipment>
    )
}