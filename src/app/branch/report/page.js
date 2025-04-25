'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


const TablePdf = dynamic(() => import('../../../components/tablePdf'), {
    ssr: false
})

export default function Report() {

    const [data, setData] = useState(null)

    useEffect(() => {
        const storedData = sessionStorage.getItem('dataBranch')
        setData(JSON.parse(storedData))
    }, [])

    return(
        <>
         {data !== null && (
            <TablePdf data={data} title={'Lista de Filiais'}></TablePdf>
         )}
        </>
    )
}