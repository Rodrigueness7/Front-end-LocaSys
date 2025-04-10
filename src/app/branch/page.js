import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fetchData from "../../utils/fetchData";
import Message from "../../utils/message";
import Branch from "./branch";



export default async function PageBranch() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const branch = await fetchData('http://localhost:3001/findAllBranch', token)

    if(branch.message) {
        return(<Message message={'Usuário sem permissão'}/>)
    }
    

    return(
        <Branch tableBranch={branch}></Branch>
    )
}