import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Table from '../../../components/table'
import Link from 'next/link'
import ChangeProperty from '../../../components/changeProperty'

const fetchDataEquipment = async (token) => {
    let res = await fetch('http://localhost:3001/findAllEquipment', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}


export default async function Equipments() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('./login')
    }

    const equipments = await fetchDataEquipment(token)

    let data = []
    equipments.map((itens) => {
        ChangeProperty(itens, 'User', 'username', 'username')
        ChangeProperty(itens, 'Filial', 'filial', 'filial')
        ChangeProperty(itens, 'Sector', 'sector', 'sector')
        ChangeProperty(itens, 'Supplier', 'supplier', 'supplier')

        itens.entryDate = new Date(itens.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        data.push(itens)
    })

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../equipment/registerEquipment'}>
                    <button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Equipamento</button>
                </Link>
            </div>
            <div className='ml-8 flex-1'>
                <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código', 'Equipamento', 'Tipo', 'valor', 'Entrada', 'Usuário', 'Setor','Filial','Fornecedor']} data={data} attributos={['codProd', 'equipment', 'type', 'value', 'entryDate', 'username', 'sector','filial','supplier']} id={'idEquipment'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./equipment/updateEquipment'} bt={'...'}></Table>
            </div>
        </div>
    )
}