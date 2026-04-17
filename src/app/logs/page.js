import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import { jwtDecode } from "jwt-decode"
import Logs from "./log"


export default async function PageLogs() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 35)

    
    if(number == undefined) {
        redirect('/')
    }

    const log = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllLog`, token)

    const formatedlog = log.map(itens => {
        return {
            ['id']: itens.idLog,
            ['Usuário']: itens['User'].username,
            ['Ação']: itens.action,
            ['Descrição']: itens.description,
            ['Data']: new Date(itens.actionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        }
    }).sort((a,b) => {
        return b.id - a.id
    })

   
    return (
       <Logs data={formatedlog}></Logs>
    )
}