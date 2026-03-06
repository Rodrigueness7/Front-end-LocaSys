'use client'
import Table from "@/components/table"
import orderData from "@/utils/orderData"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TypeEquipmet({tableTypeEquipment}) {
   const router = useRouter()
   const [permission, setPermission] = useState([])
   const [sortColumn, setSortColumn] = useState('')
   const [sortDirection, setSortDirection] = useState('asc')

   const sortedData = orderData(tableTypeEquipment, sortColumn, sortDirection, setSortColumn, setSortDirection).sortedData
   const handleSort = orderData(tableTypeEquipment, sortColumn, sortDirection, setSortColumn, setSortDirection).handleSort
   const sortColumnState = orderData(tableTypeEquipment, sortColumn, sortDirection, setSortColumn, setSortDirection).sortColumn
   const sortDirectionState = orderData(tableTypeEquipment, sortColumn, sortDirection, setSortColumn, setSortDirection).sortDirection
    
   
    
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
           {permission.find(number => number == '49') && (
             <Link href={'../typeEquipment/registerTypeEquipment'}><button className='p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white'>Novo Tipo</button></Link>
           )}
        </div>
        <div className="ml-8 flex-1 h-[78%] overflow-x-auto w-1/3">
            <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b '} Td={'py-2 px-4 text-black'} positionTd={'flex justify-end'} headers={['id', 'Tipo']} data={sortedData} attributos={['id', 'Tipo']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./typeEquipment/updateTypeEquipment'} bt={'...'} permission={permission.find(number => number == '50')} handleSort={handleSort} sortColumn={sortColumnState} sortDirection={sortDirectionState}></Table>
        </div>
    </div>
    )
}