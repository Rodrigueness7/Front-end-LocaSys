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
        const storedData = sessionStorage.getItem('dataBranch')
        const user = localStorage.getItem('username')
        setUser(user)
        setData(JSON.parse(storedData))
    }, [])

    const getStyle = {
        ['Código Filial']: '80px',
        ['Filial']: '100px',
        ['CNPJ']: '115px',
        ['Razão Social']: '130px',
     
    }

    return(
        <>
         {data !== null && (
            <TablePdf data={data} title={'Relátorio de Filial'} size={'A4'} user={user} getStyle={getStyle}></TablePdf>
         )}
        </>
    )
}