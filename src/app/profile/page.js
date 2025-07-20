import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import Profile from "./profile"


export default async function PageProfile() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const dataProfile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllProfile`, token)
    
    if(dataProfile.message) {
       redirect('../login')
    }

    return (
      <Profile tableProfile={dataProfile}></Profile>
        
    )
}