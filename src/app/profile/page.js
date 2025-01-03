import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import Table from "../../../components/table"

const fetchDataProfile = async (token) => {
    const res = await fetch('http://localhost:3001/findAllProfile', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}
export default async function Profile() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
    }

    const profile = await fetchDataProfile(token)

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
        <div className="flex items-start mb-8 lg:px-8 sm:px-8">
            <Link href={'../profile/registerProfile'}><button className='p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white'>Nova Perfil</button></Link>
        </div>
        <div className="ml-8 flex-1">
            <Table Table={'w-96 table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['ID', 'Perfil']} data={profile} attributos={['idProfile', 'profile']} id={'idProfile'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./profile/updateProfile'} bt={'...'}></Table>
        </div>
    </div>
    )
}