import UpdateSector from "@/app/sector/updateSector/[idSector]/updateSector"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../../../../utils/fetchData"

export default async function PageUpdateSector({ params }) {

    const idSector = (await params).idSector
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    const sector = await fetchData(`http://localhost:3001/findSector/${idSector}`, token)
    const filial = await fetchData('http://localhost:3001/findAllBranch', token)

    return (
        <UpdateSector idSector={idSector} dataSector={sector} dataFilial={filial} token={token}></UpdateSector>
    )
}