'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


const LargePdfTable = dynamic(() => import('../../../components/largePdfTable'), {
    ssr: false,
     loading: () => <div className="flex items-center justify-center h-screen w-full bg-white"><div className="animate-spin rounded-full border-4 border-t-transparent border-blue-500 w-64 h-64"></div></div>
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
 
   
    return(
        <>
         {data !== null && (
            <LargePdfTable data={data} size={'A4'} user={user} title={'Relátorio de Filial'} width={'25%'}></LargePdfTable>
         )}
        </>
    )
}