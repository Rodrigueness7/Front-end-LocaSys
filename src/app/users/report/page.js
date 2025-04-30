'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


const TablePdf = dynamic(() => import('../../../components/tablePdf'), {
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
            <TablePdf data={data} title={'Relátorio de Usuário'} wCell={'50%'} wCellHeader={'50%'} size={'A3'} user={user}></TablePdf>
         )}
        </>
    )
}
