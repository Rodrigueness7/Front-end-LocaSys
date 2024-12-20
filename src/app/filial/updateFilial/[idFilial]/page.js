import { cookies } from "next/headers"
import UpdateFilial from "./updateFilial"
import { redirect } from "next/navigation"

const fetchDataFilial = async (idFilial, token) => {
    const res = await fetch(`http://localhost:3001/findFilial/${idFilial}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}

export default async function PageUpdateFilial({params}) {
   
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../../login')
    }
    const idFilial = (await params).idFilial


    let filial = await fetchDataFilial(idFilial, token)

    return(
        <UpdateFilial dataFilial={filial} idFilial={idFilial} token={token}></UpdateFilial>
    )
}