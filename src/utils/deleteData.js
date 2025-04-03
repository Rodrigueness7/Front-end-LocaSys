export default async function deleteData(url, token, result) {
    await fetch(url, {
        method: 'DELETE',
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