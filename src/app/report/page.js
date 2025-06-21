import fetchData from "@/utils/fetchData";
import { cookies } from "next/headers";
import Report from "./report";

export default async function PageReport() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    const dataEquipment = await fetchData('http://localhost:3001/findAllEquipment', token)
    const dataEquipmentRental = await fetchData('http://localhost:3001/findAllEquipmentRental', token)


    

    return(
        <Report equipment={dataEquipment} equipmentRental={dataEquipmentRental}></Report>
    )


}