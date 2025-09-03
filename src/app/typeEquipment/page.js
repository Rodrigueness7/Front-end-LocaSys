import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import { jwtDecode } from "jwt-decode"
import TypeEquipmet from "./typeEquipment"


export default async function PageTypeEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permissionUser = jwtDecode(token).permission
    const number = permissionUser.find(number => number == 48)

    if (!token) {
        redirect('../login')
    }

    const dataTypeEquipmet = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllTypeEquipment`, token)
    
    if(dataTypeEquipmet.message) {
       redirect('../login')
    }

    if(number == undefined) {
        redirect('../')
    }



    return (
      <TypeEquipmet tableTypeEquipment ={dataTypeEquipmet}></TypeEquipmet>
   
        
    )
}