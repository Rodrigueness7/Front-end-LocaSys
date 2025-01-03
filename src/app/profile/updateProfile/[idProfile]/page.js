import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateProfile from "./updateProfile"


const fetchDataProfile = async (idProfile, token) => {
    const res = await fetch(`http://localhost:3001/findProfile/${idProfile}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}

export default async function PageUpdateProfile({params}) {
    const idProfile = (await params).idProfile

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../../login')
    }

    const profile = await fetchDataProfile(idProfile, token)

    return(
        <UpdateProfile data={profile} idProfile={idProfile} token={token}></UpdateProfile>
    )
}