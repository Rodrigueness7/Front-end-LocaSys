import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UpdateProfile from "./updateProfile"
import fetchData from "../../../../utils/fetchData"
import { jwtDecode } from "jwt-decode"


export default async function PageUpdateProfile({ params }) {
    const idProfile = (await params).idProfile

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permissionUser = jwtDecode(token).permission
    const number = permissionUser.find(number => number == 17)

    if (!token) {
        redirect('../../login')
    }

    if(number == undefined) {
        redirect('../../')
    }

    const profile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findProfile/${idProfile}`, token)
    const permission = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findPermissionIdProfile_permission/${idProfile}`, token)

    if(permission.message) {
        redirect('../../login')
    }

    return (
        <UpdateProfile data={profile} idProfile={idProfile} dataPermission={permission} token={token}></UpdateProfile>

    )
}