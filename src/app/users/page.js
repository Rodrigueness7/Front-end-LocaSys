import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import fetchData from '../../utils/fetchData'
import Users from './users'
import { jwtDecode } from 'jwt-decode'


export default async function PageUsers() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

     if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 10)

   
    if(number == undefined) {
        redirect('/')
    }

    const dataUsers = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    const dataUser_sectors = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser_sector`, token)
    
    
    if(dataUsers.message) {
        redirect('/login')
    }


    const data = dataUsers.flatMap(user => {
    const userSectors = dataUser_sectors.filter(
        sector => sector.idUser === user.idUser
    );
   
    return userSectors.map(userSector => ({
        id: user.idUser + ' - ' + userSector.idSector,
        Nome: user.firstName,
        Sobrenome: user.lastName,
        CPF: user.cpf,
        Usuario: user.username,
        Email: user.email,
        Setor: userSector.Sector?.sector ?? '',
        Perfil: user.Profile?.profile ?? '',
    }));
});

  
    let attribute = Object.keys(data[0])


    return (
        <Users tableUsers={data}  attribute={attribute} ></Users>
    )
}