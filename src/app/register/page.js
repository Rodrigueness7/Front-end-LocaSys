const { cookies } = require("next/headers")
const { default: Register } = require("./Register")

const fetchData = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    console.log(token)
    const data = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    return await data.json()
    
}

export default async function PageRegister() {
    
    const values = await fetchData()
    
    return (
       <div>
            <Register data={values}></Register>
            
       </div>
    )
}
