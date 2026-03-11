import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fetchData from "../../utils/fetchData"
import Supplier from "./supplier"
import { jwtDecode } from "jwt-decode"


export default async function PageSupplier() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

       if (!token) {
        redirect('/login')
    }

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 44)


     if(number == undefined) {
        redirect('/')
    }

    const dataSupplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSupplier`, token)

    const formattedData = dataSupplier.map(item => {
        return {
            ['id'] : item.idSupplier,
            ['Fornecedor'] : item.supplier,
            ['Email'] : item.email,
            ['Contato'] : item.contact,
            ['Telefone'] : item.telephone,
            ['CNPJ'] : item.CNPJ,
            ['Endereço'] : item.address,
            ['Cep'] : item.zipCode,
            ['Estado'] : item.state,
            ['Cidade'] : item.city
        }
    })

    if (dataSupplier.message) {
        redirect('/login')
    }

    return (
        <Supplier tableSupplier={formattedData}></Supplier>
    )
}