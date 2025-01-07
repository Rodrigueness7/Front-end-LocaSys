
export default async function FetchUser(url, token) {
    const res = await fetch(url, {
        headers: {
            'content-type': 'application/json',
            'Authorization': token 
        }
    })
    return await res.json()
}


