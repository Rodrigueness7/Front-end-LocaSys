import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import Profile from "./profile"
import { jwtDecode } from "jwt-decode"


export default async function PageProfile() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

     if (!token) {
        redirect('/login')
    }

    let permissionUser = jwtDecode(token).permission
    const number = permissionUser.find(number => number == 15)

   
    const dataProfile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllProfile`, token)
    
    if(dataProfile.message) {
       redirect('/login')
    }

    if(number == undefined) {
        redirect('/')
    }

    return (
      <Profile tableProfile={dataProfile}></Profile>
        
    )
}