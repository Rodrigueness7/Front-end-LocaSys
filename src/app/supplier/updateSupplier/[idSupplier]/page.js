import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateSupplier from "./updateSupplier"

const fetchDataSupplier = async (idSupplier, token) => {
    const res = await fetch(`http://localhost:3001/findSupplier/${idSupplier}`, {
        headers: {
            'content-type': 'applicantion',
            'Authorization': token
        }
    })
    return await res.json()
}

export default async function PageUpdateSupplier({params}) {

    const idSupplier = (await params).idSupplier

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../../login')

    }

    const supplier = await fetchDataSupplier(idSupplier, token)

    return(
        <UpdateSupplier idSupplier={idSupplier} data={supplier} token={token}></UpdateSupplier>
    )
}