import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ChangeProperty from "../../utils/changeProperty"
import Table from "../../components/table"
import fetchData from "../../utils/fetchData"



export default async function logs() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    let log = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllLog`, token)
    if (log.message) {
        return <Message message={'Usuário sem permissão'} />
    }

    let data = []

    log.map(itens => {
        ChangeProperty(itens, 'User', 'username', 'username')
        itens.actionDate = new Date(itens.actionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        data.push(itens)
    })

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="ml-8 flex-1">
                <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Usuário', 'Ação', 'Descrição', 'Data']} data={data} attributos={['username', 'action', 'description', 'actionDate']} id={'idLog'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
            </div>
        </div>
    )
}