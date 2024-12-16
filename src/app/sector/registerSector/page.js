import { cookies } from "next/headers"


const fetchDataFilial = async (token) => {
    const res = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await res.json()
}


export default async function RegisterSector() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value
}