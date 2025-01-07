import UpdateSector from "@/app/sector/updateSector/[idSector]/updateSector"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import FetchSector from "../../../../../components/fetchSector"

const fetchDataFilial = async (token) => {
    const res = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}

export default async function PageUpdateSector({params}) {
   
    const idSector = (await params).idSector
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../../login')
    }

    const sector = await FetchSector(`http://localhost:3001/findSector/${idSector}`, token)
    const filial = await fetchDataFilial(token)

    return(
        <UpdateSector idSector={idSector} dataSector={sector} dataFilial={filial} token={token}></UpdateSector>
    )
}