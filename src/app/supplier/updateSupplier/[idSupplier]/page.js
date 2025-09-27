import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateSupplier from "./updateSupplier"
import fetchData from "../../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"


export default async function PageUpdateSupplier({ params }) {

    const idSupplier = (await params).idSupplier

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }


    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 46)

  
    if(number == undefined) {
        redirect('/')
    }

    
    const supplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findSupplier/${idSupplier}`, token)

    return (
        <UpdateSupplier idSupplier={idSupplier} data={supplier} token={token}></UpdateSupplier>
    )
}