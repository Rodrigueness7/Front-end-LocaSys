import { cookies } from "next/headers"


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

const fetchDataSector = async () => {
    const res = await fetch('http://locashost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }) 

    return await res.json()

} 

const fetchDataSupplier = async () => {
    const res = await fetch('http://localhost:3001/findAllSupplier', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}


export default async function EquipmentRegistration() {
    const cookieStore = cookies()

    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
        
    }

    let user = await fetchDataUser(token)
    let filial = await fetchDataFilial(token)
    let sector = await fetchDataSector(token)
    let supplier = await fetchDataSupplier(token) 

}