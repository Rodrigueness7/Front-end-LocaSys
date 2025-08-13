import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import fetchData from '../../utils/fetchData'
import Users from './users'
import { jwtDecode } from 'jwt-decode'


export default async function PageUsers() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 10)

    if (!token) {
        redirect('../login')
    }

    if(number == undefined) {
        redirect('../')
    }

    const DataUsers = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    
    if(DataUsers.message) {
        redirect('../login')
    }

    let data = DataUsers.map(itens => (
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
        <Users tableUsers={data} attribute={attribute} ></Users>
    )
}