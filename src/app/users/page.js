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

    const users = await fetchDataUsers(token)
    
    return(
       <div className="flex flex-container flex-col">
        <div className="mb-8 px-8">
            <h1>Usuários</h1>
        </div>
         <div className="flex flex-col max-w-screen-md px-8">
            {users.map(values => {
                return(
                    <div className="flex justify-around border border-stone-950">
                        <span key={values.idUser}>{values.username}</span>
                        <span>{values.firstName}</span>
                        <span>{values.lastName}</span>
                        <span>{values.cpf}</span>
                        <span>{values.email}</span>
                        <span>{values['Sector'].sector}</span>
                        <span>{values['Profile'].profile}</span>
                    </div>
                )   
            })}
         </div>
       </div>
    )
}