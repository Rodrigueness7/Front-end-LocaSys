import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Table from "../../../components/table"
import Link from "next/link"
import fetchData from "../../../utils/fetchData"


export default async function Supplier() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const supplier = await fetchData('http://localhost:3001/findAllSupplier', token)

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-8">
            <div className="flex mb-8 lg:px-8 sm:px-8 items-center">
                <Link href={'../supplier/registerSupplier'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Fonercedor</button></Link>
            </div>
            <div className="flex-1 ml-8">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Fornecedor', 'Email', 'Contato', 'CNPJ', 'Endereço', 'Cep', 'Estado', 'Cidade']} data={supplier} attributos={['supplier', 'email', 'contact', 'CNPJ', 'address', 'zipCode', 'state', 'city']} id={'idSupplier'} href={'./supplier/updateSupplier'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} bt={'...'}></Table>
            </div>
        </div>
    )
}