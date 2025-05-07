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

    const getStyle = {
        id: '8%',
        Fornecedor: '32%',
        Email: '46%',
        Contato: '35%',
        CNPJ: '35%',
        Endereço: '30%',
        Cep: '20%',
        Estado: '20%',
        Cidade: '18%'
    }

    return(
        <>
         {data !== null && (
            <TablePdf data={data} title={'Relátorio de Fornecedor'}  size={'A4'} user={user} widthFooter={'725px'} getStyle={getStyle}></TablePdf>
         )}
        </>
    )
}