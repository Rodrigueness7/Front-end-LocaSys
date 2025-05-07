
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
        const storedData = sessionStorage.getItem('dataSector')
        const user = localStorage.getItem('username')
        setUser(user)
        setData(JSON.parse(storedData))
    }, [])

    const getStyle = {
        id: '60%',
        Setor: '60%',
        Filial: '20%'
    }


    return(
        <>
         {data !== null && (
            <TablePdf data={data} title={'Relátorio dos Setores'} size={'A4'} user={user} widthFooter={'720px'} getStyle={getStyle}></TablePdf>
         )}
        </>
    )
}