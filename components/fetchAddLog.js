
export default async function FetchAddLog(data, action, description, category, token) {
     
    let newUserId = []

    data.map(itens => {
        if(itens.username == localStorage.getItem('username')) {
            newUserId.push(itens.idUser)
        }
    })

    let newData = {
        idLog:0,
        action: action,
        description: description + ' ' + category,
        idUser: newUserId[0]
    }


    let res = await fetch('http://localhost:3001/registerLog', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    })  
    return await res.json()
}   