import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Table from "../../../components/table";
import fetchData from "../../../utils/fetchData";


export default async function Filial() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const filial = await fetchData('http://localhost:3001/findAllFilial', token)

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <Link href={'../filial/registerFilial'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Nova Filial</button></Link>
            </div>
            <div className="ml-0.5 flex-1">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'CNPJ', 'Razão Social']} data={filial} attributos={['uniqueIdentifier', 'filial', 'CNPJ', 'corporateName']} id={'idFilial'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./filial/updateFilial'} bt={'...'}></Table>
            </div>
        </div>

    )
}