import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import Supplier from "./supplier"


export default async function PageSupplier() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const dataSupplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSupplier`, token)

    if (dataSupplier.message) {
        redirect('../login')
    }

    return (
        <Supplier tableSupplier={dataSupplier}></Supplier>
    )
}