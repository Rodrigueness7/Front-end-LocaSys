
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

  const fetchDataProfile = async (token) => {
    const dataProfile = await fetch('http://localhost:3001/findAllProfile', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await dataProfile.json()
}

export default async function PageRegister() {
  
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if(!token) {
        redirect('../login')
        
    }
        
    const dataSector = await fetchDataSector(token)
    const dataProfile = await fetchDataProfile(token)

   
    return (
       <div> 
           <Register dataSector={dataSector} dataProfile={dataProfile} ></Register>
       </div>
    )
}
