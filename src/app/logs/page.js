import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ChangeProperty from "../../utils/changeProperty"
import Table from "../../components/table"
import fetchData from "../../utils/fetchData"
import { jwtDecode } from "jwt-decode"



export default async function Logs() {

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

    let log = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllLog`, token)
    
    let data = []

    log.map(itens => {
        ChangeProperty(itens, 'User', 'username', 'username')
        itens.actionDate = new Date(itens.actionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        data.push(itens)
    })

    data.sort((a, b) => {
    
        if (a.actionDate > b.actionDate) {
            return -1;
        }   
        if (a.actionDate < b.actionDate) {
            return 1;
        }   
        return 0;   
        
    }
    )

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="ml-8 flex-1 h-[93%] overflow-x-auto w-3/5">
                <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white text-nowrap rounded-lg'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={['Usuário', 'Ação', 'Descrição', 'Data']} data={data} attributos={['username', 'action', 'description', 'actionDate']} id={'idLog'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
            </div>
        </div>
    )
}