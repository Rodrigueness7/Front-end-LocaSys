import { cookies } from "next/headers"
import UpdateEquipment from "./updateEquipment"


const fetchDataUser = async (token) => {
    const res = await fetch('http://localhost:3001/findAllUser', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

const fetchDataFilial = async (token) => {
    const res = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

const fetchDataSector = async (token) => {
    const res = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

const fetchDataSupplier = async (token) => {
    const res = await fetch('http://localhost:3001/findAllSupplier', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

const fetchDataEquipment = async (idFilial,token) => {
    const res = await fetch(`http://localhost:3001/findEquipmentId/${idFilial}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}


export default async function PageUpdateEquipment({params}) {

    const cookieStore = cookies()
        const token = (await cookieStore).get('token')?.value
    
        if (!token) {
            redirect('../login')
        }
    
    const idEquipment = (await params).idEquipment

    let username = await fetchDataUser(token)
    let filial = await fetchDataFilial(token)
    let sector = await fetchDataSector(token)
    let supplier = await fetchDataSupplier(token)
    let equipment = await fetchDataEquipment(idEquipment, token)

    
    return(
        <UpdateEquipment dataEquipment={equipment} dataUsername={username} dataFilial={filial} dataSector={sector} dataSupplier={supplier} token={token} idEquipment={idEquipment}></UpdateEquipment>
    )
}