'use client'

import Table from "@/components/table"
import orderData from "@/utils/orderData"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Profile({tableProfile}) {
      const router = useRouter()
      const [permission, setPermission] = useState([])
      const[sortColumnState, setSortColumnState] = useState('')
      const[sortDirectionState, setSortDirectionState] = useState('asc')
      const{sortedData, handleSort, sortColumn, sortDirection} = orderData(tableProfile, sortColumnState, sortDirectionState, setSortColumnState, setSortDirectionState)

   
    
        useEffect(() => {
            let data = localStorage.getItem('permission')
            if(!data) {
            return router.push('/login')
        }
            let number = data.split(',').map(number => number)
            setPermission(number)
        }, [router])

        

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
        <div className="flex items-start mb-8 lg:px-8 sm:px-8">
           {permission.find(number => number == '16') && (
             <Link href={'../profile/registerProfile'}><button className='p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white'>Nova Perfil</button></Link>
           )}
        </div>
        <div className="ml-8 flex-1 h-[78%] overflow-x-auto w-1/3">
            <Table Table={'table-auto bg-white shadow-md rounded-lg w-full '} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b '} Td={'py-2 px-4 text-black'} positionTd={'flex justify-end'} headers={['id', 'Perfil']} data={sortedData} attributos={['id', 'Perfil']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./profile/updateProfile'} bt={'...'} permission={permission.find(number => number == '17')} sortColumn={sortColumn} sortDirection={sortDirection} handleSort={handleSort}></Table>
        </div>
    </div>
    )
}