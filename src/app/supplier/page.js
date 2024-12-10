import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Table from "../../../components/table"


const fetchDataSupplier = async (token) => {
    const res = await fetch('http://localhost:3001/findAllSupplier', {
        headers: {
            'content-type' : 'application/json',
            'Authorization' : token
        }
    })
    return await res.json()
}


export default async function Supplier() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
    }

    const supplier = await fetchDataSupplier(token)

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen">
            <div>
                <Table Table={'min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Fornecedor', 'Email', 'Contato', 'CNPJ', 'Endereço', 'Cep', 'Estado', 'Cidade' ]} data={supplier} attributos={['supplier', 'email', 'contact', 'CNPJ', 'address', 'zipCode', 'state', 'city']} id={'idSupplier'}></Table>
            </div>
        </div>
    )
}