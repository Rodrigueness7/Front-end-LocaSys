'use client'

import Table from "@/components/table"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Profile({tableProfile}) {

      const [permission, setPermission] = useState([])
    
    
        useEffect(() => {
            let data = localStorage.getItem('permission')
            let number = data.split(',').map(number => number)
            setPermission(number)
        }, [])

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
        <div className="flex items-start mb-8 lg:px-8 sm:px-8">
           {permission.find(number => number == '16') && (
             <Link href={'../profile/registerProfile'}><button className='p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white'>Nova Perfil</button></Link>
           )}
        </div>
        <div className="ml-8 flex-1">
            <Table Table={'w-96 table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b '} Td={'py-2 px-4'} positionTd={'flex justify-end'} headers={['id', 'Perfil']} data={tableProfile} attributos={['idProfile', 'profile']} id={'idProfile'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./profile/updateProfile'} bt={'...'} permission={permission.find(number => number == '17')}></Table>
        </div>
    </div>
    )
}