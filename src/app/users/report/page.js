'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


// const TablePdf = dynamic(() => import('../../../components/tablePdf'), {
//     ssr: false
// })

const LargePdfTable = dynamic(() => import('../../../components/largePdfTable'), {
    ssr: false
})

export default function Report() {

    const [data, setData] = useState(null)
    const [user, setUser] = useState(null)
    

    useEffect(() => {
        const storedData = sessionStorage.getItem('dataUser')
        const user = localStorage.getItem('username')
        setData(JSON.parse(storedData))
        setUser(user)
    }, [])

    

    return(
        <>
         {data !== null && (
            <LargePdfTable data={data} size={'A4'} user={user} title={'Relátorio de Usuário'} width={'25%'}></LargePdfTable>
         )}
        </>
    )
}
