import { cookies } from "next/headers"

const fetchDataUsers = async (token) => {
    const res = await fetch('http://localhost:3001/findUser', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })

    return await res.json()
}

export default async function Users() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value
    
    const dataUser = await fetchDataUsers(token).then(
        item => {
            console.log(item)
        }
    )
    return(
       <div>
         <div>
         <h1>Pagina</h1>
         </div>
       </div>
    )
}