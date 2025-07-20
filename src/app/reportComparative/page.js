import fetchData from "@/utils/fetchData";
import { cookies } from "next/headers";
import Report from "./report";

export default async function PageReport() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    const dataEquipmentHistory = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipmentHistory`, token)
    const dataEquipmentRental = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipmentRental`, token)
    


    return(
        <Report equipmentHistory={dataEquipmentHistory} equipmentRental={dataEquipmentRental}></Report>
      
    )


}