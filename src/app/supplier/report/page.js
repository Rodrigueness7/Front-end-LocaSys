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
        const storedData = sessionStorage.getItem('dataSupplier')
        const user = localStorage.getItem('username')
        setUser(user)
        setData(JSON.parse(storedData))
    }, [])


    return(
        <>
         {data !== null && (
            <TablePdf data={data} title={'Relátorio de Fornecedor'} wCellHeader={'25%'} wCell={'25%'} size={'A3'} user={user} widthFooter={'725px'}></TablePdf>
         )}
        </>
    )
}