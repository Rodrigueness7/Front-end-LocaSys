import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import RegisterTypeEquipment from "./registerTypeEquipment";


export default async function PageRegisterTypeEquipment() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

    let permissionUser = jwtDecode(token).permission
    const number = permissionUser.find(number => number == 49)


    if(number == undefined) {
        redirect('/')
    }

    return (
        <RegisterTypeEquipment token={token} ></RegisterTypeEquipment>  
    )
}