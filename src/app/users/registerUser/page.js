
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import RegisterUser from "./RegisterUser"
import fetchData from "../../../utils/fetchData"

export default async function PageRegisterUser() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')

    }

    const dataSector = await fetchData('http://localhost:3001/findAllSector', token)
    const dataProfile = await fetchData('http://localhost:3001/findAllProfile', token)
    const dataUser = await fetchData('http://localhost:3001/findAllUser', token)

    if(dataUser.message) {
        redirect('../login')
    }

    return (
        <RegisterUser dataSector={dataSector} dataProfile={dataProfile} dataUser={dataUser} token={token}></RegisterUser>
    )
}
