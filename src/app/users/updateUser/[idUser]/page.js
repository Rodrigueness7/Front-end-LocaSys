import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateUser from "./updateUser"
import FetchUser from "../../../../../components/fetchUser"
import FetchProfile from "../../../../../components/fetchProfile"
import FetchSector from "../../../../../components/fetchSector"


export default async function PageUpdateUser({ params }) {
    const idUser = (await params).idUser

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    const sector = await FetchSector('http://localhost:3001/findAllSector', token)
    const profile = await FetchProfile('http://localhost:3001/findAllProfile', token)
    const dataUserId = await FetchUser(`http://localhost:3001/findIdUser/${idUser}`, token)
    const user = await FetchUser('http://localhost:3001/findAllUser', token)

    return (
        <UpdateUser dataUserId={dataUserId} dataSector={sector} dataProfile={profile} idUser={idUser} token={token} dataUser={user}></UpdateUser>

    )

}