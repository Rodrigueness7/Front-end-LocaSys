import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterSupplier from "./RegisterSupplier";


export default async function PageRegisterSupplier() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    return (
        <RegisterSupplier></RegisterSupplier>
    )
}