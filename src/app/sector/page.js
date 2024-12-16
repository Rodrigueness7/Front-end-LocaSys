import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ChangeProperty from "../../../components/changeProperty"
import Link from "next/link"
import Table from "../../../components/table"


const fetchDataSector = async (token) => {
    const res = await fetch('http://localhost:3001/findAllSector', {
        headers: {
                'content-type' : 'application/json',
                'Authorization': token
        }       
    })
    return await res.json()
}

export default async function Sector() {
    const cookieStore = cookies()
    const  token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
    }

    let sector = await fetchDataSector(token)
    let data = []

    sector.map((itens) => {
        ChangeProperty(itens, 'Filial', 'filial', 'filial')
        ChangeProperty(itens, 'Filial', 'uniqueIdentifier', 'uniqueIdentifier')
        ChangeProperty(itens, 'Filial', 'idFilial', 'idFilial')
        data.push(itens)
    })


    return(
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
        <div className="flex mb-8 lg:px-12 sm:px-12">
            <Link href={'../equipment/registerEquipment'}>
                <button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Setor </button>
            </Link>
        </div>
        <div className='container mx-auto px-4'>
            <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'Setor']} data={data} attributos={['uniqueIdentifier', 'filial', 'sector']} id={'idSector'} ></Table>
        </div>
    </div>
    )
}