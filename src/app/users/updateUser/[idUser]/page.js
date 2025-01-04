import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateUser from "./updateUser"

const fetchDataSector = async (token) => {
    const dataSector = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataSector.json()
}

const fetchDataProfile = async (token) => {
    const dataProfile = await fetch('http://localhost:3001/findAllProfile', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataProfile.json()
}

const fetchDataUser = async (idUser, token) => {
    const res = await fetch(`http://localhost:3001/findIdUser/${idUser}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}


export default async function PageUpdateUser({ params }) {
    const idUser = (await params).idUser

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../../login')
    }

    const sector = await fetchDataSector(token)
    const profile = await fetchDataProfile(token)
    const user = await fetchDataUser(idUser, token)

    return (
        <UpdateUser dataUser={user} dataSector={sector} dataProfile={profile} idUser={idUser} token={token}></UpdateUser>

    )

}