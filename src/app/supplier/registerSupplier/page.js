import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterSupplier from "./RegisterSupplier";
import { jwtDecode } from "jwt-decode";


export default async function PageRegisterSupplier() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 45)


    if(number == undefined) {
        redirect('/')
    }

    return (
        <RegisterSupplier token={token}></RegisterSupplier>
    )
}