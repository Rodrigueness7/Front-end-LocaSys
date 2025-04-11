import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Table from "../../components/table"
import Link from "next/link"
import fetchData from "../../utils/fetchData"
import Message from "../../utils/message"
import Supplier from "./supplier"


export default async function PageSupplier() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const dataSupplier = await fetchData('http://localhost:3001/findAllSupplier', token)

    if (dataSupplier.message) {
        return (<Message message={'Usuário sem permissão'} />)
    }

    return (
        <Supplier tableSupplier={dataSupplier}></Supplier>
    )
}