import UpdateSector from "@/app/sector/updateSector/[idSector]/updateSector"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../../../utils/fetchData"

export default async function PageUpdateSector({ params }) {

    const idSector = (await params).idSector
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    const sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findSector/${idSector}`, token)
    const branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)

    return (
        <UpdateSector idSector={idSector} dataSector={sector} dataBranch={branch} token={token}></UpdateSector>
    )
}