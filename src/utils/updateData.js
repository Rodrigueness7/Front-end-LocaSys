
export default async function updateData(url, data, token, result, success, error) {
    await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }).then(
        result => result.json()
    ).then(
        res => {
            if(res.successMessage){
                result({success: success})
            } else if(res.successMessageObs) {
                result(res.successMessageObs)
            }
            
            result({error: error})
        }

    )
}