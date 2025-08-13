import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateUser from "./updateUser"
import fetchData from "../../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"



export default async function PageUpdateUser({ params }) {
    const idUser = (await params).idUser

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 12)

    if (!token) {
        redirect('../../login')
    }

    if(number == undefined) {
        redirect('../../')
    }

    const sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)
    const profile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllProfile`, token)
    const dataUserId = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findIdUser/${idUser}`, token)


    return (
        <UpdateUser dataUserId={dataUserId} dataSector={sector} dataProfile={profile} idUser={idUser} token={token}></UpdateUser>

    )

}