import { cookies } from "next/headers"
import UpdateEquipment from "./updateEquipment"
import { redirect } from "next/navigation"
import fetchData from "../../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"


export default async function PageUpdateEquipment({ params }) {

    const idEquipment = (await params).idEquipment
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

     let permission = jwtDecode(token).permission
     const number = permission.find(number => number == 3)
    

    if(number == undefined) {
        redirect('/')
    }

    let user = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    let branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)
    let sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)
    let supplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSupplier`, token)
    let equipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findEquipmentId/${idEquipment}`, token)
    let typeEquipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllTypeEquipment`, token)
    let allEquipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipment`, token)

    if(branch.message) {
        redirect('/login')
    }

    return (
        <UpdateEquipment dataEquipment={equipment} dataUser={user} dataBranch={branch} dataSector={sector} dataSupplier={supplier} token={token} idEquipment={idEquipment} dataTypeEquipment={typeEquipment} dataAllEquipment={allEquipment} ></UpdateEquipment>

    )
}