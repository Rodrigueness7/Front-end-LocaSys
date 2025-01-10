import { cookies } from "next/headers"
import UpdateFilial from "./updateFilial"
import { redirect } from "next/navigation"
import fetchData from "../../../../../utils/fetchData"


export default async function PageUpdateFilial({ params }) {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }
    const idFilial = (await params).idFilial


    let filial = await fetchData(`http://localhost:3001/findFilial/${idFilial}`, token)

    return (
        <UpdateFilial dataFilial={filial} idFilial={idFilial} token={token}></UpdateFilial>
    )
}