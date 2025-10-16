'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


const LargePdfTable = dynamic(() => import('../../../components/largePdfTable'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen w-full"><div className="animate-spin rounded-full border-4 border-t-transparent border-blue-500 w-64 h-64"></div></div>
})

export default function Report() {

  const [data, setData] = useState()
  const [user, setUser] = useState()
 

  useEffect(() => {
        setData(JSON.parse(sessionStorage.getItem('divergetValue')))
        setUser(localStorage.getItem('username'))
  }, [])
        
   
    return(
        <>
         <LargePdfTable data={data} size={'A4'} user={user} title={'Relatório de divergência de valor'} width={'25%'} row={5}></LargePdfTable>
        </>
    )
}