export default async function deleteData(url, token, result, message) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': token 
        }
    }).then(
        result => result.json()
    ).then(
        res => {
            if(res.successMessage){
                result(message)
            } else {
                result(res.errorMessage)
            }
        }
    )
    
}