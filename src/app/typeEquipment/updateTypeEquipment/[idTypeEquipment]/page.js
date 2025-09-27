import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"
import UpdateTypeEquipment from "./updateTypeEquipment"


export default async function PageUpdateTypeEquipment({ params }) {
    const idTypeEquipment = (await params).idTypeEquipment

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 50)


    if(number == undefined) {
        redirect('/')
    }

    const typeEquipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findTypeEquipment/${idTypeEquipment}`, token)
    
    if(typeEquipment.message) {
        redirect('/login')
    }

    return (
        <UpdateTypeEquipment dataTypeEquipment={typeEquipment} idTypeEquipment={idTypeEquipment} token={token}></UpdateTypeEquipment>

    )
}