export default async function deleteData(url, token, result) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': token 
        }
    }).then(
        result => result.json()
    ).then(
        res => result(res.message)
    )
    
}