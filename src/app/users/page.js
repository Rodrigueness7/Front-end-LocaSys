import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Link from 'next/link'
import Table from '../../components/table'
import changeProperty from '../../utils/changeProperty'
import fetchData from '../../utils/fetchData'
import Message from '../../utils/message'


export default async function Users() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const users = await fetchData('http://localhost:3001/findAllUser', token)
    
    if(users.message) {
        return(<Message message={'Usuário sem permissão'}/>)
    }

    let data = users.map(itens => (
        {
            id: itens.idUser,
            Nome: itens.firstName,
            Sobrenome: itens.lastName,
            CPF: itens.cpf,
            Usuario: itens.username,
            Email: itens.email,
            Setor: itens['Sector'].sector,
            Perfil: itens['Profile'].profile,
        }
    )
    )

    let attribute = Object.keys(data[0])


    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen' >
            <div className="flex items-start mb-8 lg:px-8 sm:px-8">
                <Link href={'../users/registerUser'}><button className='p-2 bg-indigo-500 rounded-lg text-white w-full '>Novo Usuário</button></Link>
            </div>
            <div className='ml-8 flex-1'>
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={attribute} data={data} attributos={attribute} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./users/updateUser'} bt={'...'}></Table>
            </div>
        </div>
        
    )
}