import UpdateSector from "@/app/sector/updateSector/[idSector]/updateSector"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const fetchDataFilial = async (token) => {
    const res = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}

const fetchDataSector = async (idSector, token) => {
    const res = await fetch(`http://localhost:3001/findSector/${idSector}` , {
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

    const sector = await fetchDataSector(idSector, token)
    const filial = await fetchDataFilial(token)

    return(
        <UpdateSector idSector={idSector} dataSector={sector} dataFilial={filial} token={token}></UpdateSector>
    )
}