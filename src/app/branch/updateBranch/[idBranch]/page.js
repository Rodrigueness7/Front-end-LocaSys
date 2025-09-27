import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../../../utils/fetchData"
import UpdateBranch from "./updateBranch"
import { jwtDecode } from "jwt-decode"


export default async function PageUpdateBranch({ params }) {

    const idBranch = (await params).idBranch
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

     let permission = jwtDecode(token).permission
     const number = permission.find(number => number == 8)


      if(number == undefined) {
        redirect('/')
    }

    let branch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findBranch/${idBranch}`, token)

    if(branch.message) {
        redirect('/login')
    }

    return (
        <UpdateBranch dataBranch={branch} idBranch={idBranch} token={token}></UpdateBranch>
        
    )
}