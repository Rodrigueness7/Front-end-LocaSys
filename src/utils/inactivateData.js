export default async function inactivateData(url, data, token, result) {
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
            if (res.successMessage) {
                result({ success: successMessage })
            } else {
                result({ error: res.errorMessage })
            }
        }
    )
}