import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateUser from "./updateUser"
import fetchData from "../../../../../utils/fetchData"



export default async function PageUpdateUser({ params }) {
    const idUser = (await params).idUser

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    const sector = await fetchData('http://localhost:3001/findAllSector', token)
    const profile = await fetchData('http://localhost:3001/findAllProfile', token)
    const dataUserId = await fetchData(`http://localhost:3001/findIdUser/${idUser}`, token)


    return (
        <UpdateUser dataUserId={dataUserId} dataSector={sector} dataProfile={profile} idUser={idUser} token={token}></UpdateUser>

    )

}