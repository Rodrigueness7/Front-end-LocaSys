import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import Table from "../../components/table"
import fetchData from "../../utils/fetchData"
import Message from "../../utils/message"
import Profile from "./profile"


export default async function PageProfile() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const dataProfile = await fetchData('http://localhost:3001/findAllProfile', token)
    
    if(dataProfile.message) {
       return<Message message={'Usuário sem permissão'}/>
    }

    return (
      <Profile tableProfile={dataProfile}></Profile>
        
    )
}