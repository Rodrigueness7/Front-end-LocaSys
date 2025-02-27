import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateSupplier from "./updateSupplier"
import fetchData from "../../../../../utils/fetchData"


export default async function PageUpdateSupplier({ params }) {

    const idSupplier = (await params).idSupplier

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')

    }
    
    const supplier = await fetchData(`http://localhost:3001/findSupplier/${idSupplier}`, token)

    return (
        <UpdateSupplier idSupplier={idSupplier} data={supplier} token={token}></UpdateSupplier>
    )
}