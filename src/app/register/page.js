const { cookies } = require("next/headers")
const { default: Register } = require("./Register")

const fetchData = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const data = await fetch('http://localhost:3001/findAllSector', {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })
    const values = data.json()

    return <Register data={values}></Register>
}

