
import { cookies } from "next/headers"
import Register from './Register'

const cookieStore = await cookies()

const fetchDataSector = async () => {
    const token = cookieStore.get('token').value
    const dataSector = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataSector.json()
}

  const fetchDataFilial = async () => {
    const token = cookieStore.get('token').value
    const dataFilial = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataFilial.json()
}

export default async function PageRegister() {
    
    const dataSector = await fetchDataSector()
    const dataFilial = await fetchDataFilial()
    
    return (
       <div>
            <Register dataSector={dataSector} dataFilial={dataFilial}></Register>  
       </div>
    )
}
