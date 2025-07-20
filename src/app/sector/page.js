import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import changeProperty from "../../utils/changeProperty"
import fetchData from "../../utils/fetchData"
import Sector from "./sector"


export default async function PageSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('../login')
    }

    const sector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)

    if (sector.message) {
        redirect('../login')
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