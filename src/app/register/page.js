
import { cookies } from "next/headers"
import Register from './Register'
import { redirect } from 'next/navigation'


const fetchDataSector = async (token) => {
    const dataSector = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataSector.json()
}

  const fetchDataFilial = async (token) => {
    const dataFilial = await fetch('http://localhost:3001/findAllFilial', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataFilial.json()
}

export default async function PageRegister() {
  
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('./')
        
    }

    const dataSector = await fetchDataSector(token)
    const dataFilial = await fetchDataFilial(token)

   
    return (
       <div> 
           <Register dataSector={dataSector} dataFilial={dataFilial} ></Register>
       </div>
    )
}
