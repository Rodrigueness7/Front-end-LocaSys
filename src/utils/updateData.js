
export default async function updateData(url, data, token, result) {
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
                result({ success: res.successMessage })
            } else if (res.successMessageObs) {
                result({ success: res.successMessageObs })
            } else {
                result({ error: res.errorMessage })
            }

        }

    )
}