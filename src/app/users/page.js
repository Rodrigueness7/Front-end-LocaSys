import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Link from 'next/link'
import Table from '../../../components/table'
import changeProperty from '../../../utils/changeProperty'
import fetchData from '../../../utils/fetchData'


export default async function Users() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const users = await fetchData('http://localhost:3001/findAllUser', token)

    let data = []

    users.map(itens => {
        changeProperty(itens, 'Sector', 'sector', 'sector')
        changeProperty(itens, 'Profile', 'profile', 'profile')

        data.push(itens)

    })

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen' >
            <div className="flex items-start mb-8 lg:px-8 sm:px-8">
                <Link href={'../users/registerUser'}><button className='p-2 bg-indigo-500 rounded-lg text-white w-full '>Novo Usuário</button></Link>
            </div>
            <div className='ml-8 flex-1'>
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Nome', 'Sobrenome', 'Usuário', 'CPF', 'Email', 'Setor', 'Perfil']} data={data} attributos={['firstName', 'lastName', 'username', 'cpf', 'email', 'sector', 'profile']} id={'idUser'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./users/updateUser'} bt={'...'}></Table>
            </div>
        </div>
    )
}