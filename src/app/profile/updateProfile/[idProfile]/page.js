import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateProfile from "./updateProfile"
import FetchProfile from "../../../../../components/fetchProfile"


export default async function PageUpdateProfile({params}) {
    const idProfile = (await params).idProfile

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../../login')
    }

    const profile = await FetchProfile(`http://localhost:3001/findProfile/${idProfile}`, token)

    return(
        <UpdateProfile data={profile} idProfile={idProfile} token={token}></UpdateProfile>
    )
}