
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import RegisterUser from "./RegisterUser"
import fetchData from "../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"

export default async function PageRegisterUser() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value
    
    if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 11)


    if(number == undefined) {
        redirect('/')
    }


    const dataSector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)
    const dataProfile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllProfile`, token)
    const dataUser = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    const dataUser_sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser_sector`, token)


    if(dataUser.message) {
        redirect('/login')
    }

    return (
        <RegisterUser dataSector={dataSector} dataProfile={dataProfile} dataUser={dataUser} dataUser_sector={dataUser_sector} token={token}></RegisterUser>
    )
}
