import fetchData from "@/utils/fetchData";
import { cookies } from "next/headers";
import Report from "./report";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export default async function PageReport() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('/login')
    }

    const permission = jwtDecode(token).permission
    const number = permission.find(number => number == 31)

    if(number == undefined) {
        redirect('/')
    }

    const dataEquipmentHistory = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipmentHistory`, token)
    const dataEquipmentRental = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipmentRental`, token)
    const dataBranch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)


    return(
        <Report equipmentHistory={dataEquipmentHistory} equipmentRental={dataEquipmentRental} branch={dataBranch}></Report>
           
    )


}