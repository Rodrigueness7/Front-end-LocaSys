import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Table from '../../../components/table'
import Link from 'next/link'
import fetchData from '../../../utils/fetchData'
import Message from '../../../utils/message'


export default async function Equipments() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('./login')
    }

    const equipments = await fetchData('http://localhost:3001/findAllEquipment', token)

    if(equipments.message) {
        return(<Message message={'Usuário sem permissão'}/>)
    }
    
    let data = equipments.map(itens => {
        let result = {
            id: itens.idEquipment,
            ['Código']: itens.codProd,
            ['Equipamento']: itens.equipment,
            ['Tipo']: itens.type,
            ['Data Entrada']: new Date(itens.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            ['Data Retorno']: itens.returnDate ? new Date(itens.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
            ['Usuario']: itens['User'].username,
            ['Filial']: itens['Branch'].branch,
            ['Setor']: itens['Sector'].sector,
            ['Fornecedor']: itens['Supplier'].supplier
        }
        if(itens.value !== undefined) {
            result['Valor'] = itens.value
        }
        return result
    })
    let attributeStand = ['Código', 'Equipamento', 'Tipo', 'Data Entrada', 'Data Retorno', 'Usuario', 'Filial', 'Setor', 'Fornecedor', 'Valor']
    let attribute = data.length === 0 ? attributeStand : Object.keys(data[0]);
   
    
    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../equipment/registerEquipment'}>
                    <button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Equipamento</button>
                </Link>
            </div>
            <div className='ml-8 flex-1'>
                <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={attribute} data={data} attributos={attribute} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./equipment/updateEquipment'} bt={'...'}></Table>
            </div>
        </div>
    )
}