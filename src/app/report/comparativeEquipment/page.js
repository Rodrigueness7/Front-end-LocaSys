'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"


const LargePdfTable = dynamic(() => import('../../../components/largePdfTable'), {
    ssr: false
})

export default function Report() {

  const [data, setData] = useState()
  const [user, setUser] = useState()
 

  useEffect(() => {
        setData(JSON.parse(sessionStorage.getItem('equipments')))
        setUser(localStorage.getItem('username'))
  }, [])
        
   
    return(
        <>
         <LargePdfTable data={data} size={'A4'} user={user} title={'Relátorio de Comparativo'} width={'25%'}></LargePdfTable>
        </>
    )
}