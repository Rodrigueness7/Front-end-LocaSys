
export default async function addData(url, data, token, result) {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }).then(
        result => result.json()
    ).then(
        res => {
            if (res.successMessage) {
                result({ success: res.successMessage })
            } else {
                result({ error: res.errorMessage })
            } 
        }
    )
}