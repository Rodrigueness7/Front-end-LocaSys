import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import Link from 'next/link'

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

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen' >
            <div className="flex mb-8 px-8">
                <button className=' p-2 bg-indigo-500 rounded-lg text-white'><Link href={'../users/register'}>Novo Usuário</Link></button>
            </div>
            <div className='container mx-auto px-4'>
             <table className='min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden'>
                <thead>
                    <tr className='bg-gray-800 text-white'>
                        <th className='py-2 px-4 text-left'>Nome</th>
                        <th className='py-2 px-4 text-left'>Sobrenome</th>
                        <th className='py-2 px-4 text-left'>Usuário</th>
                        <th className='py-2 px-4 text-left'>CPF</th>
                        <th className='py-2 px-4 text-left'>Email</th>
                        <th className='py-2 px-4 text-left'>Setor</th>
                        <th className='py-2 px-4 text-left'>Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => 
                          <tr className='border-b'>
                             <td className='py-2 px-4' key={item.idUser}>{item.firstName}</td>
                             <td className='py-2 px-4'>{item.lastName}</td>
                             <td className='py-2 px-4'>{item.username}</td>
                             <td className='py-2 px-4'>{item.cpf}</td>
                             <td className='py-2 px-4'>{item.email}</td>
                             <td className='py-2 px-4'>{item['Sector'].sector}</td>
                             <td className='py-2 px-4'>{item['Profile'].profile}</td>
                          </tr>
                        )}
                </tbody>
            </table>
            </div>           
        </div>
    )
}