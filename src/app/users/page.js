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
        <div>
            <div className="flex justify-between mb-8 px-8">
                <h1>Usuários</h1>
                <button className=' p-2 bg-indigo-500 rounded-lg text-white'><Link href={'../users/register'}>Novo Usuário</Link></button>
            </div>
         
            <div className="flex flex-col max-w-screen-md px-8">
            <div>
                <div className='flex justify-between text-sm border border-stone-950 '>
                    <span>Name</span>
                    <span>Sobrenome</span>
                    <span>Username</span>
                    <span>CPF</span>
                    <span>Email</span>
                    <span>Setor</span>
                    <span>Perfil</span>
                </div>

            </div>
                {users.map(values =>
                    <div>
                        <div className="flex justify-around border border-stone-950 text-sm ">
                            <span className='me-8' key={values.idUser}>{values.firstName}</span>
                            <span className='me-8'>{values.lastName}</span>
                            <span>{values.username}</span>
                            <span>{values.cpf}</span>
                            <span>{values.email}</span>
                            <span>{values['Sector'].sector}</span>
                            <span>{values['Profile'].profile}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}