import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../../../utils/fetchData"
import UpdateBranch from "./updateBranch"


export default async function PageUpdateBranch({ params }) {

    const idBranch = (await params).idBranch
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }
    

    let branch = await fetchData(`http://localhost:3001/findBranch/${idBranch}`, token)

    return (
        <UpdateBranch dataBranch={branch} idBranch={idBranch} token={token}></UpdateBranch>
        
    )
}