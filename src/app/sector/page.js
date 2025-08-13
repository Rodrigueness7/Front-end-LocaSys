import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import changeProperty from "../../utils/changeProperty"
import fetchData from "../../utils/fetchData"
import Sector from "./sector"
import { jwtDecode } from "jwt-decode"


export default async function PageSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    let permission = jwtDecode(token).permission
    const number = permission.find(number => number == 19)

    if (!token) {
        redirect('../login')
    }

    const sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)

    if (sector.message) {
        redirect('../login')
    }

    if(number == undefined) {
        redirect('../')
    }

    let data = []

    sector.map((itens) => {
        changeProperty(itens, 'Branch', 'branch', 'branch')
        changeProperty(itens, 'Branch', 'uniqueIdentifier', 'uniqueIdentifier')

        data.push(itens)
    })

    return (
        <Sector tableSector={data}></Sector>
    )
}