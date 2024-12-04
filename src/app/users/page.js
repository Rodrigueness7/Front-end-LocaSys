import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Link from 'next/link'
import Table from '../../../components/table'
import ChangeProperty from '../../../components/changeProperty'

const fetchDataUsers = async (token) => {

    const res = await fetch('http://localhost:3001/findUser', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

export default async function Users() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const users = await fetchDataUsers(token)

    let data = []

    users.map(itens => {
        ChangeProperty(itens, 'Sector', 'sector', 'sector')
        ChangeProperty(itens, 'Profile', 'profile', 'profile')

        data.push(itens)

    })

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen' >
            <div className="flex justify-center mb-8 lg:px-12 sm:px-12 2xl:justify-end 2xl:px-12">
                <button className='p-2 bg-indigo-500 rounded-lg text-white w-full sm:w-auto'><Link href={'../users/register'}>Novo Usuário</Link></button>
            </div>
            <div className='container mx-auto px-4'>
                <Table Table={'min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Nome', 'Sobrenome', 'Usuário', 'CPF', 'Email', 'Setor', 'Perfil']} data={data} attributos={['firstName', 'lastName', 'username', 'cpf', 'email', 'sector', 'profile']}></Table>
            </div>           
        </div>
    )
}