import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import changeProperty from "../../../utils/changeProperty"
import Link from "next/link"
import Table from "../../../components/table"
import fetchData from "../../../utils/fetchData"


export default async function Sector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    let sector = await fetchData('http://localhost:3001/findAllSector', token)
    let data = []

    sector.map((itens) => {
        changeProperty(itens, 'Branch', 'filial', 'branch')
        changeProperty(itens, 'Branch', 'uniqueIdentifier', 'uniqueIdentifier')

        data.push(itens)
    })

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../sector/registerSector'}>
                    <button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Setor </button>
                </Link>
            </div>
            <div className='flex-1 ml-8'>
                <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'Setor']} data={data} attributos={['uniqueIdentifier', 'filial', 'sector']} id={'idSector'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./sector/updateSector'} bt={'...'}></Table>
            </div>
        </div>
    )
}