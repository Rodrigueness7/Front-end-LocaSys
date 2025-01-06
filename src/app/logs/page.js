import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ChangeProperty from "../../../components/changeProperty"
import Table from "../../../components/table"

const fetchDataLog = async (token) => {
    const res = await fetch('http://localhost:3001/findAllLog', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}


export default async function logs() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const log = await fetchDataLog(token)
    let data = []

    log.map(itens => {
        ChangeProperty(itens, 'User', 'username', 'username')
        itens.actionDate = new Date(itens.actionDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})

        data.push(itens)
        
    })

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
            <div className="ml-8 flex-1">
                 <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Usuário', 'Ação', 'Data']} data={data} attributos={['username', 'action', 'actionDate']} id={'idLog'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./equipment/updateEquipment'} bt={'...'}></Table>
            </div>
        </div>
    )
}